import React, { Fragment} from "react";
import { useRouter } from "next/router";
import CartAddress from "../CartAddress/CartAddress";
import { CartLayout } from "../CartLayout/CartLayout";
import OrderPage from "../OrderConfirmation/OrderConfirmation";
import PaymentPageIndex from "../PaymentsPages/paymentss";
const CartData = require("../../JSON/CartLayoutData.json");
const OrderConfirmationData = require("../../components/OrderConfirmation/OrderConfirmation.json");
const CartLayoutDataResponse = require("../../JSON/CartLayoutDataResponse.json");
const CartAddressData = require("../../JSON/CartAddress.json");
import { Box } from "@mui/material";
import { useMobileCheck } from "../../utility/isMobile";
import {
  ADDRESS_SLUG,
  CART_SLUG,
  ORDER_CONFIRMATION_SLUG,
  PAYMENT_SLUG,
} from "../../utility/Constants";

export default function Cart({ componentsData }: any) {
  const router = useRouter();
  const isMobile = useMobileCheck();
  const pageId = router?.query?.pid;

  const cartSection = () => {
    switch (pageId) {
      case CART_SLUG:
        return (
          <CartLayout
            cartData={CartData}
            CartLayoutDataResponse={CartLayoutDataResponse}
          ></CartLayout>
        );
      case ADDRESS_SLUG:
        return (
          <div>
            <CartAddress
              {...CartAddressData}
            />
          </div>
        );
      case PAYMENT_SLUG:
        return (
          <div>
            {/* <Payments /> */}
            <PaymentPageIndex
              componentData={componentsData?.filter((item: any) => item?.__component == "empty.payment")?.[0]}
            ></PaymentPageIndex>
          </div>
        );
      case ORDER_CONFIRMATION_SLUG:
        return (
          <div>
            <OrderPage
              {...OrderConfirmationData}
            />
          </div>
        );
    }
  };
  return (
    <Fragment>
      <Box
        sx={{ mb: isMobile ? "9px" : "40px", mt: isMobile ? "0px" : "80px" }}
      >
        {cartSection()}
      </Box>
    </Fragment>
  );
}
