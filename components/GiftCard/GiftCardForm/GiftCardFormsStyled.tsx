import {styled} from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import styleEmotion from "@emotion/styled";

interface Responsive {
  isMobile: boolean;
}

export const ModalBackButtons = styled(Typography)(({ theme }) => ({
  left: "2%",
  top: "3%",
  cursor: "pointer",
  marginBottom: "20px",
  marginTop: "20px",
}));

export const GiftFormMainBox = styled(Typography)((theme) => ({
  width: "100%",
  height: "100%",
  backgroundColor: "white",
  padding: "53px 5% 5% 7% ",
  "@media(max-width:600px)": {
    fontSize: "14px",
    padding: "20px 5% 5% 5% ",
  },
}));

export const ChooseAmount = styled(Typography)((theme) => ({
  Fontfamily: "Montserrat",
  fontWeight: "700",
  fontSize: "20px",
  color: "#231F20",
  marginBottom: "20px",
  "@media(max-width:600px)": {
    fontSize: "14px",
  },
}));
export const StyledCloseicon = styled(Box)((theme) => ({
  display: "flex",
  direction: "rtl",
  color: "#AD184C",
  right: "30%",
  marginBottom: "33px",
  "@media(max-width:600px)": {
    right: "10%",
  },
}));

export const Choosingamount = styled(Box)((theme) => ({
  display: "flex",
}));
export const AmounthelperText = styleEmotion.small`
  color: rgb(211, 47, 47);
  line-height:140%;
  letter-spacing: 1px;
  font-size: 12px;
  font-weight: 500;
  display: block;
  margin: 4px 0px 0px;
`;
export const Selectamount = styled(Box)((theme) => ({
  border: "1px solid black",
  margin: "10px 15px 0px 0px",
  width: "199px",
  height: "64px",
  cursor: "pointer",
  textAlign: "center",
  padding: "21px 15px",
  "@media(max-width:600px)": {
    width: "100%",
    textAlign: "none",
    height: "45px",
    padding: "12px",
  },
}));
export const Heading = styled(Typography)((theme) => ({
  Fontfamily: "Montserrat",
  fontWeight: "700",
  fontSize: "20px",
  color: "#231F20",
  margin: "62px 0px 11px 0px ",
  "@media(max-width:600px)": {
    marginTop: "32px",
    fontSize: "16px",
  },
}));
export const Headingtwo = styled(Typography)((theme) => ({
  Fontfamily: "Montserrat",
  fontWeight: "700",
  fontSize: "20px",
  color: "#231F20",
  paddingTop: "20px",
  "@media(max-width:600px)": {
    paddingTop: "10px",
    fontSize: "16px",
  },
}));
export const Helptext = styled(Typography)((theme) => ({
  Fontfamily: "Montserrat",
  fontWeight: "400",
  fontSize: "14px",
  color: "#A7A5A6",
  marginTop: "4px",
}));
export const StyledButton = styled(Button)(() => ({
  color: "#FFFFFF",
  borderRadius: "0px",
  marginTop: "30px",
  fontSize: "16px",
  padding: "12px 50px",
  fontWeight: "600",
  background: "#231F20",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#231F20",
  },
  "@media(max-width:600px)": {
    width: "100%",
    display: "none ",
  },
}));
export const ProceedPayButton = styled(Button)(
  ({disabled }: any) => ({
    cursor: "pointer",
    opacity: disabled ? "0.5" : "",
    color: "white !important",
    borderRadius: "0px",
    marginTop: "30px",
    fontSize: "16px",
    padding: "12px 50px",
    fontWeight: "600",
    background: "#231F20",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#231F20",
    },
    "@media(max-width:600px)": {
      width: "100%",
      height: "30px",
      padding: "10x 10px",
      marginBottom: "50px",
    },
  })
);
export const StyledBox = styled(Box)(({ isMobile }: any) => ({}));
export const StyledTextFiled = styled(TextField)(() => ({
  marginTop: "20px",
  "& input": {
    padding: "14px",
  },
  "& > div": {
    borderRadius: "0px",
  },
  "& label.Mui-focused": {
    color: "#AD184C !important",
  },

  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "rgb(192, 192, 192) !important",
    },
  },
}));
export const StyledTextFiledtwo = styled(TextField)(() => ({
  marginTop: "20px",
  "& input": {
    padding: "14px",
  },
  "& > div": {
    borderRadius: "0px",
  },
  "& label.Mui-focused": {
    color: "#AD184C !important",
  },
  "& div.Mui-focused fieldset": {
    borderColor: "rgb(192, 192, 192) !important",
  },
}));
export const Preview = styled(Typography)((theme) => ({
  Fontfamily: "Montserrat",
  fontWeight: "700",
  fontSize: "20px",
  color: "#231F20",
  paddingTop: "40px",
  paddingBottom: "18px",
  "@media(max-width:600px)": {
    fontSize: "16px",
    paddingTop: "10px",
    paddingBottom: "25px",
  },
}));

