import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import client from "../../apollo-client";
import CustomPagination from "../../HOC/CustomPagination/CustomPagination";
import { useMobileCheck } from "../../utility/isMobile";
import {
  StarIconStyle,
  StatusButton,
  ReOrderButton,
  TimeDateStyle,
  CardMediaStyle,
  OnlineButton,
  PriceButton,
  ReviewButton,
  ImageBox,
  Review,
  Ratingbox,
  ProductTitle,
  StarQuantity,
  ProductStack,
  ProductGrid,
  ArrowForwardIosIcons,
  StockStatus,
  ErrorButton,
  ErrorOrders,
  ArrowBox,
  QuantityTypography,
  CardBox,
  AverageRating,
  ProductImage,
  OrderCardContent,
  StockStatusBox,
  MyorderGrid,
  StatusBox,
} from "./MyOrdersStyles";
import { DateFormate } from "../../utility/DateFormate";
import { toast } from "../../utility/Toast";

import BasicModal from "../../HOC/Modal/ModalBlock";
import { useRouter } from "next/router";
import { DeliveryFeedback } from "../DeliveryFeedback/DeliveryFeedback";
import BackToTopButton from "../BackToTopBtn/BackToTopButton";
import { CART_ROUTE, CART_ROUTE_STORE_MODE } from "../Header/Constants";
import { CREATE_BUYNOW_CART } from "../../graphQLQueries/Cart/BuyNowCart";
import Loader from "../../HOC/Loader/Loader";
import { ContactedGraphqlUrl } from "../../utility/MagentoImageUrlConcatConstant";
import { useRecoilState } from "recoil";
import { cartState, userState } from "../../recoilstore";
import { callEventMyOrders } from "./MyOrdersEvents";
import { event_type } from "../../utility/GAConstants";
import { OKAY_CTA, THANKS_MESSAGE } from "../../HOC/ProductCard/Constants";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  Buttons,
  InnerBox,
  TypographyText,
} from "../../HOC/ProductCard/ProductCardStyles";
import { NotifyPopup } from "../../HOC/QuickCard/NotifyPopup";
import { onImageError } from "../../utility/onImageError";
import { AppIcons } from "../../utility/AppIconsConstant";
import { Error_Image, FALL_BACK_IMAGE_PRODUCT } from "../../utility/AppIcons";
import handleErrorResponse from "../../utility/ErrorHandling";
const deliveryFeedbackData = require("../../JSON/DeliveryFeedbackData.json");

