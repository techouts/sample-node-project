import { render } from "@testing-library/react";

import { ColorType } from "../utility/ColorType";
import FirstCitizenQuestions from "../components/FirstCitizenFAQ/FirstCitizenQuestions";

const color: ColorType = "#0000";

const firstCitizenQuestionsData = {
  id: 20,
  __component: "widget.accordion",
  bgColor: "#FFFFFF",
  bgPadding: "0%",
  title: "FAQs",
  titlePath: null,
  items: [
    {
      id: 67,
      title: "How Do I Add A GIft Card  into my SS Beauty Wallet ?",
      titlePath: null,
      subTitle: "How Do I Add A GIft Card  into my SS Beauty Wallet ?",
      description:
        "Go to My Account -> My Wallet  -> Select Gift Card. Enter your 16 Digit Gift Card number and 6-digit Pin Number. ->Click Add balance To Account - >The balance of the Gift Card will be added to your SS Beatuy Wallet",
    },
    {
      id: 68,
      title: "Where Can I Use My SS Beauty Balance ?",
      titlePath: null,
      subTitle: "Where Can I Use My SS Beauty Balance ?",
      description:
        "Go to My Account -> My Wallet  -> Select Gift Card. Enter your 16 Digit Gift Card number and 6-digit Pin Number. ->Click Add balance To Account - >The balance of the Gift Card will be added to your SS Beatuy Wallet",
    },
    {
      id: 69,
      title:
        "What Happens If I Return The Items Which I have bought with SS Beauty Gift Card ?",
      titlePath: null,
      subTitle:
        "What Happens If I Return The Items Which I have bought with SS Beauty Gift Card ?",
      description:
        "Go to My Account -> My Wallet  -> Select Gift Card. Enter your 16 Digit Gift Card number and 6-digit Pin Number. ->Click Add balance To Account - >The balance of the Gift Card will be added to your SS Beatuy Wallet",
    },
    {
      id: 70,
      title: "Can my SS beauty wallet be suspended / closed ?",
      titlePath: null,
      subTitle: "Can my SS beauty wallet be suspended / closed ?",
      description:
        "Go to My Account -> My Wallet  -> Select Gift Card. Enter your 16 Digit Gift Card number and 6-digit Pin Number. ->Click Add balance To Account - >The balance of the Gift Card will be added to your SS Beatuy Wallet",
    },
    {
      id: 71,
      title: "Can I use partial SS beauty wallet cash to pay for my product ?",
      titlePath: null,
      subTitle:
        "Can I use partial SS beauty wallet cash to pay for my product ?",
      description:
        "Go to My Account -> My Wallet  -> Select Gift Card. Enter your 16 Digit Gift Card number and 6-digit Pin Number. ->Click Add balance To Account - >The balance of the Gift Card will be added to your SS Beatuy Wallet",
    },
  ],
};

describe("First Citizen ", () => {
  it("renders a first citizen questions  component", () => {
    const { container } = render(
      <FirstCitizenQuestions {...firstCitizenQuestionsData} />
    );
    expect(container).toMatchSnapshot();
  });
});
