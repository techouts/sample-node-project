import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useCallback, useEffect, useState ,useRef} from "react";
import { useMobileCheck } from "../../utility/isMobile";
import {
  OtherPayTab,
  ChoosePaymentType,
} from "../PaymentCompletePage/PaymentsCompletePageStyles";
import CashOnDelivery from "./CashONDelevery/CashOnDelevery";
import CreditCardInput from "./CreditDebit/CDCards";
import FirstCitizen from "./FirstCitizen/FirstCitizen";
import GiftCardPay from "./GiftCardPayment/GiftCardPayment";
import { NetBanking } from "./NetBanking/NetBanking";
import PaymentData from "./payment.json";
import EGVPaymentData from "./EGVPayment.json";
import SavePayment from "./SavedPayments/SavedPayments";
import SsWallet from "./SSWallet/SsWallet";
import { UpiComponent } from "./UPI/Upi";
import { Wallet } from "./Wallet/Wallet";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PriceDetailsBox from "../PaymentCompletePage/PriceDetailsBox";
import SavedPaymentsMobile from "./SavedPaymentsMobile/SavedPaymentsMobile";
import { getPaymentMethods, merchant_id } from "../../utility/APIConstants";
import { toast } from "../../utility/Toast";
import Loader from "../../HOC/Loader/Loader";
const SavedPaymentData = require("./SavedPaymentsMobile/SavedPaymentsMob.json");
import { MywalletBalance } from "../../graphQLQueries/MywalletQuery";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, userState } from "../../recoilstore";
import graphql from "../../middleware-graphql";
import client from "../../apollo-client";
import { useRouter } from "next/router";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import triggerGAEvent from "../../utility/GaEvents";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { RemoveWalletAmount } from "../../api/Payments/SsWalletApis";
import useStorage from "../../utility/useStoarge";
import { JUSPAY_RETURN_URL } from "../../utility/Constants";
import { GET_LOYALITY_DATA } from "../../graphQLQueries/LoyalityData";
import { CART_ACTIVE_INFO } from "../../graphQLQueries/CartQuery";
import { SAVED_CARD_PAYMENTS_CHECK } from "../../graphQLQueries/SavedPayments";
import handleErrorResponse from "../../utility/ErrorHandling";
import { GetGokwickRiskFlag } from "../../graphQLQueries/GokwickQueries";

