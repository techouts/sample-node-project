import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  BankBox,
  FirstBox,
  NamedBox,
  PayNowButton,
  SecondBox,
  TextFieldBox,
  TitleTypography,
} from "./SavedPaymentsStyles";
import axios from "axios";
import { ButtonText } from "../CashONDelevery/CashOnDeleveryStyles";
import { CardTextField } from "../CreditDebit/CDCardsStyles";
import { useEffect, useState } from "react";
import { useMobileCheck } from "../../../utility/isMobile";
import { toast } from "../../../utility/Toast";
import client from "../../../apollo-client";
import { SAVED_CARD_PAYMENTS } from "../../../graphQLQueries/SavedPayments";
import Loader from "../../../HOC/Loader/Loader";
import { SetPaymentMethodQuery } from "../../../graphQLQueries/PaymentQuery";
import { CREATE_JUSPAY_ORDER } from "../../../graphQLQueries/CartQuery";
import { CardTransaction, merchant_id } from "../../../utility/APIConstants";
import useStorage from "../../../utility/useStoarge";
import { SAVED_UPI_PAYMENTS } from "../../../graphQLQueries/SavedUpiPaymentsQuery";
import { JUSPAY_RETURN_URL } from "../../../utility/Constants";
import {
  CardPaymentImage,
  UPIPaymentImage,
} from "../../CartLayout/CartConstants";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import callEventPay from "../PaymentAnalytics";
import { useRecoilState } from "recoil";
import { cartState } from "../../../recoilstore";
import { Cookies } from "react-cookie";
import { getSourceInfo } from "../../../utility/commonUtility";
import handleErrorResponse from "../../../utility/ErrorHandling";
import { CouponList } from "../../CartLayout/CouponQueries/CouponList";
const dataItem = require("./SavedPayments.json");

