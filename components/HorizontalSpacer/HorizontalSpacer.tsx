import { Box } from "@mui/material";
import React from "react";
import HorizontalSpacerSchema from "../../schemas/HorizontalSpacerSchema";

function HorizontalSpacer({
  __component,
  id,
  bgColor,
  height,
}: HorizontalSpacerSchema) {
  return (
    <Box
      height={`${height}`}
      width={"100%"}
      sx={{ backgroundColor: bgColor ? bgColor : "transparent" }}
      className={`${__component}_${id}`}
    />
  );
}

export default HorizontalSpacer;
