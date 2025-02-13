import {styled} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
interface Add {
  isContactus: boolean;
  giftCard?: boolean;
}

export const MainBox = styled(Box)(({ theme }) => ({
  width: "302px",
  paddingTop: "10px",
  marginTop: "2%",
  "@media(max-width:600px)": {
    marginTop: "10px",
    marginLeft: "10px",
    marginBottom: "10px",
  },
}));

export const CaptchaInput = styled(TextField)(
  ({ isContactus, giftCard }: Add) => ({
    width: (isContactus && "650px") || (giftCard && "100%") || "312px",
   "& .MuiInputBase-root.MuiOutlinedInput-root":{
    height: isContactus ? "45px" : "34px",
   },
    marginTop: "7px",
    borderRadius: "0px",
    "& > div": {
      borderRadius: "0px",
    },
    "& div.Mui-focused fieldset": {
      borderColor: "#EAEAEA !important",
    },
    "@media(max-width:600px)": {
      width: isContactus ? "320px" : "250px",
      height: isContactus ? "49px" : "34px",
    },
  })
);

export const CaptchaBox = styled(Box)(({ isContactus }: Add) => ({
  width: "auto",
  height: "43px",
  backgroundColor: "#B3D4D5",
  padding: "1px 30px 1px 30px",
}));

export const CaptchaTextMainBox = styled(Box)(({ isContactus }: Add) => ({
  marginTop: isContactus ? "12px" : "13px",
  display: "flex",
  flexDirection: "column",
}));

export const CaptchaTextnote = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "400",
  lineHeight: "14px",
  opacity: "50%",
}));

export const CaptchaSubmit = styled(Button)(({ disabled }: any) => ({
  backgroundColor: "#231F20",
  borderRadius: "0",
  color: disabled ? "white" : "#DEA3B7",
  opacity: disabled ? "0.9" : "",
  "&:hover": {
    backgroundColor: "#231F20",
  },
}));
