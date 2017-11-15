/**
 * Performs REST requests to single url
 */
import PathRestFetcher from './path-rest-fetcher';

export default class RestFetcher extends PathRestFetcher {
  async get(options) {
    return await super.get(null, options);
  }
  async post(body, options) {
    return await super.post(null, body, options);
  }
  async put(body, options) {
    return await super.put(null, body, options);
  }
  async del(body, options) {
    return await super.del(null, body, options);
  }
  async head(body, options) {
    return await super.head(null, body, options);
  }
  async patch(body, options) {
    return await super.patch(null, body, options);
  }
}
