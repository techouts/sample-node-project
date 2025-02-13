import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import {
  BorderBox,
  TextFieldBox,
  Typographyfollow,
  TypographyText,
  Buttonlabel,
  FollowIconBox,
  Boxicon,
  BottomDivider,
  MainBox,
  FollowBox,
  Icon,
} from "./Style";
import FooterSubscribeInterface from "../../schemas/FooterSubscribeSchema";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { useMobileCheck } from "../../utility/isMobile";
import { toast } from "../../utility/Toast";

import triggerGAEvent from "../../utility/GaEvents";
import client from "../../apollo-client";
import { EmailSubscription } from "../../graphQLQueries/ContactUs";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import { useRouter } from "next/router";
import handleErrorResponse from "../../utility/ErrorHandling";
const FooterSubscribe = ({
  bgColor,
  bgPadding,
  facebookIconUrl,
  facebookIconPath,
  twitterIconUrl,
  twitterIconPath,
  instagramIconUrl,
  instagramIconPath,
  subscribeText,
  ctaLabel,
}: FooterSubscribeInterface) => {
  const isMobile = useMobileCheck();
  const router = useRouter();
  const searchPlaceHolder = "Enter Your Email";
  const followUsOn = "FOLLOW US ON";
  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [responseToast, setResponseToast] = useState(false);
  const [toastMessage, setMessageToast] = useState("");
  const [showInput, setShowInput] = useState(false);
  const handleSubscribe = () => {
    client
      .mutate({
        mutation: EmailSubscription,
        variables: {
          userEmail: userEmail,
          isSubscribe: "true",
        },
        errorPolicy: "ignore",
      })
      .then((response: any) => {



        if (response?.data?.emailSubscription?.status) {
          setResponseToast(true);
          setMessageToast(response?.data?.emailSubscription?.message);
        }
      })
      .catch((err: any) => {
        toast.error("Someting went wrong, Please try again!!!");
        console.log("error", err);
      });
  };

  let errorMessage = "Enter valid email";
  const handleClick = (url: string) => {
    isMobile ? window.location.assign(url) : window.open(url);
  };

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    const pattern = /^[a-z0-9@._]*$/;
    if (!pattern.test(value.toLowerCase())) {
      return;
    }
    setUserEmail(value?.toLowerCase());
    if (value.match(/^([a-z0-9_]+\.?[a-z0-9_]+)+@([\w-]+\.)+[\w-]{1,5}$/)) {
      setEmailError(false);
      setUserEmail(value);
    } else {
      setEmailError(true);
    }
  };
  const callEvent = (link_text: any, link_url: any, outbound?: any) => {
    triggerGAEvent(
      {
        widget_description: "na",
        link_text: link_text,
        link_url: `${global?.window?.location?.origin}${link_url}` || "na",
        outbound: outbound,
      },
      "hyperlink"
    );
  };

  useEffect(() => {
    let target = document.getElementById("footer-subscribe");
    document.addEventListener("scroll", () => {
      if (router?.asPath.includes("/account/orders") && target && window.scrollY >= target?.getBoundingClientRect().top) {
        setShowInput(true);
      } else {
        setShowInput(true);
      }
      
    });
  }, []);

  return (
    <Box
      id="footer-subscribe"
      p={isMobile ? "13px 16px 0px 16px" : bgPadding}
      bgcolor={bgColor}
    >
      <BorderBox>
        <FollowBox>
          <Typographyfollow>{followUsOn}</Typographyfollow>
          <FollowIconBox>
            {facebookIconUrl && (
              <Boxicon>
                <Icon
                  onClick={() => {
                    callEvent(followUsOn, facebookIconPath, true);
                    handleClick(facebookIconPath);
                  }}
                  src={`${ReplaceImage(facebookIconUrl)}`}
                  alt="facebook image"
                />
              </Boxicon>
            )}
            {twitterIconUrl && (
              <Boxicon>
                <Icon
                  onClick={() => {
                    callEvent(followUsOn, twitterIconPath, true);
                    handleClick(twitterIconPath);
                  }}
                  src={`${ReplaceImage(twitterIconUrl)}`}
                  alt="twitter image"
                />
              </Boxicon>
            )}
            {instagramIconUrl && (
              <Boxicon>
                <Icon
                  onClick={() => {
                    callEvent(followUsOn, instagramIconPath, true);
                    handleClick(instagramIconPath);
                  }}
                  src={`${ReplaceImage(instagramIconUrl)}`}
                  alt="instagram  image"
                />
              </Boxicon>
            )}
          </FollowIconBox>
        </FollowBox>
        {isMobile && <Divider sx={{ width: "100%", margin: "20px 0px" }} />}
        <MainBox>
          <Box>
            <TypographyText>{subscribeText}</TypographyText>
          </Box>
          {showInput && (
            <TextFieldBox
              id="standard-name"
              placeholder={searchPlaceHolder}
              name="useremailid"
              className="subscribeText"
              type="text"
              helperText={emailError && errorMessage}
              value={userEmail}
              error={emailError}
              onChange={(e) => handleInputChange(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => {
                      callEvent(subscribeText, "#", false);
                      handleSubscribe();
                    }}
                  >
                    <Buttonlabel>{ctaLabel}</Buttonlabel>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </MainBox>
      </BorderBox>
      {isMobile && <BottomDivider />}
      {responseToast && (
        <CustomSnackBar
          setSnackBarOpen={setResponseToast}
          snackBarOpen={responseToast}
          snackMessage={toastMessage}
        />
      )}
    </Box>
  );
};
export default FooterSubscribe;
