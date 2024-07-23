import { renderHook, act, waitFor } from '@testing-library/react';
import { useDataFetching } from '@hooks';
import { fetchFPLData } from '@services';

import { DORMANT_TIMEOUT } from '@consts';
import { RequestStatus } from '@enums';

jest.mock('@services', () => ({
  fetchFlag: jest.fn(),
  fetchInitialHtml: jest.fn(),
}));

describe('useDataFetching', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should set request status to PENDING initially', async () => {
    (fetchFPLData as jest.Mock).mockResolvedValue('<html></html>');

    const { result } = renderHook(() => useDataFetching());

    await waitFor(() =>
      expect(result.current).toMatchObject({
        requestStatus: RequestStatus.PENDING,
        content: '',
      })
    );
  });

  test('should set request status to SUCCESS and update content on successful fetch', async () => {
    (fetchFPLData as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useDataFetching());

    await waitFor(() => expect(result.current.requestStatus).toBe(RequestStatus.SUCCESS));

    expect(result.current.content).toBe([]);
  });

  test('should set request status to ERROR on fetch failure', async () => {
    const mockError = new Error('Mock Error');

    (fetchFPLData as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useDataFetching());

    await waitFor(() => expect(result.current.requestStatus).toBe(RequestStatus.ERROR));

    expect(result.current.content).toBe('');
  });

  test('should set request status back to DORMANT after timeout', async () => {
    jest.useFakeTimers();

    (fetchFPLData as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useDataFetching());

    await waitFor(() => expect(result.current.requestStatus).toBe(RequestStatus.SUCCESS));

    act(() => {
      jest.advanceTimersByTime(DORMANT_TIMEOUT);
    });

    await waitFor(() => expect(result.current.requestStatus).toBe(RequestStatus.DORMANT));
  });
});
