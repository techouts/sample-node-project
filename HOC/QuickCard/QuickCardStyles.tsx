import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { transientProps } from "../../utility/TransientProps";
export interface ModalInterface {
  ismobile: boolean;
  loading: any;
}
export interface IconInterface {
  isFilled: boolean;
}
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
export const StyledGrouped = styled(ButtonGroup)(() => ({
  borderRadius: "0px",
}));
export const StyledButton = styled(Button)(({ ismobile }: any) => ({
  minWidth: "152px",
  borderRadius: "0px",
  boxShadow: "none",
  boxSizing: "border-box",
  position: "relative",
  whiteSpace: "nowrap",
  marginRight: ismobile ? "0px" : "16px",
  padding: ismobile ? "0px" : "0px 40px",
  height: ismobile ? "28px" : "45px",
}));
export const StyledText = styled(
  Typography,
  transientProps
)<{ isMobile: boolean }>(({ isMobile }) => ({
  fontSize: isMobile ? "11px" : "12px",
  color: "#231F20",
  fontWeight: 500,
}));
export const OuterBox = styled(Box)(
  ({ ismobile, loading }: ModalInterface) => ({
    minwidth: ismobile ? "150px" : "360px",
    height: ismobile ? "300px" : "450px",
    position: "relative",
    border: loading ? "1px solid rgba(155, 155, 155, 0.3)" : "0px",
  })
);

export const StyledGroup = styled(ButtonGroup)(() => ({
  borderRadius: "0px",
}));

export const Review = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  padding-right: 18px;
  span {
    text-decoration: underline;
    font-size: 14px;
    color: #231f20;
  }
`;
export const ListS = styled(
  Box,
  transientProps
)<{ isMobile: boolean }>(({ isMobile }) => ({
  display: "flex",
  gap: isMobile ? "8px" : "10px",
  padding: isMobile ? "8px 0px" : "18px 0px",
  maxHeight: isMobile ? "76px" : "116px",
  flexWrap: "wrap",
  overflowY: "auto",
  boxSizing: "border-box",
  border: "none",
}));
export const SizeList = styled.div`
  display: flex;
  grid-gap: 10px;
`;

export const StyledSelect = styled.select`
  width: 100%;
  height: 45px;
  padding: 12px;
  -webkit-appearance: none;
  border: 1px solid #dea3b7;
  cursor: pointer;
  outline: none;
`;
export const SelectBox = styled(Box)(() => ({
  position: "relative",
  minWidth: "55px",
  marginRight: "8px",
  boxSizing: "border-box",
  outline: "none",
}));
export const ArrowIcon = styled.img`
  position: absolute;
  right: 7px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;
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
export const BottomButtons = styled(DialogActions)`
  justify-content: start;
  padding: 30px 0px 18px !important;
  padding-top: 30px !important;
  @media (max-width: 600px) {
    padding: 0px !important;
  }
`;
export const ResetButton = styled(Button)`
  border: 1px solid #dea3b7;
  border-radius: 0px;
  text-transform: capitalize;
  color: #dea3b7;
`;
export const FilterButton = styled(Button)`
  background: #dea3b7;
  color: #231f20;
  text-transform: capitalize;
  border-radius: 0px;
  &:hover {
    background: #dea3b7;
  }
`;
export const HeartIcon = styled.img<IconInterface>`
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: ${(props) => (props.isFilled ? "-20px" : "-10px")};
  @media (max-width: 600px) {
    top: 0px;
    width: ${(props) => (props.isFilled ? "30px" : "15px")};
  }
  width: ${(props) => (props.isFilled ? "40px" : "20px")};
`;
export const OfferIcon = styled.img`
  width: 21px;
  @media (max-width: 600px) {
    width: 14px;
  }
`;
export const DiscountIcon = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  color: "#231F20",
  columnGap: "8px",
  "@media (max-width: 600px)": {
    fontSize: "12px",
  },
}));

export const ItemCarousel = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
  min-height: 290px;
  @media (max-width: 600px) {
    padding-bottom: 0px;
    min-height: 135px;
  }
