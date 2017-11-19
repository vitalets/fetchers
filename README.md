# fetchers
[![Build Status](https://travis-ci.org/vitalets/fetchers.svg?branch=master)](https://travis-ci.org/vitalets/fetchers)
[![npm](https://img.shields.io/npm/v/fetchers.svg)](https://www.npmjs.com/package/fetchers)
[![license](https://img.shields.io/npm/l/fetchers.svg)](https://www.npmjs.com/package/fetchers)

> Semantic RESTful Fetch API wrappers

A set of [Fetch API] wrappers providing default options and semantic methods for [REST] requests.

## Contents
* [Quick example](#quick-example)
* [Features](#features)
* [Requirements](#requirements)
* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
* [License](#license)

## Quick example
```js
import {Fetcher} from 'fetchers';

// Create fetcher with default url, default options and default response handler
const fetcher = new Fetcher('http://example.com', {credentials: 'include'}, {
  handleResponse: async response => await response.json()
});

// REST requests to http://example.com
fetcher.get().then(json => console.log(json));
fetcher.post(data).then(json => console.log(json));
fetcher.put(data).then(json => console.log(json));
fetcher.del().then(json => console.log(json));
```

## Features
The advantages over bare `.fetch()` are following:

* Default url used for every request with optional relative path
* Default options and headers applied to every request
* Default handlers for request and response
* Semantic REST methods: `get()`, `post()`, `put()`, `del()`, `head()` and `patch()`

## Requirements
The only requirement is global [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).  
All major browsers already [support it](https://caniuse.com/#feat=fetch),
for others you can use [fetch polyfill](https://github.com/github/fetch).
In Node.js consider [node-fetch](https://www.npmjs.com/package/node-fetch) package.

## Installation
```bash
npm install fetchers --save
```

## Usage
There are two classes:

* `Fetcher` - used for requests to constant url
* `PathFetcher` - used for requests to base url with different relative paths

The examples below are for `Fetcher` but suitable for `PathFetcher` as well.

#### 1. Semantic REST requests
To perform GET, POST, PUT, DELETE, HEAD and PATCH there are corresponding methods:
```js
import {Fetcher} from 'fetchers';

const fetcher = new Fetcher('http://example.com');

fetcher.get().then(...);
fetcher.post(body).then(...);
fetcher.put(body).then(...);
fetcher.del().then(...);
fetcher.head().then(...);
fetcher.patch().then(...);
```

#### 2. Default options and headers
You can set default options to be used for every request:
```js
const fetcher = new Fetcher('http://example.com', {
  credentials: 'include',
  headers: {
    Accept: 'application/json'
  }
});

// POST with defaults
fetcher.post(body);
```
But you can always add custom options:
```js
// POST with additional options
fetcher.post(body, {mode: 'cors'})
```

#### 3. Default request body handler
To apply some transformation to every request body use `handlers.handleRequestBody`.
For example convert every request body to JSON:
```js
const fetcher = new Fetcher('http://example.com', {}, {
  handleRequestBody: body => JSON.stringify(body)
});

fetcher.post({foo: 'bar'});
```

#### 4. Default response handler
To apply some transformation to every response use `handlers.handleResponse`.
For example convert every response to JSON:
```js
const fetcher = new Fetcher('http://example.com', {}, {
  handleResponse: async response => await response.json()
});

fetcher.get().then(json => console.log(json));
```

Reject in case of non `2xx` response:
```js
const fetcher = new Fetcher('http://example.com', {}, {
  handleResponse: async response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText} ${await response.text()}`);
    }
    return response; 
  }
});
```
#### 5. Requests to base url + relative paths
For `PathFetcher` the first parameter in all methods is always string path relative to base url:
```js
import {PathFetcher} from 'fetchers';

// Set base url
const fetcher = new PathFetcher('http://example.com');

// GET http://example.com/get
fetcher.get('/get')
  .then(response => response.json());

// POST to http://example.com/post
fetcher.post('/post', JSON.stringify(body))
  .then(response => response.json());
```

## API
Please see [online API Reference](https://vitalets.github.io/fetchers/identifiers.html).

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)

[REST]: https://en.wikipedia.org/wiki/Representational_state_transfer
[Fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
