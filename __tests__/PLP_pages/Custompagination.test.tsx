import { render } from "@testing-library/react";
import CustomPagination from "../../HOC/CustomPagination/CustomPagination";

const data = {
  data: {
    products: {
      total_count: 20,
      page_info: {
        page_size: 20,
        current_page: 1,
      },
    },
  },
};

describe("Custom Pagination", () => {
  it("renders a custom pagination", () => {
    render(<CustomPagination {...data} />);
  });
});
