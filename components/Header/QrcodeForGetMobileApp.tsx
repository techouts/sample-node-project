import { Box } from "@mui/material";
import BasicModal from "../../HOC/Modal/ModalBlock";
import QRCode from "react-qr-code";

const QRCodeGetMobile = ({ setQrcode, path }: any) => {
  const handleClose = () => {
    setQrcode(false);
  };
  return (
    <BasicModal
      height={"500px"}
      width={"500px"}
      top="50%"
      left="50%"
      handleClose={handleClose}
      open={true}
      Component={
        <Box sx={{ margin: "20% 20%" }}>
          <QRCode
            value={path}
            bgColor={"#FFFFFF"}
            fgColor={"#000000"}
            size={300}
          />
        </Box>
      }
    />
  );
};
export default QRCodeGetMobile;
