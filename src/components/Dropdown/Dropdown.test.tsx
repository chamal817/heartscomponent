import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown } from "./Dropdown";

const items = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

describe("Dropdown", () => {
  it("renders placeholder when no value is selected", () => {
    render(<Dropdown items={items} placeholder="Pick one" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Pick one");
  });

  it("renders selected item label when value is provided", () => {
    render(<Dropdown items={items} value="banana" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Banana");
  });

  it("renders label when provided", () => {
    render(<Dropdown items={items} label="Fruit" />);
    expect(screen.getByText("Fruit")).toBeInTheDocument();
  });

  it("opens and closes menu on trigger click", () => {
    render(<Dropdown items={items} />);
    const trigger = screen.getByRole("combobox");

    fireEvent.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("calls onChange and closes menu when an item is selected", () => {
    const onChange = jest.fn();
    render(<Dropdown items={items} onChange={onChange} />);

    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Orange" }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("orange");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens with Enter key and closes with Escape key", () => {
    render(<Dropdown items={items} />);
    const trigger = screen.getByRole("combobox");

    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes when clicking outside", () => {
    render(
      <div>
        <Dropdown items={items} />
        <button>Outside</button>
      </div>
    );

    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});