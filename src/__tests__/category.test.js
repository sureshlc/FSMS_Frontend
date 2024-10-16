import { render, screen } from "@testing-library/react";
import LeftBar from "../components/sidebar/LeftBar";
import EmptyComponent from "../Pages/home/EmptyComponent";

describe("Category", () => {
  it("EmptyComponent rendering correctly", () => {
    render(<EmptyComponent />);
    const textElement = screen.getByText("/Add home page here/i");
    expect(textElement).toBeInTheDocument();
  });
});
