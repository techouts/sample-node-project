import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const PrimaryBox = styled(Box)(({ isMobile }: any) => ({
  padding: isMobile ? "20% 2% 2% 2%" : "2% 4% 4% 4%",

  "@media only screen and (max-width: 1200px)": {
    padding: "3% 2% 3% 3% 3%",
  },
  "@media only screen and (max-width: 900px)": {
    padding: "2% 1% 2% 2%",
  },
  "@media only screen and (max-width: 768px)": {
    padding: "1% 0% 1% 4%",
  },
}));

export const UncheckedIcon = styled("span")(() => ({
  borderRadius: "50%",
  backgroundColor: "#FFFFFF",
  width: 20,
  height: 20,
  border: "1px solid #D9D9D9",
}));

export const CheckedIcon = styled(UncheckedIcon)({
  backgroundColor: "#FFFFFF",
  border: "1px solid #AD184C",
  backgroundImage: "linear-gradient(180deg,#FFFFFF,#FFFFFF)",
  "&:before": {
    display: "block",
    width: 20,
    height: 20,
    backgroundImage: "radial-gradient(#AD184C,#AD184C 45%,transparent 50%)",
    content: '""',
  },
});
