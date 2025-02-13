import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";

interface Responsive {
  isDisabled?: boolean;
  isMobile?: boolean;
}
export const TypographyUpiDemo = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "22px",
  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));

export const InputLabelData = styled(InputLabel)(() => ({
  color: "#4F4C4D",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "42px",
  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));
export const ChildGrid = styled(Grid)(() => ({
  "@media (max-width: 600px)": {
    padding: "20px 0px 0px 30px",
  },
}));
export const AddButton = styled(Button)(
  ({ isMobile, isDisabled }: Responsive) => ({
    height: isMobile ? "28px" : "44px",
    fontSize: "12px",
    margin: isMobile ? "12px 0px" : "20px 0px",
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: "black",
      borderRadius: "0px",
    },
    width: isMobile ? "159px" : "159px",
    backgroundColor: "black",
    opacity: isDisabled ? 0.6 : 1,
    color: "white !important",
  })
);
export const TypographyTitle = styled(Typography)(() => ({
  fontWeight: "500",
  fontSize: "20px",
  marginBottom: "16px",
  marginTop: "10px",
  "@media (max-width: 600px)": {
    fontSize: "16px",
    marginBottom: "4%",
  },
}));
export const TypographyUpiInfo = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "400",
  color: "#7B7979",
  padding: "0px 0px 25px 0px",
  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));
