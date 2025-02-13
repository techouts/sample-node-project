import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const BannerTitle = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  fontSize: "20px",
  lineHeight: "24px",
  fontWeight: 700,
  textAlign: "center",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "#1C191A",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "16px",
  },
}));

export const BannerIconAndText = styled(Box)(() => ({
  width: "14%",
  marginTop: "5%",
  "@media(max-width:600px)": {
    width: "25%",
    marginTop: "6%",
  },
}));

export const BannerBox = styled(Box)(() => ({
  padding: "40px",
  "@media(max-width:600px)": {
    padding: "20px",
  },
}));

export const BannerItemBox = styled(Box)(() => ({
  display: "flex",
  columnGap: "20px",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  "@media(max-width:600px)": {
    columnGap: "10px",
  },
}));

export const BannerIcon = styled.img`
  max-width: 90px;
  @media screen and (max-width: 600px) {
    max-width: 30px;
  }
`;

export const BannerIconDescription = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  fontWeight: 500,
  fontSize: "16px",
  textAlign: "center",
  lineHeight: "20px",
  marginTop:"20px",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "10px",
    lineHeight: "14px",
    marginTop:"15px",
  },
}));
