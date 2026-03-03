import TechBadge from "@/components/TechBadge";
import { render, screen } from "@testing-library/react";

describe("TechBadge", () => {
  it("should render all tech name", () => {
    render(<TechBadge tech="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });
});
