import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState, useRef } from "react";
import client from "../../apollo-client";
import { customerOrdersQuery } from "../../graphQLQueries/OrderQuery";
import { useMobileCheck } from "../../utility/isMobile";
import {
  ButtonBox,
  ButtonStack,
  ButtonText,
  HeadingTypography,
  ImageBox,
  ItemsTypography,
  ModeTypography,
  PriceBox,
  PriceTypogrphy,
  RatingBox,
  SubTitleTypography,
  TAmountTypography,
  TitleTypography,
  TotalTypography,
  TypographyText,
  TypographyTextEight,
  TypographyTextEleven,
  TypographyTextFive,
  TypographyTextFour,
  TypographyTextNine,
  TypographyTextOne,
  TypographyTextSeven,
  TypographyTextSix,
  TypographyTextTen,
  TypographyTextThirteen,
  TypographyTextThree,
  TypographyTextTweleve,
  TypographyTextTwo,
  StarIconImage,
  RatingTypography,
  QuentityTypography,
} from "./OrderConfirmationStyles";
import Loader from "../../HOC/Loader/Loader";
import { useRouter } from "next/router";
import { OrderPlaceQuery } from "../../graphQLQueries/PaymentQuery";
import { Cookies } from "react-cookie";
import {
  BorderBox,
  LargeText,
  SimpleText,
  TotalBox,
} from "../CartLayout/CartLayoutStyles";
import {
  ORDER_COD_FAILED,
  ORDER_CONFIRMED,
  ORDER_FAILED,
  ORDER_PENDING,
} from "../../utility/Constants";
import { useRecoilState, useResetRecoilState } from "recoil";
import { cartState, userState } from "../../recoilstore";
import { FetchCartId } from "../../api/Cart/CustomerCart";
import { Event_type, widget_type } from "../../utility/GAConstants";
import { ShoppingExperience } from "../ShoppingExperience/ShoppingExperience";
import { DateFormate } from "../../utility/DateFormate";
import { ContactedGraphqlUrl } from "../../utility/MagentoImageUrlConcatConstant";
import {
  callEventOrderConfirm,
  triggerPurchaseEvent,
  triggerTransactionEvent,
} from "./OrderConfirmAnalytics";
import { verifiedMarkDesktop } from "../CartLayout/CartConstants";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { PRODUCT_FALLBACK_URL } from "../../HOC/ProductCard/Constants";
import { reorderItems } from "../../graphQLQueries/OrderDetailsQuery";
import { callJourneyEvent } from "../../utility/GaEvents";
import { onImageError } from "../../utility/onImageError";
import { Error_Image } from "../../utility/AppIcons";
import { AppIcons } from "../../utility/AppIconsConstant";
import { transformItemName } from "../../utility/urlGenerator";
import { triggerOrderEvent } from "../../lib/UnbxdEvents";
import handleErrorResponse from "../../utility/ErrorHandling";
import { getSourceInfo } from "../../utility/commonUtility";
import { FccEnrollNewCustomerCheck } from "../FirstCitizenClubConsent/FccQuries";