const SavePayment = ({ handleError, selectedOption }: any) => {
  const isMobile = useMobileCheck();
  const [cvvNums, setCvvNums] = useState("");
  const [savedCards, setSavedCards] = useState([]);
  const [savedUpis, setSavedUpis] = useState([]);
  const [displayLoader, setLoader] = useState(true);
  const [accordionOpenCLose, setAccordionOpenCLose] = useState("");
  const { getItem } = useStorage();
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [couponCode, setCouponCode]= useState(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "")

  const cookie = new Cookies();

  let couponExists:any;

  interface Coupon {
    coupon_code: string;
    description: string;
    discount_amount: number;
    simple_action: string;
    __typename: string;
    coupon_applicable:string;
}

  useEffect(() => {
    setCouponCode(cartStore?.cartItems?.cart?.applied_coupons?.[0]?.code || "" );
}, [cartStore?.cartItems]);

  useEffect(() => {
    client
      .mutate({
        mutation: SAVED_CARD_PAYMENTS,
        variables: {},
      })
      .then((resp) => {
       const hasError =   handleErrorResponse(resp.data.savedPaymentMethod?.cards) //response checking
       if (hasError) return null; 
        setSavedCards(resp.data.savedPaymentMethod?.cards);
        setSavedUpis(resp.data.savedPaymentMethod?.UpiIds);
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Someting went wrong, Please try again!!!");
        setLoader(false);
        console.log("err", err);
      });
  }, []);

  const handleCvvChange = (e: any) => {
    let numberRegex = /^\d+$/;
    if (numberRegex.test(e?.target?.value)) {
      setCvvNums(e.target.value);
    }
    if (cvvNums.length == 1) {
      setCvvNums(e.target.value);
    }
  };
  const upiJuspayOrder = (upi: any) => {
    client
      .mutate({
        mutation: CREATE_JUSPAY_ORDER,
        variables: {
          cart_id: getItem("BuyNowCartID", "local")
            ? `${getItem("BuyNowCartID", "local")}`
            : `${getItem("cartID", "local")}`,
          return_url: `${window.location.origin}${JUSPAY_RETURN_URL}`,
          method: "UPI",
          saved_payment: true,
          access_token: cookie.get("accessToken"),
          source_from_info: getSourceInfo()
        },
      })
      .then((res) => {
       const hasError =   handleErrorResponse(res?.data?.placeJuspayOrder?.success) //response checking
       if (hasError) return null; 
        if (res?.data?.placeJuspayOrder?.success) {
          setCartStore((lp: any) => {
            return {
              ...lp,
              cartItems: {
                cart: {
                  ...lp.cartItems.cart,
                  orderID: res?.data?.placeJuspayOrder?.order_id,
                },
              },
            };
          });
          axios({
            method: "post",
            url: `${CardTransaction}`,
            data: {
              order_id: getItem("BuyNowCartID", "local")
                ? `${getItem("BuyNowCartID", "local")}`
                : `${getItem("cartID", "local")}`,
              payment_method_type: "UPI",
              payment_method: "UPI",
              merchant_id: merchant_id,
              redirect_after_payment: true,
              format: "json",
              txn_type: "UPI_COLLECT",
              upi_vpa: upi?.upi_id,
            },
            headers: { 'x-merchantid': merchant_id }
          })
            .then(function (response) {
              if (response?.data?.payment?.authentication?.url) {
                client
                  .mutate({
                    mutation: SAVED_UPI_PAYMENTS,
                    variables: {
                      upi_id: upi?.upi_id,
                      isDefault: true,
                    },
                  })
                  .then((res) => {
       const hasError =   handleErrorResponse( res) //response checking
       if (hasError) return null; 
                    window.location.href =
                      response?.data?.payment?.authentication?.url;
                  })
                  .catch((error: any) => {
                    console.log(error);
                    handleError(error?.message);
                    setLoader(false);
                  });
              }
            })
            .catch((error: any) => {
              console.log(error);
              handleError(error?.message);
              setLoader(false);
            });
        }
      })
      .catch((error: any) => {
        console.log(error);
        handleError(error?.message);
        setLoader(false);
      });
  };
  const handlePayNow = async (upi: any) => {
    if (couponCode) {
      setLoader(true);
      const applyCouponCodes = await CouponList();
      if (applyCouponCodes?.data?.getCouponCodes?.length !== 0) {
        console.log("inside 1",applyCouponCodes?.getCouponCodes);
        const filteredCouponCodes: Coupon[] = applyCouponCodes?.getCouponCodes
        .filter((coupon: Coupon) => {
          console.log("check coupon",coupon);
            const hasWeb = coupon.coupon_applicable.includes("Web");
            return hasWeb;
        })
         couponExists = filteredCouponCodes.some(coupon => coupon.coupon_code === couponCode);
  
        console.log("couponExists",couponExists);
      }
    }
    if(couponCode?.length>0 && couponExists === false){
      setLoader(false);
      handleError("This coupon has expired. Please remove it and try another")
    }else if ((couponCode?.length>0 && couponExists)|| couponCode?.length=== 0){
    callEventPay(cartStore, undefined, undefined, "UPI");
    setLoader(true);
    client
      .mutate({
        mutation: SetPaymentMethodQuery,
        variables: {
          cartId: getItem("BuyNowCartID", "local")
            ? `${getItem("BuyNowCartID", "local")}`
            : `${getItem("cartID", "local")}`,
          code: "juspay",
        },
      })
      .then((juspayRes) => {
       const hasError =   handleErrorResponse( juspayRes?.data?.setPaymentMethodOnCart?.cart?.selected_payment_method) //response checking
       if (hasError) return null; 
        if (
          juspayRes?.data?.setPaymentMethodOnCart?.cart?.selected_payment_method
        ) {
          {
            upiJuspayOrder(upi);
          }
        }
      })
      .catch((error: any) => {
        console.log(error);
        handleError(error?.message);
        setLoader(false);
      });
    }
  };
  const cardPaymentJuspayOrder = (cardData: any) => {
    client
      .mutate({
        mutation: CREATE_JUSPAY_ORDER,
        variables: {
          cart_id: getItem("BuyNowCartID", "local")
            ? `${getItem("BuyNowCartID", "local")}`
            : `${getItem("cartID", "local")}`,
          return_url: `${window.location.origin}${JUSPAY_RETURN_URL}`,
          method: cardData?.card_type === "DEBIT" ? "DC" : "CC",
          saved_payment: true,
          access_token: cookie.get("accessToken"),
          source_from_info: getSourceInfo()
        },
      })
      .then((res: any) => {
       const hasError =   handleErrorResponse(res?.data?.placeJuspayOrder?.success) //response checking
       if (hasError) return null; 
        if (res?.data?.placeJuspayOrder?.success) {
          setCartStore((lp: any) => {
            return {
              ...lp,
              cartItems: {
                cart: {
                  ...lp.cartItems.cart,
                  orderID: res?.data?.placeJuspayOrder?.order_id,
                },
              },
            };
          });
          axios({
            method: "post",
            url: `${CardTransaction}`,
            data: {
              order_id: getItem("BuyNowCartID", "local")
                ? `${getItem("BuyNowCartID", "local")}`
                : `${getItem("cartID", "local")}`,
              payment_method_type: "CARD",
              payment_method: cardData?.card_brand,
              card_token: cardData?.card_token,
              card_security_code: cvvNums,
              merchant_id: merchant_id,
              name_on_card: cardData?.name_on_card,
              redirect_after_payment: true,
              format: "json",
            },
            headers: { 'x-merchantid': merchant_id }
          })
            .then(function (response) {
              
              setLoader(false);
       const hasError =   handleErrorResponse(response?.data?.payment?.authentication?.url) //response checking
       if (hasError) return null; 
              if (response?.data?.payment?.authentication?.url) {
                window.location.href =
                  response?.data?.payment?.authentication?.url;
              }
            })
            .catch((error: any) => {
              console.log(error);
              toast.error("Someting went wrong, Please try again!!!");
              setLoader(false);
            });
        }
      })
      .catch((error: any) => {
        console.log(error);
        toast.error("Someting went wrong, Please try again!!!");
        setLoader(false);
      });
  };
  const cardPayment = async (cardData: any) => {
      if (couponCode) {
      setLoader(true);
      const applyCouponCodes = await CouponList();
      if (applyCouponCodes?.data?.getCouponCodes?.length !== 0) {
        console.log("inside 1",applyCouponCodes?.getCouponCodes);
        const filteredCouponCodes: Coupon[] = applyCouponCodes?.getCouponCodes
        .filter((coupon: Coupon) => {
          console.log("check coupon",coupon);
            const hasWeb = coupon.coupon_applicable.includes("Web");
            return hasWeb;
        })
         couponExists = filteredCouponCodes.some(coupon => coupon.coupon_code === couponCode);
  
        console.log("couponExists",couponExists);
      }
    }
    if(couponCode?.length>0 && couponExists === false){
      setLoader(false);
      handleError("This coupon has expired. Please remove it and try another")
    }else if ((couponCode?.length>0 && couponExists)|| couponCode?.length=== 0){
    callEventPay(
      cartStore,
      undefined,
      undefined,
      cardData?.card_type === "DEBIT" ? "DC" : "CC"
    );
    setLoader(true);
    client
      .mutate({
        mutation: SetPaymentMethodQuery,
        variables: {
          cartId: getItem("BuyNowCartID", "local")
            ? `${getItem("BuyNowCartID", "local")}`
            : `${getItem("cartID", "local")}`,
          code: "juspay",
        },
      })
      .then((juspayRes: any) => {
       const hasError =   handleErrorResponse( juspayRes?.data?.setPaymentMethodOnCart?.cart?.selected_payment_method) //response checking
       if (hasError) return null; 
        if (
          juspayRes?.data?.setPaymentMethodOnCart?.cart?.selected_payment_method
        ) {
          {
            cardPaymentJuspayOrder(cardData);
          }
        }
      })
      .catch((error: any) => {
        console.log(error);
        toast.error("Someting went wrong, Please try again!!!");
        setLoader(false);
      });
      }
  };
  let isCheck = useMobileCheck();
  return (
    <>
      {displayLoader && <Loader />}
      <Box>
        {isCheck ? (
          ""
        ) : (
          <TitleTypography>{dataItem?.Data?.title}</TitleTypography>
        )}
        {/* <TitleTypography>{dataItem?.Data?.title}</TitleTypography> */}
        <Divider orientation="horizontal"></Divider>
        <FirstBox>
          {savedUpis &&
            savedUpis?.map((upi: any, idx: number) => {
              const uniqueKeyValue = idx;
              return (
                <Accordion
                  key={uniqueKeyValue}
                  sx={{ boxShadow: "none", border: "none" }}
                  expanded={accordionOpenCLose == `${idx}-upi` ? true : false}
                  onChange={() => {
                    setCvvNums("");
                    accordionOpenCLose == `${idx}-upi`
                      ? setAccordionOpenCLose("")
                      : setAccordionOpenCLose(`${idx}-upi`);
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      margin: "0",
                    }}
                  >
                    <img
                      src={`${ReplaceImage(UPIPaymentImage)}`}
                      alt="not found"
                      width={"53px"}
                      height={"32px"}
                    />
                    <NamedBox>
                      <Typography>UPI</Typography>
                      <Typography>{upi?.upi_id}</Typography>
                    </NamedBox>
                  </AccordionSummary>
                  <AccordionDetails>
                    <PayNowButton onClick={() => handlePayNow(upi)}>
                      PAY NOW
                    </PayNowButton>
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </FirstBox>
        <Divider></Divider>

        <SecondBox>
          {savedCards &&
            savedCards?.map((cardData: any, idx: number) => {
              const uniqueKeyValue = idx;
              return (
                <Accordion
                  key={uniqueKeyValue}
                  sx={{ boxShadow: "none", border: "none" }}
                  onChange={() => {
                    setCvvNums("");
                    accordionOpenCLose == `${idx}-card`
                      ? setAccordionOpenCLose("")
                      : setAccordionOpenCLose(`${idx}-card`);
                  }}
                  expanded={accordionOpenCLose == `${idx}-card` ? true : false}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <img
                      src={`${ReplaceImage(CardPaymentImage)}`}
                      alt="not found"
                      width={"53px"}
                      height={"32px"}
                    />
                    <BankBox>
                      <Typography>{`${cardData?.card_issuer} ${cardData?.card_type} Card`}</Typography>
                      <Typography>{cardData?.card_number}</Typography>
                    </BankBox>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box>
                      <TextField
                        sx={{
                          width: "100%",
                          fontFamily: "Montserrat",
                          color: "#000000",
                        }}
                        id="outlined-disabled"
                        defaultValue={cardData?.name_on_card}
                        placeholder="Name of the Card"
                        disabled={true}
                      />
                    </Box>
                    <TextFieldBox
                      sx={{
                        display: "flex",
                        width: "100%",
                        gap: "10px",
                        "& .MuiTextField-root": { margin: "10px 0px" },
                      }}
                    >
                      <CardTextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        variant="outlined"
                        // placeholder={Data.expairyNo}
                        disabled={true}
                        defaultValue={`${cardData?.card_exp_month
                          }/${cardData?.card_exp_year.substring(
                            cardData?.card_exp_year.length,
                            cardData?.card_exp_year.length - 2
                          )}`}
                        inputProps={{
                          maxLength: 5,
                          fontFamily: "Montserrat",
                          color: "#000000",
                        }}
                      />
                      <CardTextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        onChange={(e) => handleCvvChange(e)}
                        variant="outlined"
                        placeholder="Enter CVV"
                        value={cvvNums}
                        inputProps={{
                          maxLength: 3,
                          type: isMobile && "password",
                        }}
                        sx={{
                          width: "100%",
                          "& .MuiInputBase-root": {
                            padding: "0px 20px",
                          },
                          fontFamily: "Montserrat",
                          color: "#000000",
                          "& input[type='password']": {
                            fontFamily: "Montserrat",
                            color: "#000000",
                          },
                        }}
                      />
                    </TextFieldBox>
                    {isMobile ? (
                      ""
                    ) : (
                      <ButtonText
                        onClick={() => cardPayment(cardData)}
                        disabled={cvvNums?.length > 2 ? false : true}
                      >
                        PAY NOW
                      </ButtonText>
                    )}
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </SecondBox>
      </Box>
    </>
  );
};
export default SavePayment;
