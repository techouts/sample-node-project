import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export const LocationNameTextField = styled(TextField)(() => ({
  height: "100%",
  width: "60%",
  "& .MuiInputBase-input.MuiFilledInput-input": { paddingTop: "5px" },
  "& .MuiInputBase-root": { backgroundColor: "#FFFFFF" },
}));

export const SaveButton = styled(Button)(() => ({
  borderRadius: 0,
  width: "85px",
  height: "30px",
  background: "#231F20",
  "&:hover": { backgroundColor: "#231F20" },
}));
export const SaveTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  color: "#FFFFFF",
  textTransform: "uppercase",
  textAlign: "center",
}));
export const OOSButton = styled(Button)(() => ({
    borderRadius: 0,
    width: "152px",
    height: "45px",
    backgroundColor: "rgba(222, 163, 183, 0.5) !important",
        "&:hover": { backgroundColor: "#rgba(222, 163, 183, 0.5) !important" },
  }));
  export const OOSTypography = styled(Typography)(() => ({
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "12px",
    color: "#231F20",
    textTransform: "uppercase",
    textAlign: "center",
  }));