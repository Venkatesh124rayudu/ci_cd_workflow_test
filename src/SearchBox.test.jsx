import React from "react";  // 👈 add this
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "./SearchBox";
import { vi } from "vitest";



beforeAll(() => {
  global.fetch = vi.fn();
});

afterAll(() => {
  global.fetch.mockRestore();
});

test("renders input and button", () => {
  render(<Search updateInfo={() => {}} />);
  expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
});

test("shows weather info on valid city", async () => {
  const mockUpdateInfo = vi.fn();

  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      weather: [{ description: "Sunny" }],
      main: { temp: 25, temp_max: 27, temp_min: 23, pressure: 1012, humidity: 50 }
    }),
  });

  render(<Search updateInfo={mockUpdateInfo} />);

  fireEvent.change(screen.getByLabelText(/city/i), { target: { value: "Paris" } });
  fireEvent.click(screen.getByRole("button", { name: /search/i }));

  await waitFor(() => expect(mockUpdateInfo).toHaveBeenCalled());
});

test("shows error for invalid city", async () => {
  const mockUpdateInfo = vi.fn();

  fetch.mockResolvedValueOnce({ ok: false, status: 404 });

  render(<Search updateInfo={mockUpdateInfo} />);

  fireEvent.change(screen.getByLabelText(/city/i), { target: { value: "InvalidCity" } });
  fireEvent.click(screen.getByRole("button", { name: /search/i }));

  await waitFor(() => expect(screen.getByText(/No such City Found/i)).toBeInTheDocument());
});
