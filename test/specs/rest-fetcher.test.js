
const url = 'http://test.com';
const headers = {
  Accept: 'application/json'
};

describe('RestFetcher', function () {
  before(function () {
    this.fetcher = new RestFetcher(url, {headers});
  });
  it('should GET json', async function () {
    fetchMock.getOnce(url, {foo: 'bar'});
    const json = await this.fetcher.get().then(r => r.json());
    assert.deepEqual(fetchMock.lastOptions(url), {method: 'GET', body: null, headers});
    assert.deepEqual(json, {foo: 'bar'});
  });
  it('should POST json', async function () {
    fetchMock.postOnce(url, {foo: 'bar'});
    const body = JSON.stringify({x: 1});
    const json = await this.fetcher.post(body).then(r => r.json());
    assert.deepEqual(fetchMock.lastOptions(url), {method: 'POST', body, headers});
    assert.deepEqual(json, {foo: 'bar'});
  });
});
