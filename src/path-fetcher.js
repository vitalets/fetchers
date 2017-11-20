/**
 * Performs REST requests to constant base url with different paths.
 *
 * @example
 * import {PathFetcher} from 'fetchers';
 *
 * const fetcher = new PathFetcher('http://example.com', {credentials: 'include'});
 *
 * fetcher.get('/get')
 *    .then(response => response.ok ? response.json() : response.statusText)
 *    .then(data => console.log(data));
 *
 * fetcher.post('/post', JSON.stringify({foo: 'bar'}))
 *    .then(response => response.ok ? response.json() : response.statusText)
 *    .then(data => console.log(data));
 */
export default class PathFetcher {
  /**
   * @param {String} [baseUrl='']
   * @param {RequestOptions} [defaultOptions={}] default options used for every request
   * @param {Handlers} [handlers={}] functions for processing every request and response
   */
  constructor(baseUrl = '', defaultOptions = {}, handlers = {}) {
    this._baseUrl = baseUrl;
    this._defaultOptions = defaultOptions;
    this._handlers = handlers;
  }

  /**
   * Performs GET request to url path.
   *
   * @param {String} [path] path added to base url
   * @param {RequestOptions} [options] custom options
   * @returns {Promise<Response>}
   */
  async get(path, options) {
    return this._fetch('GET', path, null, options);
  }

  /**
   * Performs POST request to url path.
   *
   * @param {String} [path] path added to base url
   * @param {*} [body] request body
   * @param {RequestOptions} [options] custom options
   * @returns {Promise<Response>}
   */
  async post(path, body, options) {
    return this._fetch('POST', path, body, options);
  }

  /**
   * Performs PUT request to url path.
   *
   * @param {String} [path] path added to base url
   * @param {*} [body] request body
   * @param {RequestOptions} [options] custom options
   * @returns {Promise<Response>}
   */
  async put(path, body, options) {
    return this._fetch('PUT', path, body, options);
  }

  /**
   * Performs DELETE request to url path.
   *
   * @param {String} [path] path added to base url
   * @param {*} [body] request body
   * @param {RequestOptions} [options] custom options
   * @returns {Promise<Response>}
   */
  async del(path, body, options) {
    return this._fetch('DELETE', path, body, options);
  }

  /**
   * Performs HEAD request to url path.
   *
   * @param {String} [path] path added to base url
   * @param {*} [body] request body
   * @param {RequestOptions} [options] custom options
   * @returns {Promise<Response>}
   */
  async head(path, body, options) {
    return this._fetch('HEAD', path, body, options);
  }

  /**
   * Performs PATCH request to url path.
   *
   * @param {String} [path] path added to base url
   * @param {*} [body] request body
   * @param {RequestOptions} [options] custom options
   * @returns {Promise<Response>}
   */
  async patch(path, body, options) {
    return this._fetch('PATCH', path, body, options);
  }
  async _fetch(method, path, body, options) {
    const finalUrl = this._getFinalUrl(path);
    const finalOptions = this._getOptions(method, body, options);
    const response = await fetch(finalUrl, finalOptions);
    return this._handlers.handleResponse
      ? await this._handlers.handleResponse(response, finalOptions)
      : response;
  }
  _getFinalUrl(path) {
    if (isAbsoluteUrl(path)) {
      return path;
    } else if (path) {
      const baseUrl = this._baseUrl.replace(/\/+$/g, '');
      path = path.replace(/^\/+/g, '');
      return `${baseUrl}/${path}`;
    } else {
      return this._baseUrl;
    }
  }
  _getOptions(method, body, options) {
    const headers = Object.assign({}, this._defaultOptions.headers, options && options.headers);
    if (method !== 'GET' && this._handlers.handleRequestBody) {
      body = this._handlers.handleRequestBody(body);
    }
    return Object.assign({}, this._defaultOptions, options, {method, body, headers});
  }
}

function isAbsoluteUrl(str) {
  return /^(https?:)?\/\//i.test(str);
}
