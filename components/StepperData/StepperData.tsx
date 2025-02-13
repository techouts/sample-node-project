import { MainBox, ButtonText, ButtonBox } from "./Styles";
import { useState } from "react";
import { useRouter } from "next/router";
import StepperBannerSchema from "../../schemas/SignIn/StepperBannerSchema";
import { PLP_SEARCH_ROUTE } from "../../utility/Constants";
import triggerGAEvent from "../../utility/GaEvents";
import { StepperComponentView } from "./StepperComponentView";

const StepperData = ({
  buttonText,
  categories,
  position,
  categoryId,
  __component,
}: StepperBannerSchema) => {
  const router = useRouter();
  const [isTicked, setIsTicked] = useState(false);
  const [selectLipstickCategory, setSelectLipstickCategory] = useState("");

  const ButtonClickHandler = () => {
    let userSelectedLipsticks: string = "";
    for (const [key, value] of Object.entries(selectLipstickCategory)) {
      userSelectedLipsticks = userSelectedLipsticks.concat(` ${value}`);
    }
    router.push(
      `${PLP_SEARCH_ROUTE}?${categoryId && `category_id=${categoryId}`}&search=${userSelectedLipsticks}`
    );
    setSelectLipstickCategory("");
    callEvent();
  };

  const callEvent = () => {
    triggerGAEvent(
      {
        item_name: "na",
        event_type: "find_a_lip_stick",
        widget_title: __component,
        widget_description: "na",
        widget_postion: position,
        link_url: "na",
        no_of_items: categories?.length,
      },
      "journey",
    );
  };
  return (
    <>
      <MainBox>
        {categories?.map((category: any, index: number) => (
          <>
            <StepperComponentView
              categories={categories}
              selectLipstickCategory={selectLipstickCategory}
              setSelectLipstickCategory={setSelectLipstickCategory}
              category={category}
              index={index}
              position={position}
              isTicked={isTicked}
              setIsTicked={setIsTicked}
              __component={__component}
            />
          </>
        ))}
        <ButtonBox>
          <ButtonText
            disabled={isTicked ? false : true}
            onClick={ButtonClickHandler}
          >
            {buttonText}
          </ButtonText>
        </ButtonBox>
      </MainBox>
    </>
  );
};
export default StepperData;
