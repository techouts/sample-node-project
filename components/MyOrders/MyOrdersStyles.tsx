import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import styledComponent from "@emotion/styled";

interface Responsive {
  isMobile?: boolean;
  NotifyMe?: number | any;
}
export const CardStyle = styled(Card)(() => ({
  boxShadow: "none",
  marginTop: "2%",
  bgcolor: "background.paper",
  borderColor: "text.primary",
  border: "0.1px solid gray",
  borderRadius: 0,
  "@media (max-width:600px)": {
    height: "212px",
  },
}));

export const StatusButton = styled(Button)(() => ({
  backgroundColor: "#30ADB2",
  borderRadius: "0px",
  fontSize: "10px",
  "&:hover": {
    backgroundColor: "#30ADB2",
  },
}));

export const TimeDateStyle = styled(Typography)(() => ({
  fontSize: 14,
  "@media (max-width:600px)": {
    fontSize: "10px",
  },
}));
export const StockStatusBox = styled(Box)(() => ({
  position: "relative",
}));
export const StockStatus = styled(Typography)(() => ({
  background: "#1C191A",
  minWidth: "121px",
  minHeight: "36px",
  padding: "0 15px",
  alignItems: "center",
  opacity: "0.7",
  display: "flex",
  color: "#ffffff",
  fontSize: "16px",
  position: "absolute",
  justifyContent: "center",
  transform: "translate(-90%, 48%)",
  top: "0",
  "@media (max-width:600px)": {
    transform: "translate(-86%, 20%)",
    fontSize: "11px",
    fontWeight: "600",
    minWidth: "90px",
    minHeight: "25px",
    top: "16px",
    whiteSpace: "nowrap",
  },
}));
export const CardMediaStyle = styled(CardMedia)(() => ({
  width: "105px",
  height: "150px",
  marginLeft: "2%",
  "@media (max-width:600px)": {
    maxWidth: "85px",
    maxHeight: "123px",
  },
}));
export const OrderCardContent = styled(CardContent)(() => ({
  paddingTop: "16px",
  paddingBottom: "0px !important",
  width: "100%",
  "@media (max-width:600px)": {
    padding: "0px 0px 0px 16px",
  },
}));
export const StockStatusButton = styled(Button)(() => ({
  height: "36px",
  width: "120px",
  opacity: "70%",
  position: "absolute",
  color: "white",
  left: "21%",
  transform: "translateY(170%)",
  borderRadius: 0,
  backgroundColor: "black",
  "&:hover": {
    backgroundColor: "black",
  },
}));

export const StarIconStyle = styled(StarIcon)(() => ({
  width: "15px",
  height: "15px",
}));
export const ProductImage = styledComponent.img`
width:100%;
height:100%;
object-fit: contain;
`;
export const OnlineButton = styled(Button)(() => ({
  backgroundColor: "#F7F6F9",
  fontSize: "16px",
  color: "#AD184C",
  minWidth: "114px",
  minHeight: "33px",
  marginTop: "20px",
  textTransform: "capitalize",
  "@media (max-width:600px)": {
    float: "right",
    minWidth: "75px",
    minHeight: "26px",
    marginRight: "20px",
    fontSize: "11px",
    padding: "0",
  },
}));
export const StatusBox = styled(Box)(({ isMobile }: Responsive) => ({
  display: "flex",
  alignItems: "center",
  gap: isMobile ? "5px" : "12px",
}));
export const CardBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "@media (max-width:600px)": {
    padding: "16px 0px 0px 16px",
  },
}));
export const ProductStack = styled(Stack)(() => ({
  cursor: "pointer",
  position: "relative",
  "@media(max-width:600px)": {
    border: "1px solid rgba(115, 115, 115, 0.3)",
  },
}));
export const MyorderGrid = styled(Grid)(() => ({
  paddingTop: "30px",
}));
export const ProductGrid = styled(Grid)(({ isMobile }: Responsive) => ({
  border: isMobile ? "none" : "1px solid rgba(115, 115, 115, 0.3)",
  position: "relative",
  padding: isMobile ? "" : "10px",
}));

