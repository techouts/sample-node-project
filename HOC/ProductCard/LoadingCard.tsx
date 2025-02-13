import React from "react";
import { Grid } from "@mui/material";
import { useMobileCheck } from "../../utility/isMobile";
import { OuterBox, BorderBox, LoaderBox } from "./ProductCardStyles";

export default function LoadingCard() {
  const isMobile = useMobileCheck();
  return (
    <OuterBox isMobile={isMobile} loading={true} isSpecialCard={false}>
      <BorderBox
        aria-label="Bordered"
        isMobile={isMobile}
        loading={true}
        sx={{ height: `${isMobile ? "220px" : "450px"}` }}
      >
        <Grid
          container
          direction="column"
          sx={{ height: "100%" }}
          flexWrap={isMobile ? "unset" : "wrap"}
        >
          <Grid item xs={2} p={{ xs: 1, md: 2 }}></Grid>
          <Grid item xs={5} sx={{ textAlign: "center", position: "relative" }}>
            <LoaderBox
              sx={{
                width: `${isMobile ? "80px" : "160px"}`,
                height: `${isMobile ? "80px" : "160px"}`,
                borderRadius: "5px",
                backgroundColor: "#b9b9b9",
                margin: "0 auto",
              }}
            ></LoaderBox>
          </Grid>
          <Grid item xs={5} p={2} aria-label="contentSection">
            <LoaderBox
              sx={{
                width: "85%",
                height: `${isMobile ? "10px" : "20px"}`,
                backgroundColor: "#9B9B9B",
                marginTop: "8px",
              }}
            ></LoaderBox>
            <LoaderBox
              sx={{
                width: "70%",
                height: `${isMobile ? "10px" : "20px"}`,
                backgroundColor: "#b9b9b9",
                marginTop: "8px",
              }}
            ></LoaderBox>
            <LoaderBox
              sx={{
                width: "60%",
                height: `${isMobile ? "10px" : "20px"}`,
                backgroundColor: "#DEA3B7",
                marginTop: "8px",
              }}
            ></LoaderBox>
            <LoaderBox
              sx={{
                width: "75%",
                height: `${isMobile ? "10px" : "20px"}`,
                backgroundColor: "#b9b9b9",
                marginTop: "8px",
              }}
            ></LoaderBox>
          </Grid>
        </Grid>
      </BorderBox>
    </OuterBox>
  );
}
