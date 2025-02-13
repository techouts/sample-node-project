import { render } from "@testing-library/react";
import HorizontalSpacer from "../components/HorizontalSpacer/HorizontalSpacer";

import { ColorType } from "../utility/ColorType";
const color: ColorType = "#0000";

const horizontalSpacerData = {
  id: 10,
  __component: "widget.horizontal-spacer",
  bgColor: color,
  height: "15px",
  display: "web",
  position: 24,
};

describe("Horizontal Spacer", () => {
  it("renders a horizontal spacer component", () => {
    const { container } = render(
      <HorizontalSpacer {...horizontalSpacerData} />
    );
    expect(container).toMatchSnapshot();
  });
});
