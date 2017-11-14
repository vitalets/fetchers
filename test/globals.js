
import {RestFetcher, PathRestFetcher} from '../src';
import fetch from 'node-fetch';
import fetchMock from 'fetch-mock';
import assert from 'assert';

global.fetch = fetch;
global.fetchMock = fetchMock;
global.assert = assert;
if (process.env.LIB_PATH) {
  const fetchers = require(process.env.LIB_PATH);
  global.RestFetcher = fetchers.RestFetcher;
  global.PathRestFetcher = fetchers.PathRestFetcher;
} else {
  global.RestFetcher = RestFetcher;
  global.PathRestFetcher = PathRestFetcher;
}
