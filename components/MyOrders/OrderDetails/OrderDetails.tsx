import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import {
  ContainerBox,
  MainBox,
  ArrowBackIcon,
  HeadingTypography,
  ImageBox,
  TitleTypography,
  StarIconImage,
  RatingBox,
  PriceTypogrphy,
  RatingTypography,
  ReorderButton,
  ExchangeButton,
  OrderImage,
  QuantityTypography,
  ReturnButtonStack,
  ReturnButton,
  CancelButton,
} from "./OrderDetailsStyles";
import client from "../../../apollo-client";
import Loader from "../../../HOC/Loader/Loader";
import BasicModal from "../../../HOC/Modal/ModalBlock";
import {
  arr3,
  returnOrderStatus,
  cancelStatus,
} from "../../../utility/TrackOrderConstants";
import { toast } from "../../../utility/Toast";

import { CREATE_BUYNOW_CART } from "../../../graphQLQueries/Cart/BuyNowCart";
import { CART_ROUTE, CART_ROUTE_STORE_MODE } from "../../Header/Constants";
import { ContactedGraphqlUrl } from "../../../utility/MagentoImageUrlConcatConstant";
import { useRecoilState } from "recoil";
import { cartState, userState } from "../../../recoilstore";
import { OrdersModalConfirmation } from "../../../utility/OrdersModalConfrimation";
import { callEventOrderDetails } from "../MyOrdersEvents";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { PRODUCT_FALLBACK_URL } from "../../../HOC/ProductCard/Constants";
import productServiceability from "../../../utility/productServiceability";
import { pinCodeBasedCoordinates } from "../../../utility/GeoAPI";
import ExchangeStatusCard from "../ExchangeOrders/ExchangeStatusCard";
import { transformItemName } from "../../../utility/urlGenerator";
import handleErrorResponse from "../../../utility/ErrorHandling";
import { fetchExploreStoreModeServiceability } from "../../../graphQLQueries/checkStoreAvailabilityForHLD";
const OrderDetails = ({
  orderItem,
  orderStatus,
  returnOrder,
  setReturnOrder,
  setisExchangeOrder,
  isExchangeOrder,
  userShippingPincode,
  isExchangedNewOrder,
  isEgvOrder,
  returnClosedDate,
  cancelButtonCheck,
  setCancelOrder,
  cancelOrder,
  isCCOrder,
  isDisableCancelButton
}: any) => {
  let refund_total = 0;
  let cancel_refund_total = 0;
  const [isMobile, setIsmobile] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  const [displayLoader, setLoader] = useState(false);
  const [redirectURL, setRedirectURL] = useState(
    `${global?.window?.location?.origin}/${transformItemName(orderItem?.product_name)}/p/${orderItem?.parent_sku}`
  );
  const [returnOrderVisible, setReturnOrderVisible] = useState(false);
  const [cancelOrderVisible, setCancelOrderVisible] = useState(false);
  const [exchangeOrderVisible, setExchangeOrderVisible] = useState(false);
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [exchangeMessage, setExchangeMessage] = useState(
    "Are You Sure You Want To Exchange This Product ?"
  );
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const exchangeOrderHandleOpen = () => {
    setExchangeOrderVisible(true);
  };
  const exchangeOrderHandleClose = () => {
    setExchangeOrderVisible(false);
  };
  const returnOrderHandleOpen = () => {
    setReturnOrderVisible(true);
  };
  const returnOrderHandleClose = () => {
    setReturnOrderVisible(false);
  };
  const cancelOrderHandleOpen = () => {
    setCancelOrderVisible(true);
  };
  const cancelOrderHandleClose = () => {
    setCancelOrderVisible(false);
  };
  useEffect(() => {
    setIsmobile(!matches);
  }, [matches]);
  const clickHandler = () => {
    setLoader(true);
    client
      .mutate({
        mutation: CREATE_BUYNOW_CART,
        variables: {
          productQuantity: orderItem?.quantity_ordered,
          productSku: orderItem?.product_sku,
          parentID: orderItem?.parent_sku,
        },
      })
      .then((res) => {
        const hasError =  handleErrorResponse(res?.data?.createBuyNowCart?.cart_id) //response checking
        if (hasError) return null;
        localStorage.setItem(
          "BuyNowCartID",
          res?.data?.createBuyNowCart?.cart_id
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
        if (userDataItems.storeMode && userDataItems.storeModeType === "cc") {
          window.location.assign(CART_ROUTE_STORE_MODE);
        } else {
          window.location.assign(CART_ROUTE);
        }
      })
      .catch((err) => {
        toast.error("Someting went wrong, Please try again!!!");
        setLoader(false)});
  };

  const exchangeSuccessfull = (productServiceability: any) => {
    if (!productServiceability) {
      setExchangeMessage(
        "Product is currently out of stock for exchange. Would you like to proceed with return instead?"
      );
      setIsOutOfStock(true);
    }
    setLoader(false);
    exchangeOrderHandleOpen();
  };
  const handleExchange = async () => {
    setLoader(true);
    if (
      userDataItems?.storeMode &&
      userDataItems?.storeModeType === "cc" &&
      userDataItems?.storeCode
    ) {
      const res = await fetchExploreStoreModeServiceability([
        {
          deliveryMode: "pick",
          quantity: 1,
          sku: orderItem?.product_sku,
          storeId: `${userDataItems?.storeCode}`,
        },
      ]);
      exchangeSuccessfull(
        res?.data?.checkStoreAvailabilityForHLD?.status === "Serviceable"
      );
    } else {
      const pincodeResponse: any = pinCodeBasedCoordinates(userShippingPincode);
      const serviceabilityResponse = productServiceability(
        parseFloat(pincodeResponse.latitude),
        parseFloat(pincodeResponse.longitude),
        userShippingPincode,
        orderItem?.product_sku
      );
      exchangeSuccessfull(serviceabilityResponse);
    }
  };
  const handleCancelClick = () => {
    setCancelOrder(true);
  };
  const returnHandleClick = () => {
    setReturnOrder(true);
    setisExchangeOrder(false);
  };
  const exchangeHandleClick = () => {
    setisExchangeOrder(true);
    setReturnOrder(false);
  };
  const handleBackIcon = () => {
    setReturnOrder && setReturnOrder(false);
    setisExchangeOrder && setisExchangeOrder(false);
    setCancelOrder && setCancelOrder(false);
    if (!isExchangeOrder && !returnOrder && !cancelOrder) {
      history.back();
    }
  };

  const Heading = () => {
    if (returnOrder) {
      return "Return";
    } else if (isExchangeOrder) {
      return "Exchange";
    } else if (cancelOrder) {
      return "Cancel";
    } else {
      return "My Orders";
    }
  };

  useEffect(() => {
    setRedirectURL(
      `${global?.window?.location?.origin}/${transformItemName(orderItem?.product_name)}/p/${orderItem?.parent_sku}`
    );
  }, [orderItem]);

  const checkReturnQuantity = () => {
    let count = 0;
    orderItem?.return_details?.map((details: any) => {
      count += details?.quantity;
    });
    return orderItem?.quantity_invoiced -
      count -
      orderItem?.quantity_exchanged >
      0
      ? false
      : true;
  };

  const checkCancelQty = () => {
    let cancelled_qty = 0;
    {
      orderItem?.cancel_details?.forEach((item: any) => {
        cancelled_qty += item?.quantity;
      });
    }
    return cancelled_qty;
  };

  return (
    <>
      {displayLoader && <Loader />}
      <ContainerBox>
        <Grid container>
          <Grid item lg={12} xs={12} md={12}>
            <MainBox>
              <Box sx={{ display: "flex" }}>
                {!isMobile && (
                  <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                    <ArrowBackIcon
                      onClick={handleBackIcon}
                      cursor={"pointer"}
                    />
                    <HeadingTypography>{Heading()}</HeadingTypography>
                  </Stack>
                )}
              </Box>
              {!isExchangedNewOrder && (
                <a
                  href={
                    orderItem?.product_sale_price?.value !== 0 &&
                      orderItem?.product_sale_price?.value !== 0.01
                      ? redirectURL
                      : ""
                  }
                  target={
                    orderItem?.product_sale_price?.value !== 0 &&
                      orderItem?.product_sale_price?.value !== 0.01
                      ? "_blank"
                      : "_self"
                  }
                  style={{
                    pointerEvents:
                      orderItem?.product_sale_price?.value !== 0 &&
                        orderItem?.product_sale_price?.value !== 0.01
                        ? "auto"
                        : "none",
                  }}
                >
                  <Box
                    onClick={() => {
                      orderItem?.product_sale_price?.value !== 0 &&
                        orderItem?.product_sale_price?.value !== 0.01
                        ? callEventOrderDetails(
                          orderItem,
                          "",
                          `${window.location.origin}/${transformItemName(orderItem?.product_name)}/p/${orderItem?.parent_sku
                          }`,
                          "My Orders"
                        )
                        : "";
                    }}
                    style={{
                      cursor:
                        orderItem?.product_sale_price?.value !== 0 &&
                          orderItem?.product_sale_price?.value !== 0.01
                          ? "pointer"
                          : "unset",
                    }}
                  >
                    <ImageBox>
                      <OrderImage
                        src={
                          orderItem?.image
                            ? ContactedGraphqlUrl + orderItem?.image
                            : ReplaceImage(PRODUCT_FALLBACK_URL)
                        }
                        alt={orderItem?.product_name}
                      />
                      <Box pl={isMobile ? "0px" : "20px"} width="100%">
                        <TitleTypography>
                          {orderItem?.product_name}
                        </TitleTypography>
                        {orderItem?.average_rating > 0 ? (
                          <RatingBox>
                            <StarIconImage />
                            <Box sx={{ display: "flex" }}>
                              <RatingTypography>
                                {orderItem?.average_rating}
                              </RatingTypography>
                              {orderItem?.qtyInMl && (
                                <RatingTypography>
                                  | {orderItem?.qtyInMl}
                                </RatingTypography>
                              )}
                            </Box>
                          </RatingBox>
                        ) : (
                          ""
                        )}
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          sx={{
                            justifyContent: "space-between",
                            marginTop:
                              orderItem?.average_rating > 0 ? 0 : "13px",
                          }}
                        >
                          {orderItem?.quantity_ordered > 0 && (
                            <Box>
                              <QuantityTypography>
                                Ordered Qty : {orderItem?.quantity_ordered}
                              </QuantityTypography>
                              <PriceTypogrphy>
                                Ordered Amount :
                                {orderItem?.product_sale_price?.value !== 0 &&
                                  orderItem?.product_sale_price?.value !== 0.01
                                  ? `₹ ${(
                                    orderItem?.product_sale_price?.value *
                                    orderItem?.quantity_ordered -
                                    orderItem?.base_discount_amount +
                                    orderItem?.base_apportioned_delivery_charges
                                  )?.toFixed(2)}`
                                  : " Free"}
                              </PriceTypogrphy>
                            </Box>
                          )}
                          {orderItem?.quantity_invoiced > 0 && (
                            <Box>
                              <QuantityTypography>
                                Invoiced Qty : {orderItem?.quantity_invoiced}
                              </QuantityTypography>
                              <PriceTypogrphy>
                                Invoiced Amount : ₹
                                {(
                                  orderItem?.product_sale_price?.value *
                                  orderItem?.quantity_invoiced -
                                  (((orderItem?.base_discount_amount > 0
                                    ? orderItem?.base_discount_amount
                                    : 0) /
                                    orderItem?.quantity_ordered) *
                                    orderItem?.quantity_invoiced) +
                                  (orderItem?.base_apportioned_delivery_charges >
                                    0
                                    ? (orderItem?.base_apportioned_delivery_charges /
                                      orderItem?.quantity_ordered) *
                                    orderItem?.quantity_invoiced
                                    : 0)
                                )?.toFixed(2)}
                              </PriceTypogrphy>
                            </Box>
                          )}
                          {orderItem?.quantity_returned > 0 && (
                            <Box>
                              <QuantityTypography>
                                Returned Qty : {orderItem?.quantity_returned}
                              </QuantityTypography>
                              {orderItem?.return_details?.[0]?.total_refund >
                                0 && (
                                  <PriceTypogrphy>
                                    Refund Amount : ₹
                                    {orderItem?.return_details?.forEach(
                                      (item: any) => {
                                        if (
                                          item?.state?.toLowerCase() ===
                                          "refund completed"
                                        ) {
                                          refund_total += item?.total_refund;
                                        }
                                      }
                                    )}
                                    {refund_total?.toFixed(2)}
                                  </PriceTypogrphy>
                                )}
                            </Box>
                          )}
                          {checkCancelQty() > 0 && (
                            <Box>
                              <QuantityTypography>
                                Cancelled Qty :{checkCancelQty()}
                              </QuantityTypography>
                              <PriceTypogrphy>
                                Refunded Amount : ₹
                                {orderItem?.cancel_details?.forEach(
                                  (item: any) => {
                                    if (
                                      item?.state?.toLowerCase() ===
                                      "refund completed"
                                    ) {
                                      cancel_refund_total += item?.total_refund;
                                    }
                                  }
                                )}
                                {cancel_refund_total?.toFixed(2)}
                              </PriceTypogrphy>
                            </Box>
                          )}
                          {orderItem?.quantity_exchanged > 0 && (
                            <Box>
                              <QuantityTypography>
                                Exchanged Qty : {orderItem?.quantity_exchanged}
                              </QuantityTypography>
                            </Box>
                          )}
                        </Stack>
                      </Box>
                    </ImageBox>
                  </Box>
                </a>
              )}
              {!returnOrderStatus.includes(orderStatus?.toLowerCase()) &&
                orderStatus &&
                !isExchangedNewOrder &&
                !isEgvOrder &&
                orderItem?.product_sale_price?.value !== 0 &&
                orderItem?.product_sale_price?.value !== 0.01 && (
                  <>
                    {!returnOrder && !isExchangeOrder && !cancelOrder && (
                      <ReturnButtonStack>
                        <Box>
                          <ReorderButton
                            onClick={() => {
                              orderItem?.product_sale_price?.value !== 0 &&
                                orderItem?.product_sale_price?.value !== 0.01 &&
                                clickHandler();
                              callEventOrderDetails(
                                orderItem,
                                "Reorder",
                                CART_ROUTE,
                                "My Orders"
                              );
                            }}
                          >
                            Reorder
                          </ReorderButton>
                        </Box>
                        {orderStatus?.toLowerCase() == "delivered" ? (
                          <>
                            {!isCCOrder && (
                              <Divider
                                orientation="vertical"
                                flexItem
                              ></Divider>
                            )}
                            {!isCCOrder && (
                              <Box>
                                <ExchangeButton
                                  disabled={
                                    process.env.NEXT_PUBLIC_DISABLE_EXCHANGE ===
                                      "true"
                                      ? true
                                      : new Date() < new Date(returnClosedDate)
                                        ? orderItem?.quantity_returned +
                                          orderItem?.quantity_exchanged ===
                                          orderItem?.quantity_invoiced
                                          ? true
                                          : false
                                        : true
                                  }
                                  $isDisabled={
                                    process.env.NEXT_PUBLIC_DISABLE_EXCHANGE ===
                                      "true"
                                      ? true
                                      : new Date() < new Date(returnClosedDate)
                                        ? orderItem?.quantity_returned +
                                          orderItem?.quantity_exchanged ===
                                          orderItem?.quantity_invoiced
                                          ? true
                                          : false
                                        : true
                                  }
                                  onClick={() => {
                                    handleExchange();
                                    callEventOrderDetails(
                                      orderItem,
                                      "Exchange",
                                      "",
                                      "My Orders"
                                    );
                                  }}
                                  $orderStatus={orderStatus}
                                >
                                  Exchange
                                </ExchangeButton>
                              </Box>
                            )}
                            <Divider orientation="vertical" flexItem></Divider>
                            <Box>
                              <ReturnButton
                                disabled={
                                  new Date() < new Date(returnClosedDate)
                                    ? orderItem?.quantity_returned +
                                      orderItem?.quantity_exchanged ===
                                      orderItem?.quantity_invoiced ||
                                      checkReturnQuantity()
                                      ? true
                                      : false
                                    : true
                                }
                                onClick={() => {
                                  returnOrderHandleOpen();
                                  callEventOrderDetails(
                                    orderItem,
                                    "Return",
                                    "",
                                    "My Orders"
                                  );
                                }}
                                $orderStatus={orderStatus}
                              >
                                Return
                              </ReturnButton>
                            </Box>
                          </>
                        ) : (
                          <>
                            <Divider orientation="vertical" flexItem></Divider>
                            <Box>
                              <ExchangeButton
                                disabled={
                                  ![...arr3]?.includes(
                                    orderStatus?.toLowerCase()
                                  )
                                }
                                onClick={() =>
                                  callEventOrderDetails(
                                    orderItem,
                                    "Exchange/Return",
                                    "na",
                                    "My Orders"
                                  )
                                }
                                $orderStatus={orderStatus}
                                $isDisabled={
                                  ![...arr3]?.includes(
                                    orderStatus?.toLowerCase()
                                  )
                                }
                              >
                                {isCCOrder ? "Return" : "Exchange/Return"}
                              </ExchangeButton>
                            </Box>
                            <Divider orientation="vertical" flexItem></Divider>
                            <Box>
                              <CancelButton
                                disabled={
                                  isExchangedNewOrder
                                    ? true
                                    : isDisableCancelButton
                                      ? true : ([...cancelStatus]?.includes(                                      
                                        orderStatus?.toLowerCase()
                                    ) &&
                                      orderItem?.quantity_canceled ===
                                      orderItem?.quantity_ordered) ||
                                    ![...cancelStatus]?.includes(
                                      orderStatus?.toLowerCase()
                                    ) ||
                                    (cancelButtonCheck()?.cancelledCount >
                                      0 &&
                                      [...cancelStatus]?.includes(
                                        orderStatus?.toLowerCase()
                                      ))
                                }
                                onClick={() => {
                                  cancelOrderHandleOpen();
                                  callEventOrderDetails(
                                    orderItem,
                                    "Exchange/Return",
                                    "",
                                    "My Orders"
                                  );
                                }}
                              >
                                Cancel
                              </CancelButton>
                            </Box>
                          </>
                        )}
                      </ReturnButtonStack>
                    )}
                  </>
                )}
              {isExchangedNewOrder && (
                <ExchangeStatusCard orderItem={orderItem} />
              )}
            </MainBox>
          </Grid>
        </Grid>
      </ContainerBox>
      {returnOrderVisible && (
        <BasicModal
          handleOpen={returnOrderHandleOpen}
          handleClose={returnOrderHandleClose}
          height={isMobile ? "30%" : "auto"}
          width={isMobile ? "90%" : "auto"}
          top="50%"
          left="50%"
          open={returnOrderVisible}
          alignItems={"center"}
          display={"flex"}
          Component={
            <OrdersModalConfirmation
              title="Are You Sure You Want To Return This Product ?"
              onHandleClick={returnHandleClick}
              onOrderHandleClose={returnOrderHandleClose}
            />
          }></BasicModal>
      )}
      {exchangeOrderVisible && (
        <BasicModal
          handleOpen={exchangeOrderHandleOpen}
          handleClose={exchangeOrderHandleClose}
          height={isMobile ? "30%" : "auto"}
          width={isMobile ? "90%" : "auto"}
          top="50%"
          left="50%"
          open={exchangeOrderVisible}
          alignItems={"center"}
          display={"flex"}
          Component={
            <OrdersModalConfirmation
              title={exchangeMessage}
              onHandleClick={
                isOutOfStock ? returnHandleClick : exchangeHandleClick
              }
              onOrderHandleClose={exchangeOrderHandleClose}
            />
          }></BasicModal>
      )}
      {cancelOrderVisible && (
        <BasicModal
          handleOpen={cancelOrderHandleOpen}
          handleClose={cancelOrderHandleClose}
          height={isMobile ? "30%" : "auto"}
          width={isMobile ? "87%" : "auto"}
          top="50%"
          left="50%"
          open={cancelOrderVisible}
          Component={
            <OrdersModalConfirmation
              title="Are You Sure You Want To Cancel This Order ?"
              onHandleClick={handleCancelClick}
              onOrderHandleClose={cancelOrderHandleClose}
            />
          }></BasicModal>
      )}
    </>
  );
};
export default OrderDetails;