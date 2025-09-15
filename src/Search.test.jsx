import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./SearchBox";

beforeAll(() => {
  global.fetch = vi.fn();
});

afterAll(() => {
  global.fetch.mockRestore();
});

test("Search Component shows results", async () => {
  const mockUpdateInfo = vi.fn();

  // Mock successful fetch
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

  // Wait for updateInfo to be called
  await vi.waitFor(() => expect(mockUpdateInfo).toHaveBeenCalled());
});

test("Search Component shows error for invalid city", async () => {
  const mockUpdateInfo = vi.fn();

  fetch.mockResolvedValueOnce({ ok: false, status: 404 });

  render(<Search updateInfo={mockUpdateInfo} />);

  fireEvent.change(screen.getByLabelText(/city/i), { target: { value: "InvalidCity" } });
  fireEvent.click(screen.getByRole("button", { name: /search/i }));

  await vi.waitFor(() => expect(screen.getByText(/No such City Found/i)).toBeInTheDocument());
});
