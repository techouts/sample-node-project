import {styled} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// First Card Style
export const ReviewButton = styled(Button)((theme) => ({
  backgroundColor: "#231F20",
  color: "#DEA3B7",
  borderRadius: "0px",
  textAlign: "center",
  fontSize: "12px",
  fontWeight: "500",
  padding: "14px 26px",
  letterSpacing: "1px",
  cursor: "pointer",
  "@media (max-width: 600px)": {
    padding: "6px 17.5px",
  },
  "&:hover": {
    backgroundColor: "#231F20",
    color: "#DEA3B7",
  },
}));

export const Maxphotos = styled(Grid)(() => ({
  color: "#7B7979",
  Fontfamily: "Montserrat",
  fontWeight: "400",
  fontSize: "16px",
  marginTop: "15px",
}));

export const Img = styled(Grid)(() => ({
  marginLeft: "17px",
}));

export const FirstGrid = styled(Grid)(() => ({
  backgroundColor: "#F7F7F7;",
  width: "100%",
  "@media (max-width: 600px)": {
    padding: "10px",
    fontSize: "14px",
  },
}));

export const StyleText = styled(Grid)((theme) => ({
  padding: "20px 0px",
  fontSize: "16px",
  fontWeight: 500,
  color: "#231F20",
  "@media (max-width: 600px)": {
    padding: "10px 0px",
    fontSize: "12px",
  },
}));

// Second Card Style
export const GDCardOne = styled(Grid)((theme) => ({
  position: "fixed",
  background: "#33333395",
  width: "100%",
  height: "100vh",
  top: "0",
  left: "0",
  overflow: "auto",
  // "&::-webkit-scrollbar":{
  //   display: 'none'
  // }
}));

export const GDCardTwo = styled(Grid)((theme) => ({
  position: "relative",
  width: "100%",
  height: "auto",
  margin: "0px auto",
  marginTop: "104px",
  background: "#fff",
  borderRadius: "4px",
  border: "1px solid #999",
  "@media (max-width: 600px)": {
    marginTop: "98px",
    width: "100%",
  },
}));

export const GridOne = styled(Grid)((theme) => ({
  display: "flex",
  alignItems: "center",
  margin: "0px 14px",
  fontWeight: "800",
  fontSize: "22px",
  paddingTop: "46px",
  "@media (max-width: 600px)": {
    paddingTop: "28px",
    margin: "0px 0px",
  },
}));

export const FirstImgGrid = styled(Grid)((theme) => ({
  width: "120px",
  height: "120px",
  backgroundColor: "#fff",
  overflow: "hidden",
  objectFit: "cover",
  backgroundPosition: "center",
  backgroundSize: "50% 2px,2px 50%",
  backgroundRepeat: "no-repeat",
  color: "pink",
  textAlign: "center",
}));

export const FirstImgText = styled(Grid)((theme) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  color: "#333",
  marginLeft: "20px",
}));

