import React from "react";
import Box from "@mui/material/Box";
import AccordionDetails from "@mui/material/AccordionDetails";
import Divider from "@mui/material/Divider";
import { FooterInterface } from "../../schemas/FooterSchema";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  TypographyLine,
  BigBox,
  MobBox,
  Accordions,
  TypographyTitle,
  TypographySubTitle,
  BigBoxMobile,
  AccordionDetailsBox,
  AccordionSummaryTitle,
} from "./FooterStyle";
import { useMobileCheck } from "../../utility/isMobile";
import triggerGAEvent from "../../utility/GaEvents";
export default function Footer({ items, bgPadding }: FooterInterface) {
  const isMobile = useMobileCheck();
  const footerAnalytics = async (url: URL | string, title: string) => {
    triggerGAEvent(
      {
        widget_description: "na",
        link_text: title,
        link_url: `${global?.window?.location?.origin}${url}`,
        outbound: true,
      },
      "hyperlink"
    );
    url && window.location.assign(`${window.location.origin}${url}`);
  };
  return (
    <>
      {isMobile ? (
        <BigBoxMobile>
          {items?.map((item, index) => (
            <Accordions key={index}>
              <AccordionSummaryTitle
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                key={index}
              >
                <TypographyTitle>{item?.title}</TypographyTitle>
              </AccordionSummaryTitle>
              <AccordionDetailsBox>
                {item?.subItems?.map((option, index) => (
                  <AccordionDetails key={index} sx={{ padding: "0px" }}>
                    <TypographySubTitle
                      onClick={() =>
                        footerAnalytics(option?.path, option?.title)
                      }
                      sx={{ padding: "0px 0px 16px 0px" }}
                    >
                      {option?.title}
                    </TypographySubTitle>
                  </AccordionDetails>
                ))}
              </AccordionDetailsBox>
            </Accordions>
          ))}
        </BigBoxMobile>
      ) : (
        <BigBox sx={{ p: bgPadding }}>
          {items?.map((item, index) => (
            <MobBox key={index}>
              <TypographyTitle>{item?.title}</TypographyTitle>
              {item?.subItems?.map((option, index) => (
                <TypographyLine
                  variant="body2"
                  onClick={() => footerAnalytics(option?.path, option?.title)}
                  key={index}
                  sx={{ cursor: option?.path ? "pointer" : "default" }}
                >
                  {option?.title}
                </TypographyLine>
              ))}
            </MobBox>
          ))}
        </BigBox>
      )}
      <Box pl={2} pr={2}>
        <Divider sx={{ pt: isMobile ? 0 : 3, width: "100%" }} />
      </Box>
    </>
  );
}
