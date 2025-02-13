import * as React from "react";
import {createTheme, ThemeProvider } from "@mui/material";
import Stack from "@mui/material/Stack";
import { ButtonItem } from "./TabsComponentStyles";
import Loader from "../../HOC/Loader/Loader";
import { useState , useEffect } from "react";
import { useMobileCheck } from "../../utility/isMobile";
import { useInView } from "react-intersection-observer";
import triggerGaViewPromotion from "../../utility/GAViewPromotion";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
const theme = createTheme({
  palette: {
    primary: {
      main: "#DEA3B7",
    },
  },
  typography: {
    fontFamily: [
      'Helvetica Neue',
      'Helvetica'
    ].join(','),
  }
});
const TabsComponent = ({ items, __component, bgPadding, bgColor, position, promotion_id, promotion_name
}: any) => {
  const defaultTab = items?.find((item: any) => item?.isTabActive)?.text;
  const [displayLoader, setLoader] = useState(false);
  const [selectedMiscsTab, setSelectedMiscsTab] = useState<string>(defaultTab);
  const [hasFiredEvent, setHasFiredEvent] = useState(false);
  const isMobile = useMobileCheck();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });
  const { getItem } = useStorage();
  const cookie = new Cookies();

  const callTabEvent  = (creative_name:string , creative_slot:string) => {
    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${creative_name}-outer tabs`,
      creative_slot: `${creative_slot}-outer tabs`,
      ecommerce: {
      items: [
        {
          promotion_id: `${promotion_id}-inner tabs`,
          promotion_name: `${promotion_id}-inner tabs`,
          creative_name: `${creative_name}-outer tabs`,
          creative_slot: `${creative_name}-outer tabs`,
        }
      ]
    }
    };
    triggerGaViewPromotion("select_promotion", datasLayer);
  };
  useEffect(() => {
    if (inView && !hasFiredEvent) {
      const datasLayer = {
        previous_screen_name: "na",
        visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
        user_id: getItem("customer_ref", "local") ?? "na",
        creative_name: items
          ?.map((item: any) => `${item?.creative_name}-outer tabs`)
          .join("|"),
        creative_slot: items
          ?.map((item: any) => `${item?.creative_slot}-outer tabs`)
          .join("|"),
        ecommerce: {
          items: items?.map((item: any) => ({
            promotion_id: `${item?.promotion_id}-inner tabs`,
            promotion_name: `${item?.promotion_id}-inner tabs`,
            creative_name: `${item?.creative_name}-inner tabs`,
            creative_slot: `${item?.creative_slot}-inner tabs`,
          })),
        },
      };
      
      triggerGaViewPromotion("view_promotion", datasLayer);
      setHasFiredEvent(true); 
    }
  }, [inView, hasFiredEvent, cookie, __component, items]);  

  const miscsTabHandler = (index:number, itemId:any, text: string, path: string ,creative_slot: string ,creative_name: string  ) => {
    callTabEvent(creative_name , creative_slot);
    if (selectedMiscsTab == text && (path === "" || path === null)) {
      return;
    }
    setLoader(true);
    setSelectedMiscsTab(text);
    path &&
      window.location.assign(path)
  };
  return (
    <>
      {displayLoader && <Loader />}
      <Stack
        ref={ref}
        direction={"row"}
        gap={"14px"}
        p={isMobile ? "25px 15px 9px 15px" : bgPadding}
      >
        {items?.map((item: any, index: number) => (
          <ThemeProvider theme={theme}>
            <ButtonItem
              style={{
                backgroundColor:
                  item?.textbgColor && item?.isTabActive
                    ? item?.textbgColor
                    : "",
                color:
                  item?.textColor && item?.isTabActive ? item?.textColor : "",
                textTransform:
                  item?.textColor && item?.text ? "capitalize" : "uppercase",
                fontWeight:
                  item?.textPath &&
                  item?.textPath != "null"
                    ? 700
                    : 500,
                fontSize:
                  item?.textColor && item?.textColor != "null"
                    ? isMobile
                      ? "14px"
                      : "16px"
                    : "",
              }}
              isMobile={isMobile}
              fullWidth
              variant={item?.isTabActive ? "contained" : "outlined"}
              onClick={() => miscsTabHandler(index, item?.id,item?.text, item?.textPath , item?.creative_name ,item?.creative_slot)}>
              {item?.text}
            </ButtonItem>
          </ThemeProvider>
        ))}
      </Stack>
    </>
  );
};
export default TabsComponent;