import { DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
export const DialogCloseButton = (props: any) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: "8%",
            top: "6%",
            color: "#AD184C",
          }}
        >
          <CloseIcon sx={{ fontSize: "16px" }} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
DialogCloseButton.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
