import React from "react";
import Box from "@mui/material/Box";
import {
  Confirming,
  OrderDate,
  StepKey,
  StepperComponent,
  TrackLabel,
  TrackTitle,
} from "./OrderDetailsStyles";
import { useMobileCheck } from "../../utility/isMobile";
import { StepLabel } from "@mui/material";
import { DateFormate } from "../../utility/DateFormate";
import {
  arr1,
  arr2,
  arr3,
  arr4,
  returnOrderStatus,
  returnInit,
  returnPicked,
  returnReceived,
  refundCompleted,
  returnInTransit,
  canelledOrderInitialStatus,
  cancelledOrderSecondaryStatus,
  cancelledOrderTertiaryStatus,
  undeliveredStatus,
  rtoundeliveredStatus,
  rtoStatus,
  rtoRefundCompleted,
  rtoRefundInitiated,
} from "../../utility/TrackOrderConstants";

let finalStatus: number;
export const TrackOrderModal = ({
  orderStatus,
  orderedDate,
  selectedProductName,
  quantityOrdered,
  isCCShippingMethod,
  isCancelledOrder,
  isExchange,
  isRtoJourney,
  isSelfCourierMode,
}: any) => {
  const check = orderStatus?.toLowerCase();
  const returnCheck = returnOrderStatus?.includes(check) && !isSelfCourierMode;
  const returnSelfCourierMode =
    returnOrderStatus?.includes(check) && isSelfCourierMode;
  if (
    arr1.includes(check) ||
    (isCancelledOrder && canelledOrderInitialStatus?.includes(check))
  ) {
    finalStatus = 1;
  } else if (
    arr2.includes(check) ||
    (isCancelledOrder && cancelledOrderSecondaryStatus?.includes(check))
  ) {
    finalStatus = 2;
  } else if (
    arr3.includes(check) ||
    rtoundeliveredStatus.includes(check) ||
    (isCancelledOrder && cancelledOrderTertiaryStatus?.includes(check))
  ) {
    finalStatus = 3;
  } else if (
    (arr4.includes(check) && !isCancelledOrder) ||
    rtoStatus.includes(check)
  ) {
    finalStatus = 4;
  } else if (rtoRefundInitiated.includes(check)) {
    finalStatus = 5;
  } else if (rtoRefundCompleted.includes(check)) {
    finalStatus = 6;
    // below are for the return
  } else if (
    returnInit.includes(check) ||
    (returnReceived.includes(check) && isSelfCourierMode)
  ) {
    finalStatus = 1;
  } else if (
    returnPicked.includes(check) ||
    (returnReceived.includes(check) && isSelfCourierMode)
  ) {
    finalStatus = 2;
  } else if (
    returnInTransit.includes(check) ||
    (refundCompleted.includes(check) && isSelfCourierMode)
  ) {
    finalStatus = 3;
  } else if (returnReceived.includes(check)) {
    finalStatus = 4;
  } else if (refundCompleted.includes(check) && isCancelledOrder && check === "refund pending") {
    finalStatus = 2;
  }
  else if(refundCompleted.includes(check)){
    finalStatus = 5;
  }
  // Will un comment once we receive confirmation
  // else if (returnFailed.includes(check)) {
  //   finalStatus = 5;
  // }
 
  const isccShippingMethod = () => {
    if (rtoundeliveredStatus.includes(check)) {
      return "Un";
    } else {
      return "";
    }
  };
  const finalItems = [
    `Order Received ${orderedDate && DateFormate(orderedDate)}`,
    isCCShippingMethod ? `Ready for pickup` : `Shipped`,
    isCCShippingMethod ? "Pick up done" : `${isccShippingMethod()}Delivered`,
  ];
  const rtoItems = [
    `Order Received ${orderedDate && DateFormate(orderedDate)}`,
    `Shipped`,
    `Undelivered`,
    "Return To Origin",
    "Refund Initiated",
    "Refund Completed",
  ];
  const finalReturnItems = [
    `${isExchange ? "Exchange" : "Return"} Initiated`,
    `${isExchange ? "Exchange" : "Return"}  Picked`,
    `${isExchange ? "Exchange" : "Return"}  In Transit`,
    `${isExchange ? "Exchange" : "Return"}  Received`,
    `${isExchange ? "Exchange" : "Return"}  Processed`,
  ];
  const cancelledReturnItems = [
    "Cancelled",
    "Refund Initiated",
    "Refund Processed",
  ];
  const returnSelfCourierModeStates = [
    `${isExchange ? "Exchange" : "Return"} Initiated`,
    `${isExchange ? "Exchange" : "Return"}  Received`,
    `${isExchange ? "Exchange" : "Return"}  Processed`,
  ];

  const stepsItems = () => {
    if (isCancelledOrder) {
      return cancelledReturnItems;
    }
    if (undeliveredStatus?.includes(check)) {
      return rtoItems;
    }
    if (returnSelfCourierMode) {
      return returnSelfCourierModeStates;
    }
    if (returnCheck) {
      return finalReturnItems;
    }
    return finalItems;  
  };
  const steps = {
    items: stepsItems(),
    date: DateFormate(orderedDate),
    statusSteps: finalStatus,
  };

  const isMobile = useMobileCheck();
  return (
    <Box sx={{ width: "100%", padding: "48px 30px" }}>
      <TrackTitle>Track order</TrackTitle>
      <Confirming>
        {quantityOrdered || 1} Package{" "}
        {isExchange ? orderStatus?.replace("Return", "Exchange") : orderStatus}:{" "}
        <span>{selectedProductName}</span>
      </Confirming>
      <OrderDate>{steps?.date}</OrderDate>
      {!isMobile && (
        <StepperComponent
          activeStep={steps?.statusSteps}
          alternativeLabel={true}
          orientation="horizontal"
        >
          {steps?.items?.map((label: string) => (
            <StepKey key={label} aria-label="step-key">
              <TrackLabel>{label}</TrackLabel>
            </StepKey>
          ))}
        </StepperComponent>
      )}
      {isMobile && (
        <StepperComponent
          activeStep={steps?.statusSteps}
          orientation="vertical"
        >
          {steps.items?.map((mobileLabel: string, index1: number) => {
            const uniqueKeyValue = index1;
            return (
              <StepKey key={uniqueKeyValue}>
                <StepLabel>{mobileLabel}</StepLabel>
              </StepKey>
            );
          })}
        </StepperComponent>
      )}
    </Box>
  );
};
export default TrackOrderModal;