import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
interface BrandsStyles {
  isMobile: boolean;
}

interface ScrollBarStyles {
  Width?: string | number;
  Height?: string | number;
  ismobile?: Boolean;
  mainScroll?: Boolean;
}

interface MobileBrandInterface {
  isActive: boolean;
}

export const BrandsDesktopWrapper = styled(Stack)(() => ({
  position: "fixed",
  zIndex: "100000",
  width: "100%",
  background: "transparent",
  borderRadius: "0px",
  height: global?.window?.innerHeight - 150,
  boxShadow: "0 3px 3px  rgba(0, 0, 0, 0.1)",
}));

export const BrandsWrapper = styled(Box)(() => ({
  height: "100%",
  width: "35%",
  background: "#F8EDF1",
  padding: "3% 5%",
}));

export const Heading = styled(Typography)(() => ({
  color: "#231F20",
  fontSize: "20px",
  lineHeight: "32px",
  fontWeight: 700,
}));

export const SearchBar = styled(Paper)(({ isMobile }: BrandsStyles) => ({
  display: "flex",
  alignItems: "center",
  boxShadow: "none",
  border: "1px solid #E7E7E7",
  borderRadius: "0",
  background: !isMobile ? "#F8EDF1" : "none",
  margin: "22px 0px 33px 0px",
  height: "48px",
}));

export const BrandTab = styled(Grid)(() => ({
  borderRadius: "32px",
  border: "1px solid #A7A5A6",
  margin: "0 2% 0 0",
  padding: "2%",
  display: "flex",
  justifyContent: "center",
  "& .MuiGrid-root.MuiGrid-item": {
    padding: "10px",
  },
}));

export const BrandTitle = styled(Typography)(() => ({
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: "400",
  textAlign: "center",
}));

export const MobileBrandTabTitle = styled(Typography)(
  ({ isActive }: MobileBrandInterface) => ({
    fontSize: "11px",
    lineHeight: "13px",
    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
    color: isActive ? "#231F20" : "#A7A5A6",
    background: isActive ? "#DEA3B7" : "unset",
    padding: "8px",
    borderRadius: "32px",
    marginRight: "10px",
  })
);

export const MobileBrandTypeTitle = styled(Typography)(() => ({
  fontSize: "12px",
  lineHeight: "14px",
  fontWeight: "400",
  textTransform: "uppercase",
  color: "#AD184C",
  padding: "8px 0px",
}));

export const Brand = styled(Typography)(() => ({
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "400",
  color: "#231F20",
  paddingBottom: "8px",
}));

export const SearchIcon = styled("img")(() => ({
  padding: "8px 0px 8px 8px",
}));

export const ScrollBarBoxWrapper = styled(Box)(
  ({ Width, Height, ismobile, mainScroll }: ScrollBarStyles) => ({
    width: Width,
    height: Height,
    paddingLeft: "10px",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
      width: mainScroll ? "0px" : "5px",
      backgroundColor: ismobile ? "transparent" : "#DEA3B7",
    },
    "::-webkit-scrollbar-thumb": {
      borderRadius: "4px",
      border: "4px solid #231F20",
    },
  })
);

export const ScrollBarStackWrapper = styled(Stack)(
  ({ Width, Height }: ScrollBarStyles) => ({
    width: Width,
    height: Height,
    overflowY: "scroll",
    "::-webkit-scrollbar": {
      display: "none",
    },
  })
);

export const AlphabetText = styled(Typography)(() => ({
  fontSize: "16px",
  lineHeight: "24px",
  paddingBottom: "8px",
  color: "#231F20",
}));

export const BrandsMobileWrapper = styled(Box)(
  ({ isMobile }: BrandsStyles) => ({
    height: "100%",
    marginLeft: isMobile ? "8px" : "16px",
    marginTop: isMobile ? "0px" : "16px",
  })
);

export const BrandMobileTabs = styled(Stack)(() => ({
  alignItems: "center",
  marginBottom: "16px",
  padding: "21px 0px",
}));

export const DesktopBrandsViewerWrapper = styled(Stack)(() => ({
  width: "100%",
  padding: "96px 127px 0px 10%",
}));

export const DropdownArrowsBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export const BrandsUpArrowBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "30px",
  color: "#AD184C",
  padding: "6px 8px",
  "&:hover": {
    border: "1px solid #DEA3B7",
    borderRadius: "50%",
  },
}));

export const BrandsDownArrowBox = styled(BrandsUpArrowBox)(() => ({}));
