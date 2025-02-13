import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

export interface ButtonInterface {
  backgroundColors?: string;
  colors?: string;
}
export const SelectButtons = styled(Button)(
  ({ backgroundColors, colors }: ButtonInterface) => ({
    borderRadius: 0,
    padding: "10px",
    margin: "5px 20px 5px 5px !important",
    height: "43px",
    backgroundColor: backgroundColors ? backgroundColors : "#DEA3B7",
    color: colors ? colors : "#231F20",
    "&:hover": {
      backgroundColor: backgroundColors ? backgroundColors : "#DEA3B7",
      color: colors ? colors : "#231F20",
    },
    "@media(max-width:600px)": {
      fontSize: "11px",
    },
  })
);
export const Boxs = styled(Box)(() => ({
  border: "1px solid #E6E6E6",
  display: "grid",
  gridTemplateColumns: "10% 56% 32%",
  gap: "16px",
  padding: "14px 20px 14px 14px",
  marginBottom: "23px",
}));
export const Typographys = styled(Typography)(() => ({
  textDecorationLine: "underline",
  textAlign: "end",
  color: "#AD184C",
  fontSize: "12px",
  paddingBottom: "5px",
}));
