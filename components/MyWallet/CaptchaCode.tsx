import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  CaptchaBox,
  CaptchaInput,
  CaptchaTextMainBox,
  CaptchaTextnote,
  MainBox,
} from "./CaptchaStyles";
import { errorEvent } from "../BeautyProfile/BeautyProfileMyWallet";
import { WrongCaptcha } from "../Profile/constant";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { AppIcons } from "../../utility/AppIconsConstant";
import { REFRESH_ICONS, SPEAKER_ICONS } from "../../utility/AppIcons";

function Captcha({ setIsCaptcha, iscontactus = false, giftCard = false }: any) {
  const [createCaptcha, setCreateCaptcha] = useState("");
  const [isCaptchaInValid, setIsCaptchaInValid] = useState(false);
  const [voices, setVoices] = useState<any>();
  const characters = "zykABCDFabcde12789";
  const Refresh_icon = AppIcons(REFRESH_ICONS);
  const Speaker_icon = AppIcons(SPEAKER_ICONS);
  function generateString() {
    const length = 6;
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setCreateCaptcha(result);
    return result;
  }
  useEffect(() => {
    generateString(); // Function called here and save in captcha variable
    setVoices(window.speechSynthesis.getVoices());
  }, []);
  const refreshCaptchaHandler = () => {
    generateString();
  };
  const handleChange = (e: { target: { name: any; value: any } }) => {
    if (createCaptcha == e.target.value) {
      setIsCaptcha(true);
      setIsCaptchaInValid(false);
    } else {
      setIsCaptchaInValid(true);
      setIsCaptcha(false);
    }
  };
  const handleSpeech = () => {
    const captchaSpeech = createCaptcha.split("").join(" ");
    const speechText = new SpeechSynthesisUtterance(captchaSpeech);
    speechText.voice = voices[4];
    speechText.rate = 0.5;
    speechText.volume = 1;
    speechText.pitch = 1;
    window.speechSynthesis.speak(speechText);
  };

  return (
    <>
      <MainBox
        sx={{
          display: giftCard ? "flex" : "",
          flexDirection: giftCard ? "column" : "",
          alignItems: giftCard ? "center" : "",
          height: giftCard ? "156px" : "180px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "9px",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <CaptchaBox isContactus={iscontactus}>
            <Stack
              sx={{
                paddingTop: "5px",
                fontFamily: "Lucida Handwriting",
                fontSize: "20px",
                fontWeight: "600",
                color: "#152674",
              }}
            >
              {createCaptcha}
            </Stack>
          </CaptchaBox>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Stack sx={{ cursor: "pointer" }} onClick={refreshCaptchaHandler}>
              <img
                src={`${ReplaceImage(Refresh_icon?.url)}`}
                alt="img deltd"
                width="22px"
              />
            </Stack>
            <Stack sx={{ cursor: "pointer" }} onClick={() => handleSpeech()}>
              <img
                src={`${ReplaceImage(Speaker_icon?.url)}`}
                alt="img deltd"
                width="24px"
              />
            </Stack>
          </Box>
        </Box>
        <CaptchaTextnote
          sx={{
            marginTop: iscontactus ? "17px" : "15px",
            textAlign: iscontactus ? "left" : "",
            paddingRight: iscontactus ? 0 : "30px",
          }}
        >
          Type the above captcha here
        </CaptchaTextnote>
        <CaptchaTextMainBox isContactus={iscontactus}>
          <CaptchaInput
            type="text"
            name="username"
            onChange={handleChange}
            inputProps={{
              maxLength: 6,
            }}
            isContactus={iscontactus}
            giftCard={giftCard}
          />
          {isCaptchaInValid && errorEvent(isCaptchaInValid) && (
            <Stack m={0.5} mb={3} sx={{ color: "red", fontSize: "14px" }}>
              {WrongCaptcha}
            </Stack>
          )}
        </CaptchaTextMainBox>
      </MainBox>
    </>
  );
}
export default Captcha;
