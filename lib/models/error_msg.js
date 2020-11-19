'use strict'

const RateLimit = require('./rate-limit')

class ErrorMessage {
  constructor (msg, code, ratelimit = new RateLimit(-1, -1, new Date(0))) {
    this.msg = msg
    this.code = code
    this.ratelimit = ratelimit
  }
}

module.exports = ErrorMessage
