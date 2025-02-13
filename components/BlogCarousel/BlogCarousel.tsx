import { Box } from "@mui/material";
import { useMobileCheck } from "../../utility/isMobile";
import {
  AlignBox,
  BeautyButton,
  DisplayBottom,
  DisplayBox,
  FlexBox,
  ReadBox,
  SubTypography,
  TitleTypography,
  ViewsBox,
  ViewsTypograhy,
  Typographytext,
  MainBox,
} from "./BlogCarouselStyle";
import { Items } from "../../schemas/EditorPickSchema";
import { useRouter } from "next/router";
import BasicModal from "../../HOC/Modal/ModalBlock";
import ShareInfo from "../PdpCardComponent/SharePopUp/ShareInfo";
import Sharedata from "../../components/PdpCardComponent/SharePopUp/ShareData.json";
import { useState } from "react";
import { ReplaceImage } from "../../utility/ReplaceImage";
import triggerGAEvent from "../../utility/GaEvents";
import {
  event_type,
  share_event_type,
  widget_type,
} from "../../utility/GAConstants";
import TriggerGaViewPromotion from "../../utility/GAViewPromotion";
import { Cookies } from "react-cookie";
import useStorage from "../../utility/useStoarge";
const BlogCarousel = (props: Items) => {
  const {
    buttonText,
    imageUrl,
    noOfViews,
    heading,
    text,
    shareText,
    subText,
    viewsText,
    viewsIcon,
    shareIcon,
    path,
    imgPath,
    position,
    imageAltText,
    __component,
    id,
    componentName,
    items,
  } = props;
  const isMobile = useMobileCheck();
  const router = useRouter();

  const cookie = new Cookies();
  const { getItem } = useStorage();

  const [shareOpen, setShareOpen] = useState(false);
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
  const SharehandleClose = () => setShareOpen(false);

  const callEvent = () => {
    triggerGAEvent(
      {
        item_name: buttonText,
        item_id: "na",
        widget_type: widget_type,
        item_type: "share",
        widget_title: componentName,
        widget_description: "na",
        widget_postion: position,
        link_url: "na",
        link_text: shareText,
        no_of_items: items?.length,
        index: position,
        item_brand: "na",
        item_category: "na",
        item_category2: "na",
        item_category3: "na",
        item_rating: "na",
        event_type: share_event_type,
        method: "FACEBOOK/ WHATSAPP / PINTEREST / EMAIL",
      },
      "share"
    );
  };

  const readMoreEvent = () => {
    triggerGAEvent(
      {
        component_id: id,
        item_name: heading,
        item_id: "na",
        widget_type: widget_type,
        item_type: "product",
        widget_title: componentName,
        widget_description: subText,
        widget_postion: position,
        link_url: `${global?.window?.location.origin}${path}`,
        link_text: heading,
        no_of_items: items?.length,
        index: 1,
        item_brand: "na",
        item_category: "na",
      },
      "view_all"
    );
  };
  const callSelectPromotionEvent = () => {
    const datasLayer = {
      previous_screen_name: "na",
      visitor_type: cookie.get("accessToken") ? "loggedin" : "Guest",
      user_id: getItem("customer_ref", "local") || "na",
      creative_name: `Creative_name-outer BC`,
      creative_slot: `Creative_slot-outer BC`,
      items: [
        {
          promotion_id: `${"promotion_id"}-inner BC`,
          promotion_name: `${"promotion_name"}-inner BC`,
          creative_name: `${"creative_name"}-inner BC`,
          creative_slot: `${"creative_slot"}-inner BC`,
        },
      ],
    };
    TriggerGaViewPromotion("select_promotion", datasLayer);
  };
  return (
    <Box sx={{ padding: isMobile ? " 8px" : "20px" }}>
      <Box
        style={{ cursor: "pointer" }}
        onClick={() => [callSelectPromotionEvent(), router?.push(imgPath)]}
      >
        <img
          src={`${ReplaceImage(imageUrl)}`}
          alt={imageAltText || "image"}
          width="100%"
        />
      </Box>
      <MainBox>
        <DisplayBox>
          <BeautyButton>{buttonText}</BeautyButton>
        </DisplayBox>
        <AlignBox>
          <TitleTypography onClick={() => router?.push(imgPath)}>
            {heading}
          </TitleTypography>
          {!isMobile && <ReadBox>{subText}</ReadBox>}
          <DisplayBottom>
            <SubTypography
              onClick={() => {
                router.push(path), readMoreEvent();
              }}
            >
              {text}
            </SubTypography>
            <FlexBox
              onClick={() => {
                callEvent();
                SharehandleOpen();
              }}
            >
              <img
                src={`${ReplaceImage(shareIcon)}`}
                alt="shareIcon"
                width="12px"
              />
              {!isMobile && <Typographytext>{shareText}</Typographytext>}
            </FlexBox>
          </DisplayBottom>
        </AlignBox>
        {!isMobile && (
          <BasicModal
            height={isMobile ? "300px" : "200px"}
            width={isMobile ? "200px" : "700px"}
            top="50%"
            left="50%"
            handleOpen={SharehandleOpen}
            handleClose={SharehandleClose}
            open={shareOpen}
            Component={
              <ShareInfo shareInfoData={Sharedata} isShowProductData={false} />
            }
          />
        )}
      </MainBox>
    </Box>
  );
};
export default BlogCarousel;
