import {styled} from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
interface Resposive {
  isMobile: boolean;
}
export const Typographymain = styled(Stack)(({ isMobile }: Resposive) => ({
  fontSize: `${isMobile ? "16px" : "40px"}`,
  lineHeight: `${isMobile ? "20px" : "48px"}`,
  fontWeight: "700",
  textAlign: `${isMobile ? "center" : "start"}`,
  padding: `${isMobile ? "20px 0 10px 0" : "0px 98px 0 10px"}`,
  marginLeft: "2%",
  color: "#1C191A",
  marginTop: "-25%",
  "@media (max-width: 900px)": {
    marginTop: "0%",
    textAlign: "center",
  },
}));
export const Typographytext = styled(Typography)(({ isMobile }: Resposive) => ({
  fontSize: `${isMobile ? "14px" : "22px"}`,
  lineHeight: `${isMobile ? "17px" : "27px"}`,
  color: "#000000",
  paddingTop: `${isMobile ? "10px" : "16px"}`,
  fontWeight: "500",
  font: "Montserrat",
}));
export const Typographylabel = styled(Typography)(
  ({ isMobile }: Resposive) => ({
    fontSize: `${isMobile ? "11px" : "12px"}`,
    lineHeight: `${isMobile ? "16px" : "16px"}`,
    textTransform: "uppercase",
    color: "#8A133D",
    marginTop: "10px",
    font: "Montserrat",
    letterSpacing: "1px",
    marginBottom: `${isMobile ? "0px" : "10px"}`,
  })
);
