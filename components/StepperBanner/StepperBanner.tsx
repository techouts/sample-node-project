import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import React, { useRef, useState } from "react";
import MuiDots from "../../HOC/MuiStepper/MuiStepper";
import ViewEvent from "../../utility/viewEvent";
import { bannerevent_type, event_type } from "../../utility/GAConstants";
import { useMobileCheck } from "../../utility/isMobile";
import {
  Title,
  Subtitle,
  StartButton,
  ContentTypography,
  ContentBox,
  ShowResultsButton,
  TakeQuizAgain,
  EndBox,
  TopBox,
  MainContentBox,
} from "./StepperBannerStyles";
import triggerGAEvent from "../../utility/GaEvents";
import { PLP_SEARCH_ROUTE } from "../../utility/Constants";
const StepperBanner = ({
  btnBgColor,
  btnTextColor,
  titleTextColor,
  bgColor,
  bgPadding,
  buttonText,
  items,
  subTitle,
  title,
  isComponentDiffer,
  position,
  id,
  __component,
  imageUrl,
}: any) => {
  const isMobile = useMobileCheck();
  const viewEventWrapper = useRef();
  const [levelsData, setLevelsData] = useState(items);
  const [isInitial, setInitial] = useState(
    (title || subTitle || buttonText) && isComponentDiffer ? true : false
  );
  const [count, setCount] = useState(0);
  const [enableButton, setEnableButton] = useState(true);
  const [searchTitle, setSearchtitle] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState("");
  const nextButton = "Next";

  const takeQuizAgainHandler = () => {
    setSelectedCategoryIds("");
    setCount(0);
    setEnableButton(true);
  };
  const startQuizHandler = () => {
    setInitial(false);
    setLevelsData(items);
  };

  const levelIncreaseHandler = (text: any) => {
    if ((isComponentDiffer && count === 1) || count === 0) {
      setSearchtitle(text);
    }
    if (selectedCategoryIds === "") {
      setSelectedCategoryIds(selectedCategoryIds + "" + text);
    } else {
      setSelectedCategoryIds(selectedCategoryIds + " " + text);
    }
    !(count == levelsData.length - 1) && setCount((count) => count + 1);
    count == levelsData.length - 1 && setEnableButton(false);
    if (isComponentDiffer) {
      setSelectedOption("");
    }
  };
  const showResultsHandler = () => {
    window.location.assign(`${
      window.location.origin
    }${PLP_SEARCH_ROUTE}?searchTitle=${searchTitle}&search=
    ${
      isComponentDiffer
        ? selectedCategoryIds + " " + selectedOption
        : selectedCategoryIds
    }`);
    setSelectedCategoryIds("");
  };
  const dataLayer = {
    item_id: "na",
    item_name: "na",
    component_id: id,
    widget_type: bannerevent_type,
    item_type: "na",
    widget_title: __component,
    widget_description: "na",
    widget_postion: position,
    no_of_items: 1,
    index: position,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    event_type: event_type,
    view_items: [
      {
        item_id: `${__component}_${position}`,
        item_name: "na",
        index: position,
        item_brand: "na",
        item_category: "na",
        price: 0,
        original_price: 0,
        quantity: 0,
        item_rating: "na",
        item_category2: "na",
        item_category3: "na",
        item_category5: "na",
        item_deeplink_url: "na",
        item_image_link: imageUrl,
      },
    ],
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");
  const callEvent = () => {
    triggerGAEvent(
      {
        item_name: "na",
        item_id: `${__component}_${position}`,
        component_id: id,
        widget_type: bannerevent_type,
        item_type: "na",
        widget_title: __component,
        widget_description: "na",
        widget_postion: position,
        no_of_items: 1,
        index: position,
        link_text: title,
        item_brand: "na",
        link_url: "na",
        item_category: "na ",
        item_category2: "na",
        item_category3: "na",
        item_original_price: 0,
        item_price: 0,
        item_rating: "na",
        original_price: 0,
      },
      "click"
    );
  };

  const mobilePaddingfunction = () => {
    if (isMobile) {
      if (!items?.[0]?.bgImageUrlMobile) {
        return "0 16px";
      }
    } else {
      return bgPadding;
    }
  };

  return (
    <Grid bgcolor={bgColor} p={mobilePaddingfunction} width={"100%"}>
      <TopBox
        isComponentDiffer={isComponentDiffer}
        isMobile={isMobile}
        webBackgroundImage={items?.[count ?? 0]?.bgImageUrl}
        mobileBackgroungImage={items?.[count ?? 0]?.bgImageUrlMobile}
        ref={viewEventWrapper}
        onClick={() => callEvent()}
      >
        <MainContentBox
          isMobile={isMobile}
          isComponentDiffer={isComponentDiffer}
        >
          {!isComponentDiffer && (
            <Title
              titleTextColor={titleTextColor}
              isComponentDiffer={isComponentDiffer}
            >
              {title}{" "}
            </Title>
          )}
          {isInitial && (
            <>
              {isComponentDiffer && (
                <Title
                  titleTextColor={titleTextColor}
                  isComponentDiffer={isComponentDiffer}
                >
                  {title}{" "}
                </Title>
              )}
              <Subtitle>{subTitle}</Subtitle>
              <StartButton
                btnBgColor={btnBgColor}
                btnTextColor={btnTextColor}
                onClick={() => startQuizHandler()}
              >
                {buttonText}
              </StartButton>
            </>
          )}
          {!isInitial && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <ContentBox
                container
                isMobile={isMobile}
                isComponentDiffer={isComponentDiffer}
              >
                {levelsData.map((item: any, index: number) => {
                  return (
                    index === count && (
                      <Stack direction={"column"} key={item.title}>
                        {!isInitial && (
                          <Box>
                            {isComponentDiffer && (
                              <Title
                                titleTextColor={titleTextColor}
                                isComponentDiffer={isComponentDiffer}
                              >
                                {item.title}
                              </Title>
                            )}
                          </Box>
                        )}
                        {item.subTitle && <Subtitle>{item.subTitle}</Subtitle>}
                        <ContentBox
                          isComponentDiffer={isComponentDiffer}
                          container
                          isMobile={isMobile}
                        >
                          {item?.subItems?.map(
                            (subitem: any, subIndex: number) => {
                              return (
                                <ContentTypography
                                  item
                                  xs={5}
                                  sm={4}
                                  md={isComponentDiffer ? 4 : 3.5}
                                  onClick={() => {
                                    if (!isComponentDiffer) {
                                      levelIncreaseHandler(subitem.text);
                                    } else {
                                      if (
                                        count == levelsData.length - 1 &&
                                        !levelsData?.[levelsData?.length - 1]
                                          ?.buttonText
                                      ) {
                                        if (subIndex === 0) {
                                          showResultsHandler();
                                        } else {
                                          takeQuizAgainHandler();
                                        }
                                      } else {
                                        setSelectedOption(subitem.text);
                                      }
                                    }
                                  }}
                                  key={subitem.text}
                                  isComponentDiffer={isComponentDiffer}
                                  borderCheck={selectedOption == subitem.text}
                                  btnTextColor={item?.btnTextColor}
                                  btnBgColor={item?.btnBgColor}
                                >
                                  {subitem.text}
                                </ContentTypography>
                              );
                            }
                          )}
                        </ContentBox>
                      </Stack>
                    )
                  );
                })}
              </ContentBox>
              {!isComponentDiffer && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: isComponentDiffer ? "flex-start" : "center",
                  }}
                >
                  {isInitial || !(count < 4) ? (
                    ""
                  ) : (
                    <MuiDots totalLength={5} selectedIndex={count}></MuiDots>
                  )}
                </Box>
              )}
            </Box>
          )}
          <Box>
            {count == levelsData.length - 1 && (
              <EndBox>
                {levelsData?.[levelsData?.length - 1]?.buttonText && (
                  <ShowResultsButton
                    onClick={() => {
                      if (isComponentDiffer) {
                        setSelectedCategoryIds(
                          selectedCategoryIds + " " + selectedOption
                        );
                      }
                      showResultsHandler();
                    }}
                    disabled={isComponentDiffer ? false : enableButton}
                    isComponentDiffer={isComponentDiffer}
                    btnBgColor={btnBgColor}
                    btnTextColor={btnTextColor}
                  >
                    {levelsData?.[levelsData?.length - 1]?.buttonText}
                  </ShowResultsButton>
                )}
                <TakeQuizAgain onClick={() => takeQuizAgainHandler()}>
                  {levelsData?.[levelsData?.length - 1]?.quizText}
                </TakeQuizAgain>
              </EndBox>
            )}
            {!isInitial &&
              isComponentDiffer &&
              count != levelsData.length - 1 && (
                <Box>
                  {(nextButton || levelsData?.[count]?.buttonText) && (
                    <ShowResultsButton
                      onClick={() =>
                        levelIncreaseHandler(
                          isComponentDiffer ? selectedOption : null
                        )
                      }
                      btnBgColor={btnBgColor}
                      btnTextColor={btnTextColor}
                      isComponentDiffer={isComponentDiffer}
                    >
                      {levelsData?.[count]?.buttonText ?? nextButton}
                    </ShowResultsButton>
                  )}
                </Box>
              )}
          </Box>
        </MainContentBox>
      </TopBox>
      {isComponentDiffer && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MuiDots
            totalLength={levelsData.length}
            selectedIndex={count}
          ></MuiDots>
        </Box>
      )}
    </Grid>
  );
};

export default StepperBanner;