export const Giftcards = styled(Box)((theme) => ({
  display: "flex",
  justifyContent: "space-between",
  "@media(max-width:600px)": {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export const FromSenderStyle = styled(Grid)((theme) => ({
  display: "grid",
  "@media(max-width:600px)": {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

export const Note = styled(Stack)((theme) => ({
  Fontfamily: "Montserrat",
  fontWeight: "700",
  fontSize: "16px",
  color: "#231F20",
  Lineheight: "24px",
  "@media(max-width:600px)": {
    fontSize: "12px",
    fontWeight: "700",
    Lineheight: "16.8px",
    marginTop: "15px",
  },
}));
export const AmountNote = styled(Stack)((theme) => ({
  Fontfamily: "Montserrat",
  fontWeight: "700",
  fontSize: "16px",
  color: "#231F20",
  Lineheight: "24px",
  "@media(max-width:600px)": {
    fontSize: "12px",
    fontWeight: "700",
    Lineheight: "24px",
  },
}));
export const PleaseNote = styled(Typography)((theme) => ({
  Fontfamily: "Montserrat",
  fontWeight: "700",
  fontSize: "16px",
  color: "#231F20",
  Lineheight: "24px",
  marginTop: "20px",
}));
export const Importantnote = styled(Typography)((theme) => ({
  Fontfamily: "Montserrat",
  fontWeight: "400",
  fontSize: "16px",
  color: "#231F20",
  Lineheight: "24px",
  marginTop: "12px",
  "@media(max-width:600px)": {
    fontSize: "12px",
    fontWeight: "600",
    Lineheight: "24px",
  },
}));
export const Styledpoints = styled(Typography)((theme) => ({
  whiteSpace: "pre-wrap",
  Fontfamily: "Montserrat",
  fontWeight: "400",
  fontSize: "16px",
  color: "#231F20",
  Lineheight: "24px",
  marginTop: "16px",
}));
export const Text = styled(Typography)((theme) => ({
  Fontfamily: "Montserrat",
  fontWeight: "700",
  fontSize: "16px",
  color: "#000000",
  borderLeft: "2px solid #000000",
  paddingLeft: "10px",
  marginTop: "16px",
  marginBottom: "17px",
  "@media(max-width:600px)": {
    marginBottom: "25px",
  },
}));
export const TitleImage = styled(Typography)((theme) => ({
  textAlign: "center",
}));
export const Images = styled(Typography)(({ isMobile }: Responsive) => ({
  textAlign: "center",
}));
export const Stylednames = styled(Stack)((theme) => ({
  Fontfamily: "Montserrat",
  fontWeight: "400",
  fontSize: "16px",
  Lineheight: "24px",
  color: "#A7A5A6",
  marginTop: "15px",
  "@media(max-width:600px)": {
    fontSize: "12px",
    Lineheight: "16.8px",
  },
}));
export const Styleddate = styled(Typography)((theme) => ({
  Fontfamily: "Montserrat",
  fontWeight: "400",
  fontSize: "16px",
  Lineheight: "24px",
  color: "#A7A5A6",
  "@media(max-width:600px)": {
    fontSize: "12px",
    fontWeight: "400",
    Lineheight: "24px",
    color: "#A7A5A6",
  },
}));
export const StyledGd = styled(Grid)((theme) => ({
  display: "flex",
  gridGap: "20px",
}));
