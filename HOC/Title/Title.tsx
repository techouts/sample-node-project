import { Box } from "@mui/material";
import { useMobileCheck } from "../../utility/isMobile";

function Title(props: any) {
  const {
    title,
    titleColor,
    bgColor,
    styleEnd = false,
    styleStart = false,
    isFromPdp = false,
    isPadding = false,
  } = props?.interface;

  const isMobile = useMobileCheck();

  return (
    <Box
      component="div"
      sx={{
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: isMobile ? "12px" : "20px",
        lineHeight: isMobile ? "14px" : "24px",
        letterSpacing: "0.1em",
        color: isFromPdp
          ? "#1C191A"
          : titleColor
          ? titleColor
          : bgColor === "#231F20"
          ? "#FFFFFF"
          : "#1C191A",
        paddingTop: isFromPdp ? (isMobile ? 0 : "initial") : "initial",
      }}
      textAlign={styleEnd ? "end" : styleStart ? "start" : "center"}
      paddingTop={isPadding ? "25px" : "0px"}
    >
      {title}
    </Box>
  );
}

export default Title;
