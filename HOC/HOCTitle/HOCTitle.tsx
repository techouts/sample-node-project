import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React from "react";
import { ColorType } from "../../utility/ColorType";
import { useMobileCheck } from "../../utility/isMobile";
interface HOCTitleSchema {
  bgColor: ColorType | string;
  bgPadding: string;
  title: string;
  titleColor: ColorType | string;
  strikeThrough: boolean;
}
export const CustomText = styled(Typography)(() => ({
  fontSize: "20px",
  lineHeight: "24px",
  fontWeight: "400",
  fontStyle: "normal",
  letterSpacing: "0.1em",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "14px",
  },
}));
function HOCTitle({
  bgColor,
  bgPadding,
  title,
  titleColor,
  strikeThrough,
}: HOCTitleSchema) {
  const isMobile = useMobileCheck();
  return (
    <>
      {title && (
        <Box
          p={isMobile ? (bgPadding ? "10px 16px" : "0") : bgPadding}
          bgcolor={bgColor}
        >
          {strikeThrough ? (
            <Divider
              sx={{
                "&.MuiDivider-root": {
                  "&::before": {
                    borderTop: "1px solid rgba(48, 173, 178, 0.7)",
                  },
                  "&::after": {
                    borderTop: "1px solid rgba(48, 173, 178, 0.7)",
                  },
                  "> .MuiDivider-wrapper": {
                    padding: isMobile ? "0 12px" : "0 25px",
                  },
                },
              }}
            >
              <CustomText color={titleColor}> {title}</CustomText>
            </Divider>
          ) : (
            <CustomText textAlign={"center"} color={titleColor}>
              {title}
            </CustomText>
          )}
        </Box>
      )}
    </>
  );
}

export default HOCTitle;