export const Typo = styled(Grid)(() => ({
  margin: "5px",
  fontSize: "18px",
  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));

export const Typooo = styled(Grid)((theme) => ({
  margin: "5px 5px 0px 5px",
  fontSize: "18px",
  "& > span": {
    color: "#AD184C",
  },
  "@media (max-width:600px)": {
    fontSize: "11px",
  },
}));

export const Typoo = styled(Grid)((theme) => ({
  fontWeight: "600",
  marginLeft: "4.5px",
  fontSize: "20px",
  "@media (max-width: 600px)": {
    fontSize: "12px",
  },
}));

export const FourTypo = styled(Grid)((theme) => ({
  fontWeight: "600",
  fontSize: "20px",
  "& > span": {
    fontWeight: "normal",
  },
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));

export const InputTypoOne = styled(Grid)((theme) => ({
  margin: "20px 0px",
  width: "68%",
  borderBottom: "1px solid #EAEAEA",
  "@media (max-width:600px)": {
    margin: "0px 0px 20px 0px",
    width: "100%",
  },
}));
export const DescriptionTextareaAutosize = styled(TextareaAutosize)(() => ({
  width: "100%",
  borderColor: "#EAEAEA",
  outline: "none",
  padding: "15px",
  resize: "none",
  fontSize: "16px",
  fontFamily: "Montserrat",
  "&::placeholder": {
    color: "#231F20",
    opacity: "unset",
    fontSize: "14px",
    fontWeight: 400,
    "@media (max-width: 600px)": {
      fontSize: "11px",
    },
  },
  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));
export const ReviewTextField = styled(TextField)(() => ({
  input: {
    "&::placeholder": {
      color: "#231F20",
      fontWeight: 400,
      opacity: "unset",
      fontSize: "14px",
      "@media (max-width: 600px)": {
        fontSize: "11px",
      },
    },
  },
  width: "100%",
  fontSize: "16px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "0",
    width: "100%",
    "& fieldset": {
      borderStyle: "none",
      borderWidth: "0px",
      borderColor: "none",
    },
    "& .MuiOutlinedInput-input": {
      padding: "16.5px 0px",
      marginLeft: "10px",
      "@media (max-width:600px)": {
        fontSize: "11px",
        padding: "10.5px 0px 10.5px 5px",
      },
    },
  },
}));
export const InputTypo = styled(Grid)((theme) => ({
  margin: "20px 0px",
  width: "68%",
  "@media (max-width: 600px)": {
    margin: "0px",
    width: "100%",
  },
}));

export const GridTwo = styled(Grid)((theme) => ({
  display: "flex",
  margin: "20px 0px",

  "@media (max-width: 600px)": {
    margin: "10px 0px",
  },
}));

export const GridThree = styled(Grid)((theme) => ({
  wordSpacing: "3px",
  fontSize: "22px",
  fontWeight: "800",
}));
export const AddPhotoGrid = styled(Grid)(() => ({
  display: "flex",
  gridGap: "20px",
  flexDirection: "column",
  "@media (max-width: 600px)": {
    gridGap: "0px",
  },
}));
export const GridFive = styled(Grid)((theme) => ({
  fontSize: "22px",
  fontWeight: "800",
  "& > span": {
    fontWeight: "normal",
  },
  "& > spann": {
    color: "#7B7979",
    fontSize: "18px",
    fontWeight: "normal",
  },
  "@media (max-width: 600px)": {
    fontSize: "12px",
  },
}));

export const GridSix = styled(Grid)((theme) => ({
  fontSize: "18px",
  color: "#231F20",
  lineHeight: "22.4px",
  "@media (max-width: 600px)": {
    fontSize: "11px",
    margin: "5px 0px",
    color: "#231F20",
    lineHeight: "15.4px",
  },
}));

export const GridSeven = styled(Grid)((theme) => ({
  display: "flex",
  margin: "20px 0px",
  gridGap: "unset",
  "@media (max-width:600px)": {
    gridGap: "14px",
    flexWrap: "wrap",
  },
}));
export const ReviewImagesBox = styled(Box)(() => ({
  "@media (max-width:600px)": {
    minWidth: "103px",
    minHeight: "103px",
  },
}));
export const SubmitButton = styled(Button)(() => ({
  margin: "12px 0px 27px 0px",
  padding: "14px 26px",
  fontWeight: 500,
  lineHeight: "16px",
  backgroundColor: "#231F20",
  color: "#DEA3B7",
  textAlign: "center",
  fontSize: "12px",
  letterSpacing: "1px",
  borderRadius: "0",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#231F20",
    color: "#DEA3B7",
  },
  "@media (max-width: 600px)": {
    width: "100%",
    padding: "6px 0px",
    margin: "0",
    fontSize: "11px",
  },
  ":disabled": {
    backgroundColor: "silver",
    opacity: 0.5,
  },
}));

export const Submit = styled(Button)((theme) => ({
  padding: "14px 26px",
  backgroundColor: "#333",
  color: "#DEA3B7",
  textAlign: "center",
  borderRadius: "0",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#333",
    color: "#DEA3B7",
  },
  "@media (max-width: 600px)": {
    margin: "10px",
    padding: "10px ",
  },
}));

export const CancelButton = styled(Button)((theme) => ({
  padding: "14px 26px",
  backgroundColor: "#333",
  borderRadius: "0px",
  color: "#DEA3B7",
  textAlign: "center",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#333",
  },
  "@media (max-width: 600px)": {
    margin: "10px",
    padding: "10px",
  },
}));

