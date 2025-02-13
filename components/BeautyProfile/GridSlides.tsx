import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Loader from "../../HOC/Loader/Loader";
import MuiDots from "../../HOC/MuiStepper/MuiStepper";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  widget_type,
  event_type,
  Widget_type,
} from "../../utility/GAConstants";
import {
  BeautyProfileSchema,
  CATEGORIES,
} from "../../schemas/BeautyProfileSchema";
import {
  infoMessage,
  messageToReDoProfile,
  mobileButtonText,
  previousText,
  webButtonText,
} from "./constants";
import {
  Spacer,
  SubTitle,
  TickIcon,
  MainTitle,
  StyledBox,
  SingleTile,
  MuiDotsBox,
  PositionBox,
  StyledButton,
  SecondaryButton,
  TypographyFinalTitle,
} from "./Styles";
import { callEventBeautyProfileMyWallet } from "./BeautyProfileMyWallet";
import { cartState } from "../../recoilstore";
import { useRecoilState } from "recoil";
import { AppIcons } from "../../utility/AppIconsConstant";
import { BeautyProfilecheck_ICON } from "../../utility/AppIcons";
import BeautyProfileImage from "./BeautyProfileImage";
import { useRouter } from "next/router";

export interface GridSlidesInterface {
  buttonText?: string;
  slug: any;
  details: BeautyProfileSchema;
  items: CATEGORIES[];
  subText?: string;
  title?: string;
  slide: number | any;
  setSlide: number | any;
  displayLoader: boolean;
  setDisplayLoader: Function;
  errorState?: boolean;
  setErrorState: Function;
  errorMessage: string;
  selectedBeautyProfile: [] | any;
  setSelectedBeautyProfile: [] | any;
  setBeautyProfile: Function;
  getBeautyProfile: Function;
}

