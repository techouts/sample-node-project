import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  ViewMore,
  ListOffer,
  MainBox,
  Offer,
  OfferTypography,
  OfferKnowMoreTypography,
} from "./AvailableOffersStyles";
import BasicModal from "../../Modal/ModalBlock";
import { useMobileCheck } from "../../../utility/isMobile";
import { KnowMoreModal } from "../../../components/CartLayout/FreeSampleModal/FreeSampleModalpopUp";
import {
  VIEW_LESS,
  VIEW_MORE,
} from "../../../utility/Constants";

export const AvailableOffers = ({
  offers,
  InnerOffersTitle,
  toggle = true,
  reff,
  isFromCart = false,
}: any) => {
  const offersData = offers?.filter((item: any) => item?.description || item?.code)
  const isMobile = useMobileCheck();
  const [viewMore, setViewMore] = useState(true);
  const [knowMoreModalPop, setKnowMoreModalPop] = useState(false);
  const handleToggle = () => {
    setViewMore(!viewMore);
    !viewMore && reff?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleCloseKnowMore = () => {
    setKnowMoreModalPop(false);
  };
  return (
    <Box>
      <MainBox
        isMobile={isMobile}
        sx={{ backgroundColor: toggle ? "#FFFFFF" : "#F7F6F9" }}
        isFromCart={false}
        toggle={false}>
        {InnerOffersTitle && (
          <Typography pl={3} sx={{ fontSize: "14px", color: "#231F20" }}>
            Offers
          </Typography>
        )}
        <BasicModal
          top={"50%"}
          width={isMobile ? "90%" : "521px"}
          left={"50%"}
          open={knowMoreModalPop}
          handleClose={handleCloseKnowMore}
          Component={<KnowMoreModal />}></BasicModal>
        {isMobile && toggle ? (
          <Box>
            {offersData
              ?.slice(0, viewMore ? 2 : offersData?.length)
              ?.map((offer: any, index: number) => (
                <>
                  <ListOffer
                    key={index}
                    $isMobile={isMobile}
                    $isFromCart={isFromCart}>
                    {offer?.code ?? offer?.description}{" "}
                    {offer?.know_more_link && (
                      <OfferKnowMoreTypography
                        isMobile={isMobile}
                        onClick={() => window.open(offer?.know_more_link)}
                        component={"span"}>{`${offer.know_more_text}`}</OfferKnowMoreTypography>
                    )}
                  </ListOffer>
                </>
              ))}
          </Box>
        ) : (
          <Offer>
            {offersData
              ?.slice(0, viewMore ? 2 : offersData?.length)
              ?.map((offer: any, index: number) => (
                <>
                  <OfferTypography
                    component="li"
                    sx={{
                      fontSize: {
                        lg: 16,
                        md: 14,
                        sm: 12,
                        xs: 12,
                      },
                    }}
                    isMobile={isMobile}
                    toggle={toggle}
                    isFromCart={isFromCart}>
                    {offer?.code ?? offer?.description}{" "}
                    {offer?.know_more_link && (
                      <OfferKnowMoreTypography
                        isMobile={isMobile}
                        onClick={() => window.open(offer?.know_more_link)}
                        component={"span"}>{`${offer.know_more_text}`}</OfferKnowMoreTypography>
                    )}
                  </OfferTypography>
                </>
              ))}
          </Offer>
        )}

        {offersData && offersData?.length > 2 && (
          <ViewMore
            onClick={handleToggle}
            isMobile={isMobile}
            sx={{
              fontSize: {
                lg: 14,
                md: 13,
                sm: 12,
                xs: 12,
              },
            }}
            isFromCart={false}
            toggle={false}>
            {viewMore ? VIEW_MORE : VIEW_LESS}
          </ViewMore>
        )}
      </MainBox>
    </Box>
  );
};