const OrderPage = ({
  buttonText,
  orderstatus,
  deliveryadd,
  pendingText,
  failureText,
  codFailureText,
  lineone,
  ccOrderlineOne,
  orderid,
  orderplaced,
}: any) => {
  const cookie = new Cookies();
  const isMobile = useMobileCheck();
  const router = useRouter();
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [orderStatusFailed, setOrderStatusFailed] = useState(false);
  const [displayLoader, setLoader] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [orderStatusCheck, setOrderStatusCheck] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const viewEventWrapper = useRef();
  const resetTheCart = useResetRecoilState(cartState);
  const errorImage = AppIcons(Error_Image);

  useEffect(() => {
    localStorage.setItem("retryFlowCartID", "");
    const params = new URLSearchParams(window.location.search);
    const cartID = params.get("order_id");
    const ID = params.get("id");
    if (cartID) {
      const orderStatus = params.get("status");
      // if (cartID && orderStatus === "CHARGED") {
      client
        .mutate({
          mutation: OrderPlaceQuery,
          variables: {
            cart_id: cartID,
            access_token: cookie.get("accessToken"),
            source_from_info: getSourceInfo(),
          },
        })
        .then((response) => {

          const hasError =  handleErrorResponse( response?.data?.confirmPlaceOrder?.order) //response checking
          if (hasError) return null;
          const orderID =
            response?.data?.confirmPlaceOrder?.order?.order_number;
          if (
            response?.data?.confirmPlaceOrder?.order?.status &&
            orderStatus === "CHARGED"
          ) {
            setOrderStatusCheck(ORDER_CONFIRMED);
            getCutomerOrder(orderID);
          } else if (
            orderStatus === "AUTHORIZATION_FAILED" ||
            orderStatus === "AUTHENTICATION_FAILED"
          ) {
            setOrderStatusFailed(true);
            if (
              orderDetails?.items?.[0]?.payment_methods?.[0]?.type?.toLowerCase() ===
              "cashondelivery" ||
              orderDetails?.items?.[0]?.payment_methods?.[0]?.type?.toLowerCase() ===
              "checkmo"
            ) {
              setOrderStatusCheck(ORDER_COD_FAILED);
            } else {
              setOrderStatusCheck(ORDER_FAILED);
            }
            getCutomerOrder(orderID);
          } else {
            setOrderStatusCheck(ORDER_PENDING);
            getCutomerOrder(orderID);
          }
        })
        .catch((err) => {
          console.log("error", err);
          setLoader(false);
          setErrorMsg(err?.message);
        });
    } else if (ID) {
      setOrderStatusCheck(ORDER_CONFIRMED);
      getCutomerOrder(ID);
    }
    resetTheCart();
    if (userDataItems?.acceptFCCConsent && userDataItems?.tier === "na") {
      const fccEnrollmentResponse = FccEnrollNewCustomerCheck({
        email: userDataItems?.userEmail,
        mobile: localStorage?.getItem("mobileNumber") || "",
      }).then((response:any) => {
        userDataItems &&
            setUserDataItems({
              ...userDataItems,
            });
    })
      console.log("fccEnrollmentResponse", fccEnrollmentResponse);
    }
  }, []);

  const getCutomerOrder = (orderID: string) => {
    let details: any;
    const params = new URLSearchParams(window.location.search);
    const ID = params.get("id");
    if (orderID) {
      client
        .query({
          query: customerOrdersQuery,
          variables: { orderId: orderID },
          fetchPolicy: "no-cache",
          errorPolicy: "ignore",
        })
        .then(async (response) => {
          if (details?.items?.[0]?.is_egv_cart) {
            if (orderStatusCheck === ORDER_CONFIRMED || ID !== undefined) {
              callJourneyEvent(orderStatusCheck);
            }
          }
          const OrderDetails = response?.data?.customer?.orders;
          details = OrderDetails;
          const orderStatus = params.get("status");
          if (
            orderStatus === "CHARGED" ||
            orderStatusCheck === ORDER_CONFIRMED ||
            ID
          ) {
            triggerPurchaseEvent(
              details,
              "purchase",
              deliveryadd,
              orderStatusCheck,
              "na",
              getPaymentMode()
                ?.split("+")
                ?.join("|")
                ?.split(" (")
                ?.join("=")
                ?.split(")")
                ?.join(""),
                orderDetails
            );
          } else {
            triggerTransactionEvent(
              details,
              "transaction",
              deliveryadd,
              orderStatusCheck,
              "na",
              orderDetails
            );
          }
          triggerOrderEvent(details);
          setOrderDetails(OrderDetails);
          localStorage.getItem("BuyNowCartID")
            ? localStorage.removeItem("BuyNowCartID")
            : localStorage.removeItem("cartID");
          const responseCartId = await FetchCartId();
          if (responseCartId?.data?.customerCart?.id) {
            localStorage.setItem(
              "cartID",
              responseCartId?.data?.customerCart?.id
            );
            setUserDataItems({
              ...userDataItems,
              userCartCount: responseCartId?.data?.customerCart?.total_quantity,
            });
          }
          setLoader(false);
        })
        .catch((err) => {
          setErrorMsg(err.message);
          console.log("error", err);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  //Date Conversion
  const OrderDate = new Date(orderDetails?.items?.[0]?.order_date);
  const dateString = ` ${OrderDate.toLocaleString("default", {
    month: "long",
  })} ${OrderDate.getDate()}, ${OrderDate.getFullYear()}`;

  const productNavigation = (productData: any) => {
    isMobile
      ? window.location.assign(
        window.location.origin +
        "/" +
        transformItemName(productData?.product_name) +
        "/p/" +
        productData?.parent_sku
      )
      : window.open(
        window.location.origin +
        "/" +
        transformItemName(productData?.product_name) +
        "/p/" +
        productData?.parent_sku
      );
  };

  const getPaymentMode = () => {
    let internalPaymentModes = [];
    orderDetails?.items?.[0]?.total?.wallet_discount?.amount > 0 &&
      internalPaymentModes.push(
        `SS Wallet (${parseFloat(
          orderDetails?.items?.[0]?.total?.wallet_discount?.amount
        )?.toFixed(2)})`
      );
    orderDetails?.items?.[0]?.total?.loyalty_discount?.amount > 0 &&
      internalPaymentModes.push(
        `First Citizen Club (${parseFloat(
          orderDetails?.items?.[0]?.total?.loyalty_discount?.amount
        )?.toFixed(2)})`
      );
    orderDetails?.items?.[0]?.total?.egv_discount?.amount > 0 &&
      internalPaymentModes.push(
        `Gift Card (${parseFloat(
          orderDetails?.items?.[0]?.total?.egv_discount?.amount
        )?.toFixed(2)})`
      );
    getPaymentValue(orderDetails?.items?.[0]?.payment_methods?.[0]?.type) &&
      internalPaymentModes.push(
        getPaymentValue(orderDetails?.items?.[0]?.payment_methods?.[0]?.type)
      );

    return `${internalPaymentModes?.length > 0
        ? internalPaymentModes?.toString()?.replace(/,/g, " + ")
        : ""
      }`;
  };

  const getJuspayMode = () => {
    let text;
    const value: any = orderDetails?.items?.[0]?.payment_methods?.[0]?.additional_data?.[0]?.value;
    const total = orderDetails?.items?.[0]?.total;
    const juspayAmount =
      total?.base_grand_total?.value -
      (parseFloat(total?.wallet_discount?.amount) || 0) -
      (parseFloat(total?.loyalty_discount?.amount) || 0) -
      (parseFloat(total?.egv_discount?.amount) || 0);
  
    const formattedJuspayAmount = `(${juspayAmount.toFixed(2)})`;
  
    switch (value?.toLowerCase()) {
      case "nb":
        text = `Net Banking ${formattedJuspayAmount}`;
        break;
      case "cc":
        text = `Credit Card ${formattedJuspayAmount}`;
        break;
      case "dc":
        text = `Debit Card ${formattedJuspayAmount}`;
        break;
      case "upi":
        text = `UPI ${formattedJuspayAmount}`;
        break;
      case "wallet":
        text = `Wallet ${juspayAmount}`;
        break;
      default:
        text = undefined;
        value;
    }
    return text;
  };

  const getPaymentValue = (type: string) => {
    let text;
    switch (type?.toLowerCase()) {
      case "checkmo":
        text = `Cash On Delivery ${orderDetails?.items?.[0]?.total?.base_grand_total?.value}`;
        break;
      case "cashondelivery":
        text = `Cash On Delivery ${orderDetails?.items?.[0]?.total?.base_grand_total?.value}`;
        break;
      case "juspay":
        text = getJuspayMode();
        break;
      default:
        text = "";
    }
    return text;
  };

  const handlePayContinueShop = () => {
    callEventOrderConfirm(
      orderDetails,
      orderStatusFailed ? "RETRY PAYMENT" : buttonText,
      orderStatusFailed ? "/cart/address" : "/home",
      "na",
      "select payment",
      "payment"
    );
    setLoader(true);
    if (orderStatusFailed) {
      client
        .mutate({
          mutation: reorderItems,
          variables: { orderNumber: orderDetails?.items?.[0]?.order_number },
          fetchPolicy: "no-cache",
        })
        .then(async (response) => {
          const hasError =    handleErrorResponse(response?.data?.reorderItems?.cart?.id) //response checking
        if (hasError) return null;
          localStorage.setItem(
            "BuyNowCartID",
            response?.data?.reorderItems?.cart?.id
          );
          localStorage.setItem(
            "retryFlowCartID",
            response?.data?.reorderItems?.cart?.id
          );
          setCartStore((previousData) => ({
            ...previousData,
            cartItems: null,
            serviceability: {
              sd: false,
              ed: false,
              cc: false,
            },
            serviceabilityStores: [],
            serviceableProducts: {
              cc: null,
              non_cc: null,
            },
          }));
          setUserDataItems((previousData: any) => ({
            ...previousData,
            userCartCount: 1,
          }));
          if (!orderDetails?.items?.[0]?.is_egv_cart) {
            if(userDataItems?.storeMode && userDataItems?.storeModeType === "cc"){
              router?.push("/cart/info");
            } else {
              router?.push("/cart/address");
            }
          } else {
            router?.push("/cart/payment");
          }
        })
        .catch((err) => {
          setErrorMsg(err.message);
          console.log("error", err);
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      window.location.assign("/home");
    }
  };

  const fetchViewBreakUp = () => {
    return (
      <Box>
        <BorderBox>
          <Stack p={2} spacing={2}>
            <LargeText>
              {orderDetails?.items?.[0]?.is_egv_cart
                ? "VIEW BREAKUP"
                : "AMOUNT BREAKUP"}{" "}
              <span>
                ({orderDetails?.total_count}{" "}
                {orderDetails?.total_count > 1 ? "Items" : "Item"})
              </span>
            </LargeText>
            {orderDetails?.items?.[0]?.total?.subtotal?.value && (
              <Stack direction="row" justifyContent="space-between">
                <SimpleText>Total MRP</SimpleText>
                <SimpleText>
                  {`₹ ${orderDetails?.items?.[0]?.total?.subtotal?.value?.toFixed(
                    2
                  )}`}
                </SimpleText>
              </Stack>
            )}
            {orderDetails?.items?.[0]?.total?.wallet_discount?.amount > 0 && (
              <Stack direction="row" justifyContent="space-between">
                <SimpleText>SS Wallet</SimpleText>
                <SimpleText>
                  {`- ₹ ${parseFloat(
                    orderDetails?.items?.[0]?.total?.wallet_discount?.amount
                  )?.toFixed(2)}`}
                </SimpleText>
              </Stack>
            )}
            {orderDetails?.items?.[0]?.total?.loyalty_discount?.amount > 0 && (
              <Stack direction="row" justifyContent="space-between">
                <SimpleText>
                  {orderDetails?.items?.[0]?.total?.loyalty_discount?.code}
                </SimpleText>
                <SimpleText>
                  {`- ₹ ${parseFloat(
                    orderDetails?.items?.[0]?.total?.loyalty_discount?.amount
                  )?.toFixed(2)}`}
                </SimpleText>
              </Stack>
            )}
            {orderDetails?.items?.[0]?.total?.egv_discount?.amount > 0 && (
              <Stack direction="row" justifyContent="space-between">
                <SimpleText>
                  {orderDetails?.items?.[0]?.total?.egv_discount?.code}
                </SimpleText>
                <SimpleText>
                  {`- ₹ ${parseFloat(
                    orderDetails?.items?.[0]?.total?.egv_discount?.amount
                  )?.toFixed(2)}`}
                </SimpleText>
              </Stack>
            )}
            {parseFloat(
              orderDetails?.items?.[0]?.applied_promotions_cart_level_amount
            ) > 0 && (
                <Stack direction="row" justifyContent="space-between">
                  <SimpleText>Offer Discount</SimpleText>
                  <SimpleText>
                    -₹{" "}
                    {parseFloat(
                      orderDetails?.items?.[0]
                        ?.applied_promotions_cart_level_amount
                    )?.toFixed(2)}
                  </SimpleText>
                </Stack>
              )}
            {orderDetails?.items?.[0]?.total?.discounts?.length > 0 && (
              <Stack direction="row" justifyContent="space-between">
                {parseFloat(orderDetails?.items?.[0]?.coupon_amount) > 0 && (
                  <>
                    <SimpleText>Coupon Discount</SimpleText>
                    <SimpleText>{`- ₹ ${parseFloat(
                      orderDetails?.items?.[0]?.coupon_amount
                    )?.toFixed(2)}`}</SimpleText>
                  </>
                )}
              </Stack>
            )}
            {orderDetails?.items?.[0]?.total?.shipping_handling && (
              <>
                {orderDetails?.items?.[0]?.total?.shipping_handling
                  ?.amount_excluding_tax?.value > 0 ? (
                  <Stack direction="row" justifyContent="space-between">
                    <SimpleText>Delivery Charges</SimpleText>
                    <SimpleText>
                      {`Rs. ${orderDetails?.items?.[0]?.total?.shipping_handling?.amount_excluding_tax?.value?.toFixed(
                        2
                      )}`}
                    </SimpleText>
                  </Stack>
                ) : (
                  <Stack direction="row" justifyContent="space-between">
                    <SimpleText>Delivery Charges</SimpleText>
                    <SimpleText>Free</SimpleText>
                  </Stack>
                )}
              </>
            )}
          </Stack>
          {parseInt(orderDetails?.items?.[0]?.coupon_amount) +
            parseFloat(
              orderDetails?.items?.[0]?.applied_promotions_cart_level_amount
            ) >
            0 && (
              <TotalBox>
                <Stack
                  direction="row"
                  spacing="4px"
                  justifyContent="space-between"
                >
                  <LargeText>Your Total Savings</LargeText>
                  <LargeText>
                    {orderDetails?.items?.[0]?.total &&
                      `₹ ${(
                        parseInt(orderDetails?.items?.[0]?.coupon_amount) +
                        parseFloat(
                          orderDetails?.items?.[0]
                            ?.applied_promotions_cart_level_amount
                        )
                      )?.toFixed(2)}`}
                  </LargeText>
                </Stack>
              </TotalBox>
            )}
          <Divider />
          <ButtonBox>
            <ButtonStack>
              <TotalTypography>{"TOTAL PAID"}</TotalTypography>
              <TAmountTypography>
                {`₹ ${orderDetails?.items?.[0]?.total?.grand_total?.value?.toFixed(
                  2
                )}`}
              </TAmountTypography>
            </ButtonStack>
            <ModeTypography>Mode of Payment: {getPaymentMode()}</ModeTypography>
          </ButtonBox>
        </BorderBox>
      </Box>
    );
  };

  return (
    <>
      {displayLoader && <Loader />}
      {!displayLoader && (
        <Box
          ref={viewEventWrapper}
          style={{ padding: "90px 6%", width: "100%" }}
        >
          <Box
            sx={{
              justifyContent: "flex-start",
              alignItems: "center",
              display: "flex",
              gap: "10px",
            }}
          >
            <b>
              {orderDetails?.items?.[0]?.is_egv_cart &&
                orderStatusCheck === ORDER_CONFIRMED
                ? "Gift Card Sent!"
                : orderStatusCheck}
            </b>{" "}
            {orderStatusCheck === ORDER_CONFIRMED ? (
              <img
                src={`${ReplaceImage(verifiedMarkDesktop)}`}
                alt="TickMark"
                width={isMobile ? 20 : 30}
              />
            ) : (
              ""
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: isMobile ? " " : "center",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Box sx={{ width: isMobile ? "100%" : "80%" }}>
              <TypographyText>
                {`Hey ${userDataItems?.customerName},${orderDetails?.items?.[0]?.is_egv_cart &&
                    orderStatusCheck === ORDER_CONFIRMED
                    ? " your SSBeauty E-Gift Card has been successfully delivered"
                    : ""
                  }`}
              </TypographyText>
              <TypographyTextOne>
                {orderDetails?.items?.[0]?.is_egv_cart &&
                  orderStatusCheck === ORDER_CONFIRMED
                  ? "Please find your order details below"
                  : orderStatusCheck === ORDER_CONFIRMED
                    ? orderDetails?.items?.[0]?.shipping_method === "CC" ||
                      orderDetails?.items?.[0]?.shipping_method ===
                      "Pay & Pick Up"
                      ? ccOrderlineOne
                      : lineone
                    : orderStatusCheck === ORDER_FAILED
                      ? orderDetails?.items?.[0]?.payment_methods?.[0]?.type?.toLowerCase() ===
                        "cashondelivery" ||
                        orderDetails?.items?.[0]?.payment_methods?.[0]?.type?.toLowerCase() ===
                        "checkmo"
                        ? codFailureText
                        : failureText
                      : pendingText}
              </TypographyTextOne>
              <TypographyTextTwo>
                Visit{" "}
                <span
                  onClick={() => {
                    callEventOrderConfirm(
                      orderDetails,
                      "My Orders",
                      `${window.location.origin}/account/orders`,
                      "",
                      orderStatusCheck,
                      Event_type
                    );
                  }}
                >
                  <a href={`${window.location.origin}/account/orders`}>
                    My Orders
                  </a>
                </span>{" "}
                section to get further updates on your order.
              </TypographyTextTwo>
            </Box>
            {orderStatusCheck !== ORDER_PENDING && (
              <Box sx={{ width: isMobile ? "100%" : "20%" }}>
                <ButtonText
                  onClick={() => handlePayContinueShop()}
                  style={{
                    backgroundColor: "#DEA3B7",
                    borderRadius: "0px",
                    width: isMobile ? "100%" : "",
                    padding: "14px 26px",
                    height: "44px",
                    color: "#231F20",
                    fontSize: "12px",
                    float: "right",
                  }}
                >
                  <TypographyTextThree>
                    {orderStatusFailed ? "RETRY PAYMENT" : buttonText}
                  </TypographyTextThree>
                </ButtonText>
              </Box>
            )}
          </Box>

          {orderDetails?.total_count > 0 && (
            <>
              {orderDetails?.items?.[0]?.is_egv_cart ? (
                <Grid container>
                  <Grid item xl={8} md={8} xs={12}>
                    <Grid sx={{ padding: "30px 0" }}>
                      <b>Order Details</b>
                    </Grid>
                    <Grid sx={{ paddingBottom: "13px" }}>
                      <Typography sx={{ color: "#7B7979" }}>
                        {orderid}
                      </Typography>
                      <TypographyTextFive>
                        {orderDetails?.items?.[0]?.order_number}
                      </TypographyTextFive>
                    </Grid>
                    <Grid sx={{ paddingBottom: "13px" }}>
                      <Typography sx={{ color: "#7B7979" }}>
                        {orderplaced}
                      </Typography>
                      <TypographyTextSeven>
                        {DateFormate(dateString)}
                      </TypographyTextSeven>
                    </Grid>
                    <Grid sx={{ paddingBottom: "13px" }}>
                      <Typography sx={{ color: "#7B7979" }}>
                        {orderstatus}
                      </Typography>
                      <TypographyTextSeven>
                        {orderDetails?.items?.[0]?.state}
                      </TypographyTextSeven>
                    </Grid>
                    <Grid sx={{ paddingTop: "17px" }}>
                      <img
                        src={
                          orderDetails?.items?.[0]?.is_egv_cart
                            ? orderDetails?.items?.[0]?.egv_image
                            : PRODUCT_FALLBACK_URL
                        }
                        alt="cart"
                        onError={(e: any) => onImageError(e, errorImage)}
                        style={{ borderRadius: "24px" }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xl={4} md={4} xs={12}>
                    {fetchViewBreakUp()}
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  container
                  style={{
                    marginTop: "40px",
                    border: "1px solid #DEDEDE",
                    padding: "20px",
                  }}
                >
                  <Grid item xl={4} md={4} xs={12}>
                    <TypographyTextFour>{orderid}</TypographyTextFour>
                    <TypographyTextFive>
                      {orderDetails?.items?.[0]?.order_number}
                    </TypographyTextFive>
                  </Grid>
                  <Grid item xl={4} md={4} xs={12}>
                    <TypographyTextSix>{orderplaced}</TypographyTextSix>

                    <TypographyTextSeven>
                      {DateFormate(dateString)}
                    </TypographyTextSeven>
                  </Grid>
                  <Grid item xl={4} md={4}>
                    <TypographyTextEight>
                      {/* Order Status */}
                      {orderstatus}
                    </TypographyTextEight>
                    <TypographyTextNine>
                      {orderDetails?.items?.[0]?.state === "payment_review"
                        ? "Pending"
                        : orderDetails?.items?.[0]?.state}
                    </TypographyTextNine>
                  </Grid>
                </Grid>
              )}

              {!orderDetails?.items?.[0]?.is_egv_cart && (
                <Box sx={{ marginTop: "40px" }}>
                  <TypographyTextTen>
                    {orderDetails?.items?.[0]?.shipping_method === "CC" ||
                      orderDetails?.items?.[0]?.shipping_method ===
                      "Pay & Pick Up"
                      ? "Store Address"
                      : deliveryadd}
                  </TypographyTextTen>
                  {orderDetails?.items?.[0]?.shipping_method === "CC" ||
                    orderDetails?.items?.[0]?.shipping_method ===
                    "Pay & Pick Up" ? (
                    <Box
                      style={{
                        marginTop: "10px",
                        border: "1px solid #DEDEDE",
                        padding: "20px",
                      }}
                    >
                      <TypographyTextEleven>
                        {orderDetails?.items?.[0]?.store_details?.[0]?.name}
                      </TypographyTextEleven>
                      <TypographyTextTweleve>
                        {` ${orderDetails?.items?.[0]?.items?.[0]?.store_details?.[0]?.street},${orderDetails?.items?.[0]?.items?.[0]?.store_details?.[0]?.street_number},${orderDetails?.items?.[0]?.items?.[0]?.store_details?.[0]?.city},${orderDetails?.items?.[0]?.items?.[0]?.store_details?.[0]?.region}-${orderDetails?.items?.[0]?.items?.[0]?.store_details?.[0]?.postcode}`}{" "}
                      </TypographyTextTweleve>
                    </Box>
                  ) : (
                    <Box
                      style={{
                        marginTop: "10px",
                        border: "1px solid #DEDEDE",
                        padding: "20px",
                      }}
                    >
                      <TypographyTextEleven>
                        {` ${orderDetails?.items?.[0]?.shipping_address?.firstname} ${orderDetails?.items?.[0]?.shipping_address?.lastname}`}
                      </TypographyTextEleven>

                      <TypographyTextTweleve>
                        {` ${orderDetails?.items?.[0]?.shipping_address?.street[0]},${orderDetails?.items?.[0]?.shipping_address?.city},${orderDetails?.items?.[0]?.shipping_address?.region}-${orderDetails?.items?.[0]?.shipping_address?.postcode}`}{" "}
                      </TypographyTextTweleve>
                      <TypographyTextThirteen>
                        {orderDetails?.items?.[0]?.shipping_address?.telephone}
                      </TypographyTextThirteen>
                    </Box>
                  )}
                </Box>
              )}

              {!orderDetails?.items?.[0]?.is_egv_cart && (
                <>
                  <ItemsTypography>Items</ItemsTypography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <Box>
                        {orderDetails?.items?.map(
                          (item: any, index: number) => {
                            return (
                              <Box
                                key={index}
                                onClick={() => {
                                  item?.items?.[0]?.product_sale_price
                                    ?.value !== 0 &&
                                    item?.items?.[0]?.product_sale_price
                                      ?.value !== 0.01
                                    ? productNavigation(item?.items?.[0])
                                    : "";
                                }}
                                sx={{
                                  border: "1px solid silver",
                                  marginBottom: "16px",
                                  marginTop: "10px",
                                  cursor:
                                    item?.items?.[0]?.product_sale_price
                                      ?.value !== 0 &&
                                      item?.items?.[0]?.product_sale_price
                                        ?.value !== 0.01
                                      ? "pointer"
                                      : "unset",
                                }}
                              >
                                {!isMobile && (
                                  <Stack sx={{ flexDirection: "row" }}>
                                    <HeadingTypography></HeadingTypography>
                                  </Stack>
                                )}
                                <ImageBox>
                                  <img
                                    src={
                                      orderDetails?.items?.[0]?.is_egv_cart
                                        ? orderDetails?.items?.[0]?.egv_image
                                        : item?.items?.[0]?.image
                                          ? ContactedGraphqlUrl +
                                          item?.items?.[0]?.image
                                          : PRODUCT_FALLBACK_URL
                                    }
                                    onError={(e: any) =>
                                      onImageError(e, errorImage)
                                    }
                                    alt="error_img"
                                    style={{ width: "100px", height: "100px" }}
                                  />

                                  <Box sx={{ width: "70%" }}>
                                    <TitleTypography>
                                      {item?.items?.[0]?.product_name}
                                    </TitleTypography>
                                    {isMobile && (
                                      <>
                                        {item?.items?.[0]?.average_rating >
                                          0 && (
                                            <RatingBox>
                                              <StarIconImage />
                                              <Box>
                                                <RatingTypography>
                                                  {
                                                    item?.items?.[0]
                                                      ?.average_rating
                                                  }
                                                </RatingTypography>
                                              </Box>
                                            </RatingBox>
                                          )}
                                        <Stack sx={{ marginTop: "5px" }}>
                                          <QuentityTypography>
                                            Qty:{" "}
                                            {item?.items?.[0]?.quantity_ordered}
                                          </QuentityTypography>
                                        </Stack>
                                      </>
                                    )}
                                    {!isMobile && (
                                      <Box>
                                        <SubTitleTypography>
                                          {item.items?.[0]?.subTitle}
                                        </SubTitleTypography>
                                      </Box>
                                    )}

                                    <Box
                                      sx={{
                                        display: "flex",
                                        gap: "40px",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          gap: "8px",
                                          alignItems: "center",
                                        }}
                                      >
                                        {!isMobile && (
                                          <>
                                            {item?.items?.[0]?.selected_options
                                              ?.length > 0 && (
                                                <>
                                                  <Typography>Size </Typography>

                                                  <Box
                                                    sx={{
                                                      display: "flex",
                                                      gap: "7.5px",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <Box>
                                                      {
                                                        item?.items?.[0]
                                                          ?.selected_options[1]
                                                          ?.value
                                                      }
                                                    </Box>
                                                  </Box>
                                                </>
                                              )}
                                            <Typography>Quantity </Typography>

                                            <Box
                                              sx={{
                                                display: "flex",
                                                gap: "7.5px",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box>
                                                {
                                                  item?.items?.[0]
                                                    ?.quantity_ordered
                                                }
                                              </Box>
                                            </Box>
                                          </>
                                        )}
                                      </Box>
                                    </Box>
                                    <PriceBox>
                                      {item?.items?.[0]?.product_sale_price
                                        ?.value === 0 ||
                                        item?.items?.[0]?.product_sale_price
                                          ?.value === 0.01 ? (
                                        <PriceTypogrphy>Free</PriceTypogrphy>
                                      ) : (
                                        <PriceTypogrphy>
                                          ₹
                                          {(
                                            item?.items?.[0]?.product_sale_price
                                              ?.value *
                                            item?.items?.[0]
                                              ?.quantity_ordered -
                                            item?.items?.[0]
                                              ?.applied_pmr_promotions_amount
                                          )?.toFixed(2)}
                                        </PriceTypogrphy>
                                      )}
                                    </PriceBox>
                                  </Box>
                                </ImageBox>
                              </Box>
                            );
                          }
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box
                        style={{
                          marginTop: "10px",
                          padding: "20px",
                          border: "1px solid #DEDEDE",
                        }}
                      >
                        {fetchViewBreakUp()}
                      </Box>
                    </Grid>
                  </Grid>
                </>
              )}
              <Box sx={{ border: "1px solid #DEDEDE", marginTop: "40px" }}>
                <ShoppingExperience
                  orderNumber={orderDetails?.items?.[0]?.order_id}
                  orderDetails={orderDetails}
                />
              </Box>
            </>
          )}
        </Box>
      )}
    </>
  );
};
export default OrderPage;