export const AddTextGrid = styled(Grid)((theme) => ({
  color: "#7B7979",
  "@media (max-width: 600px)": {
    display: "flex",
    flexDirection: "column",
    flex: "50%",
  },
}));

// Popup Style
export const GDOne = styled(Grid)((theme) => ({
  position: "fixed",
  background: "#00000085",
  width: "100%",
  height: "100vh",
  top: "0",
  left: "0",
}));

export const GDTwo = styled(Grid)((theme) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
  width: "47%",
  height: "50%",
  textAlign: "center",
  margin: "0px auto",
  maxHeight: "70vh",
  marginTop: "calc(100vh - 70vh)",
  background: "#fff",
  borderRadius: "4px",
  padding: "20px",
  border: "1px solid #999",
  overflow: "auto",
  "@media (max-width: 600px)": {
    width: "100%",
    height: "40%",
    marginTop: "calc(100vh - 64vh)",
  },
}));

export const GDThree = styled(Grid)((theme) => ({
  position: "fixed",
  right: "calc(30% - 30px)",
  top: "calc(100vh - 68vh)",
  width: "26px",
  height: "26px",
  paddingTop: "3.3px",
  paddingRight: "1.4px",
  color: "#AD184C",
  lineHeight: "18px",
  textAlign: "center",
  fontSize: "18px",
  fontWeight: "800",
  "::after": {
    content: '"X"',
  },
  "&:hover": {
    cursor: "pointer",
    border: "1px solid green",
    backgroungColor: "#ccc",
    borderRadius: "50%",
  },
  "@media (max-width: 600px)": {
    right: "calc(14% - 30px)",
    top: "calc(100vh - 62vh)",
  },
}));

export const PopupGrid = styled(Typography)((theme) => ({
  fontSize: "32px",
  fontWeight: "900",
  wordSpacing: "3px",
  letterSpacing: "1px",
  textAlign: "center",
}));

export const PopupGridOne = styled(Typography)((theme) => ({
  fontSize: "20px",
  fontWeight: "400",
  letterSpacing: "1px",
  textAlign: "center",
  padding: "10px",
}));

export const PopupGridTwo = styled(Typography)((theme) => ({
  fontSize: "18px",
  color: "#7B7979",
  marginBottom: "10px",
  textAlign: "center",
}));

export const PopupGridThree = styled(Button)((theme) => ({
  display: "flex",
  margin: "25px auto",
  padding: "14px 26px",
  borderRadius: "0",
  backgroundColor: "#333",
  color: "pink",
  textAlign: "center",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#333",
    color: "pink",
  },
}));
export const Choosepic = styled(Typography)((theme) => ({
  input: {
    display: "none",
    position: "relative",
  },
}));

export const Crossicon = styled(Icon)((theme) => ({
  marginTop: "7px",
  marginLeft: "74px",
  color: "#AD184C",
  lineHeight: "0px",
  "&:hover": {
    cursor: "pointer",
  },
}));

export const Imgwarning = styled(Typography)((theme) => ({
  color: "#EB5757",
  Fontfamily: "Montserrat",
  fontWeight: "400",
  fontSize: "11px",
  Lineheight: "13.12px",
  marginBottom: "0px",
  "@media (max-width: 600px)": {
    marginBottom: "25px",
  },
}));

export const Addoption = styled(Grid)((theme) => ({
  display: "flex",
  alignItems: "center",
  gridGap: "10px",
  marginTop: "20px",
  "@media (max-width: 600px)": {
    gridGap: "3px",
    marginTop: "25px",
  },
}));
export const MaxTypography = styled(Typography)(() => ({
  color: "#7B7979",
  fontSize: "16px",
  "@media (max-width: 600px)": {
    fontSize: "10px",
  },
}));

export const Optional = styled(Grid)((theme) => ({
  color: "#231F20",
  Fontfamily: "Montserrat",
  fontWeight: "400",
  fontSize: "18px",
  Lineheight: "25.2px",
  marginleft: "100px",
}));
export const Infoerror = styled(Grid)((theme) => ({
  Fontfamily: "Montserrat",
  fontWeight: "400",
  color: "#231F20",
  Lineheight: "19.6px",
  fontSize: "14px",
  marginBottom: "15px",
}));
