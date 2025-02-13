import styled from "@emotion/styled";
import Box from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface Responsive {
  isMobile: boolean;
}

export const PremiumBox = styled(Grid)(({ isMobile }: Responsive) => ({
  display: "grid",
  gridTemplateColumns: "58% 1fr",
  textAlign: "initial",
}));

export const PremiumTypography = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    fontSize: isMobile ? "12px" : "20px",
    padding: isMobile ? "10px 5px" : "10px",
    lineHeight: "160%",
    color: "#231F20",
  })
);

export const DetailsTypography = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    fontSize: isMobile ? "12px" : "20px",
    padding: isMobile ? "10px 5px" : "10px",
    lineHeight: "160%",
    color: "#4F4C4D",
  })
);
export const AmountBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  padding: "10px 35px",
  backgroundColor: "#AD184C",
  color: "#FFFFFF",
});
export const MemberTypography = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    fontSize: isMobile ? "16px" : "22px",
    fontWeight: "500",
    lineHeight: "150%",
    color: "#AD184C",
  })
);
export const MemberTextBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});
export const TierImageBox = styled(Box)({
  alignSelf: "flex-end",
});
export const CardDetailsGrid = styled(Grid)(({ isMobile }: Responsive) => ({
  position: "absolute",
  bottom: "15%",
  justifyContent: isMobile ? "space-between" : "",
  color: "white",
  alignItems: "self-end",
}));
export const ToolTipBox = styled(Box)(() => ({
  width: "100%",
  backgroundColor: "#F7F6F9",
  padding: "12px 10px 15px 15px",
}));
export const ListOne = styled.li`
  font-size: 11px;
  line-height: 170%;
  font-weight: 500;
  color: #656263;
`;
export const ListTwo = styled.li`
  font-size: 11px;
  line-height: 170%;
  font-weight: 500;
  color: #656263;
  margin-bottom: 3px;
`;
export const InfoIcon = styled.img<Responsive>`
  display: ${(props) => (props.isMobile ? "none" : "")};
  margin-left: 6px;
  cursor: pointer;
`;
export const ButtonBox = styled(Box)(({ isMobile }: Responsive) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: isMobile ? "18px" : "30px",
  marginBottom: isMobile ? "30px" : "",
}));
export const BenefitsBox = styled(Box)(({ isMobile }: Responsive) => ({
  backgroundColor: "#F7F6F9",
  padding: isMobile ? "25px 16px 43px 16px" : "33px 47px 33px 40px",
  marginTop: isMobile ? "25px" : "40px"
}));
export const ViewBenefitsButton = styled(Button)(
  ({ isMobile }: Responsive) => ({
    "&:hover": {
      backgroundColor: " #231F20",
      color: " #FFFFFF",
    },
    backgroundColor: " #231F20",
    color: " #FFFFFF",
    borderRadius: "0px",
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "133%",
    width: "263px",
    height: isMobile ? "28px" : "44px",
  })
);
export const TextTypography = styled(Typography)(({ isMobile }: Responsive) => ({
  marginTop: "18px",
  fontSize: isMobile ? "12px" : "20px",
  textAlign: "start",
}));
