import { Box } from "@mui/material";
import { Blog } from "../../schemas/PersonalCareSchema";
import { useMobileCheck } from "../../utility/isMobile";
import { useState } from "react";
import {
  BeautyView,
  ButtonText,
  ShareBox,
  TextView,
  TypographySubText,
  ViewsBox,
  ViewsTypography,
} from "./BlogLinksStyle";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { useRouter } from "next/router";
import Loader from "../../HOC/Loader/Loader";
import triggerGAEvent from "../../utility/GaEvents";
import { event_type, widget_type } from "../../utility/GAConstants";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
import triggerGaViewPromotion from "../../utility/GAViewPromotion";
const BlogLinks = ({
  imageUrl,
  buttonText,
  noOfViews,
  text,
  viewsIcon,
  shareIcon,
  readMore,
  imgPath,
  path,
  viewsText,
  position,
  imageAltText,
  __component,
  componentName,
  itemPosition,
  promotion_id,
  promotion_name,
  creative_name,
  creative_slot

}: Blog) => {
  const isMobile = useMobileCheck();
  const [shareOpen, setShareOpen] = useState(false);
  const [displayLoader, setLoader] = useState(false);
  const router = useRouter();
  const cookie = new Cookies();
  const { getItem } = useStorage();
  const SharehandleOpen = () => {
    if (isMobile) {
      navigator
        .share({
          title: "ShopperStop",
          url: window.location.href,
        })
        .then(() => console.log("Successful share!"))
        .catch((err) => console.error(err));
    } else {
      setShareOpen(true);
    }
  };
  const callGaEvent = () => {
    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `${creative_name}-outer BLink`,
      creative_slot: `${creative_slot}-outer BLink`,
      ecommerce: {
      items: [
        {
        promotion_id: `${promotion_id}-inner BLink`,
        promotion_name: `${promotion_name}-inner BLink`,
        creative_name: `${creative_name}-inner BLink`,
        creative_slot: `${creative_name}-inner BLink`,
        }
      ]
    }
    };
    triggerGaViewPromotion("select_promotion", datasLayer);
  };

  return (
    <>
      {displayLoader && <Loader />}
      <Box pr={1}>
        <Box
          style={{ cursor: "pointer" }}
          onClick={() => {
            callGaEvent();
            return [router?.push(imgPath), setLoader(true)];
          }}
        >
          <img
            src={`${ReplaceImage(imageUrl)}`}
            alt={imageAltText || "image"}
            width="100%"
          />
        </Box>
        <Box style={{ cursor: "pointer" }}>
          <BeautyView>
            <ButtonText>{buttonText}</ButtonText>
          </BeautyView>
          <TextView onClick={() => [router?.push(imgPath), setLoader(true)]}>
            {text}
          </TextView>
          {isMobile && (
            <ShareBox>
              <TypographySubText
                onClick={() => {
                  return [router?.push(path), setLoader(true)];
                }}
              >
                {readMore}
              </TypographySubText>
              <img
                src={`${ReplaceImage(shareIcon)}`}
                alt="ShareIcon"
                width="13px"
              />
            </ShareBox>
          )}
        </Box>
      </Box>
    </>
  );
};
export default BlogLinks;
