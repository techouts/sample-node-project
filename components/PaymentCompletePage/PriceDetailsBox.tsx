import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Loader from "../../HOC/Loader/Loader";
import {
  PriceDetailsBoxs,
  CartProductTitle,
  ProductPriceText,
  CategoryTitle,
} from "./PaymentsCompletePageStyles";
import useStorage from "../../utility/useStoarge";
import ViewBreakUp from "../CartLayout/ViewBreakUp";
import ApplyCouponModal from "../CartLayout/FreeSampleModal/ApplyCouponModal";
import { useMobileCheck } from "../../utility/isMobile";
import { BoldText, ColorText } from "../CartLayout/CartLayoutStyles";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { RemoveCouponFromCart } from "../CartLayout/CouponQueries/CouponList";
import { GetCartItems } from "../../utility/CartServiceability";
import { useRecoilState } from "recoil";
import { cartState, userState } from "../../recoilstore";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { circle_tick } from "../CartLayout/CartConstants";
import triggerGAEvent from "../../utility/GaEvents";
import CartStoreInterface from "../../schemas/cartStoreAtom";
import { onImageError } from "../../utility/onImageError";
import { Error_Image } from "../../utility/AppIcons";
import { AppIcons } from "../../utility/AppIconsConstant";
const CMSImageUrl = process.env.NEXT_PUBLIC_S3_URL;
export const PRODUCT_FALLBACK_URL = `${CMSImageUrl}/Products_Placeholder_0718784858.png`;
function PriceDetailsBox({
  data,
  getCartDetails,
  viewBreakUpOptions,
  handleSnackBar,
  handleError,
  handleWalletUsed,
  WalletUsed,
  setCD,
  setNetBank,
  setUpi,
  currentPayment,
  setssWalletS,
  savedPaymentCvv,
  mobilePayOption,
  selectedWallet,
  finalCheck,
  value,
  setValue,
  topLevelBanks,
  setTopLevelBanks,
  finalCheckCallBack,
  radio,
  selectedUpiOrCard,
  cmsData,
}: any) {
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [cartData, setCartData] = useState<any>(cartStore?.cartItems);
  const [displayLoader, setLoader] = useState(true);
  const [viewCart, setViewCart] = useState(false);
  const { getItem, setItem } = useStorage();
  const [applyCouponModal, setApplyCouponModal] = useState(false);
  const [applyCoupon, setApplyCoupon] = useState<any>(null);
  const errorImage = AppIcons(Error_Image)
  const handleCloseApplyCoupnModal = () => {
    setApplyCouponModal(false);
  };
  const isMobile = useMobileCheck();
  const updateCoupon = (couponData: any) => {
    setApplyCoupon(couponData);
  };
  const cartID = getItem("BuyNowCartID", "local")
    ? getItem("BuyNowCartID", "local")
    : getItem("cartID", "local");

  useEffect(() => {
    let walletData = handleWalletUsed();
    const getCart = async () => {
      const response = await GetCartItems(
        cartID,
        setCartStore
      );
      setLoader(false);
      walletData(response?.data?.cart?.wallet_discount);
      {
        response?.data?.cart?.applied_coupons?.length > 0 &&
          setApplyCoupon(response?.data?.cart?.applied_coupons?.[0]?.code);
      }
      getCartDetails(response);
    };

    if (cartStore?.cartItems) {
      walletData(cartStore?.cartItems?.cart?.wallet_discount);
      {
        cartStore?.cartItems?.cart?.applied_coupons?.length > 0 &&
          setApplyCoupon(
            cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code
          );
      }
      getCartDetails(cartStore?.cartItems?.cart);
    }
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const couponHandler = async () => {
    if (applyCoupon) {
      setLoader(true);
      const removeCouponCode = await RemoveCouponFromCart();
      if (removeCouponCode !== undefined) {
        handleSnackBar("Coupon Removed");
        setApplyCoupon("");
        setCartStore((previousData: CartStoreInterface) => ({
          ...previousData,
          cartItems: removeCouponCode?.removeCouponFromCart,
        }));
        setCartData(removeCouponCode?.removeCouponFromCart);
        setLoader(false);
      } else {
        setLoader(false);
        handleError(
          "Failed to remove applied coupon.Verify the code and try again."
        );
      }
    } else {
      setApplyCouponModal(true);
    }
  };

  const callHyperlink = () => {
    triggerGAEvent(
      {
        event_type: "link",
        widget_title: "Available offer",
        link_url: "na",
        link_text: viewCart ? "Close" : "View",
      },
      "hyperlink"
    );
  };
  const callEvent = () => {
    triggerGAEvent(
      {
        widget_title: "Coupon",
        coupon_code: cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code,
        event_type: applyCoupon ? "Remove" : "Apply Coupon",
        value: cartStore?.cartItems?.cart?.prices?.grand_total?.value,
        order_discount:
          cartStore?.cartItems?.cart?.prices?.discount?.amount?.value,
        mrp_value:
          cartStore?.cartItems?.cart?.prices?.subtotal_excluding_tax?.value,
      },
      "coupon"
    );
  };

  const getPmrDiscountPrice = (data: any) => {
    const sku = data?.configured_variant?.sku
      ? data?.configured_variant?.sku
      : data?.product?.sku;
    return cartStore?.cartItems?.cart?.item_level_promotions?.filter(
      (data: any) => {
        return data?.sku === sku;
      }
    )?.[0];
  };

  return (
    <>
      {displayLoader && <Loader />}
      {cartStore?.cartItems?.cart?.items.length > 0 && (
        <PriceDetailsBoxs
          sx={{
            mt: {
              sm: 2,
              md: 1,
              lg: 1,
            },
          }}
        >
          {!cartStore?.cartItems?.cart?.is_egv_cart && (
            <Box>
              <Stack direction="row" justifyContent="space-between">
                <BoldText>Have a Coupon Code?</BoldText>
                <ColorText onClick={() => couponHandler()}>
                  {applyCoupon ? "Remove" : "Apply Coupon"}
                </ColorText>
              </Stack>
              {applyCoupon && (
                <Stack direction="row" alignItems="center">
                  <img
                    src={`${ReplaceImage(circle_tick)}`}
                    alt="appliedlogo"
                    width="16px"
                    height="15px"
                  ></img>
                  <BoldText>{applyCoupon}</BoldText>
                  <Typography
                    sx={{ fontSize: "14px", color: "#4F4C4D", fontWeight: 500 }}
                  >
                    {" "}
                    applied
                  </Typography>
                </Stack>
              )}
            </Box>
          )}
          <BasicModal
            top={"50%"}
            width={isMobile ? "100%" : "521px"}
            overflowData={"scroll"}
            left={"50%"}
            height={isMobile ? "100%" : "497px"}
            open={applyCouponModal}
            handleClose={handleCloseApplyCoupnModal}
            Component={
              <ApplyCouponModal
                applyCoupon={applyCoupon}
                setApplyCoupon={updateCoupon}
                setApplyCouponModal={setApplyCouponModal}
                setLoader={setLoader}
                handleError={handleError}
                handleSnackBar={handleSnackBar}
                setCartStore={setCartStore}
              ></ApplyCouponModal>
            }
          ></BasicModal>
          {!cartStore?.cartItems?.cart?.is_egv_cart && (
            <Divider sx={{ mt: 1.5, mb: 1.5 }} />
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>
              View Cart Items ({cartStore?.cartItems?.cart?.items.length}{" "}
              products)
            </Typography>
            <Typography
              onClick={() => {
                setViewCart(!viewCart);
                callHyperlink();
              }}
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
                color: " #AD184C;",
              }}
            >
              {viewCart ? "Close" : "View"}{" "}
            </Typography>
          </Box>
          {viewCart && (
            <Box>
              {cartStore?.cartItems?.cart?.items?.map(
                (data: any, index: any) => (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        margin: "20px 10px",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <img
                          style={{ width: "100px", height: "100px" }}
                          src={
                            data?.configured_variant?.image
                              ? data?.configured_variant?.image?.url
                              : data?.product?.image?.url
                              ? data?.product?.image?.url
                              : PRODUCT_FALLBACK_URL
                          }
                          onError={(e: any) => onImageError(e, errorImage)}
                          alt="product_img"
                        />
                      </Box>
                      <Box pl={"30px"}>
                        <CartProductTitle isMobile={isMobile}>
                          {data?.__typename === "SimpleCartItem"
                            ? data?.product?.name
                            : data?.configured_variant?.name}
                        </CartProductTitle>
                        {data?.product?.categories?.[
                          data?.product?.categories?.length - 1
                        ]?.name && (
                          <CategoryTitle isMobile={isMobile}>
                            {
                              data?.product?.categories?.[
                                data?.product?.categories?.length - 1
                              ]?.name
                            }
                          </CategoryTitle>
                        )}
                        {!data?.mp_free_gifts?.is_free_gift ? (
                          <ProductPriceText isMobile={isMobile}>
                            {`₹${(getPmrDiscountPrice(data)?.discount
                              ? data?.prices?.row_total?.value -
                                getPmrDiscountPrice(data)?.discount
                              : data?.prices?.row_total?.value -
                                data?.prices?.total_item_discount?.value
                            )?.toFixed(2)}`}
                          </ProductPriceText>
                        ) : (
                          <ProductPriceText isMobile={isMobile}>
                            Free
                          </ProductPriceText>
                        )}
                      </Box>
                    </Box>
                  </>
                )
              )}
            </Box>
          )}
          <Divider sx={{ mt: 1, mb: 1 }} />
          <ViewBreakUp
            cmsData={cmsData}
            selectedUpiOrCard={selectedUpiOrCard}
            radio={radio}
            finalCheck={finalCheck}
            selectedWallet={selectedWallet}
            mobilePayOption={mobilePayOption}
            savedPaymentCvv={savedPaymentCvv}
            setssWalletS={setssWalletS}
            currentPayment={currentPayment}
            setCD={setCD}
            setNetBank={setNetBank}
            setUpi={setUpi}
            customerCartData={cartStore?.cartItems}
            hideViewCart={viewCart}
            currentPage="payment"
            viewBreakUpOptions={viewBreakUpOptions}
            handleError={handleError}
            value={value}
            setValue={setValue}
            topLevelBanks={topLevelBanks}
            setTopLevelBanks={setTopLevelBanks}
            finalCheckCallBack={finalCheckCallBack}
          />
        </PriceDetailsBoxs>
      )}
    </>
  );
}

export default PriceDetailsBox;
