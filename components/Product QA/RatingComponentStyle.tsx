import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import StyledComponent from "@emotion/styled";
import Rating from "@mui/material/Rating";
interface Responsive {
  isMobile: boolean;
  showUp?: boolean;
}
export const TypographyOverall = styled(Typography)<Responsive>`
  font-weight: 400;
  font-size: ${(props) => (props.isMobile ? "16px" : "50px")};
  line-height: 44px;
  letter-spacing: -0.408px;
  color: #333333;
  margin-top: ${(props) => (props.isMobile ? "0" : "23px")};
`;
export const Typographycomment = styled(Typography)<Responsive>`
  line-height: 150%;
  color: #656263;
  font-weight: 400;
  display: -webkit-box;
  cursor:pointer;
  padding-bottom: 1%;
  -webkit-box-orient: vertical;
  word-break:break-word;
  font-size: ${(props) => (props.isMobile ? `10px;` : `16px`)};
  
`;

export const Description= styled(Typography)(() => ({
  lineHeight: "150%",
  fontWeight: 400,
  color: "#656263",
  display: "-webkit-box",
  cursor:"pointer",
  paddingBottom: "1%",
  fontSize:"16px",
   "@media(max-width:600px)": {
    fontSize:"10px",
    color: "#FFFFFF",
  }
  }))

export const GridRating = styled(Grid)<Responsive>`
  display: ${(props) => (props.isMobile ? "grid" : "")};
  align-items: ${(props) => (props.isMobile ? "center" : "")};
`;
export const BoxClick = styled(Box)<Responsive>`
  bottom: 0;
  right: ${(props) => (props.isMobile ? "0px" : "0px")};
  font-size: ${(props) => (props.isMobile ? "12px" : "16px")};
  min-width: ${(props) => (props.isMobile ? "20%" : "51%")};
`;
export const Viewimage = StyledComponent.img<Responsive>`
border-radius:50%;
`;
export const GridReview = styled(Grid)(({ isMobile }: Responsive) => ({
  width: "100%",
  display: `${isMobile ? "flex" : ""}`,
  justifyContent: `${isMobile ? "flex-end" : "flex-end"}`,
}));
export const Gridtemp = styled(Grid)(({ isMobile }: Responsive) => ({
  width: "100%",
}));
export const GridTotal = styled(Grid)(({ isMobile }: Responsive) => ({
  width: `${isMobile ? "80%" : "100%"}`,
  marginLeft: `${isMobile ? "40px" : "10px"}`,
}));
export const Ratingdata = StyledComponent(Rating)<Responsive>`
color: #231F20;
gap: ${(props) => (props.isMobile ?`4.5px`: `12px`)};
font-size: ${(props) => (props.isMobile ? `14px;` : `22px`)};
`;
export const RatingReview = StyledComponent(Rating)`
position: unset;
`;
export const BoxRating = styled(Box)<Responsive>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1px 0px;
  margin-right: ${(props) => (props.isMobile ? `0px;` : `0px`)};
`;
export const Typographytext = styled(Typography)<Responsive>`
  font-weight: 500;
  font-size: ${(props) => (props.isMobile ? `12px;` : `22px`)};
  line-height: 150%;
  color: #231F20;
`;
export const Typographyreview = styled(Typography)<Responsive>`
  font-weight: 400;
  font-size: ${(props) => (props.isMobile ? `11px;` : `16px`)};
  line-height: 150%;
  color: #7B7979;
`;
export const PostBox = styled(Box)(({ isMobile }: Responsive) => ({
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  lineHeight: "150%",
  color: "#7B7979",
  fontWeight: "400",
  flexDirection: `${isMobile ? "column" : "row"}`,
  marginTop: "15px",
}));
export const QueryBox = styled(Box)<Responsive>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.isMobile ? `6px;` : `12px`)};
`;
export const LikedBox = styled(Box)`
  display: flex;
  align-items: baseline;
  gap: 7px;
  align-items: center;
 
`;
export const BoxImages = StyledComponent(Box)<Responsive>`
width: 100%;
display:${(props) => (props.isMobile ? `grid;` : `flex`)};
grid-template-columns:${(props) => (props.isMobile ? `repeat(3,1fr);` : ``)};
gap:10px;
`;
export const Multiimages = StyledComponent.img<Responsive>`
width : 100%;
max-width:${(props) => (props.isMobile ? `79px;` : `104px`)};
height:${(props) => (props.isMobile ? `79px;` : `104px`)};
`;
export const TypographyTitle = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    lineHeight: "150%",
    letterSpacing: "1px",
    color: "#231F20",
    fontWeight: 500,
    fontSize: `${isMobile ? "12px" : "16px"}`,
  })
);
export const ReviewTitle = styled(Typography)(() => ({
    lineHeight: "150%",
    letterSpacing: "1px",
    color: "#231F20",
    fontWeight: 700,
    fontSize:  "16px",
    "@media(max-width:600px)": {
      fontSize:  "10px",
      color: "#FFFFFF",
    }

  })
);
export const TypographyName = styled(Typography)<Responsive>`
  font-weight: 600;
  font-size: ${(props) => (props.isMobile ? `12px;` : `16px`)};
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #231f20;
`;
export const ReviewerName = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "150%",
  display: "flex",
  alignItems: "center",
  color: "#231F20",
  "@media(max-width:600px)": {
    color: "#FFFFFF",
    fontSize: "12px",
  }
}));
export const TypographyUser = styled(Typography)<Responsive>`
  font-weight: 400;
  font-size: ${(props) => (props.isMobile ? "10px" : "14px")};
  line-height: 150%;
  color: #656263;
`;
export const VerifiedUser = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize:"14px",
  lineHeight: "150%",
  color: "#656263",
  "@media(max-width:600px)": {
  fontSize:"10px",
  color:"#FFFFFF",
}
}));
export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#EAE9EF",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#F8DB6C",
  },
}));
export const TypographyNumber = styled(Typography)<Responsive>`
  margin-top: ${(props) => (props.isMobile ? "15px" : "30px")};
  font-size: ${(props) => (props.isMobile ? "12px" : "30px")};
  color: "black";
`;
export const BoxStyle = styled(Box)<Responsive>`
  // display: ${(props) => (props.isMobile ? "block" : "flex")};
  justify-content: ${(props) => (props.isMobile ? "space-between" : "")};
  align-items: ${(props) => (props.isMobile ? "center" : "")};
`;
export const Spantext = styled.span<Responsive>`
  font-size: ${(props) => (props.isMobile ? "11px" : "12px")};
  color: #DEA3B7;
  line-height:140%;
  letter-spacing: 1px;
  font-size: 12px;
  font-weight: 500;
`;
