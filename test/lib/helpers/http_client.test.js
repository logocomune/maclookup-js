const assert = require('assert')
const HttpClient = require('../../../lib/helpers/http_client')
const ResponseMACInfo = require('../../../lib/models/response_mac_info')
const RateLimit = require('../../../lib/models/rate-limit')

describe.skip('MACInfo request', function () {

  it('Integration test: request to api', function (done) {

    const client = new HttpClient('', 5000)
    client.getMACInfo('000000', (r) => {
      assert.strictEqual(true, r instanceof ResponseMACInfo)
      assert.strictEqual(true, r.macInfo.success)
      assert.strictEqual(true, r.macInfo.found)
      assert.strictEqual('000000', r.macInfo.macPrefix)
      assert.strictEqual('XEROX CORPORATION', r.macInfo.company)
      assert.strictEqual('M/S 105-50C, WEBSTER NY 14580, US', r.macInfo.address)
      assert.strictEqual('US', r.macInfo.country)
      assert.strictEqual('000000000000', r.macInfo.blockStart)
      assert.strictEqual('000000FFFFFF', r.macInfo.blockEnd)
      assert.strictEqual(16777215, r.macInfo.blockSize)
      assert.strictEqual('MA-L', r.macInfo.blockType)
      assert.strictEqual('2015-11-17', r.macInfo.updated)
      assert.strictEqual(false, r.macInfo.isRand)
      assert.strictEqual(false, r.macInfo.isPrivate)

      assert.strictEqual(true, r.rateLimit instanceof RateLimit)
      assert.strictEqual(2, r.rateLimit.limit)
      assert.strictEqual(1, r.rateLimit.remaining)
      done()
    }, (e) => {
      done(e)
    }, () => {

    })
  })
  it('Integration test: request to api with apikey', function (done) {

    const client = new HttpClient(process.env.APIKEY, 5000)
    client.getMACInfo('000000', (r) => {
      assert.strictEqual(true, r instanceof ResponseMACInfo)
      assert.strictEqual(true, r.macInfo.success)
      assert.strictEqual(true, r.macInfo.found)
      assert.strictEqual('000000', r.macInfo.macPrefix)
      assert.strictEqual('XEROX CORPORATION', r.macInfo.company)
      assert.strictEqual('M/S 105-50C, WEBSTER NY 14580, US', r.macInfo.address)
      assert.strictEqual('US', r.macInfo.country)
      assert.strictEqual('000000000000', r.macInfo.blockStart)
      assert.strictEqual('000000FFFFFF', r.macInfo.blockEnd)
      assert.strictEqual(16777215, r.macInfo.blockSize)
      assert.strictEqual('MA-L', r.macInfo.blockType)
      assert.strictEqual('2015-11-17', r.macInfo.updated)
      assert.strictEqual(false, r.macInfo.isRand)
      assert.strictEqual(false, r.macInfo.isPrivate)

      assert.strictEqual(true, r.rateLimit instanceof RateLimit)
      assert.strictEqual(50, r.rateLimit.limit)
      assert.strictEqual(49, r.rateLimit.remaining)
      done()
    }, (e) => {
      done(e)
    }, () => {

    })
  })
})



