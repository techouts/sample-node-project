import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import StarIcon from "@mui/icons-material/Star";

export const TypographyOne = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "24px",
}));

export const TypographyText = styled(Typography)(() => ({
  fontSize: "16px",
  marginTop: "20px",
}));
export const TypographyTextOne = styled(Typography)(() => ({
  fontSize: "16px",
}));
export const TypographyTextTwo = styled(Typography)(() => ({
  fontSize: "16px",
  marginTop: "20px",
  "& > span": {
    color: "#AD184C",
    fontWeight: "600",
  },
}));
export const ButtonText = styled(Button)(() => ({
  backgroundColor: "#DEA3B7",
  borderRadius: "0px",
  color: "#231F20",
}));
export const TypographyTextThree = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: "600",
}));
export const TypographyTextFour = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
  color: "#000000",
}));
export const TypographyTextFive = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "16px",
  color: "#4F4C4D",
}));
export const TypographyTextSix = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
  color: "#000000",
}));
export const TypographyTextSeven = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "16px",
  color: "#4F4C4D",
}));
export const TypographyTextEight = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
  color: "#000000",
}));
export const TypographyTextNine = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "16px",
  color: "#4F4C4D",
}));
export const TypographyTextTen = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "20px",
  color: "#231F20",
}));
export const TypographyTextEleven = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
  color: "#000000",
}));
export const TypographyTextTweleve = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "16px",
  marginTop: "8px",
}));
export const TypographyTextThirteen = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "16px",
  marginTop: "8px",
}));
export const TypographyTextFourteen = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
}));
export const TypographyTextFifteen = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
  marginTop: "20px",
}));
export const ButtonTextOne = styled(Typography)(() => ({
  backgroundColor: "#F8EDF1",
}));
export const TypographyTextSixteen = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "14px",
  marginTop: "12px",
}));
export const TypographyTextSeventeen = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
  marginTop: "20px",
}));
export const BoxText = styled(Typography)(() => ({
  border: "1px solid #DEDEDE",
  padding: "20px",
  marginTop: "9px",
}));
export const BoxTextOne = styled(Typography)(() => ({
  marginTop: "40px",
  textAlign: "end",
}));

export const ItemsTypography = styled(Typography)(() => ({
  marginTop: "40px",
  fontWeight: "400",
  fontSize: "20px",
  textTransform: "capitalize",
  color: "#231F20",
}));

export const ContainerBox = styled(Box)(() => ({
  width: "100%",
}));

export const HeadingTypography = styled(Typography)(() => ({
  marginLeft: "18px",
  fontWeight: "600",
  fontSize: "24px",
  color: "#231F20",
  lineHeight: "140%",
}));
export const ImageBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "26px",
  alignItems: "center",
  justifyContent: "space-evenly",
  marginBottom: "26px",
}));
export const TitleTypography = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
  color: "#231F20",
  lineHeight: "22.4px",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "15px",
  },
}));
export const SubTitleTypography = styled(Typography)(() => ({
  fontweight: 400,
  fontSize: "14px",
  color: "#A7A5A6",
  lineHeight: "20px",
  margin: "10px 0",
}));
export const SizeTypography = styled(Typography)(() => ({
  fontweight: 400,
  fontSize: "14px",
  lineHeight: "19.6px",
  color: "#231F20",
}));
export const RatingBox = styled(Box)(() => ({
  gap: "6px",
  marginTop: "5px",
  display: "flex",
  alignItems: "center",
  marginBottom: "26px",
}));
export const PriceBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "10px",
}));
export const PriceTypogrphy = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  color: "#AD184C",
  lineHeight: "22.4px",
  "@media(max-width:600px)": {
    fontSize: "14px",
    lineHeight: "19.6px",
    color: "#1C191A",
  },
}));

export const MainBox = styled(Box)(() => ({
  padding: "20px 19px",
  "@media(max-width:600px)": {
    padding: "16px",
  },
}));
export const BreakUpTypography = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "20px",
  color: "#231F20",
  "@media(max-width:600px)": {
    lineHeight: "24px",
  },
}));
export const NumberOfItemsTypography = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19px",
  color: "#231F20",
  "@media(max-width:600px)": {
    lineHeight: "20px",
    fontSize: "14px",
  },
}));
export const ProductBox = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  marginTop: "20px",
  "@media(max-width:600px)": {
    marginTop: "12px",
  },
}));
export const PNameTypography = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19px",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "16px",
  },
}));
export const PPRiceTypography = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "19px",
  textAlign: "right",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px",
  },
}));
export const MainStack = styled(Stack)(() => ({
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  "@media(max-width:600px)": {
    marginTop: "10px",
  },
}));
export const DiscountTypography = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19px",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "16px",
  },
}));
export const DAmountPTypography = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "19px",
  textAlign: "right",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "16px",
  },
}));
export const FirstStack = styled(Stack)(() => ({
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  "@media(max-width:600px)": {
    marginTop: "10px",
  },
}));
export const CFeeTypography = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19px",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "16px",
  },
}));
export const CFeeAmountTypography = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19px",
  textAlign: "right",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "16px",
  },
}));
export const SecondStack = styled(Stack)(() => ({
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  "@media(max-width:600px)": {
    marginTop: "10px",
  },
}));
export const DeliveryLTypography = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19px",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "16px",
  },
}));
export const DPriceCTypography = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19px",
  textAlign: "right",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "16px",
  },
}));
export const ButtonBox = styled(Box)(() => ({
  padding: "20px 21px",
  "@media(max-width:600px)": {
    padding: "12px 16px",
  },
}));
export const ButtonStack = styled(Stack)(() => ({
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  "@media(max-width:600px)": {
    marginTop: "10px",
  },
}));
export const TotalTypography = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "20px",
  color: "#231F20",
  "@media(max-width:600px)": {
    lineHeight: "24px",
  },
}));
export const TAmountTypography = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "20px",
  color: "#231F20",
  "@media(max-width:600px)": {
    lineHeight: "24px",
  },
}));
export const ModeTypography = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19px",
  color: "#000000",
  marginTop: "28px",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "16px",
    marginTop: "10px",
  },
}));
export const DownlodButton = styled(Button)(() => ({
  marginTop: "20px",
  backgroundColor: "#DEA3B7",
  borderRadius: "0px",
  padding: "14px 26px",
  color: "#231F20",
  "&:hover": {
    backgroundColor: "#DEA3B7",
  },
  "@media(max-width:600px)": {
    border: "1px solid #DEA3B7",
    boxSizing: "border-box",
  },
}));
export const ButtonTypography = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "16px",
  letterSpacing: "1px",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "11px",
  },
}));

export const StarIconImage = styled(StarIcon)(() => ({
  width: "17px",
  height: "16px",
  "@media(max-width:600px)": {
    width: "10px",
    height: "9px",
  },
}));
export const StackBUtton = styled(Stack)(() => ({
  padding: "12px 0px 20px 0px",
  "@media(max-width:600px)": {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
  },
}));

export const RatingTypography = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  "@media(max-width:600px)": {
    fontSize: "11px",
    fontWeight: "400",
  },
}));

export const QuentityTypography = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "11px",
    fontWeight: "600",
    color: "#231F20",
  },
}));
