# fetchers
[![Build Status](https://travis-ci.org/vitalets/fetchers.svg?branch=master)](https://travis-ci.org/vitalets/fetchers)
[![npm](https://img.shields.io/npm/v/fetchers.svg)](https://www.npmjs.com/package/fetchers)
[![license](https://img.shields.io/npm/l/fetchers.svg)](https://www.npmjs.com/package/fetchers)

> Semantic RESTful Fetch API wrappers

A wrappers over [Fetch API] providing semantic methods for GET, POST, PUT, DELETE and HEAD requests.

## Contents
* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
* [License](#license)

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

> In Node.js you should provide `global.fetch()`. For example from [node-fetch](https://www.npmjs.com/package/node-fetch) package.

## API
Please see [online API Reference](https://vitalets.github.io/fetchers/identifiers.html).

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)

[REST]: https://en.wikipedia.org/wiki/Representational_state_transfer
[Fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
