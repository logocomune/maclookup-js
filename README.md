# maclookup-js
[![Build Status](https://travis-ci.org/logocomune/maclookup.js.svg?branch=main)](https://travis-ci.org/logocomune/maclookup-js)

A Node.js  library for interacting with [MACLookup's API v2](https://maclookup.app/api-v2/documentation). This library allows you to:

- Get full info (MAC prefix, company name, address and country) of a MAC address

## Installation


```shell
 npm install @logocomune/maclookup
````

##Getting Started

```js
const ApiClient = require('@logocomune/maclookup');

let apiClient = new APIClient()
//Add cache
apiClient.withLRUCache()

apiClient.getMacInfo('00:00:00:01', (r) => {
    let m = r['macInfo']

    console.log("MAC found in database:", m['found'])
    console.log("MAC is private (no company name):", m['isPrivate'])
    console.log("Company name:", m['company'])
    console.log("Api response in: ", r['responseTime'])
    console.log("Rate limits - remaining request for current time window:", r['rateLimit']['remaining'])
    console.log("Rate limits - next reset", r['rateLimit']['reset'])
    console.log("===========");
    console.log(r)
    console.log("===========");

  },
  (e) => {
    console.log("Error",e);
  },
  () => {
    console.log("All end")
  });

```


### API Key
Get an API Key [here](https://maclookup.app/api-v2/plans)
```js
   let apiClient = new APIClient("an_api_key")
   apiClient.withCache(new LRUCache())

```

### Use custom timout
```js
    let timeout = 5000; //timeout in ms
    let apiClient = new APIClient("an_api_key",timeout);
    // without apikey:
    // let apiClient = new APIClient('',timeout);
    apiClient.withCache(new LRUCache())
```
