import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Responsive {
  isMobile?: boolean;
  positiontype?: number;
  isVideo?: boolean;
}
export const TypographyAuthor = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    color: "#231F20",
    fontSize: isMobile ? "16px" : "40px",
    lineHeight: "150%",
    fontWeight: "700",
  })
);
export const Typographyblog = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    color: "#231F20",
    fontSize: isMobile ? "12px" : "20px",
    lineHeight: "150%",
    fontWeight: "700",
    marginTop: isMobile ? "28px" : "46px",
  })
);

export const TypographyDescription = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    color: "#231F20",
    fontSize: isMobile ? "11px" : "20px",
    lineHeight: "150%",
    fontWeight: "400",
    paddingTop: "10px",
  })
);
export const BoxShadow = styled(Box)(
  ({ isMobile, positiontype, isVideo }: Responsive) => ({
    padding: { isMobile, positiontype } ? "10px 10px" : "0px 20px",
    boxShadow: "0px 0px 25px rgb(0 0 0 / 5%)",
    backgroundColor: "#FFFFFF",
    height: isMobile ? "100px" : isVideo ? "120px" : "210px",
  })
);

export const BoxShow = styled(Box)(
  ({ isMobile, positiontype }: Responsive) => ({
    display: "flex",
    alignItems: positiontype ? "center" : isMobile ? "baseline" : "flex-end",
    justifyContent: "space-between",
    marginTop: positiontype ? "10px" : "0px",
    paddingBottom: isMobile ? "10px" : "18px",
  })
);

export const Typographysubtitle = styled("h1")(
  ({ isMobile }: Responsive) => ({
    color: isMobile ? "#231F20" : "#1C191A",
    letterSpacing: "0.1rem",
    fontSize: isMobile ? "12px" : "20px",
    lineHeight: "14px",
    fontWeight: "500",
    textAlign: isMobile ? "center" : "end",
    height: isMobile ? "14px" : "",
    paddingTop: isMobile ? '10px':'20px',
    paddingBottom:isMobile ? '20px':'10px'
  })
);
export const GridImages = styled(Grid)(({ isMobile }: Responsive) => ({
  display: "grid",
  gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)",
  gridGap: isMobile ? "0px" : "10px",
  marginTop: isMobile ? "0px" : "10px",
}));

export const Typographypara = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    fontSize: "14px",
    color: "#7B7979",
  })
);

export const Boxfield = styled(Box)(
  ({ isMobile, positiontype }: Responsive) => ({
    display: isMobile ? "none !important" : "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: positiontype ? "15px" : "",
  })
);
export const Boxview = styled(Box)(({ isMobile }: Responsive) => ({
  display: "flex",
  borderRadius: "10px",
  backgroundColor: "#FFFFFF",
  alignItems: "center",
  width: `${isMobile ? "50px" : ""}`,
  height: `${isMobile ? "18px" : ""}`,
  justifyContent: "center",
  gap: "3px",
  paddingTop: isMobile ? "" : "10px",
}));
export const Buttontext = styled(Box)({
  height: "26px",
  border: "1px solid #D5CBF4",
  color: "#231F20",
  borderRadius: "0px",
  padding: "0px 6px",
  backgroundColor: "#D5CBF4",
});
export const Typographytitle = styled(Typography)(
  ({ isMobile, positiontype }: Responsive) => ({
    color: "#231F20",
    fontSize: isMobile ? "12px" : "20px",
    lineHeight: "150%",
    fontWeight: "600",
    paddingTop: { isMobile, positiontype } ? "10px" : "",
  })
);
export const Typographyread = styled(Typography)(
  ({ isMobile, positiontype }: Responsive) => ({
    fontSize: "12px",
    color: "#8A133D",
    fontWeight: "400",
    cursor: "pointer",
    paddingTop: positiontype ? "0px" : "10px",
  })
);

export const Typographyview = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    fontSize: isMobile ? "11px" : "12px",
  })
);
export const Typographyviewtext = styled(Typography)(
  ({ isMobile }: Responsive) => ({
    fontSize: isMobile ? "11px" : "12px",
    color: "#A7A5A6",
  })
);
export const BoxMobile = styled(Box)(({ isMobile }: Responsive) => ({
  position: "relative",
  bottom: "30px",
  right: "20px",
  float: "right",
}));

export const BoxShare = styled(Box)({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});
export const BoxType = styled(Box)(({ isMobile }: Responsive) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: isMobile ? "10px 0px" : "18px 0px",
}));
export const ShareButton = styled(Button)({
  padding: "0px 8px !important",
  fontSize: "12px",
  fontWeight: "400",
  lineHeight: "16px",
  color: "#656263",
  "&:hover": {
    backgroundColor: "white",
  },
});
