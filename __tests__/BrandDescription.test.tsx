import { render } from "@testing-library/react";

import { ColorType } from "../utility/ColorType";
import BrandDescription from "../components/BrandDescription/BrandDescription";
const color: ColorType = "#0000";

const brandDescriptionData = {
  id: 10,
  __component: "widget.brand-description",
  bgColor: color,
  height: "15px",
  display: "web",
  position: 24,
  bgPadding: "",
  btnText: "",
  btnTextColor: color,
  backgroundColor: color,
  path: "",
  btnPosition: "",
  fontSize: "",
  lineHeight: "",
  mobileFontSize: "",
};

describe("Brand Description", () => {
  it("renders a brand description component", () => {
    const { container } = render(
      <BrandDescription {...brandDescriptionData} />
    );
    expect(container).toMatchSnapshot();
  });
});
