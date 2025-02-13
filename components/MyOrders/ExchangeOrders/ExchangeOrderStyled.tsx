import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

export const StyledCard = styled(Card)(() => ({
  padding: "30px 30px",
  backgroundColor: "#FFFFFF",
  width: "100%",
  marginTop: "20px",
  "@media (max-width:600px)": {
    padding: "25px 16px",
  },
}));

export const AppropriateMethodTypography = styled(Typography)(() => ({
  fontWeight: "550",
  fontSize: "18px",
  color: "#231F20",
}));

export const AppropriateMethodDescription = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "16px",
  color: "#231F20",
  paddingTop: "10px",
}));

export const FormControlBox = styled(Box)(() => ({
  padding: "10px 0 22px 0",
  "@media (max-width:600px)": {},
}));
export const RadioGroupStyled = styled(RadioGroup)(() => ({
  "& .MuiRadio-root.Mui-checked": {
    color: "#AD184C",
  },
  "& .MuiButtonBase-root.MuiRadio-root": {
    padding: "10px",
  },
  "& .MuiTypography-root": {
    fontSize: "16px",
    fontWeight: "400",
  },
  "@media (max-width:600px)": {},
}));

export const WalletBox = styled(Box)(() => ({
  border: "1px solid #EAEAEA",
  padding: "16px",
  display: "table",
  "@media (max-width:600px)": {},
}));
export const BankDetailsBox = styled(Box)(() => ({
  width: "60%",
  border: "1px solid #EAEAEA",
  padding: "24px 24px 24px 30px",
  "@media (max-width:600px)": {},
}));

export const AccountTypography = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "14px",
  color: "#1C191A",
  "@media (max-width:600px)": {},
}));
export const NameTypography = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "16px",
  color: "#AD184C",
  padding: "8px 0 0 0",
  "@media (max-width:600px)": {},
}));

export const TextFieldOtherReason = styled(TextField)(() => ({
  border: "unset",
  fontWeight: "500",
  fontSize: "12px",
  borderRadius: "0px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
  },

  "& label.Mui-focused": {
    color: "#AD184C !important",
  },
  "& .MuiOutlinedInput-root": {
    " &.Mui-focused fieldset": {
      borderColor: "#EAEAEA",
    },
  },
}));

// image
export const HowToSendItBackTypography = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "18px",
  color: "#231F20",
  padding: "24px 0 0 0",
  "@media (max-width:600px)": {},
}));

export const SelectStyled = styled(Select)(() => ({
  border: "unset",
  borderRadius: "0px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
  },

  "& label.Mui-focused": {
    color: "#AD184C !important",
  },
  "& .MuiOutlinedInput-root": {
    " &.Mui-focused fieldset": {
      borderColor: "#EAEAEA",
    },
  },
}));

export const FormControlStyled = styled(FormControl)(() => ({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset ": {
      "&.MuiOutlinedInput-notchedOutline": {
        borderColor: "gray",
      },
    },
  },
}));

export const ParcelDeliveryInfoTypography = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "16px",
  color: "#A7A5A6",
  padding: "16px 35px 24px 0",
  "@media (max-width:600px)": {},
}));
export const GridOne = styled(Grid)(() => ({
  margin: "0 4px 0 0",
  fontSize: "12px",
  fontWeight: "500",
  "& > span": {
    fontWeight: "normal",
  },
  "& > spann": {
    color: "#7B7979",
    fontSize: "18px",
    fontWeight: "normal",
  },
  "@media (max-width: 600px)": {
    fontSize: "16px",
  },
}));

export const GridTwo = styled(Grid)(() => ({
  fontSize: "11px",
  "@media (max-width: 600px)": {
    fontSize: "16px",
    margin: "10px 20px",
  },
}));

export const GridThree = styled(Grid)(() => ({
  display: "flex",
}));
export const ChoosePic = styled(Typography)((theme) => ({
  input: {
    display: "none",
    position: "relative",
  },
}));
export const CrossIcon = styled(Icon)(() => ({
  marginLeft: "76px",
  backgroundColor: "white",

  borderRadius: "50%",
  color: "#AD184C",
  lineHeight: "0px",
  "&:hover": {
    cursor: "pointer",
  },
}));

export const ImageFormatText = styled(Grid)(() => ({
  margin: "2px 0 2px 0",
  fontSize: "10px",
  "@media (max-width: 600px)": {
    fontSize: "16px",
  },
}));
export const AddTextGrid = styled(Grid)((theme) => ({
  marginLeft: "20px",
  color: "#7B7979",
  "@media (max-width: 600px)": {
    display: "flex",
    flexDirection: "column",
    flex: "50%",
  },
}));
export const Img = styled(Grid)(() => ({}));
export const MaxPhotos = styled(Grid)(() => ({
  color: "#7B7979",
  Fontfamily: "Montserrat",
  fontWeight: "400",
  fontSize: "10px",
  marginTop: "2px",
}));

export const CourierTypography = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "18px !important",
  color: "#231F20 !important",
  padding: "0 0 0 0",
  "@media (max-width:600px)": {},
}));

export const CourierDescription = styled(Typography)(() => ({
  fontWeight: "400 !important",
  fontSize: "16px !important",
  color: "#231F20 !important",
  padding: "0 0 0 0",
  "@media (max-width:600px)": {},
}));
export const NoteBox = styled(Box)(() => ({
  display: "contents",
  padding: "22px 0 0 30px",
  marginBottom: "16px",
  height: "117px",
  background: "#F7F6F9",
  "@media (max-width:600px)": {},
}));

export const NoteTextTypography = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "16px",
  color: "#231F20",
  padding: "16px",
  background: "#F7F6F9",
  "@media (max-width:600px)": {},
}));

export const ExchangeAndReturnPolicyTypography = styled(Typography)(() => ({
  fontWeight: "400",
  marginTop: "2px",
  fontSize: "16px",
  color: " #AD184C",
  paddingLeft: "10px",
  cursor: "pointer",
  textDecoration: " underline",
  "@media (max-width:600px)": {},
}));

export const ButtonStyled = styled(Button)((disable: any) => ({
  borderRadius: 0,
  padding: "12px",
  width: "100%",
  backgroundColor: " #DEA3B7",
  marginRight: "3px",
  color: " #231F20",
  "&:hover": {
    backgroundColor: " #DEA3B7",
  },

  "@media(max-width:600px)": {
    flexWrap: "wrap",
    whiteSpace: "nowrap",
  },
}));
export const ExchangeTypography = styled(Typography)((disabled: any) => ({
  fontWeight: "600",
  fontSize: "12px",
  color: " #231F20",
  "@media (max-width:600px)": {},
}));
