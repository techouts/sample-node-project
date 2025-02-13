import CloseIcon from "@mui/icons-material/Close";
import { TypographyToastClose, MainBox } from "./ToastMessageStyle";
const ToastMessage = (props: any) => {
  const {
    height,
    width,
    closes,
    color,
    backgroundColor,
    opens,
    message,
    zIndex,
    overflow,
  } = props;
  if (opens) {
    return (
      <MainBox
        sx={{
          color: color,
          height: height,
          width: width,
          backgroundColor: backgroundColor,
          position: "absolute",
          zIndex: zIndex,
          overflow: overflow,
        }}
      >
        <TypographyToastClose onClick={closes}>
          <CloseIcon />
        </TypographyToastClose>
        {message}
      </MainBox>
    );
  } else {
    return null;
  }
};
export default ToastMessage;
