import { render, screen, fireEvent } from "@testing-library/react";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("renders switch and optional label", () => {
    render(<Toggle label="Enable notifications" />);
    expect(screen.getByRole("switch", { name: "Enable notifications" })).toBeInTheDocument();
    expect(screen.getByText("Enable notifications")).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Toggle />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("toggles internal state on click (uncontrolled)", () => {
    render(<Toggle label="Dark mode" />);
    const toggle = screen.getByRole("switch", { name: "Dark mode" });

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("toggles with keyboard Enter and Space", () => {
    render(<Toggle />);
    const toggle = screen.getByRole("switch");

    fireEvent.keyDown(toggle, { key: "Enter" });
    expect(toggle).toHaveAttribute("aria-checked", "true");

    fireEvent.keyDown(toggle, { key: " " });
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("respects controlled checked prop", () => {
    render(<Toggle checked />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("does not toggle when disabled", () => {
    render(<Toggle disabled />);
    const toggle = screen.getByRole("switch");

    expect(toggle).toHaveAttribute("tabindex", "-1");
    expect(toggle).toHaveAttribute("aria-checked", "false");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });
});