function MyOrders({
  items,
  page,
  setPage,
  count,
  displayLoader,
  enableSnackMessage,
  __component,
  position,
  id,
}: any) {
  const isMobile = useMobileCheck();
  const PRODUCT_FALLBACK_URL = AppIcons(FALL_BACK_IMAGE_PRODUCT);
  const errorImage = AppIcons(Error_Image);
  const fieldRef = useRef<HTMLInputElement>(null);
  let size = 10;
  let boundaryCount = isMobile ? 2 : 3;
  let siblingCount = 1;
  const router = useRouter();
  const [productSku, setProductSku] = useState("");
  const [reviewOpen, reviewSetOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [notifyPopUp, setNotifyPopUp] = useState(false);
  const [thanksPopUp, setThanksPopUp] = useState(false);
  const [selectedOrderID, setSelectedOrderID] = useState("");
  const [selectedOrderNumber, setSelectedOrderNumber] = useState("");
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    items?.setLoader(true);
    setPage(value);
  };
  useEffect(() => {
    console.log(userDataItems, cartStore);
  }, []);
  const [selectedOrderCourierName, setSelectedOrderCourierName] = useState("");
  const clickHandler = (
    sku: string,
    quantityOrdered: number,
    parent_sku: string
  ) => {
    setLoader(true);
    client
      .mutate({
        mutation: CREATE_BUYNOW_CART,
        variables: {
          productQuantity: quantityOrdered,
          productSku: sku,
          parentID: parent_sku,
        },
      })
      .then((res) => {
        const hasError = handleErrorResponse(
          res?.data?.createBuyNowCart?.cart_id
        ); //response checking
        if (hasError) return null;
        localStorage.setItem(
          "BuyNowCartID",
          res?.data?.createBuyNowCart?.cart_id
        );
        setCartStore((previousData) => ({
          ...previousData,
          cartItems: null,
          serviceability: { sd: false, ed: false, cc: false },
          serviceabilityStores: [],
          serviceableProducts: { cc: null, non_cc: null },
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
      .catch((err) => console.log(err))
      .finally(() => {
        // toast.error("Someting went wrong, Please try again!!!");
        setLoader(false);
      });
  };
  const handleReviewClose = () => {
    reviewSetOpen(false);
  };
  const handleRoute = (id: string, singleItem: any) => {
    window.location.assign(
      `${window.location.origin}/account/orders?orderNumber=${id}&itemId=${singleItem}`
    );
  };
  const MyorderPagination = () => {
    return count % size == 0 ? count / size : Math.floor(count / size) + 1;
  };
  const handleSubmit = (product_sku: any, lspName: string, orderID: string , orderNumber: string) => {
    setProductSku(product_sku);
    reviewSetOpen(true);
    setSelectedOrderCourierName(lspName);
    setSelectedOrderID(orderID);
    callEventMyOrders(items, "Write a review", event_type, "My Orders");
    setSelectedOrderNumber(orderNumber)
  };
  const handleFeedbackSubmit = () => {
    reviewSetOpen(false)
  };
  const notifyOpen = (sku: string) => {
    setNotifyPopUp(true);
    setProductSku(sku);
  };
  const openThanks = () => {
    setThanksPopUp(true);
  };
  const closeThanks = () => {
    setThanksPopUp(false);
  };
  const notifyClose = () => setNotifyPopUp(false);

  const myOrdersCommonFunction = (
    condition: any,
    return1: any,
    return2: any
  ) => {
    if (condition) {
      return return1;
    } else {
      return return2;
    }
  };
  const statusButton = (orderitem: any, singleItem: any) => {
    if (orderitem?.is_exchange === 1) {
      return "EXCHANGED ORDER";
    } else {
      if (
        singleItem?.quantity_returned > 0 &&
        singleItem?.quantity_returned < singleItem?.quantity_ordered
      ) {
        return "PARTIALLY RETURNED";
      } else {
        if (
          singleItem?.quantity_returned > 0 &&
          singleItem?.quantity_returned === singleItem?.quantity_ordered
        ) {
          return "RETURNED";
        } else {
          return myOrdersCommonFunction(
            singleItem?.quantity_exchanged > 0 &&
              singleItem?.quantity_exchanged === singleItem?.quantity_ordered,
            "EXCHANGED",
            myOrdersCommonFunction(
              singleItem?.quantity_exchanged > 0 &&
                singleItem?.quantity_exchanged < singleItem?.quantity_ordered,
              "PARTIALLY EXCHANGED",
              myOrdersCommonFunction(
                singleItem?.quantity_canceled > 0 &&
                  singleItem?.quantity_canceled ===
                    singleItem?.quantity_ordered,
                "CANCELLED",
                orderitem?.state
              )
            )
          );
        }
      }
    }
  };
  const productStackCardBox = (singleItem: any, orderitem: any) => {
    return (
      <>
        <CardBox>
          <StatusBox isMobile={isMobile}>
            <StatusButton variant="contained">
              {statusButton(orderitem, singleItem)}
            </StatusButton>
            {
              <TimeDateStyle color="text.secondary">
                On {DateFormate(orderitem?.created_at)}
              </TimeDateStyle>
            }
          </StatusBox>
          <Box>
            {isMobile && (
              <ArrowBox>
                <ArrowForwardIosIcons />
              </ArrowBox>
            )}
          </Box>
        </CardBox>
        <ImageBox isMobile={isMobile}>
          <CardMediaStyle>
            <ProductImage
              src={
                singleItem?.image
                  ? ContactedGraphqlUrl + singleItem?.image
                  : ReplaceImage(PRODUCT_FALLBACK_URL?.url)
              }
              onError={(e: any) => onImageError(e, errorImage)}
              alt={singleItem?.product_name}
            />
          </CardMediaStyle>
          {singleItem?.stock_status == 0 && (
            <StockStatusBox>
              <StockStatus>Out of Stock</StockStatus>{" "}
            </StockStatusBox>
          )}{" "}
          <OrderCardContent>
            {" "}
            <Box>
              {" "}
              <ProductTitle> {singleItem?.product_name} </ProductTitle>{" "}
              {!isMobile &&
                singleItem?.product_sale_price?.value !== 0 &&
                singleItem?.product_sale_price?.value !== 0.01 && (
                  <PriceButton>
                    {" "}
                    ₹{singleItem?.product_sale_price?.value}{" "}
                    <ArrowForwardIosIcons />{" "}
                  </PriceButton>
                )}{" "}
              {!isMobile &&
                (singleItem?.product_sale_price?.value === 0 ||
                  singleItem?.product_sale_price?.value === 0.01) && (
                  <PriceButton>
                    {" "}
                    Free <ArrowForwardIosIcons />{" "}
                  </PriceButton>
                )}{" "}
            </Box>{" "}
            <Ratingbox>
              {" "}
              {singleItem?.average_rating > 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <StarIconStyle />{" "}
                  <AverageRating>
                    {" "}
                    {singleItem?.average_rating}{" "}
                  </AverageRating>{" "}
                </Box>
              ) : (
                ""
              )}{" "}
              {/* <StarRating>{item.Rating}</StarRating> */}{" "}
              {singleItem?.selected_options[1]?.value && (
                <StarQuantity>
                  {" "}
                  |{singleItem?.selected_options[1]?.value}{" "}
                </StarQuantity>
              )}{" "}
            </Ratingbox>{" "}
            <QuantityTypography>
              {" "}
              Qty:{singleItem?.quantity_ordered}{" "}
            </QuantityTypography>{" "}
            <OnlineButton size="small">
              {" "}
              {singleItem?.product_sale_price?.value === 0 ||
              singleItem?.product_sale_price?.value === 0.01
                ? "Free Sample"
                : "Online"}{" "}
            </OnlineButton>{" "}
            {isMobile &&
              singleItem?.product_sale_price?.value !== 0 &&
              singleItem?.product_sale_price?.value !== 0.01 && (
                <PriceButton>
                  {" "}
                  ₹{singleItem?.product_sale_price?.value}{" "}
                  {!isMobile && (
                    <ArrowBox>
                      {" "}
                      <ArrowForwardIosIcons />{" "}
                    </ArrowBox>
                  )}{" "}
                </PriceButton>
              )}{" "}
            {isMobile &&
              (singleItem?.product_sale_price?.value === 0 ||
                singleItem?.product_sale_price?.value === 0.01) && (
                <PriceButton>
                  {" "}
                  Free{" "}
                  {!isMobile && (
                    <ArrowBox>
                      {" "}
                      <ArrowForwardIosIcons />{" "}
                    </ArrowBox>
                  )}{" "}
                </PriceButton>
              )}{" "}
          </OrderCardContent>{" "}
          {/* <TotalPrice> */} {/* </TotalPrice> */}{" "}
        </ImageBox>
      </>
    );
  };
  return (
    <>
      {" "}
      {loader && <Loader />}{" "}
      {!displayLoader && (
        <>
          {" "}
          {items?.length > 0 ? (
            <Box>
              {" "}
              <MyorderGrid container ref={fieldRef}>
                {items?.map((orderitem: any, _index: number) =>
                  orderitem?.items?.map((singleItem: any, pId: number) => {
                    const uniqueKeyValue = pId;
                    return (
                      <ProductGrid
                        isMobile={isMobile}
                        key={uniqueKeyValue}
                        item
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        mb={3}
                      >
                        <ProductStack
                          onClick={() => {
                            callEventMyOrders(
                              items,
                              orderitem?.status,
                              event_type,
                              orderitem?.status
                            );
                            handleRoute(
                              orderitem?.order_number,
                              orderitem?.fulfilment_unique_id
                            );
                          }}
                        >
                          {productStackCardBox(singleItem, orderitem)}
                        </ProductStack>
                        <Review>
                          {" "}
                          {orderitem?.state?.toLowerCase() === "delivered" &&
                            singleItem?.product_sale_price?.value !== 0 &&
                            singleItem?.product_sale_price?.value !== 0.01 && (
                              <ReviewButton
                                onClick={() =>
                                  handleSubmit(
                                    singleItem?.product_sku,
                                    orderitem?.lsp_name,
                                    orderitem?.order_id,
                                    orderitem?.order_number
                                  )
                                }
                              >
                                {" "}
                                Write a review{" "}
                              </ReviewButton>
                            )}{" "}
                          {!orderitem?.is_egv_cart &&
                            singleItem?.product_sale_price?.value !== 0 &&
                            singleItem?.product_sale_price?.value !== 0.01 &&
                            orderitem?.status !== "payment_failed" && (
                              <ReOrderButton
                                variant="outlined"
                                onClick={() => {
                                  singleItem?.stock_status === 0
                                    ? notifyOpen(singleItem?.parent_sku)
                                    : clickHandler(
                                        singleItem?.product_sku,
                                        singleItem?.quantity_ordered,
                                        singleItem?.parent_sku
                                      );
                                  callEventMyOrders(
                                    singleItem,
                                    singleItem?.stock_status === 0
                                      ? "NOTIFY ME"
                                      : "REORDER",
                                    event_type,
                                    __component,
                                    position,
                                    id,
                                    CART_ROUTE
                                  );
                                }}
                                NotifyMe={singleItem?.stock_status === 0}
                              >
                                {" "}
                                {singleItem?.stock_status === 0
                                  ? "NOTIFY ME"
                                  : "REORDER"}
                              </ReOrderButton>
                            )}
                        </Review>
                      </ProductGrid>
                    );
                  })
                )}
                <BackToTopButton />
              </MyorderGrid>
              <BasicModal
                width="90%"
                top="50%"
                left="50%"
                overflowData="scroll"
                handleOpen={handleSubmit}
                handleClose={handleReviewClose}
                open={reviewOpen}
                Component={
                  <DeliveryFeedback
                    {...deliveryFeedbackData}
                    productSku={productSku}
                    orderID={selectedOrderID}
                    reviewSetOpen={reviewSetOpen}
                    courierName={selectedOrderCourierName}
                    enableSnackMessage={enableSnackMessage}
                    selectedOrderNumber={selectedOrderNumber}
                    onSubmit={handleFeedbackSubmit}
                  
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
                    showLoader={setLoader}
                    notifyClose={notifyClose}
                    openThanks={openThanks}
                    sku={productSku}
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
                Component={<ThanksPopup closeThanks={closeThanks} />}
              />{" "}
              <CustomPagination
                fieldRef={fieldRef}
                scrollMargin={200}
                pageCount={MyorderPagination()}
                count={count}
                setPage={setPage}
                handleChange={handleChange}
                page={page}
                pageSize={size}
                products={items}
                boundaryCount={boundaryCount}
                siblingCount={siblingCount}
                widget_title="My Orders"
              ></CustomPagination>
            </Box>
          ) : (
            <>
              <ErrorOrders>
                <Typography>You have not made any purchase yet</Typography>
                <ErrorButton
                  onClick={() => {
                    router?.push("/home");
                    callEventMyOrders(
                      items,
                      "Continue Shopping",
                      event_type,
                      "My Orders"
                    );
                  }}
                >
                  Continue Shopping
                </ErrorButton>
              </ErrorOrders>
            </>
          )}
        </>
      )}
    </>
  );
}
export default MyOrders;
const ThanksPopup = (props: any) => {
  const { closeThanks } = props;
  return (
    <>
      <InnerBox>
        <TypographyText>{THANKS_MESSAGE}</TypographyText>
        <Buttons onClick={() => closeThanks()}>{OKAY_CTA}</Buttons>
      </InnerBox>
    </>
  );
};
