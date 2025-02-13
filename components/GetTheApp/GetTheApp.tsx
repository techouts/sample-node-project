import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import { GetTheAppSchema, LIST_ITEM } from "../../schemas/GetTheAppSchema";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import { useRouter } from "next/router";
import { useMobileCheck } from "../../utility/isMobile";
import {
  Buttonlabel,
  LargeTitle,
  MainTitle,
  TextFieldBox,
  StyledStepLabel,
  StyledStepper,
  StyledStack,
  TypographyAvailableText,
  TypographyOr,
} from "./GetTheAppStyles";
import triggerGAEvent from "../../utility/GaEvents";
import client from "../../apollo-client";
import { GET_THE_APP } from "../../graphQLQueries/GetTheAppQuery";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import Loader from "../../HOC/Loader/Loader";

export const GetTheApp = ({
  bgColor,
  bgPadding,
  title,
  path,
  playStoreimgUrl,
  downloadText,
  placeholder,
  availableOn,
  ctaLabel,
  items,
  playStoreImgPath,
  appStoreImageUrl,
  appStoreImgPath,
  __component,
}: GetTheAppSchema) => {
  const router = useRouter();
  const isMobile = useMobileCheck();
  const [error, setError] = useState(false);
  const [mobNumber, setMobNumber] = useState("");
  const [displayLoader, setLoader] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [networkErrorMessage, setNetworkErrorMessage] = useState("");
  const eventType = "Get The App";
  const handleChange = (event: any) => {
    event?.target?.value?.length <= 10 && event?.target?.value[0] > 5
      ? setMobNumber(Math.max(0, parseInt(event.target.value)).toString().slice(0, 10))
      : event?.target?.value?.length == 0 && setMobNumber("");

      setError(event.target.value?.length > 0 && event.target.value?.length < 10);

  };
  const callEvent = () => {
    mobNumber?.length === 10 ? setError(false) : setError(true);
    triggerGAEvent(
      {
        widget_title: __component ? __component : "na",
        event_type: eventType ? eventType : "na",
        link_url: `${global?.window?.location?.origin}${path}`|| "na" ,
        outbound: false,
        link_text: ctaLabel ? ctaLabel : "na",
        widget_description: eventType ? eventType : "na",
      },
      "hyperlink"
    );
    client
      .query({
        query: GET_THE_APP,
        variables: {
          mobile_number: mobNumber,
          playStoreLink: playStoreImgPath,
          appStoreLink: appStoreImgPath,
        },
        fetchPolicy: "no-cache",
      })
      .then(async (response: any) => {
        setLoader(false);
        setNetworkError(true);
        setNetworkErrorMessage(response?.data?.getTheApp?.message);
      })
      .catch((err) => {
        console.log("error", err);
        setLoader(false);
        setNetworkError(true);
        setNetworkErrorMessage(err.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleKeyEvents = (event: any) => {
    if (
      event?.key?.toLowerCase() == "enter" &&
      mobNumber?.length > 9 &&
      !error
    ) {
      callEvent();
    }
  };

  return (
    <>
      {displayLoader && <Loader />}
      <CustomSnackBar
        snackBarOpen={networkError}
        setSnackBarOpen={setNetworkError}
        snackMessage={networkErrorMessage}
      />
      <Box bgcolor={bgColor} p={bgPadding} pb={10} width="100%">
        <Grid container alignItems="center">
          <Grid xs={12} md={6} item aria-label="QR-section">
            <Stack direction="column" spacing={isMobile ? "25px" : "30px"}>
              <MainTitle>{title}</MainTitle>
              <Stack
                direction="row"
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <QRCode
                  value={path}
                  bgColor={"#FFFFFF"}
                  fgColor={"#000000"}
                  size={isMobile ? 150 : 300}
                />
                {isMobile && (
                  <Stack direction="column" spacing={1}>
                    <TypographyAvailableText isMobile={isMobile}>
                      {availableOn}
                    </TypographyAvailableText>
                    <Stack direction="row" spacing={1}>
                      <img
                        src={playStoreimgUrl}
                        alt="store_img"
                        width={"82px"}
                        height={"25px"}
                        onClick={() => window?.open(`${playStoreImgPath}`)}
                      />
                      <img
                        src={appStoreImageUrl}
                        alt="app-img"
                        width={"82px"}
                        height={"25px"}
                        onClick={() => window?.open(`${appStoreImgPath}`)}
                      />
                    </Stack>
                  </Stack>
                )}
              </Stack>
              <TypographyOr isMobile={isMobile}>OR,</TypographyOr>
              <Stack direction="column" spacing={"16px"}>
                <LargeTitle>{downloadText}</LargeTitle>
                <TextFieldBox
                  id="standard-name"
                  placeholder={placeholder}
                  value={mobNumber}
                  helperText={error && "Invalid mobile number"}
                  className="subscribeText"
                  onChange={handleChange}
                  onKeyDown={handleKeyEvents}
                  type="tel"
                  inputProps={{
                    inputmode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Buttonlabel
                          onClick={() => {
                            if (mobNumber?.length > 9 && !error) {
                              callEvent();
                            }
                          }}>
                          {ctaLabel}
                        </Buttonlabel>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} md={6} item aria-label="Stepper-section">
            <StyledStack direction="column" spacing={12}>
              <Box mt={isMobile ? 4 : 8}>
                <StyledStepper nonLinear orientation="vertical">
                  {items?.map((step: LIST_ITEM, index: number) => (
                    <Step
                      aria-label="custom-step"
                      key={index}
                      completed={index == items?.length - 1}
                      active={true}
                    >
                      <StyledStepLabel aria-label="custom-label">
                        {step?.label}
                      </StyledStepLabel>
                      <StepContent
                        sx={{ marginLeft: "16px" }}
                        aria-label="custom-description"
                      >
                        {step?.description}
                      </StepContent>
                    </Step>
                  ))}
                </StyledStepper>
              </Box>
              {!isMobile && (
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TypographyAvailableText isMobile={isMobile}>
                    {availableOn}
                  </TypographyAvailableText>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      cursor: "pointer",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={playStoreimgUrl}
                      alt="store_img"
                      width={"110px"}
                      height={"35px"}
                      onClick={() => window?.open(`${playStoreImgPath}`)}
                    />
                    <img
                      src={appStoreImageUrl}
                      alt="app-img"
                      width={"100px"}
                      height={"35px"}
                      onClick={() => window?.open(`${appStoreImgPath}`)}
                    />
                  </Box>
                </Stack>
              )}
            </StyledStack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
