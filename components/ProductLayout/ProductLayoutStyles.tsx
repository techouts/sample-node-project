import {styled} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import StyledComponent from "@emotion/styled";
import { transientProps } from "../../utility/TransientProps";
interface IndexInterface {
  index: number;
}
interface Responsive {
  isMobile: boolean;
}
export const FlexBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(($isMobile) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: $isMobile ? "0px" : "32px 0px",
  rowGap: "12px",
  padding: $isMobile ? "10px 0px" : "16px 0px",
}));
export const PageBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
}));
export const StyledText = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "400",
  color: "#1C191A",
  alignSelf: "flex-start",
  "@media (max-width:600px)": {
    fontSize: "10px",
  },
  textTransform: "capitalize"
}));
export const NoProductsText = styled(Typography)(() => ({
  position: "absolute",
  left: "35%",
  transform: "translate(-50%)",
  whiteSpace: "nowrap",
  fontWeight: "600",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "10px",
  "@media (max-width:600px)": {
    position: "relative",
    transform: "translate(-0%)",
    left: "0%",
  },
}));
export const StyledChip = styled(Chip)(() => ({
  borderRadius: 0,
  border: "0px",
  color: "#231f20",
  fontWeight:"400",
  backgroundColor: "#EAE9EF",
  minWidth: "130px",
  justifyContent: "space-between",
  margin: "0px 16px 18px 0px",
}));
export const ClearButton = styled(Typography)(() => ({
  color: "#AD184C",
  fontWeight: "500",
  fontSize: "12px",
  cursor: "pointer",
}));
export const CustomInput = styled(Input)(() => ({
  width: "36px",
  height: "36px",
  margin: "0 5px",
  border: "1px solid #EAEAEA",
  "&:after": {
    borderBottom: "0",
  },
  "&:before": {
    borderBottom: "0",
  },
  "&>input": {
    textAlign: "center",
  },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
}));
export const StyledButton = styled(Button)(({ theme }) => ({
  lineHeight: 3,
  fontSize: "12px",
  position: "absolute",
  width: "100%",
  marginBlock: "auto",
  backgroundColor: "#231F20",
  color: "#DEA3B7",
  borderRadius: "0",
  boxShadow: "none",
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: "#231F20",
    color: "#DEA3B7",
    boxShadow: "none",
  },
  "@media(max-width: 900px)": {
    fontSize: "10px",
    lineHeight: 2,
  },
  "@media(max-width: 600px)": {
    fontSize: "8px",
  },
}));
export const PaginationText = styled(Typography)(() => ({
  color: "#656263",
  fontSize: "14px",
  lineHeight: "17px",
  "@media(max-width: 600px)": {
    fontSize: "12px",
  },
}));
export const StyledPagination = styled(Pagination)(() => ({
  "& .MuiButtonBase-root.Mui-selected": {
    color: "#231F20",
    fontWeight: 500,
  },
  "& .MuiButtonBase-root": {
    color: "#A7A5A6",
    margin:"0px",
  },
  ".Mui-selected": {
    "background-color": "transparent !important",
  },
  "& .MuiPagination-ul": {
    flexWrap: "unset !important",
  },
  "& .MuiPagination-ul li svg": {
    color: "#AD184C !important",
  },
  "& .Mui-disabled": {
    opacity: "1 !important",
  },
}));
export const ButtonText = styled(Typography)(() => ({
  color: "#656263",
  fontSize: "14px",
  lineHeight: "17px",
  "@media(max-width: 600px)": {
    fontSize: "12px",
  },
}));
export const ButtonBox = styled(Box)(({ theme }) => ({
  color: "#AD184C",
  cursor: "pointer",
}));
export const ContentImg = StyledComponent.img`
  height: 100%;
  width:100%;
`;
export const StyledImage = StyledComponent.img`
    width: 100%;
    height: 100%;
    object-fit: cover
`;
export const NoProducts = styled(Box)(() => ({
  position: "relative",
  marginTop: "20px",
  "@media(max-width: 600px)": {
    marginTop: "10px",
  },
}));
export const SingleCard = styled(Box)(({ index }: IndexInterface) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: `${index % 2 === 0 ? "column-reverse" : "column"}`,
  cursor: "pointer",
}));