export const PriceButton = styled(Typography)(() => ({
  color: "black",
  gridGap: "10px",
  display: "flex",
  fontWeight: "400",
  alignItems: "center",
  justifyContent: "end",
  "@media (max-width:600px)": {
    display: "block",
    paddingTop: "23px",
    fontSize: "14px",
  },
}));
export const ArrowForwardIosIcons = styled(ArrowForwardIosIcon)(() => ({
  width: "15px",
  height: "15px",
  cursor: "pointer",
}));
export const QuantityTypography = styled(Typography)(() => ({
  "@media (max-width:600px)": {
    fontSize: "11px",
  },
}));
export const ReviewButton = styled(Button)(() => ({
  backgroundColor: "#DEA3B7",
  color: "black",
  fontWeight: "500",
  fontSize: "12px",
  minHeight: "42px",
  letterSpacing: "1px",
  minWidth: "152px",
  width: "100%",
  borderRadius: 0,
  "@media (max-width:600px)": {
    minWidth: "162px",
    width: "100%",
  },
  "&:hover": {
    backgroundColor: "#DEA3B7",
  },
}));

export const ReOrderButton = styled(Button)(({ NotifyMe }: Responsive) => ({
  borderColor: "#DEA3B7",
  color: NotifyMe ? "#DEA3B7" : "#231F20",
  fontSize: "12px",
  minHeight: "42px",
  letterSpacing: "1px",

  borderRadius: 0,
  minWidth: "152px",
  width: "100%",
  "@media (max-width:600px)": {
    minWidth: "162px",
    color: "#231F20",
  },

  "&:hover": {
    borderColor: "#DEA3B7",
    background: "transparent",
  },
}));
export const ImageBox = styled(Box)(({ isMobile }: Responsive) => ({
  display: "flex",
  padding: isMobile ? "12px 0px 17px 16px" : "12px 0px 17px 0px",
  alignItems: "center",
}));

export const RatingDivider = styled(Divider)(() => ({
  color: "black",
}));
export const StarRating = styled(Typography)(() => ({
  fontSize: "16px",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));
export const Review = styled(Box)(() => ({
  display: "flex",
  gridGap: "16px",
  position: "absolute",
  right: "3.6%",
  transform: "translate(10px, -56px)",
  "@media (max-width:600px)": {
    position: "unset",
    alignItems: "center",
    justifyContent: "center",
    float: "unset",
    gridGap: "unset",
    right: "unset",
    padding: "0",
    transform: "unset",
  },
}));
export const Ratingbox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gridGap: "8px",
  width: "100%",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));
export const AverageRating = styled(Stack)(() => ({
  fontSize: "16px",
  "@media (max-width:600px)": {
    fontSize: "12px",
  },
}));
export const StarQuantity = styled(Typography)(() => ({
  fontSize: "16px",
  "@media (max-width:600px)": {
    fontSize: "12px !important",
  },
}));
export const TotalPrice = styled(Box)(() => ({
  "@media (max-width:600px)": {
    width: "100%",
  },
}));
export const ArrowBox = styled(Box)(() => ({
  "@media (max-width:600px)": {
    paddingRight: "20px",
  },
  "& .MuiSvgIcon-root": {
    float: "right",
  },
}));
export const ProductTitle = styled(Typography)(() => ({
  fontSize: "20px",
  float: "left",
  fontWeight: "500",
  width: "87%",
  overflow: "hidden",
  display: "-webkit-box",
  "-webkitLineClamp": "2",
  "-webkitBoxOrient": "vertical",
  "@media (max-width:600px)": {
    fontSize: "12px",
    "-webkitLineClamp": "1",
  },
}));
export const ContBoxs = styled(Box)(() => ({
  display: "flex",
  marginLeft: "3%",
  marginRight: "5%",
  "@media (max-width:600px)": {
    display: "block",
    marginLeft: "0",
    marginRight: "0",
  },
}));
export const ErrorOrders = styled(Box)(() => ({
  padding: "20px 25px",
  "@media (max-width:600px)": {
    padding: "20px 20px",
  },
}));
export const ErrorButton = styled(Button)(() => ({
  marginTop: "20px",
  background: "#AD184C",
  color: "#ffffff",
  "&:hover": {
    background: "#AD184C",
  },
}));
