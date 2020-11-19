'use strict'
const MACInfo = require('./mac-info')
const RateLimit = require('./rate-limit')

class ResponseMACInfo {
  constructor (
    response = new MACInfo(), rateLimit = new RateLimit(-1, -1, new Date(0)),
    responseTime = 0.0, source = 'api') {
    this.status = 'OK'

    if (response === null || !(response instanceof Object)) {
      this.status = 'KO'
      return
    }
    this.macInfo = response
    this.rateLimit = rateLimit
    this.responseTime = responseTime
    this.source = source
    this.created = new Date()
  }
}

module.exports = ResponseMACInfo
