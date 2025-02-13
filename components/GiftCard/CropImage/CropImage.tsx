import React, {useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Box from "@mui/material/Box";
import {
  ButtonStyled,
  InfoTypography,
  TitleTypography,
} from "./CropImageStyled";
import { ReplaceImage } from "../../../utility/ReplaceImage";

export const CropImage = ({
  selectedImage,
  setCroppedImage,
  setEditModal,
  setOpen,
}: any) => {
  const [image, setImage] = useState(ReplaceImage(selectedImage));
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState<any>();

  const getCroppedData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      setCroppedImage(cropper.getCroppedCanvas().toDataURL());
      setEditModal(false);
      setOpen(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <TitleTypography sx={{ paddingBottom: "20px", fontSize: "12px" }}>
          {" "}
          Edit Your Image
        </TitleTypography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Cropper
            style={{
              height: "277px",
              width: "281px",
            }}
            zoomTo={1}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
          <InfoTypography>Move The Cropper To Adjust</InfoTypography>
          <ButtonStyled onClick={getCroppedData}> Done</ButtonStyled>
        </Box>
      </Box>
    </>
  );
};

export default CropImage;
