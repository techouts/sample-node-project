import { render } from "@testing-library/react";

import TabsUIRenderComponent from "../components/Filters/TabsUI";

const tabsUIRenderData = {
  id: 5,
  __component: "widget.tabs-component",
  bgColor: "#FFFFFF",
  bgPadding: "0%",
  title: null,
  isComponentDiffer: true,
  ComponentName: "Stores",
  display: null,
  items: [
    {
      id: 17,
      text: "STORES",
      textPath: "/miscs/store",
      isTabActive: true,
      textbgColor: null,
      textColor: null,
    },
    {
      id: 18,
      text: "BOOK A CONSULTATION",
      textPath: "/miscs/consultation",
      isTabActive: false,
      textbgColor: null,
      textColor: null,
    },
    {
      id: 19,
      text: "EVENTS",
      textPath: "/miscs/event",
      isTabActive: false,
      textbgColor: null,
      textColor: null,
    },
  ],
  position: 2,
};

describe("Tabs UI Render Component ", () => {
  it("renders a tabs ui render  component", () => {
    const { container } = render(
      <TabsUIRenderComponent {...tabsUIRenderData} />
    );
    expect(container).toMatchSnapshot();
  });
});
