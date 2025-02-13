import { render } from "@testing-library/react";

import StepperBanner from "../components/StepperBanner/StepperBanner";

const stepperBannerData = {
  id: 1,
  __component: "widget.stepper-banner",
  bgColor: "#FFFFFF",
  bgPadding: "3% 5%",
  title: "LIPSTICK SHADE FINDER",
  subTitle: "Take the quiz to find the best lipstick for you!",
  buttonText: "LET'S GET STARTED",
  buttonPath: null,
  isComponentDiffer: false,
  items: [
    {
      id: 1,
      bgImageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.dev.shopper-stop.in/lipstickshadefinder_bd8f3fec26.png",
      bgImageUrlMobile:
        "https://s3.ap-south-1.amazonaws.com/images-cms.dev.shopper-stop.in/lipstickfinder_image_mobile_a23c45a331.png",
      title: "LIPSTICK SHADE FINDER",
      buttonText: null,
      buttonPath: null,
      quizText: null,
      quizPath: null,
      subTitle: "What are you looking for?",
      titleTextColor: null,
      btnTextColor: null,
      btnBgColor: null,
      subItems: [
        {
          id: 1,
          text: "Lipstick",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 2,
          text: "Stain",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 3,
          text: "Gloss",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 4,
          text: "Gloss",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 5,
          text: "Liner",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 6,
          text: "Clean Ingredients",
          textPath: "/home",
          categoryId: null,
        },
      ],
    },
    {
      id: 2,
      bgImageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.dev.shopper-stop.in/lipstickshadefinder_bd8f3fec26.png",
      bgImageUrlMobile:
        "https://s3.ap-south-1.amazonaws.com/images-cms.dev.shopper-stop.in/lipstickfinder_image_mobile_a23c45a331.png",
      title: "LIPSTICK SHADE FINDER",
      buttonText: null,
      buttonPath: null,
      quizText: null,
      quizPath: null,
      subTitle: " What lipstick texture do you prefer?",
      titleTextColor: null,
      btnTextColor: null,
      btnBgColor: null,
      subItems: [
        {
          id: 7,
          text: "Matte",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 8,
          text: "Creme",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 9,
          text: "Satin",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 10,
          text: "Glossy",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 11,
          text: "Sheer",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 12,
          text: "Metallic",
          textPath: "/home",
          categoryId: null,
        },
      ],
    },
    {
      id: 3,
      bgImageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.dev.shopper-stop.in/lipstickshadefinder_bd8f3fec26.png",
      bgImageUrlMobile:
        "https://s3.ap-south-1.amazonaws.com/images-cms.dev.shopper-stop.in/lipstickfinder_image_mobile_a23c45a331.png",
      title: "LIPSTICK SHADE FINDER",
      buttonText: null,
      buttonPath: null,
      quizText: null,
      quizPath: null,
      subTitle: "What formula do you prefer?",
      titleTextColor: null,
      btnTextColor: null,
      btnBgColor: null,
      subItems: [
        {
          id: 13,
          text: "Liquid",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 14,
          text: "Bullet",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 15,
          text: " Show me everything",
          textPath: "/home",
          categoryId: null,
        },
      ],
    },
    {
      id: 4,
      bgImageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.dev.shopper-stop.in/lipstickshadefinder_bd8f3fec26.png",
      bgImageUrlMobile:
        "https://s3.ap-south-1.amazonaws.com/images-cms.dev.shopper-stop.in/lipstickfinder_image_mobile_a23c45a331.png",
      title: "LIPSTICK SHADE FINDER",
      buttonText: null,
      buttonPath: null,
      quizText: null,
      quizPath: null,
      subTitle: "What benefits do you want in your lipstick",
      titleTextColor: null,
      btnTextColor: null,
      btnBgColor: null,
      subItems: [
        {
          id: 16,
          text: "Hydrating",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 17,
          text: "Long Lasting",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 18,
          text: "Sun Protection",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 19,
          text: "Oil Control",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 20,
          text: "Waterproof",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 21,
          text: "Show Me Everything",
          textPath: "/home",
          categoryId: null,
        },
      ],
    },
    {
      id: 5,
      bgImageUrl:
        "https://s3.ap-south-1.amazonaws.com/images-cms.dev.shopper-stop.in/lipstickshadefinder_bd8f3fec26.png",
      bgImageUrlMobile:
        "https://s3.ap-south-1.amazonaws.com/images-cms.dev.shopper-stop.in/lipstickfinder_image_mobile_a23c45a331.png",
      title: "LIPSTICK SHADE FINDER",
      buttonText: "SHOW RESULTS",
      buttonPath: "/home",
      quizText: " TAKE THE QUIZ AGAIN",
      quizPath: "/home",
      subTitle: "I am looking for something that is",
      titleTextColor: null,
      btnTextColor: null,
      btnBgColor: null,
      subItems: [
        {
          id: 22,
          text: " A Bestseller",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 23,
          text: "Trending Right Now",
          textPath: "/home",
          categoryId: null,
        },
        {
          id: 24,
          text: "Latest To The Edition",
          textPath: "/home",
          categoryId: null,
        },
      ],
    },
  ],
  position: 24,
};

describe("Stepper Banner ", () => {
  it("renders a stepper banner component", () => {
    const { container } = render(<StepperBanner {...stepperBannerData} />);
    expect(container).toMatchSnapshot();
  });
});
