import { CardMedia } from "@mui/material";
import React from "react";
import ResetPasswordScreen from "../../SigninComponent/ResetPasswordScreen/ResetPasswordScreen";
import _itemsD from "../../../JSON/SignIn/ResetPasswordScreen.json";
import EditSchema from "./EditSchema";
import { FirstParent, ImageGrid } from "./EditStyles";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { useMobileCheck } from "../../../utility/isMobile";

const ResetPassword = (data: EditSchema) => {
  const isMobile = useMobileCheck();

  return (
    <div>
      <FirstParent isMobile={isMobile}>
        <ImageGrid>
          <CardMedia
            component="img"
            src={`${ReplaceImage(data?.imageUrlOne)}` || data?.imageUrlOne}
            width="100%"
            alt="Not Found"
          ></CardMedia>
        </ImageGrid>

        <ResetPasswordScreen {..._itemsD} />

        <ImageGrid>
          <CardMedia
            component="img"
            src={`${ReplaceImage(data?.imageUrlTwo)}` || data?.imageUrlTwo}
            width="100%"
            alt="Not Found"
          ></CardMedia>
        </ImageGrid>
      </FirstParent>
    </div>
  );
};

export default ResetPassword;
