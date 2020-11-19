const assert = require('assert')
const { cleanMAC, checkMACSize } = require('../../../lib/helpers/mac')

describe('MAC Clean', function () {
  describe('Bad input', function (t) {
    it('should fail when call function without input', function () {
      assert.throws(() => cleanMAC())
    })
    it('should fail when MAC is empty string', function () {
      assert.throws(() => cleanMAC(''))
    })
    it('should fail when MAC is null', function () {
      assert.throws(() => cleanMAC(null))
    })
    it('should fail when MAC isn\'t a string', function () {
      assert.throws(() => cleanMAC([]))
    })

  })
  describe('MAC Clean', function () {

    it('Remove space and ":", should return 000000', function () {
      assert.strictEqual('000000', cleanMAC(' 00:00:00'))
    })
    it('Remove space and ".", should return 000000', function () {
      assert.strictEqual('000000', cleanMAC(' 00.00.00'))
    })
    it('Remove space and "-", should return 000000', function () {
      assert.strictEqual('000000', cleanMAC(' 00-00-00'))
    })
    it('Remove space and " ", should return 000000', function () {
      assert.strictEqual('000000', cleanMAC(' 00 00 00'))
    })
  })
})

describe('MAC size', function () {

  it('MAC is too short', function () {
    assert.throws(() => checkMACSize(cleanMAC('00:00:0')))
  })
  it('MAC is at least 6 chars', function () {
    assert.strictEqual('000000', checkMACSize(cleanMAC('00:00:00')))
  })

})


