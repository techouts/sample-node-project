import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const FindNearStoreTitleText = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "28px",
  color: "#231F20",
  margin: "10px 0px 10px 0px",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    margin: "10px 0px 0px 0px",
  },
}));

export const FilterStoreAndTextBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const FilterTextAndIcon = styled(Box)(() => ({
  display: "flex",
  columnGap: "10px",
  alignItems: "center",
  margin: "10px 0px 10px 0px",
  "@media (max-width: 600px)": {
    columnGap: "6px",
    margin: "10px 0px 0px 0px",
  },
}));

export const FilterTypography = styled(Typography)(() => ({
  fontSize: "16px",
  color: "#000000",
  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));

export const NearStoresFindBox = styled(Grid)(() => ({
  display: "grid",
  gap: "16px 10px",
  gridTemplateColumns: "repeat(7, 1fr)",
  "@media (max-width: 600px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

export const EachFindNearStore = styled(Button)(() => ({
  fontSize: "14px",
  color: "#231F20",
  borderRadius: "0%",
  padding: "7px 18px",
  textTransform: "capitalize",
  backgroundColor: "#EAE9EF",
  "&:hover": {
    backgroundColor: "#EAE9EF",
  },
  "@media (max-width: 600px)": {
    fontSize: "11px",
    padding: "7px 26px",
  },
}));

export const SelectedStoreDetailsBox = styled(Box)(() => ({
  border: "1px solid #EAEAEA",
  padding: "32px 24px",
  margin: "32px 0px 30px 0px",
  "@media (max-width: 600px)": {
    margin: "25px 0px",
    padding: "25px 16px",
  },
}));

export const ParticularStoreName = styled(Typography)(() => ({
  fontSize: "16px",
  lineHeight: "20px",
  fontWeight: 500,
  color: "#000000",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "15px",
  },
}));

export const StoreAddressText = styled(Typography)(() => ({
  display: "inline",
  fontSize: "16px",
  lineHeight: "24px",
  color: "#4F4C4D",
  margin: "8px 0px",
  "@media (max-width: 600px)": {
    margin: "10px 0px",
    fontSize: "12px",
    lineHeight: "18px",
  },
}));

export const StorePhoneNumber = styled(Typography)(() => ({
  fontSize: "16px",
  lineHeight: "23px",
  color: "#000000",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "17px",
  },
}));

export const ParticularStoreContentBox = styled(Box)(() => ({
  display: "flex",
  height: "90px",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#A7A5A6",
    borderRadius: "2px",
  },
  "@media (max-width: 600px)": {
    "&::-webkit-scrollbar": {
      width: "3px",
    },
  },
}));

export const FilterImageIcon = styled.img`
  max-height: 16px;
  @media screen and (max-width: 600px) {
    max-width: 10px;
  }
`;
