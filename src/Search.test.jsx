import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "./SearchBox";

describe("Search Component", () => {
  it("renders input and button", () => {
    render(<Search updateInfo={() => {}} />);
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("shows error for invalid city", async () => {
    render(<Search updateInfo={() => {}} />);
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: "invalidcity" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText(/No such City Found/i)).toBeInTheDocument();
    });
  });
});
