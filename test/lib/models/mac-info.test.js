const assert = require('assert')
const MACInfo = require('../../../lib/models/mac-info')

describe('MAC Info', function () {

  it('Empty or malformed', function () {
    let o = {}
    let m = new MACInfo(o)
    assert.strictEqual(false, m.found)
  })

  it('Empty or malformed1', function () {
    let o = { 'ops': null }
    let m = new MACInfo(o)
    assert.strictEqual(false, m.found)
  })

  it('Parse full objext', () => {
    const json = '{"success":true,"found":true,"macPrefix":"000000","company":"XEROX CORPORATION","address":"M/S 105-50C, WEBSTER NY 14580, US","country":"US","blockStart":"000000000000","blockEnd":"000000FFFFFF","blockSize":16777215,"blockType":"MA-L","updated":"2015-11-17","isRand":false,"isPrivate":false}'
    let m = new MACInfo(JSON.parse(json))

    assert.strictEqual(true, m['found'])
    assert.strictEqual(true, m['success'])
    assert.strictEqual('000000', m['macPrefix'])
    assert.strictEqual('XEROX CORPORATION', m['company'])
    assert.strictEqual('M/S 105-50C, WEBSTER NY 14580, US', m['address'])
    assert.strictEqual('US', m['country'])
    assert.strictEqual('000000000000', m['blockStart'])
    assert.strictEqual('000000FFFFFF', m['blockEnd'])
    assert.strictEqual(16777215, m['blockSize'])
    assert.strictEqual('MA-L', m['blockType'])
    assert.strictEqual('2015-11-17', m['updated'])
    assert.strictEqual(false, m['isRand'])
    assert.strictEqual(false, m['isPrivate'])

  })

})
