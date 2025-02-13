import React from "react";
import { Paper } from "@mui/material";

export const PaperComponent = ({ children }: any) => {
  return (
    <Paper
      sx={{
        "& ::-webkit-scrollbar-thumb": {
          backgroundColor: "#656263",
          borderRadius: 2,
        },
      }}
    >
      {children}
    </Paper>
  );
};
