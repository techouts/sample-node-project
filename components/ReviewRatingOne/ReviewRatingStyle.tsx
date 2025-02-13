import styled from "@emotion/styled";
import { Typography, Grid, Box, TextField, Button } from "@mui/material";


interface Responsive{
  isMobile:boolean
}


export const MainBox = styled(Box)(() => ({
  "@media(max-width : 600px)": {
    padding: "3%",
  },
  marginBottom: "40px",
  background: "#F7F6F9",
}));

export const ContentGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  margin: "20px auto",
  "@media(max-width: 600px)": {
    display: "block",
    margin: "12px auto",
  },
}));

export const EditAndDeleteIcons = styled(Box)(() => ({
  "@media(max-width : 600px)": {
    paddingBottom: "20px",
    margin: "0px",
    marginRight: "0px",
  },
  display: "flex",
  marginLeft: "12px",
  justifyContent: "end",
  cursor: "pointer",
  marginRight: "24px",
}));
export const DeleteIconWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  paddingTop: "24px",
  width: "100%",
  justifyContent: "space-between",
}));

export const ContentWrapperGrid = styled(Grid)(() => ({
  width: "100%",
  margin: "0px",
  paddingLeft: "20px",
  whiteSpace: "break-spaces",
  "@media(max-width: 600px)": {
    width: "100%",
    paddingLeft: "0px",
  },
}));

export const ContentMainImage = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const FirstImageUnderTitleStyle = styled(Typography)(() => ({
  marginTop: "30px",
  color: "#FFFFFF",
  padding: "7px 12px",
  backgroundColor: "#C65D82",
  fontWeight: "500",
  fontSize: "14px",
  lineHeight: "150%",
  height: "35px",
}));

export const ModerationFailedStyle = styled(Typography)(() => ({
  marginTop: "30px",
  color: "#fff",
  padding: "5px 10px",
  backgroundColor: "#D41A1A",
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "150%",
  height: "30px",
}));

export const MainVisibleContent = styled(Grid)(() => ({
  marginLeft: "6%",
  marginBottom: "5%",
  width: "100%",
  "@media(max-width: 600px)": {
    margin: "10px auto",
  },
}));

export const StyledTypography = styled(Typography)(() => ({
  lineHeight: "120%",
  fontSize: "16px",
  marginTop: "8px",
  marginBottom: "20px"
}));

export const AddPhotosBox = styled(Box)(() => ({
  fontWeight: 400,
  fontSize: "16px",
  color: "#7B7979 ",
  lineHeight: "20px",
  textDecoration: "underline 1px #7B7979",
}));

export const ErrorMsg = styled(Typography)(() => ({
  color: "#AD184C",
}));

export const ImageSizeErrorMsg = styled(Typography)(() => ({
  color: "#AD184C",
}));

export const CrossMarkEntity = styled(Typography)(() => ({
  backgroundColor: "#fff",
  border: "1px solid #fff",
  borderRadius: "50%",
  textAlign: "center",
  lineHeight: "20px",
  fontWeight: 900,
  cursor: "pointer",
  height: "20px",
  width: "20px",
  fontSize: "12px",
  marginLeft: "-10px",
  marginTop: "-10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  "@media(max-width: 600px)": {
    marginLeft: "39px",
    marginTop: "-6px",
    width: "16px",
    height: "16px",
    fontSize: "12px",
  },
}));

export const CommonTitle = styled(Typography)(() => ({
  "@media(max-width: 600px)": {
    backgroundColor: "#F7F6F9",
    fontSize: "16px",
  },
  fontSize: "16px",
  marginBottom: "10px",
  fontWeight: "600",
  lineHeight: "120%"
}));

export const MainVisibleContentTitle = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "140%",
  fontFamily: "Helvetica Neue,Helvetica"
}));

export const TitleAndDescription = styled(Typography)(() => ({
  marginRight: "20px",
  padding: "1px 1px 1px 12px",
  backgroundColor: "#FFFFFF",
  marginBottom: "20px"
}));

export const ImageTextField = styled(TextField)((ismobile) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: ismobile ? "48px" : "80px",
  height: ismobile ? "48px" : "80px",
  position: "absolute",
  opacity: "0",
}));

export const UploadForImage = styled(Grid)(({ image, ismobile }: any) => ({
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  objectFit: "cover",
  width: ismobile ? "48px" : "80px",
  height: ismobile ? "48px" : "80px",
  overflow: "hidden",
  backgroundPosition: "center",
  backgroundColor: "#fff",
}));

export const UploadedViewImage = styled.img<Responsive>`
  width: ${(props) => (props.isMobile ? "48px" : "80px")};
  height: ${(props) => (props.isMobile ? "48px" : "80px")};
  object-fit: fill;
`;

export const SaveButton = styled(Button)(() => ({
  "@media(max-width: 600px)": {
    width: "40%",
    marginLeft: "8%",
  },
  backgroundColor: "#DEA3B7",
  marginTop: "20px",
  textTransform: "uppercase",
  borderRadius: "0px",
  color: "#333",
  "&:hover": {
    backgroundColor: "#DEA3B7",
  },
}));

export const CancelButton = styled(Button)(() => ({
  "@media(max-width: 600px)": {
    width: "40%",
  },
  borderColor: "#DEA3B7",
  marginTop: "20px",
  borderRadius: "0px",
  textTransform: "uppercase",
  marginLeft: "15px",
  color: "#333",
  "&:hover": {
    borderColor: "#DEA3B7",
  },
}));

export const UploadedImage = styled(Box)(() => ({
  backgroundRepeat: "no-repeat",
  objectFit: "cover",
  height: "80px",
  maxHeight: "80px",
  overflow: "hidden",
  margin: "3px",
}));

export const UploadImageField = styled(Box)((ismobile) => ({
  display: "grid",
  gridTemplateColumns: "auto auto auto auto auto",
  "@media(max-width: 600px)": {
    display: "grid",
    gridTemplateColumns: "auto auto auto auto auto",
  },
}));

export const AllImagesUploaded = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "auto auto auto auto auto",
  "@media(max-width: 600px)": {
    display: "flex",
    // gridTemplateColumns: "auto auto auto",
  },
}));

// Modal Style
export const ModelMessageBox = styled(Grid)(() => ({
  textAlign: "center",
  marginTop: "20%",
}));

export const ModalFirstTypography = styled(Typography)(() => ({
  width: "60%",
  margin: "5px auto",
  textTransform: "capitalize",
  fontSize: "20px",
  fontWeight: "600",
  "@media(max-width: 600px)": {
    width: "80%",
  },
}));

export const ShowToastMessage = styled(Typography)(() => ({
  margin: "20px auto",
}));

export const ModalYesButton = styled(Button)(() => ({
  textTransform: "uppercase",
  backgroundColor: "#DEA3B7",
  color: "#333",
  marginTop: "8%",
  width: "25%",
  borderRadius: "0px",
  "&:hover": {
    backgroundColor: "#DEA3B7",
  },
  "@media(max-width: 600px)": {
    width: "38%",
  },
}));

export const ModalCancelButton = styled(Button)(() => ({
  borderColor: "#DEA3B7",
  textTransform: "uppercase",
  marginLeft: "15px",
  color: "#333",
  marginTop: "8%",
  width: "25%",
  borderRadius: "0px",
  "&:hover": {
    borderColor: "#DEA3B7",
  },
  "@media(max-width: 600px)": {
    width: "38%",
  },
}));
