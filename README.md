# fetchers
[![Build Status](https://travis-ci.org/vitalets/fetchers.svg?branch=master)](https://travis-ci.org/vitalets/fetchers)
[![npm](https://img.shields.io/npm/v/fetchers.svg)](https://www.npmjs.com/package/fetchers)
[![license](https://img.shields.io/npm/l/fetchers.svg)](https://www.npmjs.com/package/fetchers)

> Semantic RESTful Fetch API wrappers

A lightweight wrappers over [Fetch API] providing semantic syntax for [REST] requests.

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
```js
import {RESTFetcher} from 'fetchers';

// base url and default headers
const fetcher = new RESTFetcher('http://example.com', {headers: {'Content-Type': 'application/json'}});

// GET
fetcher.get()
  .then(response => response.json());

// POST
fetcher.post(JSON.stringify(data))
  .then(response => response.json());

// PUT
fetcher.put(JSON.stringify(data))
  .then(response => response.json());

// DELETE
fetcher.del(JSON.stringify(data))
  .then(response => response.json());
```
## API

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)

[REST]: https://en.wikipedia.org/wiki/Representational_state_transfer
[Fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
