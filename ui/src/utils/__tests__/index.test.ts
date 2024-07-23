import { playSound, serviceQueryFactory } from '@utils';

describe('playSound', () => {
  let playMock: jest.Mock;

  beforeEach(() => {
    playMock = jest.fn().mockResolvedValue(undefined);
    window.Audio = jest.fn().mockImplementation(() => ({
      play: playMock,
    }));
  });

  it('should play sound when given a valid URL', async () => {
    const url = 'valid-url.mp3';
    playSound(url);
    expect(window.Audio).toHaveBeenCalledWith(url);
    expect(playMock).toHaveBeenCalled();
  });

  it('should log an error when playing sound fails', async () => {
    const error = new Error('Failed to play sound');
    playMock.mockRejectedValueOnce(error);
    console.error = jest.fn();

    const url = 'invalid-url.mp3';
    playSound(url);
    expect(playMock).toHaveBeenCalled();
    await Promise.resolve(); // Wait for the promise to resolve
    expect(console.error).toHaveBeenCalledWith('Failed to play sound:', error);
  });
});

describe('serviceQueryFactory', () => {
  it('should return data when the service resolves successfully', async () => {
    const data = { key: 'value' };
    const mockService = jest.fn().mockResolvedValue(data);
    const queryFn = serviceQueryFactory(mockService);

    const result = await queryFn('param1', 'param2');
    expect(mockService).toHaveBeenCalledWith('param1', 'param2');
    expect(result).toEqual({ data });
  });

  it('should return error when the service rejects', async () => {
    const error = new Error('Service error');
    const mockService = jest.fn().mockRejectedValue(error);
    const queryFn = serviceQueryFactory(mockService);

    const result = await queryFn('param1', 'param2');
    expect(mockService).toHaveBeenCalledWith('param1', 'param2');
    expect(result).toEqual({
      error: {
        status: -1,
        error: 'Unknown',
      },
    });
  });

  it('should return detailed error information if available', async () => {
    const error = {
      response: {
        status: 404,
        data: { message: 'Not Found' },
      },
    };
    const mockService = jest.fn().mockRejectedValue(error);
    const queryFn = serviceQueryFactory(mockService);

    const result = await queryFn('param1', 'param2');
    expect(mockService).toHaveBeenCalledWith('param1', 'param2');
    expect(result).toEqual({
      error: {
        status: 404,
        error: 'Not Found',
      },
    });
  });
});
