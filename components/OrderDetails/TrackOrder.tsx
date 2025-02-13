import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { DateFormate } from "../../utility/DateFormate";
import { useMobileCheck } from "../../utility/isMobile";
import {
  arr1,
  arr2,
} from "../../utility/TrackOrderConstants";
import ReturnRefundBreakup from "../MyOrders/OrderDetails/ReturnRefundBreakup";
import {
  ComponentGrid,
  OrderItemTitle,
  OrderStatusTitle,
  OrderTitle,
  TrackButton,
  TrackButtonBox,
} from "./OrderDetailsStyles";
import TrackOrderModal from "./TrackOrderModal";

export const TrackOrder = ({
  trackorderItem,
  selectedProductName,
  selectedProductQuantity,
  isReturnOrder = false,
  key,
  paymentMethods,
  isExchange = false,
  isEgvOrder,
  isCancelOrder = false,
  cancelCheckVal,
  shipmentDetails
}: any) => {
  const [authOpen, setAuthOpen] = useState(false);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const returnModalToggle = () => setReturnModalOpen(!returnModalOpen);
  const isMobile = useMobileCheck();
  const AuthhandleOpen = () => {
    setAuthOpen(true);
  };
  const deliveryDateShownStatus = [...arr1, ...arr2];
  const AuthhandleClose = () => setAuthOpen(false);
  return (
    <Box sx={{ width: "100%" }} key={key}>
      <Grid container>
        <ComponentGrid item lg={12} md={12} xs={12}>
          <OrderTitle>
            {isExchange
              ? "Exchange Details"
              : isReturnOrder
              ? "Return Details"
              : isCancelOrder
              ? "Cancel Details"
              : "Order Details"}
          </OrderTitle>
          {(isReturnOrder || isExchange || isCancelOrder
            ? trackorderItem?.order_number
            : trackorderItem?.number) && (
            <Box pb={isMobile ? "10px" : 1.7}>
              <OrderItemTitle>Order ID#</OrderItemTitle>
              <Typography fontSize={isMobile ? "11px" : "16px"}>
                {isReturnOrder || isExchange || isCancelOrder
                  ? trackorderItem?.order_number
                  : trackorderItem?.number}
              </Typography>
              
            </Box>
          )}
          {shipmentDetails?.shipmentNumber&&
            <Box pb={isMobile ? "10px" : 1.7}>
             <OrderItemTitle>Shipment ID#</OrderItemTitle>
              <Typography fontSize={isMobile ? "11px" : "16px"}>
                {shipmentDetails?.shipmentNumber}
              </Typography>
              </Box>
          }
          {trackorderItem?.old_order_number &&
            trackorderItem?.old_order_number !== "" && (
              <Box pb={isMobile ? "10px" : 1.7}>
                <OrderItemTitle>Exchanged Order ID#</OrderItemTitle>
                <Typography fontSize={isMobile ? "11px" : "16px"}>
                  {trackorderItem?.old_order_number}
                </Typography>
              </Box>
            )}
          {
            <Box pb={isMobile ? "10px" : 1}>
              <OrderItemTitle>
                {isExchange
                  ? "Exchange Created:"
                  : isReturnOrder
                  ? "Return Created:"
                  : isCancelOrder
                  ? "Cancel Created:"
                  : "Order Placed:"}
              </OrderItemTitle>
              <Typography fontSize={isMobile ? "11px" : "16px"}>
                {DateFormate(
                  isReturnOrder || isExchange
                    ? trackorderItem?.return_initiated_date
                    : isCancelOrder
                    ? trackorderItem?.cancel_initiated_date
                    : trackorderItem?.order_date
                )}
              </Typography>
            </Box>
          }
          {(isReturnOrder || isExchange || isCancelOrder) && (
            <Box pb={isMobile ? "10px" : 1}>
              <OrderItemTitle>No of Item:</OrderItemTitle>
              <Typography fontSize={isMobile ? "11px" : "16px"}>
                {trackorderItem?.quantity}
              </Typography>
            </Box>
          )}
          {(isReturnOrder || isExchange) && (
            <Box pb={isMobile ? "10px" : 1}>
              <OrderItemTitle>Mode:</OrderItemTitle>
              <Typography fontSize={isMobile ? "11px" : "16px"}>
                {trackorderItem?.send_back_method}
              </Typography>
            </Box>
          )}
          <Box pb={isMobile ? "10px" : ""} display={"flex"}>
            <OrderItemTitle>
              {isReturnOrder ? "Return Status" : "Order Status"}:{" "}
            </OrderItemTitle>
            <OrderStatusTitle fontSize={isMobile ? "11px" : "16px"}>
              {isExchange
                ? trackorderItem?.state?.replace(/Return|return/gi, "Exchange")
                : (paymentMethods?.[0]?.type === "cashondelivery" &&
                  isCancelOrder)
                ? "Cancelled"
                : cancelCheckVal 
                ? "Partially Cancelled"
                : trackorderItem?.state}
            </OrderStatusTitle>
          </Box>
          {(isReturnOrder || isExchange) && trackorderItem?.awb_number && (
            <Box pb={isMobile ? "10px" : ""} display={"flex"}>
              <Typography fontSize={isMobile ? "11px" : "16px"}>
                {`${
                  isReturnOrder ? "Return Tracking No" : "Order Tracking No"
                }: ${trackorderItem?.awb_number}`}
              </Typography>
            </Box>
          )}
          {(isReturnOrder || isExchange) && trackorderItem?.rma_number && (
            <Box pb={isMobile ? "10px" : ""} display={"flex"}>
              <Typography fontSize={isMobile ? "11px" : "16px"}>
                {`RMA No: ${trackorderItem?.rma_number}`}
              </Typography>
            </Box>
          )}
          {trackorderItem?.items?.[0]?.estimated_delivery_date &&
            deliveryDateShownStatus?.includes(
              trackorderItem?.state?.toLowerCase()
            ) &&
            trackorderItem?.shipping_method?.toLowerCase() !== "cc" && (
              <Typography fontSize={isMobile ? "11px" : "16px"}>
                {`Estimated Delivery by ${DateFormate(
                  trackorderItem?.items?.[0]?.estimated_delivery_date
                )}`}
              </Typography>
            )}

          {(isReturnOrder || isCancelOrder) &&
            trackorderItem?.state?.toLowerCase() === "refund completed" && (
              <TrackButtonBox>
                <TrackButton onClick={() => returnModalToggle()}>
                  {`View ${isReturnOrder ? "refund" : "cancel"} breakup`}
                </TrackButton>
              </TrackButtonBox>
            )}

          {!isEgvOrder && (
            <>
              {(paymentMethods?.[0]?.type !== "cashondelivery" ||
                !isCancelOrder) &&
                trackorderItem?.state?.toLowerCase() !== "refund completed" &&
                trackorderItem?.__typename?.toLowerCase() ===
                  "canceldetails" && (
                  <TrackButtonBox>
                    <TrackButton onClick={() => setAuthOpen(true)}>
                      {isReturnOrder || isCancelOrder || isExchange
                        ? `Track ${
                            isExchange
                              ? "Exchange"
                              : isCancelOrder
                              ? "Cancel"
                              : "Refund"
                          }`
                        : "Track Order"}
                    </TrackButton>
                  </TrackButtonBox>
                )}
            </>
          )}
          {authOpen && (
            <BasicModal
              handleOpen={AuthhandleOpen}
              handleClose={AuthhandleClose}
              height={isMobile ? "380px" : "auto"}
              width={isMobile ? "90%" : "600px"}
              top="50%"
              left="50%"
              overflowData="auto"
              open={authOpen}
              Component={
                <TrackOrderModal
                  orderedDate={
                    isReturnOrder || isExchange
                      ? trackorderItem?.return_initiated_date
                      : isCancelOrder
                      ? trackorderItem?.cancel_initiated_date
                      : trackorderItem?.order_date
                  }
                  orderStatus={trackorderItem?.state}
                  selectedProductName={selectedProductName}
                  quantityOrdered={
                    isReturnOrder || isExchange || isCancelOrder
                      ? trackorderItem?.quantity
                      : selectedProductQuantity
                  }
                  isCCShippingMethod={
                    trackorderItem?.shipping_method?.toLowerCase() === "cc" ||
                    trackorderItem?.shipping_method?.toLowerCase() ===
                      "pay & pick up"
                  }
                  isCancelledOrder={isCancelOrder}
                  isExchange={isExchange}
                  isRtoJourney={trackorderItem?.is_rto === 1}
                  isSelfCourierMode={
                    trackorderItem?.send_back_method === "self_courier"
                  }
                />
              }
            ></BasicModal>
          )}
          <BasicModal
            height={"auto"}
            width={isMobile ? "328px" : "737px"}
            top="50%"
            left="50%"
            overflowData="auto"
            handleClose={returnModalToggle}
            open={returnModalOpen}
            Component={<ReturnRefundBreakup {...trackorderItem} />}
          />
        </ComponentGrid>
      </Grid>
    </Box>
  );
};