let savedData: any = {};
export const GridSlides = ({
  items,
  slug,
  slide,
  details,
  setBeautyProfile,
  getBeautyProfile,
  setSlide,
  errorMessage,
  errorState,
  setErrorState,
  displayLoader,
  setDisplayLoader,
  selectedBeautyProfile,
  setSelectedBeautyProfile,
}: GridSlidesInterface) => {

  const router = useRouter();

  const [cartStore, setCartStore] = useRecoilState(cartState);
  const { cartItems } = cartStore;
  const isMobile = useMobileCheck();
  const [isTicked, setIsTicked] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<any>();
  const [emptySelected, setEmptySelected] = useState<boolean>(false);
  const [selectedTiles, setselectedTiles] = useState<any>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>([]);
  const handleClick = (idx: number, pid: any, cId: number) => {
    if (slide !== items?.length) {
      savedData = Object?.assign({ parentId: pid, childId: cId });
      setSelectedIndex({ parentId: pid, childId: cId });
      setIsTicked(slide === items?.length ? false : true);
      let filteredList = selectedSubCategory?.filter(
        (el: any) => el.parentId !== pid
      );
      setSelectedSubCategory([
        ...filteredList,
        { parentId: pid, childId: cId },
      ]);
    }
  };

  const changeSlide = () => {
    callEventBeautyProfileMyWallet(
      event_type,
      widget_type,
      details?.title,
      details?.buttonText,
      "",
      "",
      details?.subText,
      cartItems
    );
    setSlide((prev: number) => prev + 1);
    if (isTicked) {
      let obj = selectedTiles.find((key: any) => {
        return key.parentId === savedData?.parentId;
      });
      if (obj?.parentId) {
        selectedTiles.filter((key: any, idx: any) => {
          if (
            key.parentId === savedData?.parentId &&
            selectedTiles &&
            selectedTiles?.[idx] &&
            selectedTiles?.[idx]?.childId
          )
            selectedTiles[idx].childId = savedData?.childId;
        });
        setselectedTiles([...selectedTiles]);
      } else {
        setselectedTiles([...selectedTiles, savedData]);
      }
    }
    setIsTicked(false);
  };
  const previousSlide = () => {
    setSlide((prev: number) => prev - 1);
  };

  const clearProfile = async () => {
    callEventBeautyProfileMyWallet(
      event_type,
      Widget_type,
      details?.categories?.[slide]?.title,
      webButtonText || mobileButtonText,
      "",
      "",
      "",
      cartItems
    );
    setDisplayLoader(true);
    setSelectedSubCategory([]);
    setEmptySelected(false);
    await setSlide(-1);
    setselectedTiles([]);
    await setSelectedBeautyProfile([]);
    await setDisplayLoader(false);
  };

  const handleCheckout = async (buttonPath?: string) => {
    let catIds = "";
    const beautyProfileLength = selectedBeautyProfile?.length;
    selectedBeautyProfile?.data?.map((item: any, index: number) => {
      const isLastItem = index === beautyProfileLength - 1;
      catIds += `${item?.parentId}=${item?.childId}${isLastItem ? "" : "&"}`;
    });
    // setDisplayLoader(true);
    const urlPath =
      buttonPath +
      (slug === "beauty-profile" ? "" : `?${catIds}`).replaceAll(",", "%2C");
    buttonPath && router.push(urlPath);
  };

  const BeautyProfileCheckOutData =
    selectedBeautyProfile &&
    selectedBeautyProfile?.data?.map((data: any) =>
      details?.categories
        ?.find(
          (item: any) =>
            item?.id == data?.parentId || item?.code == data?.parentId
        )
        ?.subCategories?.find(
          (childItems: any) =>
            childItems?.code == data?.childId || childItems?.id == data?.childId
        )
    );

  function itemsLengthCheckingHandler() {
    if (selectedTiles?.length > 0) {
      let obj = selectedTiles.find((key: any) => {
        return key.parentId === savedData?.parentId;
      });
      if (obj?.parentId) {
        selectedTiles.filter((key: any, idx: any) => {
          if (
            key.parentId === savedData?.parentId &&
            selectedTiles &&
            selectedTiles?.[idx] &&
            selectedTiles?.[idx]?.childId
          )
            selectedTiles[idx].childId = savedData?.childId;
        });
        submitBeatuyProfile([...selectedTiles]);
      } else {
        submitBeatuyProfile([...selectedTiles, savedData]);
      }
      setDisplayLoader(true);
    } else {
      setEmptySelected(true);
    }
  }
  const onClickHandler = (buttonPath: any) => {
    callEventBeautyProfileMyWallet(
      event_type,
      widget_type,
      details?.categories?.[slide]?.title,
      details?.categories?.[slide]?.buttonText ||
      webButtonText ||
      mobileButtonText,
      "",
      "",
      "",
      cartItems
    );
    if (slide + 1 == items?.length) {
      handleCheckout(buttonPath);
    } else {
      if (slide + 2 == items?.length) {
        itemsLengthCheckingHandler();
        changeSlide();
      } else {
        changeSlide();
      }
    }
  };
  const onPreviousHandler = () => {
    if (slide - 1 == items?.length) {
      handleCheckout();
    } else {
      if (slide - 2 == items?.length) {
        itemsLengthCheckingHandler();
      } else {
        previousSlide();
      }
    }
  };
  const submitBeatuyProfile = async (finalSelectedTiles: any) => {
    await setBeautyProfile(`{"data":${JSON.stringify(finalSelectedTiles)}}`);
    await getBeautyProfile();
  };
  const handleAlertClose = () => {
    setErrorState(false);
  };
  const BeautyProfilecheck = AppIcons(BeautyProfilecheck_ICON);
  function stackDirection() {
    if (isMobile) {
      if (slide === items?.length - 1) {
        return "row";
      }
    } else {
      return "row";
    }
  }
  return (
    <>
      {displayLoader && <Loader />}
      {emptySelected ? (
        <Box sx={{ height: "100%" }}>
          <SubTitle>{messageToReDoProfile}</SubTitle>
          <SecondaryButton onClick={clearProfile}>
           {webButtonText}
          </SecondaryButton>
        </Box>
      ) : (
        <Box>
          {slide >= 0 || BeautyProfileCheckOutData?.length ? (
            <>
              <MainTitle>{details?.categories?.[slide]?.title}</MainTitle>
              <Spacer lastSlide={slide === items?.length - 1}></Spacer>
            </>
          ) : (
            <Box sx={{ marginTop: isMobile ? "0px" : "140px" }}>
              <MainTitle>{details?.title}</MainTitle>
              <SubTitle>{details?.subText}</SubTitle>
            </Box>
          )}
          {isMobile && slide == -1 && (
            <StyledButton
              onClick={() => {
                changeSlide();
              }}>
              {details?.buttonText}
            </StyledButton>
          )}
          <StyledBox>
            {slide + 1 == items?.length || BeautyProfileCheckOutData?.length ? (
              <>
                {BeautyProfileCheckOutData?.map((item: any, index: number) => (
                  <>
                    <SingleTile key={item?.text}>
                      <TypographyFinalTitle>
                        {!isMobile && item?.subText}
                      </TypographyFinalTitle>
                      <BeautyProfileImage item={item} />
                    </SingleTile>
                  </>
                ))}
              </>
            ) : (
              <>
                {details?.categories?.[slide]?.subCategories?.map(
                  (item: any, index: number) => (
                    <>
                      <SingleTile
                        key={item?.code}
                        onClick={() => {
                          handleClick(
                            index,
                            details?.categories?.[slide]?.code,
                            item?.code
                          );
                        }}
                        sx={{
                          outline:
                            selectedIndex?.childId === item?.code ||
                              selectedIndex?.childId === item?.id
                              ? "1px solid #C65D82"
                              : "1px solid #A7A5A6",
                          cursor: "pointer",
                        }}>
                        {selectedSubCategory.some(
                          (catg: any) =>
                            (catg?.parentId ==
                              details?.categories?.[slide]?.code ||
                              catg?.parentId ==
                              details?.categories?.[slide]?.id) &&
                            (catg?.childId === item?.code ||
                              catg?.childId === item?.id)
                        ) && (
                            <TickIcon
                              src={`${ReplaceImage(BeautyProfilecheck?.url)}`}
                              alt="tick"></TickIcon>
                          )}
                        <BeautyProfileImage item={item} />
                      </SingleTile>
                    </>
                  )
                )}
              </>
            )}
          </StyledBox>
          {slide === items?.length && (
            <SubTitle mt={1}>
              {selectedTiles?.length === 0 ? "" : details?.subText}
            </SubTitle>
          )}
          <PositionBox
            slide={slide}
            isSelection={slide >= 0 && slide !== items?.length}
            redo={
              BeautyProfileCheckOutData?.length > 0 &&
              slide + 1 == items?.length
            }>
            <>
              {slide >= 0 || BeautyProfileCheckOutData?.length ? (
                <>
                  {slide + 1 == items?.length && (
                    <SubTitle sx={{ marginBottom: isMobile ? "12px" : "20px" }}>
                      {infoMessage}
                    </SubTitle>
                  )}
                  <Stack
                    direction={stackDirection()}
                    spacing={2}
                    justifyContent="flex-start"
                    // details?.categories?.[slide]?.buttonText?.toLowerCase() ==
                    // "check them out"
                    //   ? "flex-start"
                    // :
                    // }
                    alignItems={isMobile ? "center" : ""}
                    sx={{
                      marginBottom: slide === items?.length - 1 ? "60px" : " ",
                    }}>
                    {!BeautyProfileCheckOutData?.length &&
                      slide >= 1 &&
                      selectedTiles?.length > 0 && (
                        <SecondaryButton onClick={() => onPreviousHandler()}>
                          {previousText}
                        </SecondaryButton>
                      )}
                    {
                      <StyledButton
                        sx={{
                          width: "fit-content",
                          textAlign: "center",
                        }}
                        onClick={() => {
                          onClickHandler(
                            details?.categories?.[slide]?.buttonPath
                          );
                        }}>
                        {details?.categories?.[slide]?.buttonText}
                      </StyledButton>
                    }
                    {slide + 1 == items?.length && (
                      <SecondaryButton onClick={clearProfile}>
                     {  webButtonText}
                      </SecondaryButton>
                    )}
                  </Stack>
                </>
              ) : (
                <>
                  {!isMobile && slide == -1 && (
                    <StyledButton
                      onClick={() => {
                        changeSlide();
                      }}>
                      {details?.buttonText}
                    </StyledButton>
                  )}
                </>
              )}
            </>
            <MuiDotsBox slide={slide < 0} isMobile={isMobile}>
              {slide != items?.length - 1 && (
                <MuiDots
                  totalLength={items?.length}
                  selectedIndex={slide + 1}
                />
              )}
            </MuiDotsBox>
          </PositionBox>
        </Box>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorState}
        autoHideDuration={3000}
        onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
