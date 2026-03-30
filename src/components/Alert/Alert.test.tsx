import { render, screen, fireEvent } from "@testing-library/react";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders children content", () => {
    render(<Alert>Hello Alert</Alert>);
    expect(screen.getByText("Hello Alert")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    render(<Alert variant="success">Saved</Alert>);
    expect(screen.getByText("Saved").closest(".alert")).toHaveClass("alert-success");
  });

  it("does not show dismiss button by default", () => {
    render(<Alert>Info</Alert>);
    expect(screen.queryByRole("button", { name: /dismiss alert/i })).not.toBeInTheDocument();
  });

  it("shows dismiss button when dismissible=true", () => {
    render(<Alert dismissible>Closable</Alert>);
    expect(screen.getByRole("button", { name: /dismiss alert/i })).toBeInTheDocument();
  });

  it("dismisses alert and calls onDismiss", () => {
    const onDismiss = jest.fn();
    render(
      <Alert dismissible onDismiss={onDismiss}>
        Closable
      </Alert>
    );

    fireEvent.click(screen.getByRole("button", { name: /dismiss alert/i }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Closable")).not.toBeInTheDocument();
  });
});