'use strict'

const assert = require('assert')
const APIClient = require('../index')

describe.skip('Integration test', function () {

  const apiClient = new APIClient('', 5000)
  apiClient.withLRUCache()
  let response = {}
  it('Get mac info', function (done) {

    this.timeout = 10000
    apiClient.getMacInfo('00:00:00:01', (r) => {
        assert.strictEqual(r.status, 'OK')
        const m = r.macInfo
        assert.strictEqual(true, m.found)
        assert.strictEqual(true, m.success)
        assert.strictEqual('000000', m.macPrefix)
        assert.strictEqual('XEROX CORPORATION', m.company)
        assert.strictEqual('M/S 105-50C, WEBSTER NY 14580, US', m.address)
        assert.strictEqual('US', m.country)
        assert.strictEqual('000000000000', m.blockStart)
        assert.strictEqual('000000FFFFFF', m.blockEnd)
        assert.strictEqual(16777215, m.blockSize)
        assert.strictEqual('MA-L', m.blockType)
        assert.strictEqual('2015-11-17', m.updated)
        assert.strictEqual(false, m.isRand)
        assert.strictEqual(false, m.isPrivate)
        done()
      },
      (err) => {
        done(err)
      },
      () => {
      })

  })
  it('Get mac info second call (cache)', function (done) {

    apiClient.getMacInfo('00:00:00:01', (r) => {
        assert.strictEqual(r.status, 'OK')
        const m = r.macInfo
        assert.strictEqual(true, m.found)
        assert.strictEqual(true, m.success)
        assert.strictEqual('000000', m.macPrefix)
        assert.strictEqual('XEROX CORPORATION', m.company)
        assert.strictEqual('M/S 105-50C, WEBSTER NY 14580, US', m.address)
        assert.strictEqual('US', m.country)
        assert.strictEqual('000000000000', m.blockStart)
        assert.strictEqual('000000FFFFFF', m.blockEnd)
        assert.strictEqual(16777215, m.blockSize)
        assert.strictEqual('MA-L', m.blockType)
        assert.strictEqual('2015-11-17', m.updated)
        assert.strictEqual(false, m.isRand)
        assert.strictEqual(false, m.isPrivate)
        done()
      },
      (err) => {
        done(err)
      })
  })

})


describe.skip('Integration test BAD APIKEY', function () {

  const apiClient = new APIClient('bad APIKEY', 5000)
  apiClient.withLRUCache()
  let response = {}
  it('Get with bad apikey', function (done) {
    this.timeout = 10000
    apiClient.getMacInfo('00:00:00:01', (r) => {

        done('error')
      },
      (err) => {

        if (err.code === 401) {
          done()
          return
        }
        done(err)
      },
      () => {
      })

  })


})
