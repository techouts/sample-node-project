import { DialogTitle, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const DialogBackButton = (props: any) => {
  const { children, onClick, isScreen, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
      {children}
      {onClick ? (
        <IconButton
          aria-label="close"
          onClick={() => onClick(isScreen)}
          sx={{
            position: "absolute",
            left: "5%",
            top: "5%",
            color: "#AD184C",
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
