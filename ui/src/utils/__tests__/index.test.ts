import { playSound } from '@utils';

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
