import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  TypographyProduct,
  TypographyText,
  ButtonInfo1,
} from "../Authentic/Auth/Return/styles";
import ReturnInterface from "../../../schemas/ReturnSchema";

export default function ReturnPdc({
  data,
  ExchangehandleClose,
}: {
  data: ReturnInterface;
  ExchangehandleClose: React.MouseEventHandler<Element> | undefined;
}) {
  return (
    <Box sx={{ flexGrow: 1 }} p={"30px"}>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <TypographyProduct>{data?.ProductPopUpText?.[0]?.title}</TypographyProduct>
          <TypographyText>{data?.ProductPopUpText?.[0]?.text}</TypographyText>
          <ButtonInfo1 onClick={ExchangehandleClose}>
            {data?.ProductPopUpText?.[0]?.buttonText}
          </ButtonInfo1>
        </Grid>
      </Grid>
    </Box>
  );
}
