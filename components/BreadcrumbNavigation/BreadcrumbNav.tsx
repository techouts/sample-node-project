import React from "react";
import { useRouter } from "next/router";
import { HomeLink, MakeupLink, SlashOne } from "./BreadcrumbNavStyle";
import BreadcrumbNavSchema from "./BreadcrumbNavSchema";
import { useMobileCheck } from "../../utility/isMobile";
import { Box } from "@mui/material";

const BreadcrumbNavigation = ({
  bgColor,
  initialSlug,
}: BreadcrumbNavSchema) => {
  const router = useRouter();
  const isMobile = useMobileCheck();
  return (
    <Box
      bgcolor={bgColor}
      p={isMobile ? "0 16px 25px" : "0 5% 40px"}
      display={"flex"}
      alignItems={"baseline"}
    >
      <HomeLink onClick={() => router.push("/home")}>{initialSlug}</HomeLink>
      {router?.query?.pid && (
        <>
          <SlashOne>&#47;&nbsp;</SlashOne>
          <MakeupLink>{`${router?.query?.pid}`?.replace("-", " ")}</MakeupLink>
        </>
      )}
    </Box>
  );
};

export default BreadcrumbNavigation;