`;
export const CloseButton = styled(CloseIcon)`
  color: #ad184c;
`;
export const DescriptionGrid = styled(Grid)`
  background-color: #f9f6f7;
  padding: 40px;
  @media (max-width: 600px) {
    padding: 25px 18px 10px 10px;
  }
`;
export const RatingText = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: 600,
}));
export const ColorsText = styled(
  Typography,
  transientProps
)<{ isMobile: boolean }>(({ isMobile }) => ({
  fontSize: isMobile ? "10px" : "20px",
  fontWeight: "400",
  color: "#231f20",
}));
export const PDPTitle = styled(Typography)`
  font-size: 20px;
  color: #231f20;
  font-weight: 500;
  padding: 10px 30px 0px 0px;
  @media (max-width: 600px) {
    font-size: 12px;
    padding: 0px;
  }
`;
export const ReviewQA = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  color: #231f20;
  text-decoration: underline;
  padding-right: 5px;
  cursor: pointer;
  opacity: 0.8;
  @media (max-width: 600px) {
    font-size: 10px;
    padding: 0px;
  }
`;

export const SlashText = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  color: #231f20;
  padding-right: 5px;
  opacity: 0.8;
`;

export const ColorPaletteWrapperBox = styled(
  ListItem,
  transientProps
)<{ available: boolean; selected: boolean; isMobile: boolean }>(({ available, selected,isMobile }) => ({
  width: isMobile ? "34px" : "38px",
  height: isMobile ? "34px" : "38px",
  padding: "6px 0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent !important",
  cursor: available ? "pointer" : "arrow",
  border: selected ? "1px solid #7B7979" : "0px",
}));

export const ColorPalette = styled(
  ListItem,
  transientProps
)<{ swatch_color: string; isMobile: boolean }>(
  ({ swatch_color, isMobile }) => ({
    width: isMobile ? "28px" : "32px",
    height: isMobile ? "28px" : "32px",
    background: `#F8D4B7 url("${swatch_color}") no-repeat`,
    backgroundSize: "100%",
    backgroundColor: "#F8D4B7 !important",
  })
);

export const CrossBox = styled(Box)`
  width: 100%;
  height: 100%;
  border: 1px solid #7b7979;
  position: absolute;
  box-sizing: border-box;
  overflow: hidden;
  left:0;
  top:0;
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

export const PriceTag = styled(Typography)`
  font-size: 24px;
  font-weight: 400;
  color: #ad184c;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;
export const Amount = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;
export const RegularPrice = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  padding-left: 15px;
  text-decoration: line-through;
  color: #979596;
  @media (max-width: 600px) {
    font-size: 12px;
    padding-left: 5px;
  }
`;
export const DiscountPercentage = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  padding-left: 6px;
  @media (max-width: 600px) {
    font-size: 10px;
    padding: 2px;
  }
`;
export const CardImage = styled.img`
  margin: 0 auto;
  width: 100%;
  max-height: 290px;
  @media (max-width: 600px) {
    max-height: 135px;
  }
`;
export const ProductDetails = styled(Typography)`
  color: #ad184c;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 500;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: 10px;
    margin-top: 10px;
  }
`;

export const ButtonStyledExchange = styled(Button)(() => ({
  marginBottom: "10px",
  borderRadius: 0,
  // padding: "14px 26px",
  width: "239px",
  height: "45px",
  backgroundColor: " #DEA3B7",
  marginRight: "3px",
  color: "#231F20",
  "&:hover": {
    backgroundColor: " #DEA3B7",
  },

  "@media(max-width:600px)": {
    flexWrap: "wrap",
    whiteSpace: "nowrap",
    width: "100%",
  },
}));

export const ExchangeTypography = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "12px",
  color: "#231F20",
  textAlign: "center",
  "@media (max-width:600px)": {},
}));


export const IncrementButton = styled(Button)(() => ({
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
export const DecrementButton = styled(Button)(() => ({
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
