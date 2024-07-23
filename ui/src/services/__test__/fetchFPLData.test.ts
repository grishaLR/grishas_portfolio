import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchFPLData } from '@services'; // Adjust the import path
import { BASE_URL } from '@consts'; // Adjust the import path

describe('fetchFPLData', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should return data when the request is successful', async () => {
    const responseData = { key: 'value' };

    mock.onGet(`${BASE_URL}/fpl`).reply(200, responseData);

    const result = await fetchFPLData();
    expect(result).toEqual(responseData);
  });

  it('should log an error and throw an error when the request fails', async () => {
    const errorMessage = 'Request failed with status code 500';

    mock.onGet(`${BASE_URL}/fpl`).reply(500);

    console.error = jest.fn();

    await expect(fetchFPLData()).rejects.toThrow(errorMessage);
    expect(console.error).toHaveBeenCalledWith('Error fetching FPL data:', expect.any(Error));
  });
});
