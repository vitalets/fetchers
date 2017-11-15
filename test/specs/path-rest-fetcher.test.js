
const baseUrl = 'http://test.com';
const path = 'foo';
const url = 'http://test.com/foo';
const headers = {
  Accept: 'application/json'
};

describe('PathRestFetcher', function () {
  before(function () {
    this.fetcher = new PathRestFetcher(baseUrl, {headers});
  });
  describe('REST methods to path', function () {
    it('GET', async function () {
      fetchMock.getOnce(url, {foo: 'bar'});
      const json = await this.fetcher.get(path).then(r => r.json());
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'GET', body: null, headers});
      assert.deepEqual(json, {foo: 'bar'});
    });
    it('POST', async function () {
      fetchMock.postOnce(url, {foo: 'bar'});
      const body = JSON.stringify({x: 1});
      const json = await this.fetcher.post(path, body).then(r => r.json());
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'POST', body, headers});
      assert.deepEqual(json, {foo: 'bar'});
    });
    it('PUT', async function () {
      fetchMock.putOnce(url, {foo: 'bar'});
      const body = JSON.stringify({x: 1});
      const json = await this.fetcher.put(path, body).then(r => r.json());
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'PUT', body, headers});
      assert.deepEqual(json, {foo: 'bar'});
    });
    it('DELETE', async function () {
      fetchMock.deleteOnce(url, {foo: 'bar'});
      const body = JSON.stringify({x: 1});
      const json = await this.fetcher.del(path, body).then(r => r.json());
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'DELETE', body, headers});
      assert.deepEqual(json, {foo: 'bar'});
    });
    it('HEAD', async function () {
      fetchMock.headOnce(url, {});
      const body = JSON.stringify({x: 1});
      const response = await this.fetcher.head(path, body);
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'HEAD', body, headers});
      assert.ok(response.ok);
    });
    it('PATCH', async function () {
      fetchMock.patchOnce(url, {foo: 'bar'});
      const body = JSON.stringify({x: 1});
      const json = await this.fetcher.patch(path, body).then(r => r.json());
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'PATCH', body, headers});
      assert.deepEqual(json, {foo: 'bar'});
    });
  });
  describe('REST methods to absolute url', function () {
    it('GET', async function () {
      fetchMock.getOnce(url, {foo: 'bar'});
      const json = await this.fetcher.get(url).then(r => r.json());
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'GET', body: null, headers});
      assert.deepEqual(json, {foo: 'bar'});
    });
    it('POST', async function () {
      fetchMock.postOnce(url, {foo: 'bar'});
      const body = JSON.stringify({x: 1});
      const json = await this.fetcher.post(url, body).then(r => r.json());
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'POST', body, headers});
      assert.deepEqual(json, {foo: 'bar'});
    });
    it('PUT', async function () {
      fetchMock.putOnce(url, {foo: 'bar'});
      const body = JSON.stringify({x: 1});
      const json = await this.fetcher.put(url, body).then(r => r.json());
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'PUT', body, headers});
      assert.deepEqual(json, {foo: 'bar'});
    });
    it('DELETE', async function () {
      fetchMock.deleteOnce(url, {foo: 'bar'});
      const body = JSON.stringify({x: 1});
      const json = await this.fetcher.del(url, body).then(r => r.json());
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'DELETE', body, headers});
      assert.deepEqual(json, {foo: 'bar'});
    });
    it('HEAD', async function () {
      fetchMock.headOnce(url, {});
      const body = JSON.stringify({x: 1});
      const response = await this.fetcher.head(url, body);
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'HEAD', body, headers});
      assert.ok(response.ok);
    });
    it('PATCH', async function () {
      fetchMock.patchOnce(url, {foo: 'bar'});
      const body = JSON.stringify({x: 1});
      const json = await this.fetcher.patch(url, body).then(r => r.json());
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'PATCH', body, headers});
      assert.deepEqual(json, {foo: 'bar'});
    });
  });
  describe('Defaults', function () {
    it('should overwrite default options', async function () {
      fetchMock.getOnce(url, {foo: 'bar'});
      await this.fetcher.get(path, {mode: 'cors'});
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'GET', mode: 'cors', body: null, headers});
    });
    it('should append to default headers', async function () {
      fetchMock.getOnce(url, {foo: 'bar'});
      await this.fetcher.get(path, {headers: {
        'X-Custom-Header': 'bar'
      }});
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'GET', body: null, headers: {
        'Accept': 'application/json',
        'X-Custom-Header': 'bar'
      }});
    });
    it('should overwrite default headers', async function () {
      fetchMock.getOnce(url, {foo: 'bar'});
      await this.fetcher.get(path, {headers: {
        'Accept': '*/*',
      }});
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'GET', body: null, headers: {
        'Accept': '*/*',
      }});
    });
  });
  describe('Join path with base url', function () {
    async function checkJoinUrl(baseUrl, path, finalUrl) {
      const fetcher = new PathRestFetcher(baseUrl);
      fetchMock.getOnce(finalUrl, {});
      await fetcher.get(path);
      assert.ok(fetchMock.called(finalUrl));
    }
    it('baseUrl no slash, path no slash', async function () {
      await checkJoinUrl('http://test.com', 'foo', 'http://test.com/foo');
    });
    it('baseUrl with slash, path no slash', async function () {
      await checkJoinUrl('http://test.com/', 'foo', 'http://test.com/foo');
    });
    it('baseUrl no slash, path with slash', async function () {
      await checkJoinUrl('http://test.com', '/foo', 'http://test.com/foo');
    });
    it('baseUrl with slash, path with slash', async function () {
      await checkJoinUrl('http://test.com/', '/foo', 'http://test.com/foo');
    });
    it('many slashes', async function () {
      await checkJoinUrl('http://test.com//', '///foo', 'http://test.com/foo');
    });
  });
});