const PaymentPageIndex = ({ componentData }: any) => {
  const isMobile = useMobileCheck();
  const codMinimum = componentData?.codMinimum || 500
  const codMaximum = componentData?.codMaximum || 50000
  const { getItem } = useStorage();
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [selectedWallet, setSelectedWallet] = useState("");
  const [paymentsTab, setPaymentsTab] = useState(
    cartStore?.cartItems?.cart?.is_egv_cart
      ? EGVPaymentData?.TabsData
      : PaymentData?.TabsData
  );
  const [savedPaymentVisible, setSavedPaymentVisible] = useState(false);
  const userDataItems = useRecoilValue(userState);
  const [isChecked, setIsChecked] = useState<any>({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState(
    cartStore?.cartItems?.cart?.is_egv_cart
      ? EGVPaymentData?.TabsData?.[0]?.Tabs
      : userDataItems?.walletNumber === "na"
        ? PaymentData?.TabsData?.[1]?.Tabs
        : PaymentData?.TabsData?.[0]?.Tabs
  );
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [cartData, setCartData] = useState();
  const [parentAccord, setParentAccord] = useState(false);
  const [fetchCardDetails, setFetchCardDetails] = useState(false);
  const [walletId, setWalletId] = useState(null);
  const [viewBreakUpOptions, setViewBreakUpOptions] = useState({
    ssWalletAmount: 0,
    firstCitizen: 0,
    giftCard: 0,
  });
  const [openCancelTransModal, setOpenCancelTransModal] = useState({
    enable: false,
    qrCreated: false
  })
  const [walletUsed, setWalletUsed] = useState({ amount: 0 });
  const [invalidPaymentOptions, setInValidPaymentsOptions] = useState<any>([]);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [networkError, setNetworkError] = useState(false);
  const [finalCheck, setFinalCheck] = useState<any>({
    savedUpi: false,
    savedCard: false,
    otherPayments: false,
  });
  const [value, setValue] = useState<any>(null);
  const [topLevelBanks, setTopLevelBanks] = useState<any>(null);
  const [networkErrorMessage, setNetworkErrorMessage] =
    useState("Network Error");
  const [netBank, setNetBank] = useState(0);
  const [redeemAmountLoyality, setRedeemAmountLoyality] = useState(false);
  const [cD, setCD] = useState(0);
  const [upi, setUpi] = useState(0);
  const [ssWalletS, setssWalletS] = useState(0);
  const [savedPaymentCvv, setSavedPaymentCvv] = useState({});
  const [currentPayment, setCurrentPayment] = useState("");
  const [counter, setCounter] = useState(0);
  const [ssWalletPopUpVisible, setSsWalletPopUpVisible] = useState(false);
  const [update, setUpdate] = useState<any>(null);
  const [primaryPoints, setPrimaryPoints] = useState();
  const [tierData, setTierData] = useState("");
  const [radio, setRadio] = useState<string>();
  const [selectedUpiOrCard, setSelectedUpiOrCard] = useState<any>();
  const router = useRouter();
  const avoidMultipleAPI = useRef<boolean | null>(null);
  const [hideCOD, setHideCOD] = useState(false);

  const isExpressDeliverMode =
    cartStore?.currentDeliveryMode?.toLocaleLowerCase() === "ed";

  //Gokwick Api - Hiding COD if GokwickRisk Flag is High risk
  useEffect(() => {
    async function fetchGoKwick() {
      await GetGokwickRiskFlag(getItem("cartID", "local")).then((res) => {
        if (
          res?.data?.GetGokwickRiskFlag?.gokwick_status === "1" &&
          res?.data?.GetGokwickRiskFlag?.risk_flag?.toLowerCase() ===
          "high risk"
        ) {
          setHideCOD(true);
        }
      });
    }
    if (isExpressDeliverMode) {
      setHideCOD(true);
    } else if (cartID && cartStore?.currentDeliveryMode !== "cc") {
      fetchGoKwick();
    }
  }, [isExpressDeliverMode]);

useEffect(() => {
  if (!avoidMultipleAPI.current) {
    let arr = cartStore?.cartItems?.cart?.is_egv_cart
      ? EGVPaymentData?.TabsData
      : PaymentData?.TabsData;
    if ((cartStore?.currentDeliveryMode === "ed"
      && process.env.NEXT_PUBLIC_ENABLE_COD_FOR_ED === "false") ||
      cartStore?.cartItems?.cart?.prices?.grand_total?.value > 0 &&
      (cartStore?.cartItems?.cart?.prices?.grand_total?.value < codMinimum ||
        cartStore?.cartItems?.cart?.prices?.grand_total?.value > codMaximum)
    ) {
      const index = arr.findIndex((obj) => {
        return obj?.Tabs?.toLowerCase() === "cash on delivery";
      });
      if (index > -1) {
        arr = arr.slice(0, index);
      }
    }

    client
      .mutate({
        mutation: SAVED_CARD_PAYMENTS_CHECK,
        variables: {},
      })
      .then((resp) => {
        if (
          resp.data.savedPaymentMethod?.cards?.length > 0 ||
          resp.data.savedPaymentMethod?.UpiIds?.length > 0
        ) {
          const index = arr.findIndex((obj) => {
            return obj?.Tabs?.toLowerCase() === "saved payment options";
          });
          if (index < 0) {
            arr.splice(1, 0, {
              Tabs: "Saved Payment Options",
            });
            setSavedPaymentVisible(true);
            setPaymentsTab([...arr]);
            optionVal([...arr])
          }
        }
      })
      .catch((err) => {  toast.error("Someting went wrong, Please try again!!!");});
    
    }
    avoidMultipleAPI.current = true;
    }, [cartStore, router]);

  useEffect(() => {
  
    if (primaryPoints && primaryPoints > 0) {
      let arr = paymentsTab;
      if (primaryPoints && primaryPoints > 0) {
        const index = arr.findIndex((obj) => {
          return obj?.Tabs?.toLowerCase() === "first citizen club";
        });
        if (index < 0) {
          arr.splice(savedPaymentVisible ? 7 : 6, 0, {
            Tabs: "First Citizen Club",
          });
          setPaymentsTab([...arr]);
          optionVal([...arr])
        }
      }
    }
  }, [primaryPoints, paymentsTab, savedPaymentVisible, cartStore, router]);

  const optionVal = async (arr: any) => {
    let selectOptionVal = "";
    if (
      selectedOption === "Gift Card / E-Gift Voucher" ||
      selectedOption.toLowerCase() === "first citizen club" ||
      selectedOption === "SS Wallet" ||
      selectedOption === PaymentData?.TabsData?.[3]?.Tabs
    ) {
      selectOptionVal = selectedOption;
    } else if (cartStore?.cartItems?.cart?.is_egv_cart) {
      selectOptionVal = await arr?.[0]?.Tabs;
    } else if (userDataItems?.walletNumber === "na") {
      selectOptionVal = await arr?.[1]?.Tabs;
    } else {
      selectOptionVal = await arr?.[0]?.Tabs;
    }
    await setSelectedOption(selectOptionVal)
  }

  const walletPopUpOpen = () => {
    setSsWalletPopUpVisible(true);
  };
  const walletPopUpClose = () => {
    setSsWalletPopUpVisible(false);
  };
  const handleWalletUsed = () => {
    return setWalletUsed;
  };
  const handleError = (message: any) => {
    setNetworkErrorMessage(message);
    setNetworkError(true);
  };
  const handleSnackBar = (message: any) => {
    setSnackMessage(message);
    setSnackBarOpen(true);
  };
  const cartID = getItem("BuyNowCartID", "local")
    ? `${getItem("BuyNowCartID", "local")}`
    : `${getItem("cartID", "local")}`;
  const unCheckSsWallet = async () => {
    const response = await RemoveWalletAmount(cartID);
    setIsLoaded(false);
    if (response?.data) {
      setIsChecked({
        ["isChecked"]: false,
      });
      setCartStore((lp: any) => {
        return {
          ...lp,
          cartItems: {
            cart: {
              ...lp.cartItems.cart,
              prices: response?.data?.removeWalletAmount?.prices,
              wallet_discount:
                response?.data?.removeWalletAmount?.wallet_discount,
            },
          },
        };
      });
      setViewBreakUpOptions((previousData: any) => ({
        ...previousData,
        ssWalletAmount: 0,
      }));
      setInValidPaymentsOptions([]);
    } else {
      handleError(response?.message);
    }
  };

  useEffect(() => {
    setViewBreakUpOptions({
      ...viewBreakUpOptions,
      ssWalletAmount: walletUsed?.amount ? walletUsed?.amount : 0,
    });
  }, [walletUsed]);
  useEffect(() => {
    if (cartStore?.currentDeliveryMode === "cc" || (cartStore?.currentDeliveryMode === "ed" && process.env.NEXT_PUBLIC_ENABLE_COD_FOR_ED === "false")) {
      setInValidPaymentsOptions(["Cash On Delivery"]);
    }
    if (userDataItems?.walletNumber) {
      getWalletBalan();
    }
  }, []);

  useEffect(() => {
    fetch(`${getPaymentMethods}`, { headers: { 'x-merchantid': merchant_id } })
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
        client
          .query({
            query: CART_ACTIVE_INFO,
            variables: {
              cartId: cartID,
            },
          })
          .then((res) => {
            if (
              res?.data?.cart?.items?.length < 1 &&
              cartStore?.cartItems?.cart?.orderID
            ) {
              window.location.replace(
                `${window.location.origin}${JUSPAY_RETURN_URL}?order_id=${cartID}&status=AUTHORIZATION_FAILED`
              );
            } else {
              setIsLoaded(false);
            }
          })
          .catch((err) => {
            if (cartStore?.cartItems?.cart?.orderID) {
              window.location.replace(
                `${window.location.origin}${JUSPAY_RETURN_URL}?order_id=${cartID}&status=AUTHORIZATION_FAILED`
              );
            } else {
              setIsLoaded(false);
            }
            console.log("err>>:", err);
          });
      })
      .catch((error) => {
        setIsLoaded(false);
        setError(error);
      });
  }, [global?.window?.location]);

  const callBackForCart = () => {
    setFetchCardDetails(true);
  };
  const jusPayCard = items?.payment_methods?.filter(
    (data: any) => data?.payment_method_type == "CARD"
  );
  const jusPayWallet = items?.payment_methods?.filter(
    (data: any) => data?.payment_method_type == "WALLET"
  );
  const jusPayNetBanking = items?.payment_methods?.filter(
    (data: any) => data?.payment_method_type == "NB"
  );
  useEffect(() => {
    LoyalityBalance();
  }, [update, primaryPoints]);
  const LoyalityBalance = async () => {
    await graphql
      .query({
        query: GET_LOYALITY_DATA,
        variables: {
          GetGroupLoyaltyPointsRequest: { PromoFlag: "CM" },
        },
      })
      .then((res) => {
        setPrimaryPoints(
          res?.data?.getLoyaltyPoints?.getGroupLoyaltyPointsResponse
            ?.redeemablePointsValue
        );
        setUpdate(res?.data?.getLoyaltyPoints);
        setTierData(res?.data?.getLoyaltyPoints?.sslLoyaltyDetails?.tier);
      })
      .catch((err) => {
        console.log("err>>:", err);
      });
  };
  const RenderComponentPaymentPage = (selectedOption: any) => {
    let Data = require("./CashONDelevery/CashOnDelevery.json");
    let GiftCardPayments = require("./GiftCardPayment/GiftCardPayment.json");
    let paymentMode = selectedOption
      ? selectedOption
      : cartStore?.cartItems?.cart?.is_egv_cart
        ? EGVPaymentData?.TabsData?.[0]?.Tabs
        : userDataItems?.walletNumber !== "na" && balanceAmount > 0
          ? PaymentData?.TabsData?.[0]?.Tabs
          : PaymentData?.TabsData?.[1]?.Tabs;
    let scrollTop =
      global?.window?.document.getElementById("renderPaymentComp");
    if (scrollTop) {
      scrollTop?.scrollIntoView({ behavior: "smooth" });
    }
    switch (paymentMode.toLowerCase()) {
      case "ss wallet":
        return (
          <SsWallet
            setssWalletS={setssWalletS}
            walletId={walletId}
            ssWalletS={ssWalletS}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            childData={paymentsTab?.[2]}
            balanceAmount={balanceAmount}
            cartData={cartData}
            callBackForCart={callBackForCart}
            getWalletBalan={getWalletBalan}
            handleError={handleError}
            setIsLoaded={setIsLoaded}
            setViewBreakUpOptions={setViewBreakUpOptions}
            setInValidPaymentsOptions={setInValidPaymentsOptions}
            walletUsed={walletUsed}
            selectedOption={selectedOption}
            cartStore={cartStore}
            setCartStore={setCartStore}
            finalCheckCallBack={finalCheckCallBack}
            unCheckSsWallet={unCheckSsWallet}
          ></SsWallet>
        );
      case "saved payment options":
        {
          return (
            <SavePayment
              handleError={handleError}
              selectedOption={selectedOption}
            ></SavePayment>
          );
        }
      case "credit card / debit card":
        {
          return (
            <CreditCardInput
              finalCheckCallBack={finalCheckCallBack}
              CD={cD}
              handleError={handleError}
              selectedOption={selectedOption}
              cmsData={componentData}
            ></CreditCardInput>
          );
        }
      case "net banking":
        {
          return (
            <NetBanking
              value={value || { payment_method: "" }}
              setValue={setValue}
              topLevelBanks={topLevelBanks}
              setTopLevelBanks={setTopLevelBanks}
              finalCheckCallBack={finalCheckCallBack}
              setCounter={setCounter}
              counter={counter}
              NetBank={netBank}
              jusPayNetBanking={jusPayNetBanking}
              handleError={handleError}
              selectedOption={selectedOption}
            ></NetBanking>
          );
        }
      case "pay by any upi app":
        {
          return (
            <UpiComponent
              finalCheckCallBack={finalCheckCallBack}
              Upi={upi}
              handleError={handleError}
              selectedOption={selectedOption}
              openCancelTransModal={openCancelTransModal}
              setOpenCancelTransModal={setOpenCancelTransModal}
              setSelectedUpiOrCard={setSelectedUpiOrCard}>
            </UpiComponent>
          );
        }
      case "wallets":
        {
          return (
            <Wallet
              finalCheckCallBack={finalCheckCallBack}
              selectedWallet={selectedWallet}
              setSelectedWallet={setSelectedWallet}
              jusPayWallet={jusPayWallet}
              handleError={handleError}
              selectedOption={selectedOption}
            ></Wallet>
          );
        }
      case "first citizen club":
        {
          return (
            <FirstCitizen
              selectedOption={selectedOption}
              setIsLoaded={setIsLoaded}
              setUpdate={setUpdate}
              update={update}
              primaryPoints={primaryPoints}
              setPrimaryPoints={setPrimaryPoints}
              handleError={handleError}
              setInValidPaymentsOptions={setInValidPaymentsOptions}
              setRedeemAmountLoyality={setRedeemAmountLoyality}
              redeemAmountLoyality={redeemAmountLoyality}
              cmsData={componentData}
            ></FirstCitizen>
          );
        }
      case "gift card / e-gift voucher":
        {
          return (
            <GiftCardPay
              Data={GiftCardPayments?.Data}
              setIsLoaded={setIsLoaded}
              handleError={handleError}
              selectedOption={selectedOption}
              setInValidPaymentsOptions={setInValidPaymentsOptions}
            ></GiftCardPay>
          );
        }
      case "cash on delivery":
        {
          return (
            <CashOnDelivery
              componentData={Data}
              handleError={handleError}
              selectedOption={selectedOption}
              cartStore={cartStore}
            ></CashOnDelivery>
          );
        }
      default: {
        return (
          <SsWallet
            setssWalletS={setssWalletS}
            walletId={walletId}
            ssWalletS={ssWalletS}
            isChecked={isChecked}
            finalCheckCallBack={finalCheckCallBack}
            setIsChecked={setIsChecked}
            childData={paymentsTab?.[0]}
            balanceAmount={balanceAmount}
            cartData={cartData}
            callBackForCart={callBackForCart}
            handleError={handleError}
            setIsLoaded={setIsLoaded}
            setViewBreakUpOptions={setViewBreakUpOptions}
            setInValidPaymentsOptions={setInValidPaymentsOptions}
            walletUsed={walletUsed}
            selectedOption={selectedOption}
            cartStore={cartStore}
            setCartStore={setCartStore}
            unCheckSsWallet={unCheckSsWallet}
            getWalletBalan={getWalletBalan}
          ></SsWallet>
        );
      }
    }
  };

  const handleAccordianChange = (panel: string) => {
    const panelLowerCase = panel.toLowerCase();
    if (selectedOption === panel) {
      setSelectedOption("");
      setValue("");
      setTopLevelBanks("");
    } else {
      if (panelLowerCase != "wallets") {
        if (selectedWallet) {
          setSelectedWallet("");
        }
        if (panelLowerCase != "net banking") {
          if (value && topLevelBanks) {
            setValue("");
            setTopLevelBanks("");
          }
        }
      }
      setSelectedOption(panel);
    }
  };
  const getCartDetails = (data: any) => {
    setCartData(data);
    if (
      data?.shipping_addresses?.[0]?.selected_shipping_method?.carrier_code ===
      "flatrate" ||
      (data?.prices?.grand_total?.value > 0 &&
        (data?.prices?.grand_total?.value < codMinimum ||
          data?.prices?.grand_total?.value > codMaximum))
    ) {
      let arr = paymentsTab;
      const search = (obj: any) => {
        obj?.Tabs?.toLowerCase() === "cash on delivery";
      };
      const index = arr.findIndex(search);
      if (index > -1) {
        arr = arr.slice(0, index);
        setPaymentsTab([...arr]);
        optionVal([...arr])
      }
    }
  };
  const getWalletBalan = () => {
    graphql
      .query({
        query: MywalletBalance,
        fetchPolicy: "no-cache",
      })
      .then((res) => {
        const walletID = res?.data?.getWalletBalance?.wallet?.walletNumber;
        if (walletID) {
          setWalletId(walletID);
          setBalanceAmount(
            res?.data?.getWalletBalance?.wallet?.consolidatedBalance
          );
          if (res?.data?.getWalletBalance?.wallet?.consolidatedBalance > 0) {
            setSelectedOption(PaymentData?.TabsData?.[0]?.Tabs);
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const changePaymentOption = (paymentTab: string) => {
    setSelectedOption(paymentTab);
  };
  function currentlyUsingPaymentMode(currentPayStr: string) {
    if (currentPayStr == currentPayment) {
      setCurrentPayment("");
    } else {
      setCurrentPayment(currentPayStr);
    }
    setCD(0);
    setNetBank(0);
    setUpi(0);
  }
  const carddata = require("../PaymentCompletePage/PaymentsCompletePage.json");
  const [otherPay, setOtherPay] = useState(0);
  const handleRemoveSavedPay = () => {
    setOtherPay((prev: any) => prev + 1);
  };
  const callEvent = (linktext: string) => {
    triggerGAEvent(
      {
        widget_title: "select payment",
        event_type: "payment",
        link_url: "na",
        link_text: linktext,
      },
      "click"
    );
  };
  const finalCheckCallBack = useCallback(
    (key: string, value: boolean, disableBlock?: string) => {
      if (finalCheck[`${key}`] != value) {
        if (disableBlock === "savedDisable") {
          setFinalCheck({
            ...finalCheck,
            [key]: value,
            savedCard: value,
            savedUpi: value,
          });
        } else if (disableBlock == "otherPaymentDisable") {
          setFinalCheck({ ...finalCheck, otherPayments: false, [key]: value });
        } else if (
          key === "savedUpi" ||
          key === "savedCard" ||
          key === "otherPayments"
        ) {
          setFinalCheck({ ...finalCheck, [key]: value });
        } else {
          alert("finalCheckCallBack error");
        }
      }
    },
    [finalCheck]
  );
  const redeemBalance = (data: any) => {
    const grandAmount = cartStore?.cartItems?.cart?.prices?.grand_total?.value;
    const walletDiscount = cartStore?.cartItems?.cart?.wallet_discount?.amount;
    const loyalityDiscount =
      cartStore?.cartItems?.cart?.prices?.loyalty_discount?.value;
    let renderValue = "";
    if (walletDiscount > 0 || loyalityDiscount > 0) {
      if (
        data?.available &&
        data?.Tabs == "First Citizen Club" &&
        loyalityDiscount
      ) {
        renderValue = `Redeemed ₹ ${loyalityDiscount}`;
      } else if (
        data?.available &&
        data?.Tabs == "SS Wallet" &&
        walletDiscount
      ) {
        renderValue = `Redeemed ₹  ${Number(walletDiscount) > 0
          ? walletDiscount
          : grandAmount == undefined
            ? balanceAmount
            : grandAmount
          }`;
      } else {
        if (data?.available && data?.Tabs == "First Citizen Club") {
          renderValue = `Balance ₹ ${primaryPoints}`;
        } else if (data?.available && data?.Tabs == "SS Wallet") {
          renderValue = `Balance ₹ ${balanceAmount}`;
        }
      }
    } else {
      if (data?.available && data?.Tabs == "SS Wallet") {
        renderValue = `Balance ₹ ${balanceAmount}`;
      } else if (data?.Tabs == "First Citizen Club") {
        renderValue = `Balance ₹ ${primaryPoints}`;
      }
    }
    return renderValue;
  };

  return (
    <>
      {isLoaded && <Loader />}
      <CustomSnackBar
        snackBarOpen={snackBarOpen}
        setSnackBarOpen={setSnackBarOpen}
        snackMessage={snackMessage}
      />
      {networkError && (
        <Snackbar
          open={networkError}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          sx={{ marginTop: "56px" }}
          onClose={() => setNetworkError(false)}
        >
          <Alert severity="error" onClose={() => setNetworkError(false)}>
            {networkErrorMessage}
          </Alert>
        </Snackbar>
      )}
      {isMobile ? (
        false
      ) : (
        <Typography
          sx={{
            width: "100%",
            padding: "30px 60px",
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "20px",
          }}
        >
          PAYMENT
        </Typography>
      )}
      <BasicModal
        padding="20px"
        height="auto"
        width={isMobile ? "90%" : "40%"}
        top="50%"
        left="50%"
        handleOpen={walletPopUpOpen}
        handleClose={walletPopUpClose}
        open={ssWalletPopUpVisible}
        Component={
          <Box sx={{ borderRadius: "2px", padding: "30px" }}>
            <Stack sx={{}}>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                Do you want to pay through other payment mode?
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "12px",
                }}
              >
                (The redeemed SS wallet amount will be reversed)
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                paddingTop: "20px",
              }}
            >
              <Button
                sx={{
                  border: "1px solid black",
                  backgroundColor: "black",
                  color: "#FFFFFF",
                  borderRadius: "none",
                  "&:hover": {
                    backgroundColor: "#black",
                    color: "#FFFFFF;",
                  },
                }}
                onClick={async () => {
                  await unCheckSsWallet();
                  walletPopUpClose();
                }}
              >
                Yes
              </Button>
              <Button
                onClick={walletPopUpClose}
                sx={{
                  border: "1px solid black",
                  backgroundColor: "#DEA3B7;",
                  color: "#231F20;",
                  borderRadius: "none",
                  "&:hover": {
                    backgroundColor: "#DEA3B7",
                    color: "#231F20;",
                  },
                }}
              >
                NO
              </Button>
            </Stack>
          </Box>
        }
      />
      {isMobile ? (
        <Box sx={{ margin: "0px 16px" }}>
          <SavedPaymentsMobile
            finalCheckCallBack={finalCheckCallBack}
            setSelectedOption={setSelectedOption}
            OtherP={otherPay}
            setOtherP={setOtherPay}
            setParentAccord={setParentAccord}
            {...SavedPaymentData}
            setSavedPaymentCvv={setSavedPaymentCvv}
            setSelectedUpiOrCard={setSelectedUpiOrCard}
            setRadio={setRadio}
            radio={radio}
          ></SavedPaymentsMobile>
          <Box
            sx={{
              border: "1px solid #EAEAEA",
              marginTop: "24px",
              padding: "0 10px",
            }}
          >
            <Typography
              onClick={() => {
                setSelectedOption("");
                !isChecked?.isChecked &&
                  finalCheckCallBack("otherPayments", false, "savedDisable");
                setParentAccord(!parentAccord);
                handleRemoveSavedPay();
              }}
              sx={{
                fontSize: "16px",
                padding: "16px 10px 0 10px",
                fontWeight: "600",
                color: "#231F20",
                margin: "0 10px 16px 10px",
              }}
            >
              Other Payment Methods
            </Typography>
            {paymentsTab
              ?.filter((item) => hideCOD ? !["Cash On Delivery", "Saved Payment Options"].includes(item?.Tabs) : item?.Tabs !== "Saved Payment Options")
              ?.map((accordian: any, index: number) => {
                return (
                  <Box key={index}>
                    <Divider />
                    <OtherPayTab
                      onClick={() => {
                        handleRemoveSavedPay();
                        setSelectedOption("");
                        !isChecked?.isChecked &&
                          finalCheckCallBack(
                            "otherPayments",
                            false,
                            "savedDisable"
                          );
                        setParentAccord(!parentAccord);
                        currentlyUsingPaymentMode(accordian?.Tabs);
                        if (
                          !isChecked?.isChecked &&
                          accordian?.Tabs === "Cash On Delivery"
                        ) {
                          if (
                            accordian?.Tabs === "Cash On Delivery" &&
                            (cartStore?.cartItems?.cart?.prices?.grand_total
                              ?.value < codMinimum ||
                              cartStore?.cartItems?.cart?.prices?.grand_total
                                ?.value > codMaximum ||
                              cartStore?.cartItems?.cart?.prices
                                ?.loyalty_discount?.value > 0 ||
                              cartStore?.cartItems?.cart?.wallet_discount
                                ?.amount > 0 ||
                              cartStore?.cartItems?.cart?.prices?.egv_discount
                                ?.value > 0)
                          ) {
                            finalCheckCallBack("otherPayments", false);
                            handleAccordianChange("");
                          } else {
                            finalCheckCallBack("otherPayments", true);
                            handleAccordianChange(accordian?.Tabs);
                          }
                        } else if (
                          accordian?.Tabs?.toLowerCase() !== "ss wallet" &&
                          isChecked?.isChecked &&
                          cartStore?.cartItems?.cart?.prices?.grand_total
                            ?.value == 0
                        ) {
                          walletPopUpOpen();
                          if (
                            !(
                              accordian.Tabs == "Cash On Delivery" &&
                              (cartStore?.currentDeliveryMode === "cc" ||
                                isChecked?.isChecked)
                            )
                          ) {
                            walletPopUpOpen();
                          }
                        } else if (
                          isChecked?.isChecked &&
                          accordian.Tabs == "Cash On Delivery"
                        ) {
                          handleAccordianChange("");
                        } else if (
                          accordian.Tabs.toLowerCase() ==
                          "first citizen club" &&
                          userDataItems?.tier === "na"
                        ) {
                          handleAccordianChange("");
                        } else if (
                          accordian.Tabs.toLowerCase() == "ss wallet" &&
                          userDataItems?.walletNumber === "na"
                        ) {
                          handleAccordianChange("");
                        } else {
                          handleAccordianChange(accordian?.Tabs);
                          !isChecked?.isChecked &&
                            finalCheckCallBack("otherPayments", false);
                        }
                      }}
                      sx={{
                        opacity:
                          (accordian.Tabs.toLowerCase() == "ss wallet" &&
                            userDataItems?.walletNumber === "na") ||
                            (accordian.Tabs.toLowerCase() ==
                              "first citizen club" &&
                              userDataItems?.tier === "na") ||
                            (accordian.Tabs == "Cash On Delivery" &&
                              (cartStore?.cartItems?.cart?.prices?.grand_total
                                ?.value < codMinimum ||
                                cartStore?.cartItems?.cart?.prices?.grand_total
                                  ?.value > codMaximum ||
                                cartStore?.cartItems?.cart?.prices
                                  ?.loyalty_discount?.value > 0 ||
                                cartStore?.cartItems?.cart?.wallet_discount
                                  ?.amount > 0 ||
                                cartStore?.cartItems?.cart?.prices?.egv_discount
                                  ?.value > 0)) ||
                            (accordian.Tabs == "Cash On Delivery" &&
                              !(
                                cartStore?.cartItems?.cart?.items.every(
                                  (item: any) => item?.product?.cod_available
                                ) == "1"
                              )) ||
                            (accordian.Tabs == "Cash On Delivery" &&
                              (cartStore?.currentDeliveryMode === "cc" || (cartStore?.currentDeliveryMode === "ed" && process.env.NEXT_PUBLIC_ENABLE_COD_FOR_ED === "false") ||
                                isChecked?.isChecked)) || (accordian.Tabs == "Cash On Delivery" && userDataItems?.storeMode && userDataItems?.storeModeType === "cc")
                            ? "0.4"
                            : "unset",
                      }}
                    >
                      <Box
                        sx={{
                          display:
                            accordian?.Tabs.toLowerCase() === "ss wallet" ||
                              accordian?.Tabs.toLowerCase() ===
                              "first citizen club"
                              ? "flex"
                              : "block",
                          alignItems: "center",
                        }}
                      >
                        {accordian?.Tabs}
                        {accordian?.available &&
                          userDataItems?.walletNumber != "na" &&
                          index === 0 && (
                            <Typography
                              sx={{
                                backgroundColor: "#F9E490",
                                fontSize: "12px",
                                color: "#231F20",
                                padding: "5px 12px",
                                height: "26px",
                                marginLeft: "16px",
                              }}
                            >
                              {index == 0 &&
                                cartStore?.cartItems?.cart?.wallet_discount
                                  ?.amount > 0
                                ? `Redeemed ₹  ${Number(
                                  cartStore?.cartItems?.cart
                                    ?.wallet_discount?.amount
                                ) > 0
                                  ? cartStore?.cartItems?.cart
                                    ?.wallet_discount?.amount
                                  : cartStore?.cartItems?.cart?.prices
                                    ?.grand_total?.value
                                }`
                                : `Balance ₹ ${balanceAmount}`}
                            </Typography>
                          )}
                        {accordian?.available &&
                          userDataItems?.walletNumber == "na" &&
                          index === 0 && (
                            <Typography
                              sx={{
                                backgroundColor: "#F9E490",
                                fontSize: "12px",
                                color: "#231F20",
                                padding: "5px 12px",
                                height: "26px",
                                marginLeft: "16px",
                              }}
                            >
                              Activate SS Wallet from My Profile
                            </Typography>
                          )}
                        {accordian?.available &&
                          userDataItems?.primaryCardNumber != "na" &&
                          index === 5 && (
                            <Typography
                              sx={{
                                backgroundColor: "#F9E490",
                                fontSize: "12px",
                                color: "#231F20",
                                padding: "5px 12px",
                                height: "26px",
                                marginLeft: "16px",
                              }}
                            >
                              {index == 5 &&
                                cartStore?.cartItems?.cart?.prices
                                  ?.loyalty_discount?.value > 0
                                ? `Redeemed ₹  ${parseFloat(
                                  cartStore?.cartItems?.cart?.prices
                                    ?.loyalty_discount?.value
                                ) > 0
                                  ? cartStore?.cartItems?.cart?.prices
                                    ?.loyalty_discount?.value
                                  : cartStore?.cartItems?.cart?.prices
                                    ?.grand_total?.value
                                }`
                                : `Balance ₹ ${primaryPoints}`}
                            </Typography>
                          )}
                        {accordian?.subText && (
                          <>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "400",
                                lineHeight: "20px",
                                color: "#252D34",
                              }}
                            >
                              {accordian?.subText}
                            </Typography>
                          </>
                        )}
                        {(accordian.Tabs == "Cash On Delivery" &&
                          (cartStore?.cartItems?.cart?.prices?.grand_total
                            ?.value < codMinimum ||
                            cartStore?.cartItems?.cart?.prices?.grand_total
                              ?.value > codMaximum ||
                            cartStore?.cartItems?.cart?.prices?.loyalty_discount
                              ?.value > 0 ||
                            cartStore?.cartItems?.cart?.wallet_discount
                              ?.amount > 0 ||
                            cartStore?.cartItems?.cart?.prices?.egv_discount
                              ?.value > 0)) ||
                          (accordian.Tabs == "Cash On Delivery" &&
                            !(
                              cartStore?.cartItems?.cart?.items.every(
                                (item: any) => item?.product?.cod_available
                              ) == "1"
                            )) ||
                          (accordian.Tabs == "Cash On Delivery" &&
                            (cartStore?.currentDeliveryMode === "cc" ||
                              isChecked?.isChecked) && (
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: "400",
                                  lineHeight: "20px",
                                  color: "#252D34",
                                }}
                              >
                                COD can't be used with any other tender
                              </Typography>
                            ))}
                      </Box>
                      {selectedOption === accordian?.Tabs ? (
                        <ExpandLessIcon sx={{ float: "right" }} />
                      ) : (
                        <ExpandMoreIcon sx={{ float: "right" }} />
                      )}
                    </OtherPayTab>

                    {selectedOption === accordian?.Tabs && (
                      <Grid pb={3}>
                        {RenderComponentPaymentPage(selectedOption)}
                      </Grid>
                    )}
                  </Box>
                );
              })}
          </Box>
          {!isLoaded && (
            <PriceDetailsBox
              cmsData={componentData}
              selectedUpiOrCard={selectedUpiOrCard}
              radio={radio}
              finalCheck={finalCheck}
              savedPaymentCvv={savedPaymentCvv}
              selectedWallet={selectedWallet}
              mobilePayOption={selectedOption}
              setssWalletS={setssWalletS}
              setCD={setCD}
              setNetBank={setNetBank}
              setUpi={setUpi}
              currentPayment={currentPayment}
              data={carddata}
              getCartDetails={getCartDetails}
              fetchCardDetails={fetchCardDetails}
              viewBreakUpOptions={viewBreakUpOptions}
              handleSnackBar={handleSnackBar}
              handleError={handleError}
              handleWalletUsed={handleWalletUsed}
              WalletUsed={walletUsed}
              value={value}
              setValue={setValue}
              topLevelBanks={topLevelBanks}
              setTopLevelBanks={setTopLevelBanks}
              finalCheckCallBack={finalCheckCallBack}
            ></PriceDetailsBox>
          )}
        </Box>
      ) : (
        <>
          <Grid
            container
            gap={1}
            direction="row"
            sx={{ padding: "0px 60px" }}
            justify-content="space-between"
          >
            <Grid item md={7.8} lg={7.8} sm={7.8}>
              <Box
                sx={{
                  padding: "0px 0px 11px 0px",
                  display: "block !important",
                }}
              >
              </Box>
              <ChoosePaymentType id="renderPaymentComp">
                Choose Payment Method
              </ChoosePaymentType>
              <Grid
                container
                sx={{ cursor: "pointer" }}
                gap={1}
                direction="row"
                justify-content="space-evenly"
              >
                <Grid md={4.5} lg={4.5} sm={4.5} item>
                    {paymentsTab
                      ?.filter((item) => hideCOD ? item?.Tabs !== "Cash On Delivery" : true)
                      ?.map((data: any, index) => {
                    const inValidTab =
                      invalidPaymentOptions?.length === 0
                        ? ""
                        : invalidPaymentOptions.filter(
                          (tab: any) => tab === data?.Tabs
                        );
                    return (
                      <Box
                        key={index}
                        sx={{
                          border: "1px solid #E5E5E5",
                          padding: "28px 20px",
                          display:
                            data?.Tabs === "Cash On Delivery" &&
                            userDataItems?.storeModeType === "cc"
                              ? "none"
                              : data?.subText ||
                                userDataItems?.walletNumber !== "na"
                              ? "flex"
                              : "block",

                          alignItems: "center",
                          opacity:
                            (data.Tabs.toLowerCase() == "ss wallet" &&
                              userDataItems?.walletNumber === "na") ||
                            (data.Tabs.toLowerCase() == "first citizen club" &&
                              userDataItems?.tier === "na") ||
                            (data.Tabs == "Cash On Delivery" &&
                              !(
                                cartStore?.cartItems?.cart?.items.every(
                                  (item: any) => item?.product?.cod_available
                                ) == "1"
                              )) ||
                            (data.Tabs == "Cash On Delivery" &&
                              (cartStore?.cartItems?.cart?.prices?.grand_total
                                ?.value < codMinimum ||
                                cartStore?.cartItems?.cart?.prices?.grand_total
                                  ?.value > codMaximum ||
                                cartStore?.cartItems?.cart?.prices
                                  ?.loyalty_discount?.value > 0 ||
                                parseFloat(
                                  cartStore?.cartItems?.cart?.wallet_discount
                                    ?.amount
                                ) > 0 ||
                                parseFloat(
                                  cartStore?.cartItems?.cart?.prices
                                    ?.egv_discount?.value
                                ) > 0)) ||
                            (data.Tabs == "Cash On Delivery" &&
                              (cartStore?.currentDeliveryMode === "cc" ||
                                (cartStore?.currentDeliveryMode === "ed" &&
                                  process.env.NEXT_PUBLIC_ENABLE_COD_FOR_ED ===
                                    "false") ||
                                isChecked?.isChecked)) ||
                            invalidPaymentOptions.includes(data.Tabs) ||
                            (data.Tabs == "Cash On Delivery" &&
                              userDataItems?.storeModeType === "cc")
                              ? "0.4"
                              : "",
                          backgroundColor:
                            data.Tabs == selectedOption ? "#F6F7F9" : "none",
                        }}
                        onClick={() => {
                          if (openCancelTransModal?.qrCreated) {
                            setOpenCancelTransModal({
                              ...openCancelTransModal,
                              enable: true,
                            });
                            return;
                          }
                          if (
                            !(
                              (data.Tabs.toLowerCase() == "ss wallet" &&
                                userDataItems?.walletNumber === "na") ||
                              (data.Tabs.toLowerCase() ==
                                "first citizen club" &&
                                userDataItems?.tier === "na") ||
                              (data.Tabs == "Cash On Delivery" &&
                                !(
                                  cartStore?.cartItems?.cart?.items.every(
                                    (item: any) => item?.product?.cod_available
                                  ) == "1"
                                )) ||
                              (data.Tabs == "Cash On Delivery" &&
                                (cartStore?.cartItems?.cart?.prices?.grand_total
                                  ?.value < codMinimum ||
                                  cartStore?.cartItems?.cart?.prices
                                    ?.grand_total?.value > codMaximum ||
                                  cartStore?.cartItems?.cart?.prices
                                    ?.loyalty_discount?.value > 0 ||
                                  parseFloat(
                                    cartStore?.cartItems?.cart?.wallet_discount
                                      ?.amount
                                  ) > 0 ||
                                  parseFloat(
                                    cartStore?.cartItems?.cart?.prices
                                      ?.egv_discount?.value
                                  ) > 0)) ||
                              (data.Tabs == "Cash On Delivery" &&
                                (cartStore?.currentDeliveryMode === "cc" ||
                                  isChecked?.isChecked)) ||
                              (data.Tabs == "Cash On Delivery" &&
                                userDataItems?.storeMode &&
                                userDataItems?.storeModeType === "cc") ||
                              invalidPaymentOptions.includes(data.Tabs)
                            )
                          ) {
                            if (
                              inValidTab?.[0] == data.Tabs &&
                              cartStore?.cartItems?.cart?.prices?.grand_total
                                ?.value == 0
                            ) {
                              walletPopUpOpen();
                            } else if (inValidTab?.[0] == data.Tabs) {
                              changePaymentOption(data?.Tabs);
                              callEvent(data?.Tabs);
                            } else {
                              setValue("");
                              setTopLevelBanks("");
                              changePaymentOption(data?.Tabs);
                              callEvent(data?.Tabs);
                            }
                          }
                        }}
                      >
                        <Box
                          sx={{
                            paddingRight: "10px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "16px",
                            fontWeight: 500,
                            display:
                              data?.subText &&
                              userDataItems?.walletNumber !== "na"
                                ? "flex"
                                : "block",
                            flexDirection: data?.subText && "column",
                            alignItems: data?.subText && "flexStart",
                            color: selectedOption
                              ? data.Tabs == selectedOption
                                ? "#AD184C"
                                : "#231F20"
                              : userDataItems?.walletNumber === "na"
                              ? data.Tabs == "Credit Card / Debit Card"
                                ? "#AD184C"
                                : "#231F20"
                              : data.Tabs == "SS Wallet"
                              ? "#AD184C"
                              : "#231F20",
                          }}
                        >
                          {data.Tabs}
                          {data?.subText && (
                            <Typography
                              sx={{ fontWeight: "400", color: "#4F4C4D" }}
                            >
                              {data?.subText}
                            </Typography>
                          )}
                        </Box>
                        {data?.available &&
                          userDataItems?.walletNumber != "na" && (
                            <Typography
                              sx={{
                                backgroundColor: "#F9E490",
                                fontSize: "12px",
                                color: "#231F20",
                                padding: "6px 12px",
                              }}
                            >
                              {redeemBalance(data)}
                            </Typography>
                          )}
                        {data?.available &&
                          userDataItems?.walletNumber == "na" && (
                            <Typography
                              sx={{
                                fontSize: "12px",
                                color: "#231F20",
                                padding: "5px 0px",
                                height: "26px",
                              }}
                            >
                              Activate SS Wallet from My Profile
                            </Typography>
                          )}
                      </Box>
                    );
                  })}
                </Grid>
                <Grid
                  md={7.2}
                  lg={7.3}
                  sm={7}
                  item
                  sx={{
                    border: "1px solid #E5E5E5",
                    height: "fit-content",
                    padding: "20px",
                  }}
                >
                  {RenderComponentPaymentPage(selectedOption)}
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4} lg={4} sm={4}>
              {!isLoaded && (
                <PriceDetailsBox
                  data={carddata}
                  getCartDetails={getCartDetails}
                  fetchCardDetails={fetchCardDetails}
                  viewBreakUpOptions={viewBreakUpOptions}
                  handleSnackBar={handleSnackBar}
                  handleError={handleError}
                  handleWalletUsed={handleWalletUsed}
                  WalletUsed={walletUsed}
                ></PriceDetailsBox>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
export default PaymentPageIndex;
