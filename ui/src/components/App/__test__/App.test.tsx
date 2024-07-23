import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/jest-globals";
import { useDataFetching } from "@hooks";
import { App } from "@components";
import {
  DEFAULT_TEXT,
  HALF_SECOND_TIMEOUT,
  LOADING_TEXT,
  ERROR_TEXT,
  MOCK_TEST_STRING,
} from "@consts";
import { RequestStatus } from "@enums";

jest.mock("@hooks", () => ({
  useDataFetching: jest.fn(),
}));

describe("<App/>", () => {
  test("renders loading state", () => {
    (useDataFetching as jest.Mock).mockReturnValue({
      requestStatus: RequestStatus.PENDING,
      content: "",
    });

    render(<App />);
    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();
  });

  test("renders error state", () => {
    (useDataFetching as jest.Mock).mockReturnValue({
      requestStatus: RequestStatus.ERROR,
      content: "",
    });

    render(<App />);
    expect(screen.getByText(ERROR_TEXT)).toBeInTheDocument();
  });

  test("renders default state", () => {
    (useDataFetching as jest.Mock).mockReturnValue({
      requestStatus: null,
      content: "",
    });

    render(<App />);
    expect(screen.getByText(DEFAULT_TEXT)).toBeInTheDocument();
  });

  test("renders success state", async () => {
    (useDataFetching as jest.Mock).mockReturnValue({
      requestStatus: RequestStatus.SUCCESS,
      content: MOCK_TEST_STRING,
    });

    render(<App />);

    Array.from(MOCK_TEST_STRING).forEach(async (letter, index) => {
      await waitFor(
        () =>
          expect(
            screen.getByRole("listitem", { name: letter }),
          ).toBeInTheDocument(),
        { timeout: HALF_SECOND_TIMEOUT * index + 1 },
      );
    });
  });
});
