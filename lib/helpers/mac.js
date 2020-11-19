'use strict'

const charToReplace = /:|\.|-|\s/gi

function cleanMAC (mac) {
  if (typeof mac === 'undefined' || mac == null || (typeof mac !== 'string') ||
    mac === '') {
    throw new Error('MAC must be a string')
  }

  let cleanedMac = mac.trim()
  cleanedMac = cleanedMac.replace(charToReplace, '')
  cleanedMac = cleanedMac.toUpperCase()

  return cleanedMac
}

function checkMACSize (cleanedMac) {
  if (cleanedMac.length < 6) {
    throw new Error('MAC is too short. It\'s must be at least 6 char')
  }
  return cleanedMac
}

module.exports = { cleanMAC, checkMACSize }
