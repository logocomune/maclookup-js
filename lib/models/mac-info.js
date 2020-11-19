'use strict'

class MACInfo {
  constructor (obj) {
    this.success = false
    this.found = false
    this.macPrefix = null
    this.company = null
    this.address = null
    this.country = null
    this.blockStart = null
    this.blockEnd = null
    this.blockSize = 0
    this.blockType = null
    this.country = null
    this.updated = null
    this.isRand = false
    this.isPrivate = false

    if (obj === null || (typeof obj !== 'object') || !('success' in obj)) {
      return
    }

    if ('found' in obj && !obj.found) {
      return
    }

    const ownPropertyNames = Object.getOwnPropertyNames(this)
    for (const i in ownPropertyNames) {
      const p = ownPropertyNames[i]
      if (p !== 'found' && p !== 'success' && p !== 'isRand' && p !==
        'isPrivate') {
        this[p] = null
      }
      if (obj.hasOwnProperty(p)) {
        this[p] = obj[p]
      }
    }
  }
}

module.exports = MACInfo
