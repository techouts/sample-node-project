import styled from "@emotion/styled";
import MobileStepper from "@mui/material/MobileStepper";
export const Dots = styled(MobileStepper)(() => ({
  marginTop:"10px",
  marginBottom: "25px",
  color: "#231F20",
  backgroundColor:"transparent",
  "& .MuiMobileStepper-dotActive": {
    backgroundColor: "#AD184C !important",
    borderRadius: "100px",
    width: "13px !important",
    height: "4px",
  },
  "& .MuiMobileStepper-dots": {
    alignItems: "center"
  },
  "& .MuiMobileStepper-dot": {
    width: "4px",
    height: "4px",
    backgroundColor: "#231F20",
  },
  "@media(min-width:768px)": {
    marginTop:"18px",
    marginBottom:"40px",
  }
}));
