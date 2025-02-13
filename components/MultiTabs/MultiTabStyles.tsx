import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

interface Responsive {
  isMobile: boolean;
  noOfTabs: number;
}

function tabIssues(noOfTabs: number) {
  if (noOfTabs == 1) {
    return "100%";
  } else {
    if (noOfTabs == 2) {
      return "50%";
    } else {
      return "33.333%";
    }
  }
}
export const Spantext = styled.span<Responsive>`
  line-height: 150%;
  color: #231f20;
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => (props.isMobile ? "11px" : "16px")};
`;
export const Listed = styled.li<Responsive>`
  font-size: ${(props) => (props.isMobile ? "12px" : "16px")};
  color: #656263;
`;

export const Typographytitle = styled.span<Responsive>`
  line-height: 150%;
  color: #231f20;
  font-size: ${(props) => (props.isMobile ? "12px" : "16px")};
  padding-left: 5px;
  font-style: normal;
  font-weight: 400;
`;
export const ViemoreButton = styled.span<Responsive>`
  font-style: normal;
  font-weight: 400;
  font-size: ${(props) => (props.isMobile ? "11px" : "14px")};
  line-height: 120%;
  color: #ad184c;
  text-decoration-line: underline;
  text-transform: none;
  box-shadow: none;
  padding: 0px;
  width: 76px;
  height: 16px;
  cursor: pointer;
`;
export const TabStyle = styled(Tab)(({ isMobile, noOfTabs }: Responsive) => ({
  color: "#231F20",
  width: "100%",
  fontWeight: "400",
  textTransform: "none",
  fontSize: isMobile ? "11px" : "20px",
  lineHeight: "150%",
  maxWidth: tabIssues(noOfTabs),
  border: "1px solid #DDDDDD",
  backgroundColor: "white",
  padding: isMobile ? "0px 5px" : "12px 16px",
  "&.Mui-selected ": {
    color: "#AD184C",
    backgroundColor: "#f7f7f7",
    border: "#f7f7f7",
    fontWeight: 500,
  },
}));

export const GridContentWrapper = styled(Grid)(() => ({
  padding: "16px 120px 48px 32px",
  "@media(max-width:600px)": {
    padding: "0px 0px 8px 0px",
  },
}));

export const ViewMoreViewLessTypo = styled(Typography)(() => ({
  cursor: "pointer",
  color: "#AD184C",
  paddingLeft: "5px",
}));

export const ReadMoreLessTypo = styled(Typography)(() => ({
  cursor: "pointer",
  fontSize: "14px",
  textDecorationLine: "underline",
  color: " #B22557",
  opacity: 1,
  textUnderlineOffset: "3px",
  fontWeight: 500,
  textAlign: "left",
}));

export const DescriptionBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  paddingTop: "1%",
}));

export const ProductTitle = styled(Typography)(() => ({
  fontSize: "16px",
  color: "#231F20",
  lineHeight: "150%",
}));

export const ProductSku = styled("span")(() => ({
  color: "#979596",
  fontSize: "16px",
  lineHeight: "150%",
}));

export const TabTitleWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-start",
  paddingTop: "1%",
}));
