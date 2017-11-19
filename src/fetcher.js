import PathFetcher from './path-fetcher';

/**
 * Performs REST requests to persistent url.
 *
 * @example
 * import {Fetcher} from 'fetchers';
 *
 * const fetcher = new Fetcher('http://example.com', {credentials: 'include'});
 *
 * fetcher.get()
 *    .then(response => response.ok ? response.json() : response.statusText)
 *    .then(data => console.log(data));
 */
export default class Fetcher extends PathFetcher {
  /**
   * @param {String} url url used for every request
   * @param {RequestOptions} [defaultOptions={}] default options used for every request
   * @param {Handlers} [handlers={}] functions for processing every request and response
   */
  constructor(url, defaultOptions = {}, handlers = {}) {
    super(url, defaultOptions, handlers);
  }

  /**
   * Performs GET request.
   *
   * @param {RequestOptions} [options] custom options
   * @returns {Promise<Response>}
   */
  async get(options) {
    return await super.get(null, options);
  }

  /**
   * Performs POST request.
   *
   * @param {*} [body] request body
   * @param {RequestOptions} [options] custom options
   * @returns {Promise<Response>}
   */
  async post(body, options) {
    return await super.post(null, body, options);
  }

  /**
   * Performs PUT request.
   *
   * @param {*} [body] request body
   * @param {RequestOptions} [options] custom options
   * @returns {Promise<Response>}
   */
  async put(body, options) {
    return await super.put(null, body, options);
  }

  /**
   * Performs DELETE request.
   *
   * @param {*} [body] request body
   * @param {RequestOptions} [options] custom options
   * @returns {Promise<Response>}
   */
  async del(body, options) {
    return await super.del(null, body, options);
  }

  /**
   * Performs HEAD request.
   *
   * @param {*} [body] request body
   * @param {RequestOptions} [options] custom options
   * @returns {Promise<Response>}
   */
  async head(body, options) {
    return await super.head(null, body, options);
  }

  /**
   * Performs PATCH request.
   *
   * @param {*} [body] request body
   * @param {RequestOptions} [options] custom options
   * @returns {Promise<Response>}
   */
  async patch(body, options) {
    return await super.patch(null, body, options);
  }
}
