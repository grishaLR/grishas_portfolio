import "@testing-library/jest-dom/jest-globals";
import { render, screen, waitFor } from "@testing-library/react";
import { Typewriter, TypewriterProps } from "@components";
import { HALF_SECOND_TIMEOUT, MOCK_TEST_STRING } from "@consts";

describe("Typewriter Component", () => {
  const renderComponent = (props: TypewriterProps) => {
    render(<Typewriter {...props} />);
  };

  test("renders the initial empty list", () => {
    renderComponent({ text: "MOCK_TEST_STRING", delay: HALF_SECOND_TIMEOUT });
    expect(screen.getByRole("list")).toBeEmptyDOMElement();
  });

  test("renders text with a delay", () => {
    renderComponent({ text: "MOCK_TEST_STRING", delay: HALF_SECOND_TIMEOUT });

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
