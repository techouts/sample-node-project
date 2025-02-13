import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";

const SnackBarMessage = ({
  snackbarOpen,
  snackbarClose,
  message,
  vertical,
  horizontal,
  width,
  height,
  color,
  bgColor,
  alignItems,
  textAlign,
  display,
}: any) => {
  return (
    <Box>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          color: color,
          background: bgColor,
          width: width,
          height: height,
          alignItems: alignItems,
          textAlign: textAlign,
          display: display,
        }}
        open={snackbarOpen}
        onClose={snackbarClose}
        key={vertical + horizontal}
      >
        <Grid>
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5, float: "right", right: "1%", top: "0px" }}
            onClick={snackbarClose}
          >
            <CloseIcon />
          </IconButton>
          <Grid>{message}</Grid>
        </Grid>
      </Snackbar>
    </Box>
  );
};

export default SnackBarMessage;
