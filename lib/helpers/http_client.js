'use strict'

const httpClient = require('axios')
const RateLimit = require('../models/rate-limit')
const MACInfo = require('../models/mac-info')
const ResponseMACInfo = require('../models/response_mac_info')
const ErrorMessage = require('../models/error_msg')
const NoCache = require('./nocache')

const defaultApiUrlPrefix = 'https://api.maclookup.app'

const UA = 'MACLookupClient-js/1.0.0 (https://api.maclookup.app)'

class HTTPClient {
  constructor (apiKeyValue = '', timeout = 5000, apiUrlPrefix = defaultApiUrlPrefix) {
    const axiosOpt = {
      baseURL: apiUrlPrefix,
      timeout: timeout,
      headers: { 'User-Agent': UA }
    }

    if (apiKeyValue !== '') {
      axiosOpt.params = { apiKey: apiKeyValue }
    }

    this.client = httpClient.create(axiosOpt)
    this.cancelToken = httpClient.CancelToken
    this._cache = new NoCache()
  }

  set cache (cache) {
    this._cache = cache
  }

  get cache () {
    return this._cache
  }

  getMACInfo (
    mac,
    success = () => {
    },
    error = () => {
    },
    always = () => {
    }) {
    const start = (new Date()).getTime()
    const responseMACInfo = this._cache.get(mac)
    if (responseMACInfo !== undefined) {
      responseMACInfo.source = 'cache'
      success(responseMACInfo)
      always()
      return
    }
    this.client.get('/v2/macs/' + mac).then(
      (rawResponse) => {
        successWrapper(mac, rawResponse, start, this._cache, success)
      }).catch(
      (e) => {
        catchErrorWrapper(e, error)
      }).finally(
      () => {
        if (typeof always !== 'function') {
          return
        }
        always()
      })
  }
}

function getRateLimit (headers) {
  let limit = 0
  if ('x-ratelimit-limit' in headers) {
    const l = headers['x-ratelimit-limit'].split(' ')[0]
    limit = parseInt(l)
  }

  let remain = 0
  if ('x-ratelimit-remaining' in headers) {
    const l = headers['x-ratelimit-remaining']
    remain = parseInt(l)
  }

  let reset = null
  if ('x-ratelimit-reset' in headers) {
    reset = new Date(parseInt(headers['x-ratelimit-reset']) * 1000)
  }

  return new RateLimit(limit, remain, reset)
}

function successWrapper (mac, rawResponse, start, cache, cb = null) {
  const headers = rawResponse.headers
  const rateLimit = getRateLimit(headers)
  const macInfo = new MACInfo(rawResponse.data)
  const responseMACInfo = new ResponseMACInfo(macInfo, rateLimit,
    (new Date()).getTime() - start)

  cache.set(mac, responseMACInfo)

  cb(responseMACInfo)
}

function catchErrorWrapper (e, cb = null) {
  if (cb === null || typeof cb !== 'function') {
    return
  }
  if (!('response' in e) || typeof e.response === 'undefined') {
    cb(e.message)
    return
  }

  const resp = e.response

  let s = `${resp.status} - ${resp.statusText} `

  if ('data' in resp && 'error' in resp.data) {
    s += ' - ' + resp.data.error
    if ('moreInfo' in resp.data) {
      s += ' (more info: ' + resp.data.moreInfo + ')'
    }
  }
  let rateLimit = new RateLimit()
  if (resp.status === 400 || resp.status === 401 || resp.status === 429) {
    rateLimit = getRateLimit(resp.headers)
  }
  const errorMessage = new ErrorMessage(s, resp.status, rateLimit)
  console.log('call', cb)
  cb(errorMessage)
}

module.exports = HTTPClient
