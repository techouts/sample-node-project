import {styled} from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
export interface Responsive {
  ismobile: boolean;
}
export const FlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
}));
export const BorderBox = styled(Box)(({ ismobile }: Responsive) => ({
  width: "100%",
  height: ismobile ? "250px" : "400px",
  border: "1px solid rgba(155, 155, 155, 0.3)",
  borderBottom: "0px",
  position: "relative",
}));
export const StyledGroup = styled(ButtonGroup)(() => ({
  borderRadius: "0px",
}));
export const StyledButton = styled(Button)(({ ismobile }: Responsive) => ({
  color: "#231F20",
  borderRadius: "0px",
  boxShadow: "none",
  padding: "0px",
  height: ismobile ? "28px" : "56px",
}));
export const StyledText = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: 700,
}));
export const StyledIcon = styled(Box)(() => ({
  marginRight: "10px",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  right: "5%",
}));

export const StyledForm = styled(FormControl)(() => ({
  minWidth: "100%",
  border: "none",
  "& .MuiInputBase-root": {
    borderRadius: "0px",
  },
}));
export const StyledSelect = styled(Select)(() => ({
  border: "none",
  fontWeight: 600,
  "& .MuiMenuItem-root": {
    width: "228px",
  },
  "& .css-ttfums-MuiButtonBase-root-MuiMenuItem-root": {
    minHeight: "auto",
    width: "228px",
  },
  "&:before": {
    borderColor: "none",
  },
  "&:after": {
    borderColor: "none",
  },
  "& .MuiSvgIcon-root.MuiSelect-icon": {
    display: "none",
  },
}));

export const StyledList = styled(MenuItem)(() => ({
  "& .MuiPaper.root": {
    borderRadius: "0px",
    boxShadow: "none",
  },
  "& .Mui-focusVisible": {
    backgroundColor: "none",
  },
  "& .MuiPaper.root.MuiMenu.paper.MuiPaper.root.MuiPopover.paper": {
    boxShadow: "none",
  },
  "& . Mui-focusVisible": {
    backgroundColor: "red",
  },
  "&.MuiButtonBase-root.MuiMenuItem-root:hover": {
    backgroundColor: "white",
  },
  textTransform: "capitalize",
}));
