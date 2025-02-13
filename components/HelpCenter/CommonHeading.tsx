import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useMobileCheck } from "../../utility/isMobile";
import React from "react";
import { SubTitle } from "./FAQStyles";
import triggerGAEvent from "../../utility/GaEvents";

export const CommonHeading = ({ title, subTitle }: any) => {
  const isMobile = useMobileCheck();
  const callEvent = () => {
    triggerGAEvent(
      {
        widget_title: "write to us",
        link_text: "Submit",
        link_url: "na",
        event_type: "hyperlink",
      },
      "hyperlink"
    );
  };
  return (
  <Grid sx={{padding:isMobile ? '0% 7%' : "0%"}}>
    <Typography style={{paddingBottom:'5px',fontSize: isMobile ? "16px" : "30px", fontWeight: "900"}}>{title}</Typography>
    <SubTitle onClick={callEvent} dangerouslySetInnerHTML={{ __html: subTitle }}></SubTitle>
    </Grid>
  );
};
