import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ButtonInfo1, TypographyText } from "./Authentic/Auth/Return/styles";
import { Okay_Typo, Product_Stock_Typo } from "./Constants";

export const NotifyContent = ({notifyClose}: any) => {
  return (
    <Box sx={{ flexGrow: 1 }} p={"30px"}>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <TypographyText>{Product_Stock_Typo}</TypographyText>
          <ButtonInfo1 onClick={() => notifyClose()}>{Okay_Typo}</ButtonInfo1>
        </Grid>
      </Grid>
    </Box>
  );
};
