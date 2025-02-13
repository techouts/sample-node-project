import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

interface Responsive {
  selectedImage: boolean;
  croppedImage: any;
}

interface ConditionStyleApply {
  occasionstext: string;
  selectedOccasion: string;
}

export const ModalBox = styled(Box)(({ theme }) => ({
  " &:focus-visible": {
    outline: "-webkit-focus-ring-color auto 0px",
  },
  width: "100%",
  bgcolor: "background.paper",
  position: "absolute",
}));

export const GiftCardContentBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

export const GiftCardBox = styled(Box)(({ theme }) => ({
  paddingBottom: "0%",
  "@media(max-width:600px)": {},
}));

export const CardBorder = styled(Card)(({ theme }) => ({
  border: "1px solid #EAEAEA",
  borderRadius: 0,
  margin: "auto",
  boxShadow: "none",
  marginTop: "20px",
  "@media(max-width:600px)": {},
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "20px",
  lineHeight: "24.42px",
  paddingBottom: "15px",
  "@media(max-width:600px)": {
    fontSize: "12px",
    paddingBottom: "8px",
    lineHeight: "14.64px",
    fontWeight: 700,
  },
}));

export const BrowserTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "22.4px",
  color: "#4F4C4D",
  paddingBottom: "15px",
  "@media(max-width:600px)": {
    fontSize: "12px",
    paddingBottom: "10px",
    lineHeight: "16.8px",
  },
}));

export const OccasionBox = styled(Grid)(({ isLoadmore }: any) => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "20px",
  "@media(max-width:600px)": {
    display: "grid",
    fontSize: "12px",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "4px",
    justifyItems: "center",
  },
}));

export const LeftItemsOccasionBox = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  paddingTop: "20px",
  "@media(max-width:600px)": {
    display: "grid",
    fontSize: "12px",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "4px",
    paddingTop: "5px",
    justifyItems: "center",
  },
}));
export const OccasionBtnText = styled.p`
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
  margin: 0;
`;
export const OccasionButton = styled(Button)(
  ({ occasionstext, selectedOccasion }: ConditionStyleApply) => ({
    color: "black",
    width: "150px",
    backgroundColor: "#EAE9EF",
    borderColor: "1px solid #EAE9EF",
    "&:hover": {
      backgroundColor: "#EAE9EF",
      borderColor: "#DEA3B7",
    },
    ...(occasionstext == selectedOccasion && {
      borderColor: "#DEA3B7",
      color: "#AD184C",
    }),
    borderRadius: 0,
    fontSize: "16px",
    fontWeight: "400",
    textTransform: "none",
    alignItems: "center",
    "@media(max-width:600px)": {
      fontSize: "11px",
      fontWeight: "400",
      width: "95px",
      marginBottom: "5px",
      padding: "5px 10px",
    },
  })
);

export const LeftItemsOccasionButton = styled(Button)(
  ({ occasionstext, selectedOccasion }: any) => ({
    color: "black",
    minWidth: "147px",
    width: "fit-content",
    backgroundColor: "#EAE9EF",
    borderColor: "1px solid #EAE9EF",
    "&:hover": {
      backgroundColor: "#EAE9EF",
      borderColor: "#DEA3B7",
    },
    ...(occasionstext == selectedOccasion && {
      borderColor: "#DEA3B7",
      color: "#AD184C",
    }),
    borderRadius: 0,
    fontSize: "16px",
    fontWeight: "400",
    textTransform: "none",
    alignItems: "center",
    "@media(max-width:600px)": {
      fontSize: "11px",
      minWidth: "95px",
      fontWeight: "400",
      width: "104px",
      flexWrap: "nowrap",
      marginBottom: "2px",
      padding: "5px 10px",
    },
  })
);

export const ImageBorder = styled(Stack)(({ theme }) => ({
  border: "2px solid red",
  "@media(max-width:600px)": {
    border: "2px solid red",
  },
}));

export const PencilIcon = styled(BorderColorOutlinedIcon)(({ theme }) => ({
  color: "#AD184C",
  fonstSize: "16px",
  textDecorationLine: " underline",
  cursor: "pointer",
  paddingTop: "25px",
  alignItems: "center",
  margin: "0 auto",
  display: "flex",
  "@media(max-width:600px)": {
    fontSize: "12px",
    paddingTop: "25px",
    height: "3.48px",
    width: "3.48px",
  },
}));

export const ImageListStyle = styled(ImageList)(({ theme }) => ({
  bgcolor: "common.black",
  "& .MuiTooltip-arrow": {
    color: "common.black",
  },
  "@media(max-width:600px)": {
    paddingBottom: "8px",
  },
}));

