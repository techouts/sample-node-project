import { Alert, Snackbar, Typography } from "@mui/material";
import React, { Fragment } from "react";

const SnackbarToast = ({ open, onClose, Message }: any) => {
  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={onClose}
        sx={{ position: "absolute", width: "100%" }}
      >
        <Alert severity="error" onClose={onClose}>
          <Typography sx={{ fontSize: "12px" }}>{Message}</Typography>
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default SnackbarToast;
