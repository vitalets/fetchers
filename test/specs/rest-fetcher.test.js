
const url = 'http://test.com';
const headers = {
  Accept: 'application/json'
};

describe('RestFetcher', function () {
  before(function () {
    this.fetcher = new RestFetcher(url, {headers});
  });
  describe('REST methods', function () {
    it('GET', async function () {
      fetchMock.getOnce(url, {foo: 'bar'});
      const json = await this.fetcher.get().then(r => r.json());
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'GET', body: null, headers});
      assert.deepEqual(json, {foo: 'bar'});
    });
    it('POST', async function () {
      fetchMock.postOnce(url, {foo: 'bar'});
      const body = JSON.stringify({x: 1});
      const json = await this.fetcher.post(body).then(r => r.json());
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'POST', body, headers});
      assert.deepEqual(json, {foo: 'bar'});
    });
    it('PUT', async function () {
      fetchMock.putOnce(url, {foo: 'bar'});
      const body = JSON.stringify({x: 1});
      const json = await this.fetcher.put(body).then(r => r.json());
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'PUT', body, headers});
      assert.deepEqual(json, {foo: 'bar'});
    });
    it('DELETE', async function () {
      fetchMock.deleteOnce(url, {foo: 'bar'});
      const body = JSON.stringify({x: 1});
      const json = await this.fetcher.del(body).then(r => r.json());
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'DELETE', body, headers});
      assert.deepEqual(json, {foo: 'bar'});
    });
    it('HEAD', async function () {
      fetchMock.headOnce(url, {});
      const body = JSON.stringify({x: 1});
      const response = await this.fetcher.head(body);
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'HEAD', body, headers});
      assert.ok(response.ok);
    });
    it('PATCH', async function () {
      fetchMock.patchOnce(url, {foo: 'bar'});
      const body = JSON.stringify({x: 1});
      const json = await this.fetcher.patch(body).then(r => r.json());
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'PATCH', body, headers});
      assert.deepEqual(json, {foo: 'bar'});
    });
  });
  describe('Defaults', function () {
    it('should overwrite default options', async function () {
      fetchMock.getOnce(url, {foo: 'bar'});
      await this.fetcher.get({mode: 'cors'});
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'GET', mode: 'cors', body: null, headers});
    });
    it('should append to default headers', async function () {
      fetchMock.getOnce(url, {foo: 'bar'});
      await this.fetcher.get({headers: {
        'X-Custom-Header': 'bar'
      }});
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'GET', body: null, headers: {
        'Accept': 'application/json',
        'X-Custom-Header': 'bar'
      }});
    });
    it('should overwrite default headers', async function () {
      fetchMock.getOnce(url, {foo: 'bar'});
      await this.fetcher.get({headers: {
        'Accept': '*/*',
      }});
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'GET', body: null, headers: {
        'Accept': '*/*',
      }});
    });
  });
});
