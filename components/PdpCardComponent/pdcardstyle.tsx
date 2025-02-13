import styled from "@emotion/styled";
import { TabList } from "@mui/lab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ButtonGroup from "@mui/material/ButtonGroup";
import { transientProps } from "../../utility/TransientProps";
export interface Responsive {
  ismobile: boolean;
}
export interface ShadeVariant {
  backgroundcolor: string;
  varianttype: string;
}
//corousel and product image styles
export const CarouselMainBox = styled(Box)(() => ({
  position: "relative",
  display: "block",
}));
export const CarouselCommoBox = styled(Box)(() => ({
  display: "flex",
  position: "relative",
  "@media(max-width:600px)": {
    flexDirection: "column-reverse",
    alignItems: "center",
  },
}));
export const VerticalCarouselBox = styled(Box)(() => ({
  width: "15%",
}));
export const CarouselLargImg = styled(Box)(() => ({
  width: "85%",
  flexWrap: "wrap",
  "@media(max-width:600px)": {
    width: "100%",
  },
}));
export const LargeImgIconsMainBox = styled(Box)(() => ({
  position: "relative",
}));
export const Icon = styled.img`
  width: 80%;
`;
export const FavIcon = styled(Box)(() => ({
  position: "absolute",
  cursor: "pointer",
  background: "#FFF",
  height: "40px",
  width: "40px",
  borderRadius: "40px",
  bottom: "unset",
  top: "1%",
  right: "3%",
  "@media(max-width:600px)": {
    zIndex: "1",
    height: "30px",
    width: "30px",
    bottom: "5%",
    top: "unset",
  },
}));
export const BSBanner = styled(Box)(() => ({
  position: "absolute",
  top: "5%",
  left: "1%",
  cursor: "pointer",
  "@media(max-width:600px)": {
    zIndex: "1",
    top: "3%",
  },
}));
export const VariantIcon = styled(Box)(() => ({
  position: "absolute",
  bottom: "3%",
  left: "3%",
  cursor: "pointer",
  "@media(max-width:600px)": {
    bottom: "5%",
    width: "50px",
    height: "30px",
    backgroundColor: "white",
    borderRadius: "25px",
    padding: "3px 4px 2px 4px ",
  },
}));
export const LikeShare = styled(Box)(() => ({
  position: "absolute",
  top: "5%",
  right: "3%",
  display: "flex",
  gap: 5,
  "@media(max-width:600px)": {
    zIndex: "9",
    top: "3%",
  },
}));
export const MobieLike = styled(Box)(() => ({
  fontSize: "18px",
  backgroundColor: "White",
  borderRadius: "50px",
}));
export const MobieLike1 = styled(Box)(() => ({
  display: "flex",
  whiteSpace: "pre",
  columnGap: "5px",
  alignItems: "center",
  padding: "3px 1px 1px 10px",
}));
export const MobieShare = styled(Box)(() => ({
  justifyContent: "center",
  backgroundColor: "White",
  height: "30px",
  width: "30px",
  display: "flex",
  alignItems: "center",
  borderRadius: "25px",
}));
export const TypographyDown = styled(Typography)(() => ({
  fontWeight: "600",
}));
export const TypographyHidden = styled(Typography)(() => ({
  color: "#A7A5A6",
}));
export const ProductTitle = styled(Typography)(() => ({
  color: "#231F20",
  fontWeight: 500,
  fontSize: "20px",
  lineHeight: "140%",
}));
export const InclusiveOffers = styled(Typography)(
  ({ ismobile }: Responsive) => ({
    color: "#979596",
    fontWeight: "400",
    fontSize: ismobile ? "10px" : "14px",
    lineHeight: "120%",
  })
);
export const OffersTitle = styled(Typography)(() => ({
  color: "#231F20",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "120%",
  paddingBottom: "12px",
}));
//Content styles
export const GridBox = styled(Box)(() => ({
  display: "grid",
  gridAutoColumns: "fr",
  alignItems: "center",
  justifyContent: "space-between",
}));
export const BrandBox = styled(Box)(({ ismobile }: Responsive) => ({
  fontWeight: 500,
  fontSize: ismobile ? "20px" : "20px",
  textDecorationLine: "underline",
  color: "#231F20",
  paddingBottom: "5px",
  textUnderlineOffset: "5px",
}));
export const MobileBrandBox = styled(Box)(({ ismobile }: Responsive) => ({
  fontWeight: 600,
  fontSize: ismobile ? "14px" : "18px",
  textDecorationLine: "underline",
  color: "#231F20",
  paddingBottom: "5px",
  textUnderlineOffset: "5px",
  cursor: "pointer",
}));
export const TitleBox = styled(Box)(() => ({
  gridRow: "1",
  gridColumn: "span 3",
  width: "95%",
}));
export const LikeGridBox = styled(Box)(() => ({
  gridRow: "1",
  gridColumn: "span 2",
  fontSize: "18px",
}));
export const LikeAlignBox = styled(Box)(() => ({
  display: "flex",
  columnGap: "5px",
  alignItems: "center",
  float: "right",
}));
export const IconBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  columnGap: "20px",
  gridRow: "1",
  cursor: "pointer",
}));
export const ShareBox = styled(Box)(() => ({
  width: "24px",
  height: "24px",
}));
export const Price = styled(Typography)(({ ismobile }: Responsive) => ({
  fontSize: ismobile ? "16px" : "20px",
  lineHeight: "140%",
  fontWeight: 400,
  color: "#AD184C",
}));
export const PriceLabel = styled(Typography)(({ ismobile }: Responsive) => ({
  fontSize: ismobile ? "16px" : "20px",
  lineHeight: "140%",
  fontWeight: 400,
  color: "#979596",
  marginRight: "6px",
}));
export const PriceSO = styled(Typography)(({ ismobile }: Responsive) => ({
  fontSize: ismobile ? "12px" : "16px",
  lineHeight: "120%",
  fontWeight: 400,
  color: "#979596",
  textDecorationLine: "line-through",
  paddingLeft: "6px",
}));
export const Off = styled(Typography)(({ ismobile }: Responsive) => ({
  fontSize: ismobile ? "12px" : "16px",
  lineHeight: "120%",
  whiteSpace: "nowrap",
  paddingLeft: "4px",
  paddingRight: "4px",
  color: " #231F20",
  fontWeight: 400,
}));
export const PriceBoxContainer = styled(Box)(({ ismobile }: Responsive) => ({
  display: ismobile ? "block" : "flex",
  alignItems: "center",
}));
export const PriceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;
export const Offers = styled.div<Responsive>`
  padding: 2% 2% 1% 2%;
  margin: 10px 0 20px 0;
  background-color: #f7f6f9;
`;
export const OffersUl = styled.div`
  line-height: 80%;
  color: #656263;
`;
export const KnowMoreTypo = styled(Typography)`
  color: #ad184c;
  text-decoration: underline;
  padding-left: 5px;
  display: inline;
`;
export const Review = styled.div(() => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "16px",
  "@media(max-width:600px)": {
    gap: "4px",
    marginTop: "9px",
  },
}));
export const RatingTag = styled.div(() => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  "@media(max-width:600px)": {
    gap: "4px",
  },
}));
export const WriteAskTypo = styled(Typography)(() => ({
  textDecoration: "underline",
  fontSize: "16px",
  color: "#231F20",
  whiteSpace: "nowrap",
  cursor: "pointer",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
export const OffersListItem = styled(Typography)(() => ({
  padding: "8px 0px 0px 16px",
  "@media(max-width:600px)": {
    padding: "0px",
  },
}));
export const ViewMoreTypo = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  text-decoration-line: underline;
  color: #ad184c;
  padding: 3% 0 0 3%;
`;
export const MenuuSelectShade = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
`;
export const SelectShade = styled(Box)(() => ({
  display: "inline-flex",
  alignItems: "center",
  fontSize: "16px",
  marginTop: "20px",
  "@media(max-width:600px)": {
    marginTop: "10px",
  },
}));
export const SelectShadeText = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #231f20;
`;
export const MenuSelectStack = styled(Stack)`
  flex-direction: initial;
  align-items: center;
`;
export const MenuSelectedShade = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #ad184c;
  padding-left: 5px;
`;
export const Wrapper = styled(Box)(() => ({
  display: "grid",
  gridtemplateRows: "50px 1fr",
  width: "80%",
}));
export const Container = styled(Box)(() => ({
  display: "grid",
  gridtemplateColumns: " repeat (6, minmax(32px, 1fr))",
  gridautoRows: "32px",
  gridGap: "10px",
  overflowY: "auto",
}));
export const Card = styled(Box)(() => ({
  backgroundColor: "green",
}));
export const SizeList = styled(Box)(() => ({
  display: "flex",
  gridGap: "10px",
  marginTop: "20px",
}));
export const SizeMenu = styled(Button)<{ selected: boolean }>(
  ({ selected }) => ({
    minHeight: "33px",
    minWidth: "86px",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "none",
    backgroundColor: "#F5F5F5",
    cursor: "pointer",
    boxSizing: "border-box",
    borderRadius: "0px",
    outline: selected ? "1px solid #231F20" : "0px",
    color: "#231F20",
    "@media (max-width: 600px)": {
      fontSize: "12px",
    },
  })
);

export const ListS = styled(
  Box,
  transientProps
)<{ ismobile: boolean }>(({ ismobile }) => ({
  display: "flex",
  gap: ismobile ? "8px" : "12px",
  padding: ismobile ? "15px 10px" : "20px 16px",
  maxHeight: ismobile ? "118px" : "116px",
  flexWrap: "wrap",
  overflowY: "auto",
  boxSizing: "border-box",
}));

export const ColorPaletteWrapperBox = styled(
  ListItem,
  transientProps
)<{ available: boolean; selected: boolean; ismobile: boolean }>(
  ({ available, selected, ismobile }) => ({
    width: ismobile ? "46px" : "38px",
    height: ismobile ? "46px" : "38px",
    padding: "6px 0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent !important",
    cursor: available ? "pointer" : "arrow",
    border: selected ? "1px solid #7B7979" : "0px",
  })
);

export const ColorPalette = styled(
  ListItem,
  transientProps
)<{
  swatch_color: string;
  available: boolean;
  selected: boolean;
  ismobile: boolean;
}>(({ swatch_color, available, selected, ismobile }) => ({
  width: ismobile ? "40px" : "32px",
  height: ismobile ? "40px" : "32px",
  background: `#F8D4B7 url("${swatch_color}") no-repeat`,
  backgroundSize: "100%",
  backgroundColor: "#F8D4B7 !important",
  cursor: available ? "pointer" : "arrow",
}));
export const CrossBox = styled(Box)`
  width: 100%;
  height: 100%;
  border: 1px solid #7b7979;
  position: absolute;
  box-sizing: border-box;
  overflow: hidden;
  top: 0;
  left: 0;
`;
export const Line1 = styled(Box)`
  width: calc(1.414 * 100%);
  transform: rotate(45deg);
  transform-origin: top left;
  border-top: 1px solid #7b7979;
  position: absolute;
  top: 0px;
  left: 0px;
  box-sizing: border-box;
`;
export const Line2 = styled(Box)`
  width: calc(1.414 * 100%);
  transform: rotate(-45deg);
  transform-origin: bottom left;
  border-top: 1px solid #7b7979;
  position: absolute;
  bottom: 0px;
  left: 0px;
  box-sizing: border-box;
`;
export const ListItemSet = styled(ListItem)(
  ({ backgroundcolor, varianttype }: ShadeVariant) => ({
    cursor: "pointer",
    backgroundImage: backgroundcolor,
    border: varianttype,
  })
);
export const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: "150px",
  borderRadius: "0",
  border: " 1px solid #DEA3B7",
  marginRight: "10px",
  color: "#231F20",
  height: "45px",
  marginTop: "25px",
  padding: "0 30px 0 30px",
  ":disabled": {
    opacity: 0.7,
  },
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: "#FFFFFF",
    color: "#231F20",
    border: " 1px solid #DEA3B7",
  },
}));
export const AddCartButton = styled(Button)(({ theme }) => ({
  minWidth: "150px",
  borderRadius: "0",
  border: " solid #DEA3B7 thin",
  marginRight: "10px",
  color: "#231F20",
  height: "45px",
  marginTop: "25px",
  padding: "0 30px 0 30px",
  backgroundColor: "#DEA3B7",
  ":disabled": {
    opacity: 0.7,
  },
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: "#DEA3B7",
    color: "#231F20",
    border: " solid #DEA3B7 thin",
  },
}));
export const ButtonTypography = styled(Typography)(() => ({
  fontSize: "12px",
  lineHeight: "140p%",
  fontWeight: 600,
  whiteSpace: "nowrap",
  flexWrap: "nowrap",
  color: "#231F20",
  letterSpacing: "1px",
}));
export const ShadeBox = styled(Box)(() => ({
  display: "grid",
  // margin: "1% 0 0 0",
  width: "fit-content",
  // maxWidth: "90%",
  // maxHeight: "108px",
  border: "1px solid lightgray",
  "@media(max-width:600px)": {
    maxWidth: "100%",
  },
}));
export const SelectSize = styled(Typography)(() => ({
  padding: "2% 0 0 0",
  fontSize: "16px",
  lineHeight: "140%",
  fontWeight: "400",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
export const SelectSizeList = styled(Typography)(() => ({
  display: "flex",
  paddingTop: "1%",
}));
export const SelectSizeTypo = styled(Typography)(() => ({
  height: "100%",
  width: "100%",
  backgroundColor: "#F7F6F9",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "150%",
  padding: "8% 24% ",
  flexDirection: "row",
  whiteSpace: "nowrap",
  "&:hover, &.Mui-focusVisible": {
    color: "black",
    border: "1px solid gray",
  },
}));
export const SizeTab = styled(Tab)(() => ({
  backgroundColor: "#F7F6F9",
  margin: "0 10px 3px 0",
  padding: "0px 20px",
  color: "#231F20",
  textTransform: "lowercase",
  minHeight: "36px",
  "& .MuiButtonBase-root-MuiTab-root, &.Mui-selected": {
    color: "black",
    border: "1px solid grey",
  },
}));
export const TabsListItems = styled(TabList)(() => ({
  minHeight: "0px",
}));
//delivery styles
export const TextFieldBox = styled(TextField)(() => ({
  backgroundColor: "#FFFFFF",
  input: {
    "&::placeholder": {
      color: "#231F20",
      fontWeight: 400,
      opacity: "unset",
      fontSize: "14px",
    },
  },
  "& .MuiOutlinedInput-root": {
    paddingRight: "0px",
    borderRadius: "0px",
    padding: "0.5%",
  },
  "& .MuiInputAdornment-root": {
    padding: "6px 1px 6px 0px",
  },
  "& .MuiOutlinedInput-input": {
    padding: "10.5px 14px",
    color: "#231F20",
  },
  width: "100%",
  // To remove up and down arrows in input
  "input::-webkit-outer-spin-button,input::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "input[type=number]": {
    "-moz-appearance": "textfield",
  },
}));
export const Buttonlabel = styled(Button)(() => ({
  backgroundColor: "#231F20",
  color: "#FFFFFF",
  width: "95px",
  height: "43px",
  letterSpacing: "1px",
  borderRadius: 0,
  "&:hover": {
    background: "#231F20",
    color: "#FFFFFF",
    outline: "1px solid #FFFFFF",
  },
}));
//Advatage Styles
export const GridCont = styled(Grid)(() => ({
  display: "Block",
}));
export const GItem = styled(Grid)(() => ({
  backgroundColor: "#F7F6F9",
  padding: "2%",
  cursor: "pointer",
}));
export const StackStyle = styled(Stack)(() => ({
  alignItems: "center",
  flexDirection: "row",
  gridGap: 3,
}));
export const Iconimg = styled.img`
  width: 100%;
`;
export const EasyAuthenticText = styled(Typography)(() => ({
  fontWeight: "500",
  color: "#231F20",
  display: "Block",
  cursor: "pointer",
  fontSize: "18px",
  lineHeight: "140%",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
function img(img: any) {
  throw new Error("Function not implemented.");
}
/* Bottom nav styles */
export const BottomNav = styled(Box)(() => ({
  position: "fixed",
  bottom: 0,
  width: "100%",
  textAlign: "center",
  backgroundColor: "#ffffff",
  padding: "18px 16px",
  boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
  borderTopRightRadius: "20px",
  borderTopLeftRadius: "20px",
  zIndex: "999",
}));
export const StyledGroup = styled(ButtonGroup)(() => ({
  borderRadius: "0px",
  columnGap: "8px",
}));
export const StyledButtons = styled(Button)(({ ismobile }: Responsive) => ({
  color: "#231F20",
  borderRadius: "0px",
  boxShadow: "none",
  height: ismobile ? "28px" : "50px",
}));
export const StyledText = styled(Typography)(() => ({
  fontSize: "11px",
  padding: "6px 0px",
  fontWeight: 500,
  lineHeight: "16px",
  letterSpacing: "1px",
}));
export const NotifyMeText = styled(Typography)(() => ({
  fontSize: "16px",
  padding: "15px 5px",
  fontWeight: 400,
  lineHeight: "22.4px",
  fontStyle: "normal",
  color: "#231F20",
  textDecorationLine: "underline",
  textTransform: "none",
}));
export const EditedBox = styled(
  Box,
  transientProps
)<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "100%" : "15%",
  "& img": {
    height: isMobile ? "70px" : "100%",
  },
}));

export const ZoomedBox = styled(
  Box,
  transientProps
)<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "100%" : "85%",
  overflowY: "scroll",
  maxHeight: "80vh",
  padding: "5px",
}));

