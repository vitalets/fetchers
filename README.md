# fetchers
[![Build Status](https://travis-ci.org/vitalets/fetchers.svg?branch=master)](https://travis-ci.org/vitalets/fetchers)
[![npm](https://img.shields.io/npm/v/fetchers.svg)](https://www.npmjs.com/package/fetchers)
[![license](https://img.shields.io/npm/l/fetchers.svg)](https://www.npmjs.com/package/fetchers)

A wrappers over [Fetch API] with semantic REST methods.

## Contents
* [Quick example](#quick-example)
* [Features](#features)
* [Requirements](#requirements)
* [Installation](#installation)
* [Usage](#usage)
  * [Semantic REST requests](#1-semantic-rest-requests)
  * [Default options and headers](#2-default-options-and-headers)
  * [Handling request body](#3-handling-request-body)
  * [Handling response](#4-handling-response)
  * [Send requests to relative paths](#5-send-requests-to-relative-paths)
* [API](#api)
* [License](#license)

## Quick example
```js
import {Fetcher} from 'fetchers';

const fetcher = new Fetcher('http://example.com', {credentials: 'include'});

// GET
fetcher.get().then(response => ...);
// POST
fetcher.post(data).then(response => ...);
// PUT
fetcher.put(data).then(response => ...);
// DELETE
fetcher.delete().then(response => ...);
```

## Features
The advantages over bare `.fetch()` are following:

* Semantic REST methods: `get()`, `post()`, `put()`, `delete()`, `head()` and `patch()`
* Convenient defaults for all methods:
  * Default url and options
  * Default request body handler, e.g. `JSON.stringify` 
  * Default response handler, e.g. `response.json()` 
* Attaching different paths to base url, e.g. `http://example.com` + (`/get`, `/post`, ...)

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
* `PathFetcher` - used for requests to constant base url with different relative paths

The examples below are for `Fetcher` but suitable for `PathFetcher` as well.

#### 1. Semantic REST requests
To perform GET, POST, PUT, DELETE, HEAD and PATCH there are corresponding methods:
```js
import {Fetcher} from 'fetchers';

const fetcher = new Fetcher('http://example.com');

fetcher.get().then(...);
fetcher.post(body).then(...);
fetcher.put(body).then(...);
fetcher.delete().then(...);
fetcher.head().then(...);
fetcher.patch().then(...);
```

#### 2. Default options and headers
You can set default options for every request from `Fetcher` instance.  
Example - include cookies in all requests and accept JSON:
```js
const fetcher = new Fetcher('http://example.com', {
  credentials: 'include',
  headers: {
    Accept: 'application/json'
  }
});

fetcher.get();
fetcher.post(body);
```
Add custom options to particular request:
```js
fetcher.post(body, {mode: 'cors'})
```

#### 3. Handle request body
To apply some transformation to body of every request use `handlers.handleRequestBody`.  
Example - convert every request body to JSON:
```js
const fetcher = new Fetcher('http://example.com', {}, {
  handleRequestBody: body => JSON.stringify(body)
});

fetcher.post({foo: 'bar'});
```

#### 4. Handle response
To apply some transformation to every response use `handlers.handleResponse`.  
Example - convert every response to JSON:
```js
const fetcher = new Fetcher('http://example.com', {}, {
  handleResponse: async response => await response.json()
});

fetcher.get().then(json => console.log(json));
```

Example - throw error in case of non `2xx` response:
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
#### 5. Send requests to relative paths
`PathFetcher` can send requests to different urls. 
The first parameter in all methods is string - relative path attached to base url:
```js
import {PathFetcher} from 'fetchers';

const fetcher = new PathFetcher('http://example.com');

// GET http://example.com/get
fetcher.get('/get').then(response => ...);

// POST to http://example.com/post
fetcher.post('/post', body).then(response => ...);
```

## API
[Full API Reference](https://vitalets.github.io/fetchers/identifiers.html).

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)

[Fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[REST]: https://en.wikipedia.org/wiki/Representational_state_transfer
