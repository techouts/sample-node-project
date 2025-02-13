import React from "react";
import Grid from "@mui/material/Grid";
import { WalletTypography } from "./MyWalletStyles";
import { Box } from "@mui/material";

type proptype = {
  image?: string;
  title?: string;
  amt?: number;
  wid?: string;
  bckgrnd?: string;
  heigh?: string;
  textAlin?: string;
  afterSlash?: string;
  block?: boolean;
  mainTitle?: any;
  noSlashLineHeight?: any;
};

function smallBox(props: proptype) {
  let {
    wid = "100%",
    bckgrnd = "#F7F6F9",
    heigh = "",
    textAlin = "center",
    afterSlash = "",
    block = true,
    mainTitle = "",
    noSlashLineHeight = "",
  } = props;
  return (
    <>
      <Grid
        alignItems="center"
        container
        sx={{
          backgroundColor: "#F7F6F9",
          textAlign: textAlin,
          marginBottom: mainTitle != "" ? 0 : "18px",
        }}
        direction="row"
        justifyContent="center"
        xs={12}
        md={12}
        sm={12}
      >
        <Box
          sx={{
            backgroundColor: bckgrnd,
            height: heigh,
            width: {
              xs: mainTitle != "" ? "100%" : "86%",
              sm: mainTitle != "" ? "100%" : "84%",
            },
            minWidth: "110px",
            bottom: "0",
            padding: {
              xs: props.title ? " 20px 2px" : "2px ",
              sm: "22px 12px 20px 12px",
              md: "15px 2px 15px 2px",
              lg: "22px 12px 20px 12px",
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <img src={props.image} alt="Advantages_Images" width="50px" />

            <WalletTypography
              dcolor="#000000"
              dfontweight="400"
              dfontsize="16px"
              dlineheight="19px"
              mfontsize="12px"
              mlineheight="14.32px"
              paddingTop={{ xs: "12px", sm: "20px" }}
            >
              {props.title}
            </WalletTypography>
            <Box sx={{ height: afterSlash.length === 0 && noSlashLineHeight }}>
              <WalletTypography
                dcolor="#000000"
                dfontweight="400"
                dfontsize="16px"
                dlineheight="19px"
                mfontsize="12px"
                mlineheight="14px"
                paddingTop="0px"
              >
                {afterSlash}
              </WalletTypography>
            </Box>
          </Box>
          <Box>
            <WalletTypography
              dcolor="#231F20"
              dfontweight="700"
              dfontsize="28px"
              dlineheight="140%"
              mfontsize="16px"
              mlineheight="22.4px"
            >
              {props?.amt &&
                (props?.amt === 0 ? <> {props.amt}</> : <>₹{props.amt}</>)}
            </WalletTypography>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default smallBox;
