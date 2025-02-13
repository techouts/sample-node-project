import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import client from "../../apollo-client";
import OrderDetails from "../../components/MyOrders/OrderDetails/OrderDetails";
import Address from "../../components/OrderDetails/DeliveryAddress";
import OrderPrice from "../../components/OrderDetails/OrderPrice";
import { TrackOrder } from "../../components/OrderDetails/TrackOrder";
import { GET_ORDER_SUMMARY } from "../../graphQLQueries/OrderDetailsQuery";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import Loader from "../../HOC/Loader/Loader";
import { useRecoilState } from "recoil";
import BackToTopButton from "../BackToTopBtn/BackToTopButton";
import { DeliveryFeedback } from "../DeliveryFeedback/DeliveryFeedback";
import ExchangePolicyBottomLayout from "../MyOrders/ExchangePolicyBottomLayout";
import {
  OrderDetailsWrapperBox,
  ReturnTextInfo,
} from "../MyOrders/OrderDetails/OrderDetailsStyles";
import ReturnOrderLayout from "../MyOrders/ReturnOrder/ReturnOrderLayout";
import FeedBackRating from "./Feedback";
import PurchasesCarousel from "./PurchaseCarousel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { DateFormate } from "../../utility/DateFormate";
import { userState } from "../../recoilstore";
import { FETCH_CUSTOMER_WALLET } from "../../graphQLQueries/MyProfileQuery";
import { cancelStatus } from "../../utility/TrackOrderConstants";
const deliveryFeedbackData = require("../../JSON/DeliveryFeedbackData.json");
export default function OrderSummary(props: any) {
  const { setIsSelected, setAllOrdersRerender } = props;
  const [orderData, setOrderData] = useState<any>();
  const [orderItemData, setOrderItemData] = useState<any>();
  const [productDetails, setProductDetail] = useState<any>([]);
  const [productsList, setProductsList] = useState<any>([]);
  const [APICalled, setAPICalled] = useState<any>(false);
  const [carousalProductsList, setCarousalProductsList] = useState<any>([]);
  const [displayLoader, setLoader] = useState(false);
  const [returnOrder, setReturnOrder] = useState(false);
  const [isExchangeOrder, setisExchangeOrder] = useState(false);
  const [cancelOrder, setCancelOrder] = useState(false);
  const [orderToggle, setOrderToggle] = useState(false);
  const [snackToast, setSnackToast] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string>("");
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [shipmentDetails, setShipmentDetails] = useState([]);
  const egvReceiptDetails = orderItemData?.is_egv_cart
    ? JSON.parse(orderItemData?.egv_additional_options)
    : {};
  const [selectedOrderFulfilmentID, setselectedOrderFulfilmentID] =
    useState("");
  const router = useRouter();
  const orderToggleHandler = () => {
    setOrderToggle(!orderToggle);
  };
  const fetchCustomerWalletQuery = async () => {
    client
      .query({
        query: FETCH_CUSTOMER_WALLET,
        fetchPolicy: "no-cache",
      })
      .then((response: any) => {
        setUserDataItems({
          ...userDataItems,
          walletNumber: response?.data?.customer?.wallet_number,
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (
      !userDataItems?.walletNumber ||
      userDataItems?.walletNumber === "na" ||
      userDataItems?.walletNumber === null
    ) {
      fetchCustomerWalletQuery();
    }
  }, []);

  useEffect(() => {
    const findShipmentDetails = () => {
      const result:any = [];

      orderData?.items?.forEach((item:any) => {
        console.log("order summary1",item.items[0].item_id);
        
          if (item?.items?.[0]?.item_id === productDetails?.item_id) {    
            orderData?.items?.forEach((shipment:any) => {
              shipment.shipments.forEach((shipmentItem:any) => {
                shipmentItem.items.forEach((shipmentData:any) => {
                if (shipmentData?.product_name === productDetails?.product_name) {
                  result.push({
                    shipmentId: shipmentItem.id,
                    shipmentNumber: shipmentItem.number,
                  });
                }
              });
              });
            });
          }
        });
      const shipmentFinalData= result?.[0];
      setShipmentDetails(shipmentFinalData);
    };

    findShipmentDetails();
  }, [productDetails,orderData]);

  console.log('order summary', shipmentDetails,productDetails.item_id,productDetails?.product_name,orderData);

  const fetchData = (res: any) => {
    return res?.data?.customer?.orders?.items?.filter(
      (singleOrderItem: any) =>
        singleOrderItem?.fulfilment_unique_id === router.query.itemId ||
        String(singleOrderItem?.fulfilment_item_id) === router.query.itemId
    );
  };
  useEffect(() => {
    setLoader(true);
    if (router.query.orderNumber) {
      client
        .query({
          query: GET_ORDER_SUMMARY,
          variables: {
            orderNumber: router.query.orderNumber,
          },
          fetchPolicy: "no-cache",
          errorPolicy: "ignore",
        })
        .then((res) => {
          setOrderData(res?.data?.customer?.orders);
          setOrderItemData(
            router.query.itemId
              ? res?.data?.customer?.orders?.items?.filter(
                  (singleOrderItem: any) =>
                    singleOrderItem?.fulfilment_unique_id ===
                      router.query.itemId ||
                    String(singleOrderItem?.fulfilment_item_id) ===
                      router.query.itemId
                )?.[0]
              : res?.data?.customer?.orders?.items?.[0]
          );
          setProductDetail(
            router.query.itemId
              ? {
                  ...fetchData(res)?.[0]?.items?.[0],
                  fulfilment_unique_id:
                    fetchData(res)?.[0]?.fulfilment_unique_id,
                  fulfilment_ref: fetchData(res)?.[0]?.fulfilment_ref,
                }
              : {
                  ...res?.data?.customer?.orders?.items?.[0]?.items?.[0],
                  fulfilment_unique_id:
                    res?.data?.customer?.orders?.items?.[0]
                      ?.fulfilment_unique_id,
                  fulfilment_ref:
                    res?.data?.customer?.orders?.items?.[0]?.fulfilment_ref,
                }
          );

          setselectedOrderFulfilmentID(
            router.query.itemId
              ? res?.data?.customer?.orders?.items?.filter(
                  (singleOrderItem: any) =>
                    singleOrderItem?.fulfilment_unique_id ===
                      router.query.itemId ||
                    String(singleOrderItem?.fulfilment_item_id) ===
                      router.query.itemId
                )?.[0]?.fulfilment_ref
              : res?.data?.customer?.orders?.items?.[0]?.fulfilment_ref
          );
          setProductsList(res?.data?.customer?.orders?.items);
          if (orderToggle) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setAPICalled(true);
          setLoader(false);
        });
    }
  }, [global?.window?.location.search, orderToggle]);

  useEffect(() => {
    if (APICalled && productsList?.length > 0) {
      const tempArry = productsList
        .filter(
          (product: any) =>
            product?.fulfilment_unique_id !==
            productDetails?.fulfilment_unique_id
        )
        ?.map((productItem: any) => {
          return {
            ...productItem?.items?.[0],
            fulfilment_unique_id: productItem?.fulfilment_unique_id,
            fulfilment_ref: productItem?.fulfilment_ref,
          };
        });
      setCarousalProductsList(tempArry);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetails, APICalled]);

  const setCurrentProduct = async (selectedProductDetails: any) => {
    let ItemLevelData: any;
    await orderData.items?.map((singleItem: any) => {
      const filterItem = singleItem.items?.filter(
        (itemData: any) =>
          singleItem?.fulfilment_unique_id ===
          selectedProductDetails?.fulfilment_unique_id
      );
      if (filterItem?.length > 0) {
        ItemLevelData = singleItem;
      }
    });
    await setOrderItemData(ItemLevelData);
    await setProductDetail(selectedProductDetails);
    setselectedOrderFulfilmentID(
      selectedProductDetails?.fulfilment_unique_id
        ? orderData.items?.filter(
            (singleOrderItem: any) =>
              singleOrderItem?.fulfilment_unique_id ===
              selectedProductDetails?.fulfilment_unique_id
          )?.[0]?.fulfilment_ref
        : orderData.items?.[0]?.fulfilment_ref
    );
  };
  const enableSnackMessage = (message: string) => {
    setSnackToast(true);
    setSnackMessage(message);
  };

  const checkCancelDisbale = () => {
    let cancelledCount = 0;
    let orderedCount = 0;
    orderData?.items?.map((ordr: any) => {
      ordr?.items?.map((val: any) => {
        cancelledCount += val?.quantity_canceled;
        orderedCount += val?.quantity_ordered;
      });
    });
    let data = { cancelledCount: cancelledCount, orderedCount: orderedCount };
    return data;
  };

  const isDisableCancelButton = useMemo(() => {
    return orderData?.items?.every((singleOrderItem: any) => {
      return !(
        cancelStatus.includes(singleOrderItem.status?.toLowerCase()) &&
        singleOrderItem?.items?.every(
          (cItem: any) =>
            (cItem?.quantity_canceled ?? 0) < (cItem?.quantity_ordered ?? 0)
        )
      );
    });
  }, [orderData]);

  return (
    <>
      {displayLoader && <Loader />}
      {!displayLoader && (
        <OrderDetailsWrapperBox sx={{ bgcolor: "#F7F6F9" }}>
          <OrderDetails
            isDisableCancelButton={isDisableCancelButton}
            returnOrder={returnOrder}
            setReturnOrder={setReturnOrder}
            setCancelOrder={setCancelOrder}
            orderStatus={orderItemData?.state}
            orderNumber={orderItemData?.number}
            orderItem={productDetails}
            setIsSelected={setIsSelected}
            orderToggleHandler={orderToggleHandler}
            enableSnackMessage={enableSnackMessage}
            setAllOrdersRerender={setAllOrdersRerender}
            setisExchangeOrder={setisExchangeOrder}
            isExchangeOrder={isExchangeOrder}
            userShippingPincode={orderItemData?.shipping_address?.postcode}
            isExchangedNewOrder={orderItemData?.is_exchange === 1}
            isEgvOrder={orderItemData?.is_egv_cart}
            egvImage={orderItemData?.egv_image}
            returnClosedDate={orderItemData?.return_date}
            cancelOrder={cancelOrder}
            cancelButtonCheck={checkCancelDisbale}
            isCCOrder={orderItemData?.shipping_method === "CC"}
            payment_methods={orderItemData?.payment_methods}
          />

          {orderItemData?.shipping_method?.toLowerCase() === "cc" ? (
            <Box
              display={"flex"}
              alignItems="center"
              p="10px 0 0 10px"
              gap={"5px"}
            >
              <ErrorOutlineIcon sx={{ color: "#8E8D99" }}></ErrorOutlineIcon>
              <ReturnTextInfo>
                {`Pay & Pickup orders can be returned to the same store as Pick up`}
              </ReturnTextInfo>
            </Box>
          ) : new Date() <= new Date(orderItemData?.return_date) &&
            orderItemData?.state?.toLowerCase() === "delivered" ? (
            <Box
              display={"flex"}
              alignItems="center"
              p="10px 0 0 10px"
              gap={"5px"}
            >
              <ErrorOutlineIcon sx={{ color: "#8E8D99" }}></ErrorOutlineIcon>
              <ReturnTextInfo>
                {` Window for Exchange / Return  closed on  ${DateFormate(
                  orderItemData?.return_date
                )}`}
              </ReturnTextInfo>
            </Box>
          ) : (
            checkCancelDisbale()?.cancelledCount <
              checkCancelDisbale()?.orderedCount &&
            checkCancelDisbale()?.cancelledCount > 0 && (
              <Box
                display={"flex"}
                alignItems="center"
                p="10px 0 0 10px"
                gap={"5px"}
              >
                <ErrorOutlineIcon sx={{ color: "#8E8D99" }}></ErrorOutlineIcon>
                <ReturnTextInfo>
                  {`Your order has been partially cancelled. Please call our customer care to cancel any other products from your order.`}
                </ReturnTextInfo>
              </Box>
            )
          )}
          {orderData?.items?.length > 0 && (
            <TrackOrder
              trackorderItem={orderItemData}
              isExchange={false}
              selectedProductName={productDetails?.product_name}
              selectedProductQuantity={productDetails?.quantity_invoiced}
              isReturnOrder={false}
              key={0}
              cancelCheckVal={
                checkCancelDisbale()?.cancelledCount <
                  checkCancelDisbale()?.orderedCount &&
                checkCancelDisbale()?.cancelledCount > 0
              }
              paymentMethods={orderItemData?.payment_methods}
              isEgvOrder={orderItemData?.is_egv_cart}
              shipmentDetails={shipmentDetails}
            />
          )}
          {orderItemData?.is_exchange === 1 && (
            <ExchangePolicyBottomLayout
              cancelledOrderState={
                orderItemData?.status?.toLowerCase() === "cancelled"
              }
            />
          )}

          <>
            {returnOrder || isExchangeOrder || cancelOrder ? (
              <ReturnOrderLayout
                orderToggleHandler={orderToggleHandler}
                orderItem={productDetails}
                trackOrder={orderItemData}
                selectedOrderFulfilmentID={selectedOrderFulfilmentID}
                enableSnackMessage={enableSnackMessage}
                setReturnOrder={setReturnOrder}
                setCancelOrder={setCancelOrder}
                isExchangeOrder={isExchangeOrder}
                setisExchangeOrder={setisExchangeOrder}
                cancelOrder={cancelOrder}
                orderNumber={orderItemData?.number}
              />
            ) : (
              <>
                {orderItemData?.is_exchange !== 1 && (
                  <>
                    {orderItemData?.shipping_method === "CC" ||
                      (orderItemData?.shipping_method === "Pay & Pick Up" && (
                        <Address
                          sectionTitle={"Delivery Mode & Store Details"}
                          deliveryMode={"Pay & Pick Up"}
                          title={"Store Details"}
                          name={`${orderItemData?.items?.[0]?.store_details?.[0]?.name}`}
                          street={`${orderItemData?.items?.[0]?.store_details?.[0]?.street} ${orderItemData?.items?.[0]?.store_details?.[0]?.region}`}
                          city={
                            orderItemData?.items?.[0]?.store_details?.[0]?.city
                          }
                          postcode={
                            orderItemData?.items?.[0]?.store_details?.[0]
                              ?.postcode
                          }
                        />
                      ))}
                    {orderItemData?.shipping_method !== "CC" &&
                      orderItemData?.shipping_method !== "Pay & Pick Up" && (
                        <Address
                          sectionTitle={
                            orderItemData?.is_egv_cart
                              ? "Recipient Details"
                              : "Delivery Mode & Address"
                          }
                          deliveryMode={
                            orderItemData?.is_egv_cart
                              ? undefined
                              : orderItemData?.shipping_method !== "CC"
                              ? orderItemData?.shipping_method === "ED"
                                ? "Express Delivery"
                                : "Standard Delivery"
                              : undefined
                          }
                          title={
                            orderItemData?.is_egv_cart
                              ? undefined
                              : orderItemData?.shipping_method?.toLowerCase() ===
                                "cc"
                              ? "Billing Address"
                              : "Delivery Address"
                          }
                          name={
                            orderItemData?.is_egv_cart
                              ? egvReceiptDetails?.fullname
                              : `${orderItemData?.shipping_address?.firstname} ${orderItemData?.shipping_address?.lastname}`
                          }
                          telephoneNumber={
                            orderItemData?.is_egv_cart
                              ? egvReceiptDetails?.email
                              : orderItemData?.shipping_address?.telephone
                          }
                          street={
                            orderItemData?.is_egv_cart
                              ? egvReceiptDetails?.message
                              : orderItemData?.shipping_address?.street
                          }
                          city={orderItemData?.shipping_address?.city}
                          postcode={orderItemData?.shipping_address?.postcode}
                        />
                      )}
                    {orderData?.items?.length > 0 && (
                      <OrderPrice
                        orderPrice={orderData?.items}
                        orderItemData={orderItemData}
                      />
                    )}
                    {productDetails?.return_details?.length > 0 &&
                      productDetails?.return_details?.map(
                        (orderItem: any, index: number) => (
                          <TrackOrder
                            trackorderItem={orderItem}
                            isExchange={false}
                            selectedProductName={productDetails?.product_name}
                            selectedProductQuantity={
                              productDetails?.quantity_invoiced
                            }
                            paymentMethods={orderItemData?.payment_methods}
                            isReturnOrder={true}
                            key={index}
                          />
                        )
                      )}
                    {productDetails?.exchange_details?.length > 0 &&
                      productDetails?.exchange_details?.map(
                        (exchangeOrderItem: any, index: number) => (
                          <TrackOrder
                            trackorderItem={exchangeOrderItem}
                            selectedProductName={productDetails?.product_name}
                            selectedProductQuantity={
                              productDetails?.quantity_invoiced
                            }
                            paymentMethods={orderItemData?.payment_methods}
                            isExchange={true}
                            key={index}
                          />
                        )
                      )}
                    {productDetails?.cancel_details?.length > 0 &&
                      productDetails?.cancel_details?.map(
                        (cancelOrderItem: any, index: number) => (
                          <TrackOrder
                            trackorderItem={cancelOrderItem}
                            selectedProductName={productDetails?.product_name}
                            selectedProductQuantity={
                              productDetails?.quantity_invoiced
                            }
                            paymentMethods={orderItemData?.payment_methods}
                            isCancelOrder={true}
                            key={index}
                          />
                        )
                      )}
                    <PurchasesCarousel
                      productsList={carousalProductsList}
                      setCurrentProduct={setCurrentProduct}
                    />
                    {(orderItemData?.state?.toLowerCase() === "delivered" ||
                      orderItemData?.state?.toLowerCase() === "collected") && (
                      <FeedBackRating
                        orderData={orderData}
                        orderItem={productDetails}
                      />
                    )}
                    {orderItemData?.state?.toLowerCase() === "delivered" && (
                      <DeliveryFeedback
                        enableSnackMessage={enableSnackMessage}
                        orderID={orderItemData?.order_id}
                        courierName={orderItemData?.lsp_name}
                        {...deliveryFeedbackData}
                        shipmentDetails={shipmentDetails}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </>

          <CustomSnackBar
            setSnackBarOpen={setSnackToast}
            snackBarOpen={snackToast}
            snackMessage={snackMessage}
            setSnackMessage={setSnackMessage}
          />
          <BackToTopButton />
        </OrderDetailsWrapperBox>
      )}
    </>
  );
}
