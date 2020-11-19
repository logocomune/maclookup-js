'use strict'

const LRU = require('lru-cache')

class LRUCache {
  constructor (max = 500, maxAge = 3600 * 1000) {
    this._cache = new LRU({ max: max, maxAge: maxAge })
  }

  set (key, value, ttl) {
    this._cache.set(key, value, ttl)
  }

  get (key) {
    return this._cache.get(key)
  }
}

module.exports = LRUCache
