import { render } from "@testing-library/react";
import { ColorType } from "../utility/ColorType";
import BlogParagraphQuote from "../components/BlogParagraph/BlogParagraphQuote";
const color: ColorType = "#0000";

const blogParagraphQuoteData = {
  id: 2,
  __component: "blog-widget.blog-quote",
  text: '"Makeup is about balance. When the eye makes a statement, the lips should be quiet."',
  bgColor: "#FFFFFF",
  bgPadding: "0 15%",
  display: null,
  position: 6,
};

describe("Blog Paragraph Quote", () => {
  it("renders a blog paragraph quote component", () => {
    const { container } = render(
      <BlogParagraphQuote {...blogParagraphQuoteData} />
    );
    expect(container).toMatchSnapshot();
  });
});


