import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import FooterBaseInterface from "../../schemas/FooterBaseSchema";
import triggerGAEvent from "../../utility/GaEvents";
import { useMobileCheck } from "../../utility/isMobile";
import { ContentStack } from "./style";

const FooterCopyRights = ({
  title,
  items,
  bgPadding,
  bgColor,
}: FooterBaseInterface) => {
  const isMobile = useMobileCheck();
  return (
    <Grid
      container
      p={isMobile ? "9px 0 30px 16px" : bgPadding}
      bgcolor={bgColor}
    >
      <Grid
        item
        sm={6}
        md={8}
        lg={9}
        pt={isMobile ? 2 : 0}
        pb={isMobile ? 7 : 0}
      >
        <Typography
          sx={{
            fontSize: "12px",
            lineHeight: "22px",
            color: "#292D32",
          }}
        >
          {title}
        </Typography>
      </Grid>
      <Grid item sm={6} md={4} lg={3}>
        <ContentStack>
          {items?.map((item, index) => (
            <Typography
              key={index}
              onClick={async () => {
                triggerGAEvent(
                  {
                    widget_description: "na",
                    link_text: item?.title,
                    link_url: `${global?.window?.location?.origin}${item?.path}`,
                    outbound: true,
                  },
                  "hyperlink"
                );
                window?.open(item?.path);
              }}
              sx={{
                fontSize: "12px",
                lineHeight: "16.8px",
                color: "#292D32",
                cursor: "pointer",
              }}
            >
              {item?.title}
            </Typography>
          ))}
        </ContentStack>
      </Grid>
    </Grid>
  );
};

export default FooterCopyRights;
