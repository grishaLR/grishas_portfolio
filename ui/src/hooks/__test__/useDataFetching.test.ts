import { renderHook, act, waitFor } from "@testing-library/react";
import { useDataFetching } from "@hooks";
import { fetchFlag, fetchInitialHtml } from "@services";

import {
  DORMANT_TIMEOUT,
  MOCK_DEFAULT_URL,
  MOCK_VALID_TEST_HTML_STRING,
  MOCK_FLAG,
} from "@consts";
import { RequestStatus } from "@enums";

jest.mock("@services", () => ({
  fetchFlag: jest.fn(),
  fetchInitialHtml: jest.fn(),
}));

describe("useDataFetching", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should set request status to PENDING initially", async () => {
    (fetchInitialHtml as jest.Mock).mockResolvedValue("<html></html>");

    const { result } = renderHook(() => useDataFetching(MOCK_DEFAULT_URL));

    await waitFor(() =>
      expect(result.current).toMatchObject({
        requestStatus: RequestStatus.PENDING,
        content: "",
      }),
    );
  });

  test("should set request status to SUCCESS and update content on successful fetch", async () => {
    (fetchFlag as jest.Mock).mockResolvedValue(MOCK_FLAG);

    const { result } = renderHook(() => useDataFetching(MOCK_DEFAULT_URL));

    await waitFor(() =>
      expect(result.current.requestStatus).toBe(RequestStatus.SUCCESS),
    );

    expect(result.current.content).toBe(MOCK_FLAG);
  });

  test("should set request status to ERROR on fetch failure", async () => {
    const mockError = new Error("Mock Error");

    (fetchInitialHtml as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useDataFetching(MOCK_DEFAULT_URL));

    await waitFor(() =>
      expect(result.current.requestStatus).toBe(RequestStatus.ERROR),
    );

    expect(result.current.content).toBe("");
  });

  test("should set request status back to DORMANT after timeout", async () => {
    jest.useFakeTimers();

    (fetchInitialHtml as jest.Mock).mockResolvedValue(
      MOCK_VALID_TEST_HTML_STRING,
    );

    const { result } = renderHook(() => useDataFetching(MOCK_DEFAULT_URL));

    await waitFor(() =>
      expect(result.current.requestStatus).toBe(RequestStatus.SUCCESS),
    );

    act(() => {
      jest.advanceTimersByTime(DORMANT_TIMEOUT);
    });

    await waitFor(() =>
      expect(result.current.requestStatus).toBe(RequestStatus.DORMANT),
    );
  });
});
