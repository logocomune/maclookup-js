'use strict'
const HTTPClient = require('./lib/helpers/http_client')
const LRUCache = require('./lib/helpers/lrucache')

const apiBasePrefixUrl = 'https://api.maclookup.app'

class APIClient {
  constructor (apiKey, timeout = 5000, prefixUrl = apiBasePrefixUrl) {
    this.apiKey = apiKey
    this.client = new HTTPClient(apiKey, timeout, prefixUrl)
  }

  withLRUCache () {
    this.withCache(new LRUCache())
  }

  withCache (cache) {
    this.client.cache = cache
  }

  getMacInfo (mac, successCb, errorCb, alwaysCb) {
    this.client.getMACInfo(mac, successCb, errorCb, alwaysCb)
  }
}

module.exports = APIClient
