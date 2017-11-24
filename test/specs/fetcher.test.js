
const url = 'http://test.com';
const headers = {
  Accept: 'application/json'
};

describe('Fetcher', function () {
  before(function () {
    this.fetcher = new Fetcher(url, {headers});
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
      const json = await this.fetcher.delete(body).then(r => r.json());
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
    it('overwrite default options', async function () {
      fetchMock.getOnce(url, {foo: 'bar'});
      await this.fetcher.get({mode: 'cors'});
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'GET', mode: 'cors', body: null, headers});
    });
    it('append to default headers', async function () {
      fetchMock.getOnce(url, {foo: 'bar'});
      await this.fetcher.get({headers: {
        'X-Custom-Header': 'bar'
      }});
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'GET', body: null, headers: {
        'Accept': 'application/json',
        'X-Custom-Header': 'bar'
      }});
    });
    it('overwrite default headers', async function () {
      fetchMock.getOnce(url, {foo: 'bar'});
      await this.fetcher.get({headers: {
        'Accept': '*/*',
      }});
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'GET', body: null, headers: {
        'Accept': '*/*',
      }});
    });
  });
  describe('Handlers', function () {
    it('handleRequestBody', async function () {
      const fetcher = new Fetcher(url, {}, {
        handleRequestBody: body => JSON.stringify(body)
      });
      fetchMock.postOnce(url, {});
      const body = {x: 1};
      const response = await fetcher.post(body);
      assert.deepEqual(fetchMock.lastOptions(url), {method: 'POST', body: JSON.stringify(body), headers: {}});
      assert.ok(response.ok);
    });
    it('handleResponse', async function () {
      const fetcher = new Fetcher(url, {}, {
        handleResponse: async response => await response.json()
      });
      fetchMock.getOnce(url, {foo: 'bar'});
      const json = await fetcher.get();
      assert.deepEqual(json, {foo: 'bar'});
    });
  });
});
