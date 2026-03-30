import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children content", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Card title="Profile">Body</Card>);
    expect(screen.getByRole("heading", { name: "Profile" })).toBeInTheDocument();
  });

  it("does not render title when not provided", () => {
    render(<Card>Body</Card>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders image when image prop is provided", () => {
    render(<Card title="Product" image="/item.png">Body</Card>);
    const img = screen.getByRole("img", { name: "Product" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/item.png");
  });

  it("renders actions when provided", () => {
    render(<Card actions={<button>Buy</button>}>Body</Card>);
    expect(screen.getByRole("button", { name: "Buy" })).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Card className="custom-card">Body</Card>);
    expect(container.firstChild).toHaveClass("card");
    expect(container.firstChild).toHaveClass("custom-card");
  });
});