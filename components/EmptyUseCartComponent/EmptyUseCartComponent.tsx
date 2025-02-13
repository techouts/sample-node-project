import Box from "@mui/material/Box";
import { useMobileCheck } from "../../utility/isMobile";
import { useState } from "react";
import Loader from "../../HOC/Loader/Loader";
import { ContentBox, ShoppingButton, TextTypography } from "./EmptyCartStyles";
import {
  EMPTY_CART_TEXT_LINE_ONE,
  EMPTY_CART_TEXT_LINE_TWO,
  GET_SHOPPING_TEXT,
} from "../../utility/Constants";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { emptyCartImage } from "../CartLayout/CartConstants";
const EmptyUseCartComponent = () => {
  const [displayLoader, setLoader] = useState(false);
  const isMobile = useMobileCheck();
  
  return (
    <>
      {displayLoader && <Loader />}
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          margin: isMobile ? "53px 0px 25px 0px" : "53px 0px",
        }}
      >
        <Box>
          <img
            style={{ maxWidth: "100%" }}
            src={`${ReplaceImage(emptyCartImage)}`}
            alt="bag-image"
          />
        </Box>
        <ContentBox>
          <Box>
            <TextTypography isMobile={isMobile}>
              {EMPTY_CART_TEXT_LINE_ONE}
            </TextTypography>
            <TextTypography isMobile={isMobile}>
              {EMPTY_CART_TEXT_LINE_TWO}
            </TextTypography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <ShoppingButton
              isMobile={isMobile}
              onClick={() => {
                window.location.assign("/home");
                setLoader(true);
              }}
            >
              {GET_SHOPPING_TEXT}
            </ShoppingButton>
          </Box>
        </ContentBox>
      </Box>
    </>
  );
};

export default EmptyUseCartComponent;
