import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MobileSharePopUpInterface from "./MobileSharePopUPSchema";
import {
  LocationNameTextField,
  OOSButton,
  OOSTypography,
  SaveButton,
  SaveTypography,
} from "./styleMobileSharePopUP";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MobileSharePopUP(
  MobileShareData: MobileSharePopUpInterface
) {
  const { data } = MobileShareData;
  const [mobileshare, setMobileshare] = React.useState(false);


  const [email, setEmail] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);

  const handleClickOpen = () => {
    setMobileshare(true);
    if (navigator.share) {
      navigator
        .share({
          title: "Cropped top",
          url: document.location.href,
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong sharing the blog", error);
        });
    }
  };
  const handleClose = () => {
    setMobileshare(false);
  };
const handleChange =(e: { target: { value: React.SetStateAction<string>; }; }) =>{
  setEmail(e.target.value)
  setIsDisabled(true)
  if(e.target.value === "abc@mail.com"){
    setIsDisabled(false)

  }
}
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={mobileshare}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            position: "fixed",
            height: "auto",
            bottom: "0",
            backgroundColor: "lightgray",
            borderRadius: "7px 7px 0px 0px",
          },
        }}
      >
        <Box
          pb={0}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography pl={1.4}> {data?.text}</Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ justifyContent: "flex-end" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      
      
      </Dialog>

      <Grid
        item
        xs={6}
        style={{
          display: "flex",

          alignItems: "center",

          justifyContent: "flex-start",
        }}
      >
        <OOSButton>
          <OOSTypography>OUT OF STOCK</OOSTypography>
        </OOSButton>
        <LocationNameTextField
          id="outlined-textarea"
          label=""
          variant="filled"
          onChange={handleChange}
          placeholder="Placeholder"
          style={{ marginRight: "5px" }}
        />

      
        <Button disabled={isDisabled} >Submit</Button>

      </Grid>
    
      
    </div>
  );
}
