import { render } from "@testing-library/react";
import SortFilterBar from "../../HOC/SortFilterBar/SortFilterBar";

const data = {};

describe("Sort Filter Bar", () => {
  it("renders a sort filter bar", () => {
    render(<SortFilterBar {...data} />);
  });
});
