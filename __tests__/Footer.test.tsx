import { render } from "@testing-library/react";
import Footer from "../components/Footer/Footer";

const data = {
  id: 2,
  __component: "Footer",
  bgColor: "#E5E5E5",
  bgPadding: "2% 5%",
  items: [
    {
      id: 2,
      title: "About Us",
      subItems: [
        {
          id: 3,
          path: "#",
          title: "Who Are We?",
        },
        {
          id: 4,
          path: "#",
          title: "Press",
        },
        {
          id: 5,
          path: "#",
          title: "First Citizen",
        },
        {
          id: 6,
          path: "#",
          title: "Testimonials",
        },
        {
          id: 7,
          path: "#",
          title: "Refer & Earn",
        },
        {
          id: 8,
          path: "#",
          title: "Careers",
        },
        {
          id: 9,
          path: "#",
          title: "CSR",
        },
        {
          id: 10,
          path: "#",
          title: "Sell on SSBeauty",
        },
        {
          id: 11,
          path: "#",
          title: "Responsible Disclosure",
        },
        {
          id: 12,
          path: "#",
          title: "Investor Relations",
        },
      ],
    },
    {
      id: 3,
      title: "Top Categories",
      subItems: [
        {
          id: 13,
          path: "#",
          title: "Makeup",
        },
        {
          id: 14,
          path: "#",
          title: "Skin",
        },
        {
          id: 15,
          path: "#",
          title: "Hair",
        },
        {
          id: 16,
          path: "#",
          title: "Personal Care",
        },
        {
          id: 17,
          path: "#",
          title: "Fragrance",
        },
        {
          id: 18,
          path: "#",
          title: "Beauty & Hair Accessories",
        },
        {
          id: 19,
          path: "#",
          title: "Men's Grooming",
        },
        {
          id: 20,
          path: "#",
          title: "Natural",
        },
        {
          id: 21,
          path: "#",
          title: "Home Body Beauty",
        },
        {
          id: 22,
          path: "#",
          title: "Luxury",
        },
        {
          id: 23,
          path: "#",
          title: "Gifts",
        },
        {
          id: 24,
          path: "#",
          title: "Offers",
        },
        {
          id: 25,
          path: "#",
          title: "Brands",
        },
      ],
    },
    {
      id: 4,
      title: "Quick Links",
      subItems: [
        {
          id: 26,
          path: "#",
          title: "Buying Guides",
        },
        {
          id: 27,
          path: "#",
          title: "Offer Zone",
        },
        {
          id: 28,
          path: "#",
          title: "New Launches",
        },
        {
          id: 29,
          path: "#",
          title: "Program",
        },
        {
          id: 30,
          path: "#",
          title: "Site Map",
        },
        {
          id: 31,
          path: "#",
          title: "SEO",
        },
        {
          id: 32,
          path: "#",
          title: "First Citizen",
        },
      ],
    },
    {
      id: 5,
      title: "Help",
      subItems: [
        {
          id: 33,
          path: "#",
          title: "FAQ's",
        },
        {
          id: 34,
          path: "#",
          title: "Cancellation & Return",
        },
        {
          id: 35,
          path: "#",
          title: "Shipping & Delivery",
        },
        {
          id: 36,
          path: "#",
          title: "Ask an Expert",
        },
        {
          id: 37,
          path: "#",
          title: "Buying Guide",
        },
        {
          id: 38,
          path: "#",
          title: "Contact Us",
        },
        {
          id: 39,
          path: "#",
          title: "Order Related",
        },
        {
          id: 40,
          path: "#",
          title: "Store Locator",
        },
      ],
    },
    {
      id: 6,
      title: "Policies",
      subItems: [
        {
          id: 41,
          path: "#",
          title: "Terms of Use",
        },
        {
          id: 42,
          path: "#",
          title: "Exchange & Return",
        },
        {
          id: 43,
          path: "#",
          title: "Privacy Policy",
        },
        {
          id: 44,
          path: "#",
          title: "Delivery Policy",
        },
      ],
    },
    {
      id: 7,
      title: "Inspire Me",
      subItems: [
        {
          id: 45,
          path: "#",
          title: "Articles & Blogs",
        },
        {
          id: 46,
          path: "#",
          title: "Watch & Buy",
        },
        {
          id: 47,
          path: "#",
          title: "Look Board",
        },
      ],
    },
  ],
};
describe("Home", () => {
  it("renders a footer", () => {
    render(<Footer {...data} />);
  });
});
