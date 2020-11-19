'use strict'

class NoCache {
  set () { }

  get () {
    return undefined
  }
}

module.exports = NoCache
