import React from "react";
import { Paper } from "@mui/material";

export const FindStoresPaperComponent = ({ children }: any) => {
  return (
    <Paper
      sx={{
        "::-webkit-scrollbar": {
          width: 5,
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#656263",
          borderRadius: 2,
        },
      }}
    >
      {children}
    </Paper>
  );
};
