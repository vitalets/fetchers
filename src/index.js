/**
 * Fetchers
 */

/**
 * @external {RequestOptions} https://developer.mozilla.org/en-US/docs/Web/API/Request#Properties
 */

/**
 * @typedef {Object} Handlers
 * @property {Function} handleRequestBody function applied to every request body,
 * e.g. `body => JSON.stringify(body)`
 * @property {Function} handleResponse function applied to every response,
 * e.g. `async response => await response.json()`
 */

import PathRestFetcher from './path-rest-fetcher';
import RestFetcher from './rest-fetcher';

export {RestFetcher, PathRestFetcher};
export default {RestFetcher, PathRestFetcher};
