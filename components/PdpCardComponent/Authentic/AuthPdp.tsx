import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  TypographyProduct,
  TypographyText,
  ButtonInfo2,
} from "./Auth/Return/styles";
import AuthInterface from "../../../schemas/AuthSchema";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));

export default function AuthPdp({
  data,
  productData,
  AuthhandleClose,
}: {
  data: AuthInterface;
  AuthhandleClose: React.MouseEventHandler<Element> | undefined;productData:any
}) {
  return (
    <Box sx={{ flexGrow: 1 }} p={data?.data?.bgPadding}>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <TypographyProduct>{data?.ProductPopUpText?.[1]?.title}</TypographyProduct>
          <TypographyText>{data?.ProductPopUpText?.[1]?.text} {productData?.brand_info}</TypographyText>
          <ButtonInfo2 onClick={AuthhandleClose}>
            {data?.ProductPopUpText?.[1]?.buttonText}
          </ButtonInfo2>
        </Grid>
      </Grid>
    </Box>
  );
}
