
const URL = 'http://test.com';

describe('RestFetcher', function () {
  beforeEach(function () {
    this.fetcher = new RestFetcher(URL);
  });
  it('should GET json', async function () {
    fetchMock.getOnce(URL, {hello: 'world'});
    const json = await this.fetcher.get().then(r => r.json());
    assert.deepEqual(json, {hello: 'world'});
  });
});
