import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addMigraineType } from '@services';

describe('addMigraineType', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should return data when the request is successful', async () => {
    const name = 'Test Migraine Type';
    const responseData = { id: 1, name };

    mock.onPost('http://localhost:3000/migraine-types', { name }).reply(200, responseData);

    const result = await addMigraineType(name);
    expect(result).toEqual(responseData);
  });

  it('should log an error and throw an error when the request fails', async () => {
    const name = 'Test Migraine Type';
    const errorMessage = 'Request failed with status code 500';

    mock.onPost('http://localhost:3000/migraine-types', { name }).reply(500);

    console.error = jest.fn();

    await expect(addMigraineType(name)).rejects.toThrow(errorMessage);
    expect(console.error).toHaveBeenCalledWith('Error fetching FPL data:', expect.any(Error));
  });
});
