# fetchers
[![Build Status](https://travis-ci.org/vitalets/fetchers.svg?branch=master)](https://travis-ci.org/vitalets/fetchers)
[![npm](https://img.shields.io/npm/v/fetchers.svg)](https://www.npmjs.com/package/fetchers)
[![license](https://img.shields.io/npm/l/fetchers.svg)](https://www.npmjs.com/package/fetchers)

> Semantic RESTful Fetch API wrappers

A set of wrappers over [Fetch API] providing semantic methods for GET, POST, PUT, DELETE and HEAD requests.

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
import {RestFetcher} from 'fetchers';

// Create fetcher with default url, default options and default response handler
const fetcher = new RestFetcher('http://example.com', {credentials: 'include'}, {
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
for others you can use [fetch polifill](https://github.com/github/fetch).
In Node.js consider [node-fetch](https://www.npmjs.com/package/node-fetch) package.

## Installation
```bash
npm install fetchers --save
```

## Usage

1. Multiple REST requests to single url:
    ```js
    import {RestFetcher} from 'fetchers';
    
    // Create fetcher with default url and options
    const fetcher = new RestFetcher('http://example.com', {
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      }
    });
    
    // GET http://example.com
    fetcher.get()
      .then(response => response.json());
    
    // POST to http://example.com
    fetcher.post(JSON.stringify(body))
      .then(response => response.json());
    
    // POST to http://example.com with CORS mode
    fetcher.post(JSON.stringify(body), {mode: 'cors'})
      .then(response => response.json());
    
    // POST to http://example.com with additional header
    fetcher.post(JSON.stringify(body), {headers: {'Content-Type': 'application/json'}})
      .then(response => response.json());
    ```

2. Multiple REST requests to base url with different paths:
    ```js
    import {PathRestFetcher} from 'fetchers';
    
    // Create fetcher with base url
    const fetcher = new PathRestFetcher('http://example.com');
    
    // GET http://example.com/get
    fetcher.get('/get')
      .then(response => response.json());
    
    // POST to http://example.com/post
    fetcher.post('/post', JSON.stringify(body))
      .then(response => response.json());
    
    ...
    ```

## API
Please see [online API Reference](https://vitalets.github.io/fetchers/identifiers.html).

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)

[REST]: https://en.wikipedia.org/wiki/Representational_state_transfer
[Fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
