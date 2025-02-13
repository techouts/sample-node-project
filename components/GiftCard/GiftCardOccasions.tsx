import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { GiftCardSchema} from "../../schemas/GiftCard";
import { useMobileCheck } from "../../utility/isMobile";
import { Cookies } from "react-cookie";

import {
  BrowserTitle,
  CardBorder,
  CardTitle,
  ChooseAmtButton,
  LeftItemsOccasionBox,
  LeftItemsOccasionButton,
  OccasionBox,
  OccasionBtnText,
  OccasionButton,
  TooltipStyle,
  ViewButton,
} from "./GiftCardStyle";
import triggerGAEvent from "../../utility/GaEvents";
import BasicModal from "../../HOC/Modal/ModalBlock";
import CropImage from "./CropImage/CropImage";
import { BootstrapDialog } from "../SigninComponent/SignInStyled";
import SignInComponent from "../SigninComponent/SignInComponent";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import Loader from "../../HOC/Loader/Loader";

const GiftCardOccasions = ({
  title,
  subTitle,
  items,
  buttonText,
  setOpen,
  selectedImage,
  setSelectedImage,
  setEditModal,
  editModal,
  setCroppedImage,
  croppedImage,
}: GiftCardSchema) => {
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [isLoadmore, setIsLoadmore] = useState(true);
  const [signInOpen, setSignInOpen] = useState(false);
  const [CustomerID, setCustomerID] = useState(
    userDataItems ? userDataItems?.customerName : null
  );
  const [displayLoader, setLoader] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [openImageCrop, setOpenImageCrop] = useState(false);
  const [imgSrc, setImgSrc] = useState<any>();
  const [selectedOccasion, setSelectedOccasion] = useState(
    items?.[0]?.giftName
  );

  useEffect(() => {
    setCustomerID(userDataItems ? userDataItems?.customerName : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRender]);

  useEffect(() => {
    setSelectedImage(
      isMobile
        ? (occasionFilter || leftItemsFilter)?.subItems?.[0]?.imageUrlMobile
        : (occasionFilter || leftItemsFilter)?.subItems?.[0]?.imgUrl
    );
  }, []);

  const cookie = new Cookies();

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader?.result?.toString() || "");
        setOpenImageCrop(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handelSelectedImage = (occasionImage: string) => {
    setSelectedImage(occasionImage);
  };
  const occasionHandler = (occasionText: string) => {
    setSelectedOccasion(occasionText);
  };

  const ShowMore = () => {
    setIsLoadmore(!isLoadmore);
  };

  const handleModalOpen = () => setOpen(true);

  const isMobile = useMobileCheck();

  let lastRow = items.slice(0, items.length - (items.length % 7));
  let itemsLeft = items.length % 7;

  const occasionslicedata = isLoadmore ? items?.slice(0, 14) : lastRow;

  const itemsLeftData = items?.slice(-itemsLeft);

  const occasionFilter: any = occasionslicedata?.find(
    (data: { giftName: string }) => data?.giftName == selectedOccasion
  );
  const leftItemsFilter: any = itemsLeftData?.find(
    (data: { giftName: string }) => data?.giftName == selectedOccasion
  );

  //ga click event
  const callClickEvent = (linktext: string) => {
    triggerGAEvent(
      {
        event_type: "gift_card_Creation",
        widget_title: title,
        link_url: "",
        link_text: linktext,
        item_name: "Gift Card",
        item_type: "CREATE YOUR OWN CARD",
      },
      "click"
    );
  };
  //hyperlink event
  const callHyperLink = (linktext: string) => {
    triggerGAEvent(
      {
        event_type: "select_gift_card",
        widget_title: title,
        link_url: "",
        link_text: linktext,
      },
      "hyperlink"
    );
  };

  const handleEditIcon = (image: any) => {
    setSelectedImage(image);
    setEditModal(true);
  };
  const handleEditIconClose = () => {
    setEditModal(false);
    setCroppedImage("");
  };
  const handleClosed = () => {
    setSignInOpen(false);
    if (cookie.get("accessToken")) {
    (croppedImage.length > 0 || selectedImage.length > 0) && handleModalOpen();
    callClickEvent(buttonText);
    }
  };
  return (
    <>
      {displayLoader && <Loader />}
      <BasicModal
        height={isMobile ? "86%" : "505px"}
        width={isMobile ? "96%" : "360px"}
        top="48%"
        left="50%"
        handleOpen={handleEditIcon}
        handleClose={handleEditIconClose}
        open={editModal}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        Component={
          <CropImage
            selectedImage={selectedImage}
            setCroppedImage={setCroppedImage}
            setEditModal={setEditModal}
            setOpen={setOpen}
          />
        }
      />
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={signInOpen}
        fullScreen
        onClose={handleClosed}
      >
        <SignInComponent
          handleClosed={handleClosed}
          initialScreen={true}
          setCustomerID={setCustomerID}
          setReRender={setReRender}
          setLoader={setLoader}
        />
      </BootstrapDialog>
      <CardBorder>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <BrowserTitle>{subTitle}</BrowserTitle>
          {/* Occassion Buttons 24   */}
          <OccasionBox>
            {occasionslicedata?.map((occasiontext: any, index: any) => (
              <OccasionButton
                occasionstext={occasiontext?.giftName}
                selectedOccasion={selectedOccasion}
                variant="outlined"
                color="secondary"
                key={index}
                onClick={() => occasionHandler(occasiontext?.giftName)}
              >
                <OccasionBtnText>{occasiontext?.giftName}</OccasionBtnText>
              </OccasionButton>
            ))}
          </OccasionBox>
          {!isLoadmore && (
            <LeftItemsOccasionBox>
              {itemsLeftData?.map((occasiontext: any, index: any) => (
                <LeftItemsOccasionButton
                  occasionstext={occasiontext?.giftName}
                  selectedOccasion={selectedOccasion}
                  variant="outlined"
                  color="secondary"
                  key={index}
                  onClick={() => occasionHandler(occasiontext?.giftName)}
                >
                  <OccasionBtnText>{occasiontext?.giftName}</OccasionBtnText>
                </LeftItemsOccasionButton>
              ))}
            </LeftItemsOccasionBox>
          )}
          <ViewButton
            onClick={() => {
              ShowMore();
              callHyperLink(isLoadmore ? "View All" : "View Less");
            }}
          >
            {isLoadmore ? "View All" : "View Less"}
          </ViewButton>
          {/* Occasion Image Loaded hear With Edit mark & ToolTip */}
          <Grid container pb={isMobile ? 0 : 2.5} spacing={isMobile ? 0 : 2}>
            {(occasionFilter || leftItemsFilter) &&
              (occasionFilter || leftItemsFilter)?.subItems?.map(
                (item: any) => (
                  <Grid item xl={4} md={4} xs={12}>
                    <img
                      style={{
                        border:
                          selectedImage == item?.imageUrlMobile ||
                          selectedImage == item?.imgUrl
                            ? "2px solid #AD184C"
                            : "0px solid white",
                        cursor: "pointer",
                      }}
                      width="100%"
                      src={isMobile ? item?.imageUrlMobile : item?.imgUrl}
                      alt="imd deltd"
                      onClick={() =>
                        handelSelectedImage(
                          isMobile ? item?.imageUrlMobile : item?.imgUrl
                        )
                      }
                    />
                  </Grid>
                )
              )}
          </Grid>
          <ChooseAmtButton
            selectedImage={selectedImage}
            croppedImage={croppedImage}
            onClick={() => {
              if (!cookie.get("accessToken")) {
                setSignInOpen(true);
              } else {
                
                (croppedImage.length > 0 || selectedImage.length > 0) &&
                  handleModalOpen();
                callClickEvent(buttonText);
              }
            }}
          >
            {buttonText}
          </ChooseAmtButton>
        </CardContent>
      </CardBorder>
    </>
  );
};

export default GiftCardOccasions;
