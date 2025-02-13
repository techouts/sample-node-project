import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const CitiesDropdownTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: "39px",
  color: "#231F20",
  margin: "30px 0px 18px 0px",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "16px",
    margin: "20px 0px 10px 0px",
  },
}));

export const ExpandMoreImage = styled.img`
  max-width: 18px;
`;

export const SearchIconImage = styled.img`
  max-width: 18px;
`;

// ParticularLocation Component Styles start from here
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
  display: "inline-block",
  fontSize: "16px",
  color: "#4F4C4D",
  marginLeft: "3px",
  "@media (max-width: 600px)": {
    fontSize: "12px",
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

export const CityAddressListBox = styled(Box)(() => ({
  border: "1px solid #EAEAEA",
  margin: "18px 0px 18px 0px",
  overflowY: "scroll",
  "& ::-webkit-scrollbar": {
    width: "4px",
  },
  "& ::-webkit-scrollbar-thumb": {
    backgroundColor: "#A7A5A6",
    borderRadius: "2px",
  },
  "@media (max-width: 600px)": {
    height: "276px",
    margin: "10px 0px 14px 0px",
    "&::-webkit-scrollbar": {
      width: "3px",
    },
  },
}));

export const NoStoresFoundText = styled(Typography)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  height: "260px",
  fontWeight: 700,
  fontSize: "28px",
  color: "#AD184C",
  padding: "0px 20px",
  border: "1px solid #EAEAEA",
  "@media (max-width: 600px)": {
    fontSize: "16px",
    height: "180px",
  },
}));