export const StyledBox = styled(Box)(() => ({
  "& img": {
    height: "360px",
  },
}));

export const TooltipText = styled(
  Typography,
  transientProps
)<{ isHovering: boolean; pos: any }>(({ isHovering, pos }) => ({
  position: "fixed",
  left: isHovering ? `${pos[0] + 20}px` : "0px",
  top: isHovering ? `${pos[1] + 20}px` : "0px",
  fontSize: "12px",
  padding: "2px 4px",
  backgroundColor: "#231F20",
  color: "#FFF",
  zIndex: "99",
  display: isHovering ? "block" : "none",
}));
export const CustomAnchor = styled.a`
  position: relative;
  pointer-events: none;
  z-index: 2;
`;
export const NotifyMe = styled(Typography)(() => ({
  textDecoration: "underline",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "140%",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));
export const NotifySubmit = styled(Button)(() => ({
  fontSize: "12px",
  fontWeight: 500,
  lineHeight: "140%",
  padding: "7px 26px",
  color: "#FFFFFF",
  background: " #231F20",
  letterSpacing: "1px",
  borderRadius: "0px",
  ":hover": {
    color: "#FFFFFF",
    background: "#231F20",
  },
  "@media(max-width:600px)": {
    fontSize: "11px",
    padding: "2px 10px",
  },
}));

export const BestSellerButton = styled(Button)(() => ({
  display: "flex",
  fontSize: "12px",
  fontWeight: 500,
  color: "#231F20",
  background: "#FFFFFF",
  letterSpacing: "1px",
  borderRadius: "0px",
  position: "relative",
  margin: "0px 0px 0px 12px",
  border: "1px solid #231F20",
  ":hover": {
    color: "#231F20",
    background: "#FFFFFF",
  },
  "@media(max-width:600px)": {
    fontSize: "11px",
    padding: "2px 10px",
  },
}));

export const FeaturedButton = styled(BestSellerButton)(() => ({
  zIndex: 999,
  color: "#BD446E",
  marginTop: "10px",
  position: "absolute",
  border: "1px solid #BD446E",
  ":hover": {
    color: "#BD446E",
  },
}));

export const IncrementButton = styled(Button)(({ theme }) => ({
  border: 'none',
  fontSize: '1.55rem',
  minWidth:"42px",
  padding:"0px 0px",
  color: '#7F7F7F',
  paddingLeft: '0.7rem',
  paddingRight: '0.7rem',
  backgroundColor: '#F7F7F8',
  '&:hover, &.Mui-focusVisible': {
    backgroundColor: '#DEA3B7', // Hover color
    color: '#231F20', // Text color on hover
    border: 'none', // Additional border styles on hover if needed
  },
}));
export const DecrementButton = styled(Button)(({ theme }) => ({
  border: 'none',
  fontSize: '1.55rem',
  minWidth:"42px",
  padding:"0px 0px",
  color: '#7F7F7F',
  paddingLeft: '0.7rem',
  paddingRight: '0.7rem',
  backgroundColor: '#F7F7F8',
  '&:hover, &.Mui-focusVisible': {
    backgroundColor: '#DEA3B7', // Hover color
    color: '#231F20', // Text color on hover
    border: 'none', // Additional border styles on hover if needed
  },
}));


export const IncrementMobileButton = styled(Button)(({ theme }) => ({
  width:"20%",
  height:"28px",
  border: 'none',
  fontSize: '1.55rem',
  minWidth:"42px",
  padding:"0px 0px",
  color: '#7F7F7F',
  paddingLeft: '0.7rem',
  paddingRight: '0.7rem',
  backgroundColor: '#F7F7F8',
  '&:hover, &.Mui-focusVisible': {
    backgroundColor: '#DEA3B7', // Hover color
    color: '#231F20', // Text color on hover
    border: 'none', // Additional border styles on hover if needed
  },
}));
export const DecrementMobileButton = styled(Button)(({ theme }) => ({
  width:"20%",
  height:"28px",
  border: 'none',
  fontSize: '1.55rem',
  minWidth:"42px",
  padding:"0px 0px",
  color: '#7F7F7F',
  paddingLeft: '0.7rem',
  paddingRight: '0.7rem',
  backgroundColor: '#F7F7F8',
  '&:hover, &.Mui-focusVisible': {
    backgroundColor: '#DEA3B7', // Hover color
    color: '#231F20', // Text color on hover
    border: 'none', // Additional border styles on hover if needed
  },
}));