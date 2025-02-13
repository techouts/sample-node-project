import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export const Dividers = styled(Divider)`
  color: #30adb2;
`;

export const FragranceHeading = styled(Typography)(() => ({
  color: "white",
  fontWeight: "600 ",
  fontSize: "20px",
  textAlign: "center",
  lineHeight: 3,
}));

export const FragranceBg = styled(Box)(() => ({
  backgroundColor: "#231F20",
  width: "100%",
  paddingLeft: "4%",
  paddingRight: "4%",
  paddingBottom: "2%",
}));

export const StyledList = styled.ul`
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;
export const StyledListItem = styled.li`
  float: left;
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const StyledImgItem = styled.img`
  height: 100%
  width:100%;
`;
export const TopTextStyle = styled(Typography)(() => ({
  fontSize: "11px",
  whiteSpace: "nowrap",
  color: `${({ color }: any) => color}`,
}));

export const ProCard = styled(Box)(() => ({
  width: "100%",
  margin: "auto",
  paddingLeft: "14%",
}));

export const LItems = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px !importent;
  justify-content: center;
  color: red;
  font-weight: 300;
  gap: 1px;
`;

export const FavoriteBox = styled.div`
float:right;
color: #ad184c;
}
`;

export const ImageBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding-top: 7%;
padding-bottom: 7%;
}
`;

export const PcTitle = styled(Typography)(() => ({
  fontSize: "17px",
  fontWeight: 600,
  marginBottom: "2%",
}));

export const RateBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "bottom",
  float: "right",
  position: "relative",
  top: "-30px",
}));

export const RateNo = styled(Box)(() => ({
  fontSize: "14px",
  fontWeight: "600",
}));

export const Mrp = styled(Typography)(() => ({
  fontSize: "16px",
  lineHeight: "2",
  color: "#ad184c",
}));

export const Price = styled(Typography)(() => ({
  fontSize: "16px",
  lineHeight: "2",
  fontWeight: 600,
  color: "#ad184c",
}));

export const PriceSO = styled(Typography)(() => ({
  fontSize: "12px",
  lineHeight: "2",
  color: "gray",
  textDecorationLine: "line-through",
}));

export const Off = styled(Typography)(() => ({
  fontSize: "12px",
  lineHeight: "3",
}));

export const PriceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  white-space: nowrap;
`;

export const Avail = styled(Typography)(() => ({
  display: "flex",
  fontSize: "14px",
}));

export const AvailFs = styled(Typography)(() => ({
  display: "flex",
  fontSize: "12px",
  textDecoration: "underline",
  whiteSpace: "nowrap",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  borderRadius: "0", //in shorthand property not working
  border: " solid #DEA3B7 thin",
  padding: "6px",

  color: "black",
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: "#DEA3B7",
    color: "black",
    border: "1px solid #231F20",
  },
}));

export const ButtonTypography = styled(Typography)(() => ({
  fontSize: "14px",
  lineHeight: "44px",
  fontWeight: 600,
  whiteSpace: "nowrap",
  flexWrap: "nowrap",
}));
