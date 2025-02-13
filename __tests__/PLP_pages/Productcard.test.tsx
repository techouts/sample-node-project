import { render } from "@testing-library/react";
import ProductCard from "../../HOC/ProductCard/ProductCard";

const data = {
  name: "Sugar Seal The Show Lip Primer 1.4 gm-Value Set-blue",
  type_id: "simple",
  media_gallery: [],
  sku: "8906090496-Value Set-blue",
  short_description: {
    html: "<p>High-drama volume and curl in the blink of an eye. The jumbo brush fans and pushes lashes up and out, while the rich, carbon-black formula helps thickens, curls, and lifts lashes for an ultimate eye-opening effect.</p>",
  },
  review_count: 0,
  rating_summary: 0,
  reviews: {
    items: [],
    page_info: {
      current_page: 1,
      page_size: 3,
      total_pages: 0,
    },
  },
  formulation: 21,
  pro_type: 199,
  is_featured_checkbox: 1,
  gift_message_available: "0",
  is_express_deliverable_checkbox: 1,
  is_best_seller_checkbox: 1,
  image: {
    url: "https://magento.dev.shopper-stop.in:3443/static/version1656930468/frontend/Magento/luma/en_US/Magento_Catalog/images/product/placeholder/image.jpg",
  },
  price_range: {
    minimum_price: {
      regular_price: {
        value: 899,
        currency: "INR",
      },
      final_price: {
        value: 899,
      },
      discount: {
        amount_off: 0,
        percent_off: 0,
      },
    },
  },
};
describe("Product Card", () => {
  it("renders a product card", () => {
    render(<ProductCard {...data} />);
  });
});
