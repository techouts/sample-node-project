import React, { Fragment } from "react";
import CancelOrderLayout from "./CancelOrderLayout";
import ReturnOrder from "./ReturnOrder";
let ReturnOrderData = require("../../../JSON/ReturnOrder.json");

const ReturnOrderLayout = ({
  orderItem,
  trackOrder,
  orderToggleHandler,
  enableSnackMessage,
  selectedOrderFulfilmentID,
  setReturnOrder,
  isExchangeOrder,
  setisExchangeOrder,
  setCancelOrder,
  cancelOrder,
  orderNumber,
}: any) => {
  return (
    <Fragment>
      {cancelOrder ? (
        <CancelOrderLayout
          enableSnackMessage={enableSnackMessage}
          orderToggleHandler={orderToggleHandler}
          orderItem={orderItem}
          orderNumber={orderNumber}
          trackOrder={trackOrder}
          setCancelOrder={setCancelOrder}
        />
      ) : (
        <ReturnOrder
          ReturnOrderData={ReturnOrderData}
          orderToggleHandler={orderToggleHandler}
          orderItem={orderItem}
          trackOrder={trackOrder}
          order_id={trackOrder?.order_id}
          orderedMethod={trackOrder?.payment_methods?.[0]?.type}
          enableSnackMessage={enableSnackMessage}
          selectedOrderFulfilmentID={selectedOrderFulfilmentID}
          setReturnOrder={setReturnOrder}
          isExchangeOrder={isExchangeOrder}
          setisExchangeOrder={setisExchangeOrder}
          setCancelOrder={setCancelOrder}
        />
      )}
    </Fragment>
  );
};

export default ReturnOrderLayout;
