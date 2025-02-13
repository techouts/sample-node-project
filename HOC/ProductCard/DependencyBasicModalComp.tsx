import QuickCard from "../QuickCard/QuickCard";
import BasicModal from "../Modal/ModalBlock";
import { DeleteCard } from "../QuickCard/DeleteCard";
import { OKAY_CTA, THANKS_MESSAGE } from "./Constants";
import { Buttons, InnerBox, TypographyText } from "./ProductCardStyles";
import { useMobileCheck } from "../../utility/isMobile";
import { NotifyPopup } from "../QuickCard/NotifyPopup";

const DependencyBasicModalComp = (data: any) => {
  const isMobile = useMobileCheck();
  const {
    open,
    setOpen,
    details,
    variantDetails,
    isWishlisted,
    isfromWhishList,
    handleAddToCart,
    productID,
    productBuyNow,
    removeFromWishList,
    handleRemoveWishlist,
    handleWishList,
    setIsHovering,
    closeDeleteCard,
    isOpenDelete,
    notifyOpen,
    notifyClose,
    notifyPopUp,
    showLoader,
    openThanks,
    closeThanks,
    thanksPopUp,
    updatedCartDetails,
    isUnbxd,
    setSignInOpen
  } = data;
  return (
    <>
      {open && (
        <QuickCard
          details={details}
          isWishlisted={isWishlisted || isfromWhishList}
          handleAddToCart={handleAddToCart}
          productID={productID}
          productBuyNow={productBuyNow}
          removeFromWishList={removeFromWishList}
          handleRemoveWishlist={handleRemoveWishlist}
          isfromWhishList={isfromWhishList}
          handleWishList={handleWishList}
          open={open}
          setOpen={setOpen}
          setIsHovering={setIsHovering}
          variantProps={variantDetails?.product}
          updatedCartDetails={updatedCartDetails}
          isUnbxd={isUnbxd}
          setSignInOpen= {setSignInOpen}
        ></QuickCard>
      )}
      <BasicModal
        height={isMobile ? "280px" : "270px"}
        width={isMobile ? "360px" : "570px"}
        top="50%"
        left="50%"
        iconRight="31px"
        iconTop="31px"
        iconMobRight="21px"
        iconMobTop="21px"
        handleClose={closeDeleteCard}
        open={isOpenDelete}
        Component={
          <DeleteCard
            handleRemoveWishlist={handleRemoveWishlist}
            closeDeleteCard={closeDeleteCard}
          />
        }
      />
      <BasicModal
        width={isMobile ? "100%" : "570px"}
        height={isMobile ? "280px" : "338px"}
        top="50%"
        left="50%"
        handleOpen={notifyOpen}
        handleClose={notifyClose}
        open={notifyPopUp}
        Component={
          <NotifyPopup
            showLoader={showLoader}
            notifyClose={notifyClose}
            openThanks={openThanks}
            sku={
              details?.type_id === "simple"
                ? details?.sku
                : variantDetails?.product?.sku
            }
          />
        }
      />
      <BasicModal
        width={isMobile ? "100%" : "570px"}
        height={isMobile ? "280px" : "267px"}
        top="50%"
        left="50%"
        handleOpen={openThanks}
        handleClose={closeThanks}
        open={thanksPopUp}
        Component={<ThanksPopup closeThanks={() => closeThanks()} />}
      />
    </>
  );
};

const ThanksPopup = ({ closeThanks }: any) => {
  return (
    <InnerBox>
      <TypographyText>{THANKS_MESSAGE}</TypographyText>
      <Buttons onClick={() => closeThanks()}>{OKAY_CTA}</Buttons>
    </InnerBox>
  );
};

export default DependencyBasicModalComp;
