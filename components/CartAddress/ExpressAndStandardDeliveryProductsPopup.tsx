import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CartProductCard } from "../../HOC/CartHOCs/CartProductCard/CartProductCard";
import { cartState } from "../../recoilstore";
import {
  ED_AVAILABALITY,
  ED_AVAILABALITY_DESCRIPTION,
  ESTIMATED_DELIVERY_TEXT,
  HYPEN,
  PROCEED_TEXT,
  REVIEW_CART,
  EXPRESS_DELIVERY_SHIPMENT,
  STANDARD_DELIVERY_SHIPMENT,
} from "../../utility/Constants";
import { DateFormate } from "../../utility/DateFormate";
import {
  BodyWrapper,
  ModalHeader,
  ModalHeaderTitle,
  ModalHeaderSubTitle,
  ModalFooter,
  StyledButton,
  ModalBody,
  DetailsTypography,
} from "./ExpressAndStandardDeliveryProductsPopupStyles";

export function ExpressAndStandardDeliveryProductsPopup({
  showLoader,
  handleErrorAlert,
  closePopup,
  deliverableProducts,
  handleAddressPage,
}: any) {
  const router = useRouter();
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [standardDeliveryProducts, setStandardDeliveryProducts] = useState<any>(
    []
  );
  const [expressDeliveryProducts, setExpressDeliveryProducts] = useState<any>(
    []
  );

  useEffect(() => {
    deliverableProducts?.map(
      (product: { delivery_method: string; sku: any }, index: any) => {
        const data = cartStore?.cartItems?.cart?.items?.filter(
          (item: { configured_variant: any; product: { sku: any } }) =>
            item?.configured_variant
              ? item?.configured_variant?.sku === product?.sku
              : item?.product?.sku === product?.sku
        );
        data?.map((dataItem: any) => {
          if (product?.delivery_method == "ED") {
            setExpressDeliveryProducts((previousData: any) => [
              ...previousData,
              dataItem,
            ]);
          } else if (product?.delivery_method == "SD") {
            setStandardDeliveryProducts((previousData: any) => [
              ...previousData,
              dataItem,
            ]);
          }
        });
      }
    );
  }, []);

  return (
    <BodyWrapper>
      <ModalHeader>
        <ModalHeaderTitle>{ED_AVAILABALITY}</ModalHeaderTitle>
        <ModalHeaderSubTitle>{ED_AVAILABALITY_DESCRIPTION}</ModalHeaderSubTitle>
      </ModalHeader>
      <ModalBody>
        {expressDeliveryProducts?.length > 0 && (
          <>
            <Stack direction="row" sx={{ pb: "10px" }}>
              <DetailsTypography $isBold={true}>
                {EXPRESS_DELIVERY_SHIPMENT}
              </DetailsTypography>
              <DetailsTypography
                $isBold={false}
              >{`${HYPEN}${ESTIMATED_DELIVERY_TEXT}${
                cartStore?.expressDeliveryDate
              }`}</DetailsTypography>
            </Stack>

            {expressDeliveryProducts.map((item: any, index: number) => {
              return (
                <Box key={index} sx={{ mb: 2 }}>
                  <CartProductCard
                    product={item}
                    productIndex={index}
                    setLoader={showLoader}
                    GetCartDetails={() => {}}
                    displayLoader={false}
                    handleError={handleErrorAlert}
                    handleSnackBar={() => {}}
                    productReadMode={true}
                    deliveryTag="ED"
                  ></CartProductCard>
                </Box>
              );
            })}
          </>
        )}
        {standardDeliveryProducts?.length > 0 && (
          <>
            <Stack direction="row" sx={{ pb: "10px" }}>
              <DetailsTypography $isBold={true}>
                {STANDARD_DELIVERY_SHIPMENT}
              </DetailsTypography>
              <DetailsTypography
                $isBold={false}
              >{`${HYPEN}${ESTIMATED_DELIVERY_TEXT}${
                cartStore?.standardDeliveryDate
              }`}</DetailsTypography>
            </Stack>
            {standardDeliveryProducts.map((item: any, index: number) => (
              <Box key={index} sx={{ mb: 2 }}>
                <CartProductCard
                  product={item}
                  productIndex={index}
                  GetCartDetails={() => {}}
                  displayLoader={false}
                  handleError={handleErrorAlert}
                  handleSnackBar={() => {}}
                  productReadMode={true}
                  deliveryTag="SD"
                ></CartProductCard>
              </Box>
            ))}
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <StyledButton
          $isColoredBotton={true}
          onClick={() => handleAddressPage(deliverableProducts)}
        >
          {PROCEED_TEXT}
        </StyledButton>
        <StyledButton
          $isColoredBotton={false}
          onClick={() => {
            router.push({ pathname: window.location.origin + "/cart/info" });
            closePopup();
          }}
        >
          {REVIEW_CART}
        </StyledButton>
      </ModalFooter>
    </BodyWrapper>
  );
}
