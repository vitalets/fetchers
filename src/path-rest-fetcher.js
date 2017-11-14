/**
 * Performs REST requests to base url with different paths
 */
export default class PathRestFetcher {
  constructor(baseUrl, defaultOptions = {}) {
    this._baseUrl = baseUrl;
    this._defaultOptions = defaultOptions;
  }
  async get(path, options) {
    return this._fetch('GET', path, null, options);
  }
  async post(path, body, options) {
    return this._fetch('POST', path, body, options);
  }
  async put(path, body, options) {
    return this._fetch('PUT', path, body, options);
  }
  async del(path, body, options) {
    return this._fetch('DELETE', path, body, options);
  }
  async head(path, body, options) {
    return this._fetch('HEAD', path, body, options);
  }
  async _fetch(method, path, body, options) {
    const finalUrl = this._getFinalUrl(path);
    const finalOptions = this._getOptions(method, body, options);
    return await fetch(finalUrl, finalOptions);
  }
  _getFinalUrl(path) {
    return path ? `${this._baseUrl}${path}` : this._baseUrl;
  }
  _getOptions(method, body, options = {}) {
    const headers = Object.assign({}, this._defaultOptions.headers, options.headers);
    return Object.assign({}, this._defaultOptions, options, {method, body, headers});
  }
}
