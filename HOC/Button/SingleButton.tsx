import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ColorType } from "../../utility/ColorType";
import { useRouter } from "next/router";
import { useMobileCheck } from "../../utility/isMobile";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import { useInView } from "react-intersection-observer";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";

interface ButtonSchema {
  bgColor: ColorType | string;
  bgPadding: string;
  btnText: string;
  btnTextColor: ColorType | string;
  backgroundColor: ColorType | string;
  path: URL | string;
  btnPosition: string;
  fontSize: string;
  lineHeight: string;
  mobileFontSize: string;
  promotion_id: string;
  promotion_name: string;
  creative_name: string;
  creative_slot: string;
}

function SingleButton({
  bgColor,
  bgPadding,
  btnText,
  btnTextColor,
  backgroundColor,
  path,
  btnPosition,
  fontSize,
  lineHeight,
  mobileFontSize,
  promotion_id,
  promotion_name,
  creative_name,
  creative_slot,
}: ButtonSchema) {
  const router = useRouter();
  const isMobile = useMobileCheck();

  const [hasFiredEvent, setHasFiredEvent] = useState(false);

  const cookie = new Cookies();
  const { getItem } = useStorage();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  function lineHeightFunction(
    defaultValueOne: string,
    defaultValueTwo: string
  ) {
    if (isMobile) {
      return defaultValueOne || lineHeight;
    } else {
      return defaultValueTwo || lineHeight;
    }
  }
  function bgPaddingFunction(defaultValueOne: string, defaultValueTwo: string) {
    if (isMobile) {
      if (bgPadding) {
        return `${defaultValueOne} ${defaultValueTwo}`;
      } else {
        return 0;
      }
    } else {
      return bgPadding;
    }
  }
  function fontSizeFunction(defaultValueOne: string, defaultValueTwo: string) {
    if (isMobile) {
      return mobileFontSize || defaultValueOne;
    } else {
      return fontSize || defaultValueTwo;
    }
  }

  useEffect(() => {
    if (inView && !hasFiredEvent) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") || "na",
        creative_name: `${creative_name}-outer SBT`,
        creative_slot: `${creative_slot}-outer SBT`,
        items: [
          {
            promotion_id: `${promotion_id}-inner SBT`,
            promotion_name: `${promotion_name}-inner SBT`,
            creative_name: `${creative_name}-inner SBT`,
            creative_slot: `${creative_slot}-inner SBT`,
          },
        ],
      };
      TriggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true);
    }
  }, [inView, hasFiredEvent, cookie, getItem]);

  const callSelectPromotionEvent = () => {
    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${creative_name}-outer SBT`,
      creative_slot: `${creative_slot}-outer SBT`,
      items: [
        {
          promotion_id: `${promotion_id}-inner SBT`,
          promotion_name: `${promotion_name}-inner SBT`,
          creative_name: `${creative_name}-inner SBT`,
          creative_slot: `${creative_slot}-inner SBT`,
        },
      ],
    };
    TriggerGaViewPromotion("select_promotion", datasLayer);
  };

  const handleRedirect = () => {
    path && router.push(path);
    callSelectPromotionEvent();
  };
  return (
    <Box
      bgcolor={bgColor}
      p={bgPaddingFunction("12px", "16px")}
      display={"flex"}
      justifyContent={btnPosition || "center"}
      alignItems={"center"}
      ref={ref}
    >
      <Button
        onClick={handleRedirect}
        sx={{
          backgroundColor: backgroundColor,
          "&.MuiButton-root:hover": {
            backgroundColor: backgroundColor,
          },
          borderRadius: "0px",
          color: btnTextColor,
          padding: isMobile ? "15px 56px" : "20px 50px",
          fontSize: fontSizeFunction("12px", "12px"),
          lineHeight: lineHeightFunction("14px", "16px"),
          fontWeight: "500",
          fontFamily: "Montserrat",
          fontStyle: "normal",
          letterSpacing: "1px",
          textTransform: "none",
        }}
      >
        {btnText}
      </Button>
    </Box>
  );
}

export default SingleButton;
