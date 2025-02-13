import { Box } from "@mui/material";
import { useMobileCheck } from "../../utility/isMobile";

function TitleTab(props: any) {
  const {
    title,
    bgColor,
    bgPadding,
    fontWeight,
    fontSize,
    mobileFontSize,
    color,
  } = props;
  const isMobile = useMobileCheck();

  return (
    <Box
      component="div"
      textAlign={"center"}
      sx={{
        backgroundColor: bgColor || "transparent",
        padding: bgPadding || "18px 0 0",
        fontWeight: fontWeight || 400,
        fontSize: isMobile
          ? mobileFontSize
            ? `${mobileFontSize}px`
            : "14px"
          : fontSize
          ? `${fontSize}px`
          : "18px",
        color: color,
        lineHeight: "24px",
      }}
    >
      {title}
    </Box>
  );
}

export default TitleTab;
