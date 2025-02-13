import { Box } from "@mui/material";
import { useRef, useState } from "react";
import FooterBlogInterface from "../../schemas/FooterBlogSchema";
import { useMobileCheck } from "../../utility/isMobile";
import { useRouter } from "next/router";
import BasicModal from "../../HOC/Modal/ModalBlock";
import ShareInfo from "../PdpCardComponent/SharePopUp/ShareInfo";
import Sharedata from "../../components/PdpCardComponent/SharePopUp/ShareData.json";
import {
  Imagepic,
  BoxGrid,
  RowBox,
  ButtonBox,
  Buttontext,
  Typographyhead,
  BoxRead,
  Boxshare,
  Typographyshare,
  Typographyreadtext,
} from "./BlogGridStyles";
import Title from "../../HOC/Title/Title";
import { ReplaceImage } from "../../utility/ReplaceImage";
import Loader from "../../HOC/Loader/Loader";
import triggerGAEvent from "../../utility/GaEvents";
import {
  event_type,
  share_event_type,
  widget_type,
} from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import { viewArray } from "../../utility/ViewEvenItemArray";
const BlogGrid = ({
  items,
  Maintext,
  bgColor,
  bgPadding,
  position,
  id,
  __component,
}: FooterBlogInterface) => {
  const isMobile = useMobileCheck();
  const router = useRouter();
  const [shareOpen, setShareOpen] = useState(false);
  const [displayLoader, setLoader] = useState(false);
  const viewEventWrapper = useRef();

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

  const dataLayer = {
    item_id: "na",
    item_name: "na",
    component_id: id,
    widget_type: widget_type,
    item_type: "na",
    widget_title: __component,
    widget_description: "na",
    widget_postion: position,
    no_of_items: items?.length,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    event_type: event_type,
    index: position,
    view_items: viewArray(items, `${__component}_${position}_`),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

  const callShareEvent = (
    id: number,
    eventName: string,
    itemType: string,
    itemName: string,
    imagePath: string,
    itemDescription: string
  ) => {
    triggerGAEvent(
      {
        widget_type: widget_type,
        widget_title: __component,
        widget_description: itemDescription ? itemDescription : "na",
        widget_postion: position,
        link_url: imagePath
          ? `${global?.window?.location.origin}${imagePath}`
          : "na",
        link_text: eventName ? eventName : "na",
        no_of_items: items?.length,
        index: 1,
        item_name: itemName ? itemName : "na",
        item_type: itemType ? itemType : "na",
        outbound: true,
        component_id: id ? id : "na",
        event_type: "na",
        item_id: `${__component}_${position}`,
        item_category: "na",
        item_category2: "na",
        item_category3: "na",
      },
      eventName
    );
  };

  const callEvent = (
    eventName: string,
    itemType: string,
    itemName: string,
    imagePath: string,
    text: string,
    itemDescription: string
  ) => {
    triggerGAEvent(
      {
        item_name: itemName ? itemName : "na",
        item_id: `${__component}_${position}`,
        component_id: id,
        widget_type: widget_type,
        item_type: itemType ? itemType : "na",
        widget_title: __component,
        widget_description: itemDescription ? itemDescription : "na",
        widget_postion: position,
        link_url: imagePath
          ? `${global?.window?.location.origin}${imagePath}`
          : "na",
        link_text: text ? text : "na",
        no_of_items: items?.length,
        index: position,
        item_brand: "na",
        item_category: "na",
        item_category2: "na",
        item_category3: "na",
        item_rating: "na",
        event_type: "na",
      },
      eventName
    );
  };

  return (
    <>
      {displayLoader && <Loader />}
      <Box
        ref={viewEventWrapper}
        p={isMobile ? "0 4%" : bgPadding}
        bgcolor={bgColor}
        mt={isMobile ? "0px" : "20px"}
      >
        <Title interface={{ isPadding: true, title: Maintext }}> </Title>
        <BoxGrid isMobile={isMobile}>
          {items?.map((footeroption: any, index: any) => (
            <>
              <Box
                sx={{
                  display: "flex",
                  cursor: "pointer",
                  position: "relative",
                }}
                key={index}
              >
                <Box>
                  <Imagepic
                    onClick={() => [
                      router?.push(footeroption?.imgPath),
                      setLoader(true),
                      callEvent(
                        "click",
                        footeroption?.Item_type,
                        footeroption?.Item_name,
                        footeroption?.path,
                        footeroption?.readText,
                        footeroption?.headText
                      ),
                    ]}
                    isMobile={isMobile}
                    src={
                      isMobile
                        ? `${ReplaceImage(footeroption?.mobileImageUrl)}`
                        : `${ReplaceImage(footeroption?.imageUrl)}`
                    }
                    alt={footeroption?.imageAltText || "image"}
                  />
                  {isMobile && (
                    <ButtonBox isMobile={isMobile}>
                      <Buttontext isMobile={isMobile}>
                        {footeroption?.buttonText}
                      </Buttontext>
                    </ButtonBox>
                  )}
                </Box>

                <RowBox isMobile={isMobile}>
                  {!isMobile && (
                    <ButtonBox isMobile={isMobile}>
                      <Buttontext isMobile={isMobile}>
                        {footeroption?.buttonText}
                      </Buttontext>
                    </ButtonBox>
                  )}
                  <Typographyhead
                    isMobile={isMobile}
                    onClick={() => [
                      router?.push(footeroption?.imgPath),
                      setLoader(true),
                    ]}
                  >
                    {footeroption?.headText}
                  </Typographyhead>
                  <BoxRead>
                    <Typographyreadtext
                      isMobile={isMobile}
                      onClick={() => {
                        router?.push(footeroption?.path),
                          callEvent(
                            "view_all",
                            footeroption?.Item_type,
                            footeroption?.Item_name,
                            footeroption?.path,
                            footeroption?.readText,
                            footeroption?.headText
                          );
                      }}
                    >
                      {footeroption?.readText}
                    </Typographyreadtext>
                    <Boxshare
                      onClick={() => {
                        callShareEvent(
                          footeroption?.id,
                          "share",
                          footeroption?.Item_name,
                          footeroption?.Item_type,
                          footeroption?.imgPath,
                          footeroption?.headText
                        );
                        SharehandleOpen();
                      }}
                    >
                      <img
                        style={{ width: "12px" }}
                        src={`${ReplaceImage(footeroption?.shareLogo)}`}
                        alt="share-image"
                      />
                      {!isMobile && (
                        <Typographyshare>
                          {footeroption?.shareText}
                        </Typographyshare>
                      )}
                    </Boxshare>
                  </BoxRead>
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
                        <ShareInfo
                          shareInfoData={Sharedata}
                          isShowProductData={false}
                        />
                      }
                    />
                  )}
                </RowBox>
              </Box>
            </>
          ))}
        </BoxGrid>
      </Box>
    </>
  );
};

export default BlogGrid;
