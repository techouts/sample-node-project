import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled as styledMaterial } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
export const HeaderContainerGrid = styled(Grid)(() => ({
  backgroundColor: "#FFFFFF",
  border: "1px solid #E7E7E7",
  display: "flex",
  width: "80%",
  height: "49px",
  "@media(max-width:600px)": {
    width: "100%",
    height: "32px",
    display: "flex",
  },
}));
export const OrderStyledBox = styledMaterial(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[100],
  position: "absolute",
  boxshadow: " 0px 4px 25px",
  visibility: "visible",
  borderRadius: "50%",
  right: 0,
  left: 0,
}));
export const SearchIconButton = styled(IconButton)(() => ({
  padding: "10px",
  opacity: "0.5",
}));

export const MainInputBase = styled(InputBase)(() => ({
  width: "100%",
  "& .MuiInputBase-input": {
    fontSize: "14px",
    lineHeight: "16px",
    fontWeight: "600",
    color: "#231F20",
  },
}));

export const TypographyStyled = styled(Box)(() => ({
  padding: "5%",
  color: "#231F20",
  fontSize: "19px",
  "@media (max-width:600px)": {
    fontSize: "12px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
}));

export const StyledTypography = styled(Typography)(() => ({
  lineHeight: "44px",
  fontSize: "19px",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));
export const FilterCloseIcon = styled(CloseIcon)(() => ({
  float: "right",
  color: "#AD184C",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));
export const BoxStyled = styled(Box)(() => ({
  padding: "5%",
  marginTop: "14%",
}));

export const DropDownBox = styled(Box)(() => ({
  color: "black",
  fontWeight: 600,
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  paddingLeft: "15px",
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset ": {
      "&.MuiOutlinedInput-notchedOutline": {
        borderColor: "rgb(255,255,255)",
      },
    },
  },
}));