export const TooltipStyle = styled(Tooltip)(({ theme }) => ({
  paddingBottom: "10px",
  margin: " 0 5px ",
  gap: "10px",
  "@media(max-width:600px)": {
    paddingBottom: "8px",
  },
}));

export const ImageCropStyle = styled(Stack)((theme) => ({
  input: {
    display: "none",
    position: "relative",
  },
}));

export const ViewButton = styled(Stack)(({ theme }) => ({
  color: "#AD184C",
  fonstSize: "16px",
  textDecorationLine: " underline",
  cursor: "pointer",
  paddingTop: "26px",
  paddingBottom: "18px",
  alignItems: "center",
  margin: "0 auto",
  display: "flex",
  "@media(max-width:600px)": {
    fontSize: "12px",
    paddingTop: "15px",
    paddingBottom: "15px",
  },
}));

export const ChooseAmtButton = styled(Button)(
  ({ selectedImage, croppedImage }: Responsive) => ({
    color: "#DEA3B7",
    fontSize: "12px",
    cursor: "pointer",
    backgroundColor: "#231F20",
    padding: "14px 40px !important",
    borderRadius: 0,
    margin: "0 auto",
    opacity: croppedImage || selectedImage ? "05" : "0.5",
    display: "flex",
    paddingBottom: "10px",
    "&:hover": {
      backgroundColor: "#231F20",
    },
    "@media(max-width:600px)": {
      fontSize: "11px",
      width: "198px",
      paddingBottom: "8px",
      height: "28px",
    },
  })
);

export const RecivedGiftTitle = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "700",
  color: "#231F20",
  paddingTop: "40px",

  "@media(max-width:600px)": {
    fontSize: "12px",
    paddingTop: "30px",
  },
}));

export const ImageIconBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  right: "10px",
  "@media(max-width:600px)": {},
}));

export const CheckBalnceTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "600",
  color: "#4F4C4D",
  paddingTop: "20px",
  "@media(max-width:600px)": {
    fontSize: "12px",
    fontWeight: "400",
    paddingTop: "8px",
  },
}));

export const RadioGroupCard = styled(RadioGroup)(({ theme }) => ({
  "& .MuiRadio-root.Mui-checked": {
    color: "#AD184C",
  },
  display: "flex",
  flexDirection: "row",

  "@media(max-width:600px)": {},
}));

export const FormControlStyle = styled(FormControlLabel)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "19.0px",
  "@media(max-width:600px)": {
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "19.0px",
  },
}));

export const InputMainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  "@media(max-width:600px)": {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
}));

export const InputTextField = styled(TextField)(({ theme }) => ({
  width: 306,
  "& label.Mui-focused": {
    color: "#AD184C",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#EAEAEA",
    },
  },
  "@media(max-width:900px)": {
    width: 306,
    height: "49px",
  },
  "@media(max-width:600px)": {
    width: 306,
    height: "49px",
  },
}));

export const CheckBalanceButtons = styled(Button)(({ disabled }: any) => ({
  width: 306,
  height: "42px",
  color: "#231F20",
  fontSize: "12px",
  opacity: disabled ? "0.7" : "",
  fontWeight: "600",
  backgroundColor: "#DEA3B7",
  borderRadius: 0,
  "&:hover": {
    backgroundColor: "#DEA3B7",
  },
  "@media(max-width:600px)": {
    height: "28px",
    fontSize: "11px",
  },
}));

export const AddalanceButton = styled(Button)(({ theme }) => ({
  width: 306,
  height: "42px",
  color: "#231F20",
  fontSize: "12px",
  fontWeight: "600",
  borderColor: "#DEA3B7",
  borderRadius: 0,
  "&:hover": {
    borderColor: "#DEA3B7",
  },
  "@media(max-width:600px)": {
    fontSize: "11px",
    fontWeight: "600",
    height: "28px",
  },
}));

export const CheckBalanceNotes = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "21px",
  color: "#656263",
  "@media(max-width:600px)": {
    fontSize: "11px",
    fontWeight: "400",
    lineHeight: "16.0px",
  },
}));

export const ViewLess = styled(Typography)(({ theme }) => ({
  paddinTop: "10px",
  display: "flex",
  flexDirection: "column",
  "& > b": {
    fontSize: "16px",
    color: "#4F4C4D",
  },
  "& > span": {
    display: "flex",
    color: "#4F4C4D",
    fontSize: "16px",
  },
  "@media(max-width:600px)": {},
}));
