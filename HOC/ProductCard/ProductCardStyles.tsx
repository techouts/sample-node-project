import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/material";
import Link from "@mui/material/Link";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import StarIcon from "@mui/icons-material/Star";
import { transientProps } from "../../utility/TransientProps";
export interface Responsive {
  isMobile: boolean;
}
export interface TagsInterface {
  isMobile: boolean;
  colored: boolean;
}
export interface HeartInterface {
  isFilled: boolean;
}
export interface SpecialCardResponsive {
  isMobile: boolean;
  isSpecialCard: boolean;
}
export interface LoadingInterface {
  isMobile: boolean;
  loading: any;
  isSpecialCard: boolean;
}

export const StyledLink = styled(Link)(() => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  zIndex: "1",
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
  z-index: 2;
`;
export const OuterBox = styled(
  Box,
  transientProps
)<{
  isMobile: boolean;
  loading: boolean;
  isSpecialCard: boolean;
}>(({ isMobile, loading, isSpecialCard }) => ({
  minwidth: isMobile ? "150px" : "360px",
  minHeight: isMobile ? "370px" : "470px",
  position: "relative",
  border: loading ? "1px solid rgba(155, 155, 155, 0.3)" : "0px",
  background: isSpecialCard ? "#F8EDF1" : "#FFFFFF",
}));
export const BorderBox = styled(
  Box,
  transientProps
)<{ isMobile: boolean; loading: boolean }>(({ isMobile, loading }) => ({
  width: "100%",
  minHeight: isMobile ? "320px" : "470px",
  border: loading ? "0px" : "1px solid rgba(155, 155, 155, 0.3)",
  borderBottom: "0px",
  position: "relative",
  overflow: "hidden",
}));
export const StyledGroup = styled(ButtonGroup)(() => ({
  borderRadius: "0px",
  zIndex: "2 !important",
}));
export const StyledButton = styled(
  Button,
  transientProps
)<{ isMobile: boolean }>(({ isMobile }) => ({
  color: "#231F20",
  borderRadius: "0px",
  boxShadow: "none",
  padding: "0px",
  height: isMobile ? "28px" : "50px",
  zIndex: "2 !important",
}));
export const StyledText = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: "500",
  zIndex: "2 !important",
  color: "#231F20",
  "@media screen and (max-width: 600px)": {
    fontSize: "11px",
  },
}));
export const WishlistIconGrid = styled(Grid)<{ isMobile: boolean }>(
  ({ isMobile }) => ({
    height: isMobile ? "30px" : "40px",
    width: isMobile ? "30px" : "40px",
    background: "#fff",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    flexGrow: "0",
    flexShrink: "0",
    flexBasis: isMobile ? "30px" : "40px",
  })
);
export const StyledStack = styled(Stack)(() => ({
  alignItems: "center",
  columnGap: "4px",
  zIndex: "2 !important",
  backgroundColor: "#fff",
  borderRadius: "2px",
  padding: "2px",
}));
export const MainStack = styled(Stack)<{ isMobile: boolean }>(
  ({ isMobile }) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    zIndex: "99",
    width: "100%",
    flexWrap: "nowrap",
    padding: isMobile ? "10px" : "10px 10px 10px 16px",
    "@media screen and (max-width: 1000px)": {
      padding: isMobile ? "10px" : "10px",
    },
  })
);
export const ImageGrid = styled(
  Grid,
  transientProps
)<{ isMobile: boolean }>(({ isMobile }) => ({
  position: "relative",
  height: "245px",
  textAlign: "center",
  cursor: "pointer",
  overflow: "hidden",
  margin: isMobile ? "8px 0px" : "20px 0px 0px 0px",
  "@media screen and (min-device-width: 600px) and (max-device-width: 1024px)":
    {
      height: "235px",
    },
  "@media screen and (max-width: 600px)": {
    height: "175px",
  },
}));

export const TagsStack = styled(
  Stack,
  transientProps
)<{ isMobile: boolean }>(({ isMobile }) => ({
  flexDirection: isMobile ? "column" : "row",
  alignItems: isMobile ? "flex-start" : "center",
  columnGap: "20px",
  "@media screen and (min-width: 600px) and (max-width: 1024px)": {
    columnGap: "8px",
  },
}));
export const IconStack = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));
export const RatingBox = styled(Box)(() => ({
  position: "absolute",
  fontSize: "14px",
  bottom: "0px",
  right: "10px",
  zIndex: "2",
}));
export const RatingsText = styled(
  Typography,
  transientProps
)<{ isMobile: boolean }>(({ isMobile }) => ({
  fontSize: isMobile ? "10px" : "14px",
  fontWeight: 500,
  padding: "0px",
  color: "green",
}));
export const VariantsText = styled.p`
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin: 0px;
  padding-bottom: 8px;
  @media screen and (max-width: 600px) {
    padding: 0px;
  }
`;
export const TitleText = styled.p<SpecialCardResponsive>`
  font-size: ${(props) =>
    props?.isMobile ? "12px" : props?.isSpecialCard ? "20px" : "16px"};
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
  color: #231f20;
  margin: 0;
  margin-bottom: 8px;
  text-align: ${(props) => (props.isSpecialCard ? "center" : "inherit")};
  line-height: 140%;
  padding: ${(props) => (props.isSpecialCard ? "0px 4px" : "0px")};
`;
export const TagsText = styled.p<TagsInterface>`
  font-size: ${(props) => (props?.isMobile ? "8px" : "10px")};
  font-weight: 500;
  overflow: hidden;
  color: ${(props) => (props?.colored ? "#AD184C" : "#231f20")};
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin: 0px;
  margin-top: ${(props) => (props?.isMobile ? "0px" : "2px")};
`;

export const PriceText = styled.span<Responsive>`
  color: #ad184c;
  font-weight: 700;
  font-size: ${(props) => (props.isMobile ? "12px" : "16px")};
`;

export const MoneySign = styled.span<Responsive>`
  color: #ad184c;
  font-weight: 500;
  font-size: ${(props) => (props.isMobile ? "12px" : "16px")};
`;

export const DiscountOff = styled.span<Responsive>`
  color: green;
  font-weight: 500;
  font-size: ${(props) => (props.isMobile ? "8px" : "12px")};
  padding-left: 4px;
`;

export const GrayText = styled.span<Responsive>`
  color: #979596;
  font-weight: 500;
  font-size: ${(props) => (props.isMobile ? "10px" : "14px")};
  padding-left: 4px;
`;

export const OffPrice = styled.span<Responsive>`
  color: #979596;
  font-weight: 500;
  font-size: ${(props) => (props.isMobile ? "8px" : "12px")};
  padding-left: 6px;
  text-decoration: line-through;
`;

export const GiftsText = styled(
  Typography,
  transientProps
)<{ isMobile: boolean }>(({ isMobile }) => ({
  fontSize: isMobile ? "8px" : "12px",
  fontWeight: 400,
  color: "#231F20",
  opacity: "0.8",
  cursor: "pointer",
  paddingTop: isMobile ? "4px" : "8px",
}));
export const FallBackBox = styled(Box)(() => ({
  width: "100%",
  margin: "0 auto",
  height: "245px",
  position: "relative",
  "@media screen and (min-device-width: 600px) and (max-device-width: 900px)": {
    height: "235px",
  },
  "@media screen and (max-width: 600px)": {
    height: "175px",
  },
}));
export const ProdImage = styled.img`
  height: 100%;
`;

/* ICONS */
export const CloseIcon = styled(CloseRoundedIcon)(() => ({
  cursor: "pointer",
  zIndex: "2 !important",
}));
export const StarMuiIcon = styled(
  StarIcon,
  transientProps
)<{ isMobile: boolean }>(({ isMobile }) => ({
  height: isMobile ? "12px" : "18px",
  color: "green",
}));
export const HeartIcon = styled.img<HeartInterface>`
  cursor: pointer;
  z-index: 2 !important;
  width: ${(props) => (props.isFilled ? "40px" : "20px")};
  @media screen and (max-width: 600px) {
    width: ${(props) => (props.isFilled ? "30px" : "15px")};
  }
`;
export const PDPHeartIcon = styled(
  "img",
  transientProps
)<{ $isEmptyHeart: boolean }>(({ $isEmptyHeart }) => ({
  padding: $isEmptyHeart ? "10px" : "0px",
  "@media (max-width:600px)": {
    padding: $isEmptyHeart ? "9px 7.5px 9px 8px" : "0px",
  },
  width: "100%",
  height: "100%",
  cursor: "pointer",
  zIndex: "2 !important",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const TagIcon = styled.img<Responsive>`
  ${(props) =>
    props?.isMobile
      ? `
    width: 10px;
    height: 10px;`
      : `width: 14px;height: 14px;`}
`;
const breatheAnimation = keyframes`
 0% { opacity: 0.3 }
 30% { opacity: 0.5 }
 50% { opacity: 0.7 }
 70% { opacity: 0.9 }
 100% { opacity: 1; }
`;
export const LoaderBox = styled(Typography)(() => ({
  animationName: breatheAnimation,
  animationDuration: "1s",
  animationIterationCount: "infinite",
}));
export const QuickViewButton = styled(
  Typography,
  transientProps
)<{ inStock: boolean }>(({ inStock }) => ({
  background: inStock ? "rgba(222, 163, 183, 0.83)" : "rgba(28, 25, 26, 0.7)",
  width: inStock ? "100%" : "90%",
  textAlign: "center",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: inStock ? "0px" : "25px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  height: inStock ? "42px" : "36px",
  color: inStock ? "#231F20" : "#FFFFFF",
  fontSize: "16px",
  fontWeight: "500",
  zIndex: "2 !important",
  "@media (max-width:600px)": {
    bottom: "0px",
    width: inStock ? "100%" : "95%",
    height: inStock ? "30px" : "36px",
    fontSize: "12px",
  },
}));
export const SpecialCardWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));
export const SpecialCardSubTitle = styled(
  Typography,
  transientProps
)<{ isMobile: boolean }>(({ isMobile }) => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: isMobile ? "10px" : "14px",
  lineHeight: "150%",
  textAlign: "center",
  color: "#656263",
  textTransform: "capitalize",
  padding: "0px 4px",
  margin: isMobile ? "2px 0px 10px 0px" : "2px 0px 14px 0px",
}));
export const SpecialCardStyledButton = styled(
  Button,
  transientProps
)<{ isMobile: boolean; isSpecialCard: boolean }>(
  ({ isMobile, isSpecialCard }) => ({
    color: isSpecialCard ? "#DEA3B7" : "#231F20",
    borderRadius: "0px",
    boxShadow: "none",
    padding: isSpecialCard ? (isMobile ? "6px 18px" : "14px 26px") : "0px",
    background: isSpecialCard ? "#231F20" : "none",
    height: isMobile
      ? isSpecialCard
        ? "32px"
        : "28px"
      : isSpecialCard
      ? "44px"
      : "50px",
  })
);
export const SpecialCardImage = styled.img<Responsive>`
  max-height: ${(props) => (props.isMobile ? "144px" : "285px")};
  width: 100%;
  padding: 8px 8px;
`;
export const TypographyText = styled(Typography)(({ theme }) => ({
  fontWeight: "400",
  fontSize: "16px",
  paddingBottom: "30px",
  lineHeight: "27.2px",
  "@media(max-width:768px)": {
    fontSize: "12px",
    lineHeight: "20px",
  },
}));
export const Buttons = styled(Button)(() => ({
  backgroundColor: "#231F20",
  borderRadius: "0px",
  color: "#DEA3B7",
  padding: "14px 26px",
  marginRight: "16px",
  "&:hover": {
    backgroundColor: "#231F20",
  },
}));

export const InnerBox = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));
