import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import AboutUsInterface from "../../schemas/AboutUsSchema";

export const AboutUs = ({ page, bgPadding, textColor }: AboutUsInterface) => {
  const router = useRouter();
  const pagePath = router?.query?.pid;
  const isPreWrap =
    pagePath === "delivery-policy" ||
    pagePath === "cancellation-policy" ||
    pagePath === "exchange-return";
  return (
    <>
      <Box
        p={bgPadding}
        sx={{
          whiteSpace: isPreWrap ? "pre-wrap" : "unset",
          color: textColor,
        }}
        className={`${pagePath}Component`}
        dangerouslySetInnerHTML={{ __html: page }}
      ></Box>
    </>
  );
};
