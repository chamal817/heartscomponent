import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "./Tabs";

const tabs = [
  { label: "Overview", content: <div>Overview Content</div> },
  { label: "Details", content: <div>Details Content</div> },
  { label: "Settings", content: <div>Settings Content</div> },
];

describe("Tabs", () => {
  it("renders tab buttons and tablist", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Details" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Settings" })).toBeInTheDocument();
  });

  it("shows first tab content by default", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Overview Content");
  });

  it("uses defaultIndex to set active tab", () => {
    render(<Tabs tabs={tabs} defaultIndex={1} />);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Details Content");
    expect(screen.getByRole("tab", { name: "Details" })).toHaveAttribute("aria-selected", "true");
  });

  it("changes active tab and content on click", () => {
    render(<Tabs tabs={tabs} />);
    fireEvent.click(screen.getByRole("tab", { name: "Settings" }));

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Settings Content");
    expect(screen.getByRole("tab", { name: "Settings" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "false");
  });

  it("calls onChange when tab is clicked", () => {
    const onChange = jest.fn();
    render(<Tabs tabs={tabs} onChange={onChange} />);

    fireEvent.click(screen.getByRole("tab", { name: "Details" }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("renders nothing in panel when tabs array is empty", () => {
    render(<Tabs tabs={[]} />);
    expect(screen.getByRole("tabpanel")).toBeEmptyDOMElement();
  });
});