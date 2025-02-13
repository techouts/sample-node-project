import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

interface Responsive {
  isMobile: boolean;
  isEdit?: boolean;
}
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
  padding: "10px 0 24px 0",
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
  width: "74%",
  padding: "24px 24px 24px 30px",
  border: "1px solid #EAE9EF",
  borderRadius: "10px",
  marginTop: "24px",
  "@media (max-width:600px)": {
    width: "100%",
    marginTop: "10px",
  },
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
  "& .MuiSvgIcon-root.MuiSelect-icon": {
    display: "none",
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
export const ReturnTypography = styled(Typography)((disabled: any) => ({
  fontWeight: "600",
  fontSize: "12px",
  color: " #231F20",
  "@media (max-width:600px)": {},
}));

// Add Bank Details Form styles

export const AddButton = styled(Button)(({ isMobile }: Responsive) => ({
  borderRadius: 0,
  padding: isMobile ? "2px" : "12px",
  width: isMobile ? "97%" : "117px",
  marginRight: "3px",
  backgroundColor: "#231F20",
  color: "white !important",
  "&:hover": {
    backgroundColor: " #231F20",
  },
}));
export const SaveButton = styled(Button)(({ isMobile }: Responsive) => ({
  borderRadius: 0,
  padding: isMobile ? "2px" : "12px",
  width: isMobile ? "142px" : "117px",
  backgroundColor: " #231F20",
  marginRight: isMobile ? "" : "3px",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: " #231F20",
  },
}));
export const CancelTypography = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    cursor: "pointer",
    color: "#4F4C4D",
    fontWeight: "400",
    fontSize: "14px",
    textAlign: "center",
    textDecorationLine: "underline",
    alignSelf: "center",
    paddingLeft: "28px",
    paddingRight: isMobile ? "52px" : "",
  })
);
export const MainBox = styled(Box)(({ isMobile }: Responsive) => ({
  padding: isMobile ? "25px 16px" : "32px",
}));
export const ButtonsBox = styled(Box)(({ isMobile, isEdit }: Responsive) => ({
  paddingTop: isMobile ? "16px" : "32px",
  display: "flex",
  justifyContent: isMobile ? (isEdit ? "space-between" : "") : "center",
}));

// Remove Bank Derails Modal Styles
export const TextTypography = styled(Typography)(() => ({
  fontWeight: "500",
  fontSize: "24px",
  color: "#231F20",
  textAlign: "center",
  "@media (max-width:600px)": {
    fontSize: "14px",
  },
}));
export const CancelText = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "12px",
  color: "#231F20",
  textAlign: "center",
}));
export const ButtonStyledSecondary = styled(Button)(() => ({
  borderRadius: 0,
  padding: "12px",
  minWidth: "106px",
  backgroundColor: " #DEA3B7",
  marginRight: "3px",
  color: "#231F20",
  "&:hover": {
    backgroundColor: " #DEA3B7",
  },
  "@media(max-width:600px)": {
    flexWrap: "wrap",
    whiteSpace: "nowrap",
    minWidth: "102px",
    padding: "5px",
  },
}));
export const YesText = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "12px",
  color: "#FFFFFF",
  textAlign: "center",
  "@media (max-width:600px)": {},
}));
export const ButtonBox = styled(Button)(({ isMobile }: any) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: isMobile ? "25px" : "39px",
  gap: isMobile ? "12px" : "15px",
}));
export const RemoveBankDetailsContentBox = styled(Button)(() => ({
  padding: "74px 40px 89px 45px",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  "@media(max-width:600px)": {
    padding: "50px 19px",
  },
}));
export const YesButton = styled(Button)(() => ({
  borderRadius: 0,
  padding: "12px",
  minWidth: "78px",
  backgroundColor: " #231F20",
  marginRight: "3px",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: " #231F20",
  },

  "@media(max-width:600px)": {
    flexWrap: "wrap",
    whiteSpace: "nowrap",
    minWidth: "60px",
    padding: "5px",
  },
}));
export const IconBox = styled(Box)(({ isMobile }: Responsive) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  right: isMobile ? "5%" : "2%",
}));
