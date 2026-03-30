import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  it("renders input with placeholder", () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it("renders label and associates it with input", () => {
    render(<Input label="Email Address" />);
    const input = screen.getByLabelText("Email Address");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "input-email-address");
  });

  it("shows required marker and required attribute", () => {
    render(<Input label="Name" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeRequired();
  });

  it("uses custom type", () => {
    render(<Input type="password" placeholder="Password" />);
    expect(screen.getByPlaceholderText("Password")).toHaveAttribute("type", "password");
  });

  it("calls onChange when typing", () => {
    const onChange = jest.fn();
    render(<Input placeholder="Username" onChange={onChange} />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "john" },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("calls onFocus and onBlur", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    render(<Input placeholder="Focus me" onFocus={onFocus} onBlur={onBlur} />);
    const input = screen.getByPlaceholderText("Focus me");

    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("does not show error text when showError is false", () => {
    render(<Input label="Email" error="Email is required" />);
    const input = screen.getByLabelText("Email");

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(input).not.toHaveClass("input-error");
    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(input).not.toHaveAttribute("aria-describedby");
  });

  it("shows error text and accessibility attributes when showError is true", () => {
    render(<Input label="Email" error="Email is required" showError />);
    const input = screen.getByLabelText("Email");
    const error = screen.getByRole("alert");

    expect(error).toHaveTextContent("Email is required");
    expect(input).toHaveClass("input-error");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "input-email-error");
    expect(error).toHaveAttribute("id", "input-email-error");
  });
});