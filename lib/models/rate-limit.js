'use strict'

class RateLimit {
  constructor (limit = 0, remaining = 0, reset = new Date()) {
    this.limit = limit

    this.remaining = remaining

    this.reset = reset
  }
}

module.exports = RateLimit
