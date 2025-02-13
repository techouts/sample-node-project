import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
interface Responsive {
  isMobile: boolean;
}
export interface HeartInterface {
  isWishlist: number;
}
export const ImageBox = styled(Box)(() => ({
  position: "relative",
  border: "0.3px solid #A7A5A6",
  cursor: "pointer"
}));

export const WishlistImageIcon = styled.img<HeartInterface>`
  max-height: ${(props) => (props.isWishlist ? "40px" : "12px")};
`;
export const ProductImage = styled.img<Responsive>`
  height: 100%;
  width: 100%;
`;
export const WishImage = styled(Box)(({ isWishlist }: HeartInterface) => ({
  position: "absolute",
  top: "6px",
  left: "6px",
  cursor: "pointer",
  padding: isWishlist ? "" : "6px",
  backgroundColor: "#FFFFFF",
  borderRadius: "50%",
}));
export const ContentBox = styled(Box)(() => ({
  borderTop: "0.3px solid #A7A5A6",
  borderRight: "0.3px solid #A7A5A6",
  backgroundColor: "#F5F5F5",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));
export const TitleBox = styled(Box)(({ isMobile }: Responsive) => ({
  display: "grid",
  padding: isMobile ? "5px 6px 3px 8px" : "8px 10px 0px 10px",
  gap: isMobile ? "4px" : "6px",
}));

export const TitleText = styled.p`
  font-size: 16px;
  line-height: 140%;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 0px;
  color: #231f20;
  cursor: pointer
`;

export const RatingBox = styled(Box)(() => ({
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  paddingTop: "5px",
}));
export const RatingText = styled(Typography)(({ isMobile }: Responsive) => ({
  fontSize: `${isMobile ? "11px" : "14px"}`,
  lineHeight: `${isMobile ? "12px" : "17px"}`,
  fontWeight: "400",
  color: "#231F20",
}));
export const StarIcon = styled(Typography)(() => ({
  fontSize: "medium",
}));
export const MRPText = styled(Typography)(({ isMobile }: Responsive) => ({
  fontSize: `${isMobile ? "12px" : "16px"}`,
  lineHeight: `${isMobile ? "16px" : "140%"}`,
  fontWeight: "600",
  color: "#AD184C",
}));
export const PriceBox = styled(Box)(() => ({
  display: "flex",
  gap: "5px",
  paddingTop: "5px",
}));
export const ButtonBox = styled(Button)(({ isMobile }: Responsive) => ({
  width: "100%",
  letterSpacing: "1px",
  fontSize: "12px",
  color: "#231F20",
  borderRadius: "0",
  backgroundColor: "#DEA3B7",
  zIndex: "999",
  "&.MuiButton-root": {
    lineHeight: "1rem",
  },
  ":hover": {
    backgroundColor: "#DEA3B7",
  },
}));
