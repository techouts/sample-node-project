import React from "react";
import Modal from "../../HOC/Modal/ModalBlock";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import datainfo from "../../JSON/Mywallet/Mywallet.json";
import {
  CheckBal,
  addPreActivatedCardToWallet,
} from "../../graphQLQueries/MywalletQuery";
import {
  CheckFontSize,
  FontSizCrdNoTxt,
  checkBalanceBut,
  AmtTypography,
  CheckTypography,
  ExpTypography,
  CheckBalButton,
  WalletTypography,
  AddBalButton,
  Modal_Code,
  textToLeft,
  widthSize,
  radio_button,
  checkBalanceButextra,
  marginAfterVerify,
  submitButton,
  CheckTitleTypography,
  RadioLabelTypography,
  GiftCardTitleTypography,
  GiftCardSubTitleTypography,
  GiftCardInfoTypography,
  CaptchaBox,
  giftCardSubmitBtn,
} from "./MyWalletStyles";
import Captcha from "./CaptchaCode";
import { useMobileCheck } from "../../utility/isMobile";
import { toast } from "../../utility/Toast";
import { event_type, widget_type } from "../../utility/GAConstants";
import {
  Add_Wallet,
  Check_Wallet,
  GIFT_CARD_ERROR_TEXT,
} from "../Profile/constant";
import graphql from "../../middleware-graphql";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import { callEventBeautyProfileMyWallet } from "../BeautyProfile/BeautyProfileMyWallet";
import triggerGAEvent from "../../utility/GaEvents";
import Loader from "../../HOC/Loader/Loader";
import { Cookies } from "react-cookie";
import handleErrorResponse from "../../utility/ErrorHandling";

function Mywallet(props: any) {
  const { giftCard = false } = props;
  const cookie = new Cookies();
  const [open, setOpen] = useState(false);
  const [radio, setRadio] = useState<string>();
  const handleClose = () => setOpen(false);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  let isMobile = useMobileCheck();
  const [isCaptcha, setIsCaptcha] = useState(false);
  useEffect(() => {
    setRadio("Gift_Card");
  }, []);
  const CssTextField = styled(TextField)(() => ({
    "& label.Mui-focused": {
      color: "#AD184C",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#EAEAEA",
    },
  }));

  const controlProps = (item: string) => ({
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  let eVoucherBal = " E-Gift Voucher Balance";
  const [onlyNums, setOnlyNums] = useState("");
  const [checkBalData, setCheckBalData] = useState({});
  const [captchaRender, setcaptchaRender] = useState(false);
  const [pinCode, setPinCode]: any = useState("");
  const [pinCodeError, setPinCodeError]: any = useState(false);
  const [cardNoError, setCardNoError]: any = useState(false);
  const [firstTimeCaptcha, setFirstTimeCaptcha]: any = useState(false);
  const [isDisabled, setIsDisabled]: any = useState(true);
  const [isDisableCard, setIsDisabledCard] = useState(true);
  const [snackBarOpen, setSnackBarOpen] = useState(true);
  const [snackMessage, setSnackMessage] = useState("");
  const [expData, setExpData] = useState("");
  const [displayLoader, setLoader] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [networkErrorMessage, setNetworkErrorMessage] = useState("");
  const [captchaClose, setCaptchaClose]: any = useState(true);

  let isCheck = useMobileCheck();

  const handleChangeOfCard = (e: any) => {
    const inputVal = e.target.value?.replace(/ /g, "");
    let inputNumbersOnly = inputVal?.replace(/\D/g, "");
    if (inputNumbersOnly.length >= 16) {
      setCardNoError(false);
      inputNumbersOnly = inputNumbersOnly.substr(0, 16);
    } else {
      setCardNoError(true);
    }
    const splits = inputNumbersOnly.match(/.{1,4}/g);
    let spacedNumber = "";
    if (splits) {
      spacedNumber = splits.join(" ");
    }
    setOnlyNums(spacedNumber);
  };

  function handlePinChange(event: any) {
    let val = event.target.value;
    let isFormValid;
    let prev;
    let inputNumbersOnly = val?.replace(/\D/g, "");
    if (inputNumbersOnly.length >= 6) {
      setPinCodeError(false);
      inputNumbersOnly = inputNumbersOnly.substr(0, 6);
    } else {
      setPinCodeError(true);
    }
    setPinCode(inputNumbersOnly);
  }

  async function handleShowBal() {
    let inputNumbersOnly = onlyNums?.replace(/\D/g, "");
    setLoader(true);
    await graphql
      .mutate({
        mutation: CheckBal,
        variables: {
          cardNumber: inputNumbersOnly.toString(),
          cardPIN: pinCode.toString(),
        },
      })
      .then((response: any) => {
       
        setLoader(false);
        if (
          response?.data?.checkBalance?.responseMessage ===
          "Transaction successful."
        ) {
          setOpen(true);
          setCheckBalData(
            JSON.parse(JSON.stringify(response?.data?.checkBalance?.amount))
          );
          let expFormat = JSON.stringify(
            response?.data?.checkBalance?.cardExpiry
          )
            .slice(1, 11)
            .split("-");
          setExpData(expFormat[2] + "/" + expFormat[1] + "/" + expFormat[0]);
        } else {
          setLoader(false);
          setNetworkErrorMessage(response?.data?.checkBalance?.responseMessage);
          setNetworkError(true);
          setOpen(false);
        }
      })
      .catch((err) => {
        toast.error("Someting went wrong, Please try again!!!");
        setLoader(false);
        console.log(err, "err");
      });
  }
  const handleOpen = () => {
    callEventBeautyProfileMyWallet(
      event_type,
      widget_type,
      props.titleOne,
      Add_Wallet,
      "",
      "",
      "",
      props?.cartItems
    );
    let inputNumbersOnly = onlyNums?.replace(/\D/g, "");
    if (pinCode.length != 6) {
      setPinCodeError(true);
    } else {
      setPinCodeError(false);
    }
    if (inputNumbersOnly.length != 16) {
      setCardNoError(true);
    } else {
      setCardNoError(false);
    }

    if (pinCode.length == 6 && inputNumbersOnly.length == 16) {
      if (firstTimeCaptcha == true) {
        setOpen(true);
      }
      setcaptchaRender(true);
      setCaptchaClose(true);
    }
  };
  const getDetails = function () {
    callEventBeautyProfileMyWallet(
      event_type,
      widget_type,
      props.titleOne,
      Check_Wallet,
      "",
      "",
      "",
      props?.cartItems
    );
    let inputNumbersOnly = onlyNums?.replace(/\D/g, "");

    if (pinCode.length != 6) {
      setPinCodeError(true);
    } else {
      setPinCodeError(false);
    }
    if (inputNumbersOnly.length != 16) {
      setCardNoError(true);
    } else {
      setCardNoError(false);
    }
    if (pinCode.length == 6 && inputNumbersOnly.length == 16) {
      setLoader(true);
      graphql
        .mutate({
          mutation: addPreActivatedCardToWallet,
          variables: {
            cardNumber: inputNumbersOnly.toString(),
            cardPIN: pinCode.toString(),
          },
        })
        .then(async (response: any) => {
          setLoader(false);
          if (giftCard) {
            setOnlyNums("");
            setPinCode("");
            setNetworkErrorMessage(
              response?.data?.addPreActivatedCardToWallet?.responseMessage.toString() ===
                "Wallet - Card Already Added."
                ? GIFT_CARD_ERROR_TEXT
                : response?.data?.addPreActivatedCardToWallet?.responseMessage.toString() ||
                    "Transaction successful"
            );
            setNetworkError(true);
            setOpen(false);
          } else {
            if (
              response?.data?.addPreActivatedCardToWallet?.responseMessage.toString() ==
              "Transaction successful."
            ) {
              (await props?.getWalletBalan) && props?.getWalletBalan();
              setOnlyNums("");
              setPinCode("");
            }
            props.setRefreshAfterCreate((prev: any) => {
              !prev;
            });
            setNetworkErrorMessage(
              response?.data?.addPreActivatedCardToWallet?.responseMessage.toString()
            );
            setNetworkError(true);
            setOpen(false); // for modal to close after adding bal to wallet
          }
        })
        .catch((err) => {
          setLoader(false);
          setNetworkError(true);
          if (
            userDataItems?.walletNumber === "na" ||
            !userDataItems?.walletNumber
          ) {
            setNetworkErrorMessage("Please activate your wallet from Account");
          }
          else {
            setNetworkErrorMessage("We are facing technical issues please try after sometime"); 
          }
        });
    }
  };
  useEffect(() => {
    const isPinCodeValid = pinCode?.length && onlyNums?.length && !pinCodeError;
    const isCardNoValid = !cardNoError;
    
    setIsDisabled(!isPinCodeValid);
    setIsDisabledCard(!isCardNoValid);
    
  }, [pinCodeError, cardNoError, pinCode, onlyNums]);
  const component = function () {
    return (
      <>
        <Box display={"flex"} justifyContent="center" alignItems="center">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={12} sm={12}>
              {isCheck ? (
                <CheckTypography>
                  {" "}
                  {datainfo?.data?.checkecardorgift}
                  <br /> {eVoucherBal}
                </CheckTypography>
              ) : (
                <CheckTypography>{datainfo?.data?.checkGift} </CheckTypography>
              )}
            </Grid>
            <Grid item xs={12} md={12} sm={12}>
              <AmtTypography>₹{JSON.stringify(checkBalData)}</AmtTypography>
            </Grid>
            <Grid item xs={12} md={12} sm={12}>
            </Grid>
            {props?.typoit && cookie.get("accessToken") ? (
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                sx={{ paddingTop: isCheck ? "13px " : "24px" }}
              >
                <AddBalButton onClick={() => getDetails()}>
                  {Add_Wallet}
                </AddBalButton>
              </Grid>
            ) : (
              ""
            )}
            {!cookie.get("accessToken") && (
              <Typography sx={{ fontSize: "14px", color: "#231F20" }}>
                Kindly login to add gift card/e gift voucher balance to your
                wallet
              </Typography>
            )}
          </Grid>
        </Box>
      </>
    );
  };
  function verifyOnSubmit() {
    if (isCaptcha) {
      handleShowBal();
      setCaptchaClose(false);
      setcaptchaRender(false);
    }
  }

  //click event for check button and add balane
  const callButton = (linktext: string) => {
    triggerGAEvent(
      {
        event_type: "gift_card_Creation",
        widget_title: "Received a gift card ?",
        link_url: "",
        link_text: linktext,
        item_name: "Gift Card",
        item_type: "CREATE YOUR OWN CARD",
      },
      "click"
    );
  };

  return (
    <>
      {displayLoader && <Loader />}
      <CustomSnackBar
        snackBarOpen={networkError}
        setSnackBarOpen={setNetworkError}
        snackMessage={networkErrorMessage}
      />

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        style={marginAfterVerify}
      >
        <Grid item xs={12} md={12} sm={12}>
          <br />
          <div style={{ textAlign: "left" }}>
            <CheckTitleTypography>{props.titleOne}</CheckTitleTypography>
          </div>

          {props.giftCard && (
            <>
              <GiftCardTitleTypography>
                RECEIVED A GIFT CARD ?
              </GiftCardTitleTypography>

              <GiftCardSubTitleTypography>
                Add New Gift Card/ E-Gift Vouchers Or Check Balance
              </GiftCardSubTitleTypography>
            </>
          )}

          <WalletTypography
            sx={{
              textAlign: isCheck ? "center" : "left",
              marginTop: giftCard ? "8px" : "2%",
            }}
            dcolor="#4F4C4D"
            dfontweight="400"
            dfontsize="14px"
            dlineheight="150%"
            mfontsize="11px"
            mlineheight="15.4px"
          >
            {props.titleTwo}
          </WalletTypography>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sm={12}
          sx={{
            marginTop: giftCard ? "8px" : "2%",
            marginLeft: useMobileCheck() ? "0%" : "1%",
            marginBottom: "1%",
          }}
        >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(event) => {
              setRadio(event?.target.value);
            }}
          >
            <Grid
              item
              xs={3.6}
              md={1.4}
              lg={1.3}
              sm={2.5}
              justifyContent="flex-start"
              sx={textToLeft}
            >
              <FormControlLabel
                value="Gift Card"
                sx={{
                  marginRight: "0px",
                  "& .MuiFormControlLabel-label": {
                  },
                  "& .css-1xuz1m9-MuiGrid-root": {
                    maxWidth: "10px",
                  },
                }}
                //
                control={
                  <Radio
                    {...controlProps("Gift_Card")}
                    size="small"
                    sx={radio_button}
                    checked={radio === "Gift_Card"}
                  />
                }
                label={<RadioLabelTypography>Gift Card</RadioLabelTypography>}
              />
            </Grid>
            <Grid
              item
              xs={4}
              justifyContent="flex-start"
              sx={{ marginLeft: "16px" }}
            >
              <FormControlLabel
                value="E-Gift_Voucher"
                control={
                  <Radio
                    {...controlProps("E-Gift_Voucher")}
                    size="small"
                    sx={radio_button}
                    checked={radio === "E-Gift_Voucher"}
                  />
                }
                sx={{
                  "& .MuiFormControlLabel-label": {
                    minWidth: "100px",
                  },
                  "& .MuiGrid-item": {
                    maxWidth: "27%",
                  },
                }}
                label={
                  <RadioLabelTypography>E-Gift Voucher</RadioLabelTypography>
                }
              />
            </Grid>
          </RadioGroup>
        </Grid>

        <Grid item xs={12} md={5} sm={12}>
          <div style={{ textAlign: "left" }}>
            <FontSizCrdNoTxt>Card Number*</FontSizCrdNoTxt>
            <TextField
              autoComplete="off"
              sx={{
                width: isCheck ? "100%" : "93%",

                "& label.Mui-focused": {
                  color: "#AD184C",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#EAEAEA",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "0px",
                    borderColor: "#EAEAEA",
                  },
                  "&:hover fieldset": {
                    borderColor: "#EAEAEA",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#EAEAEA",
                  },

                  "& ::placeholder": {
                    color: "#231F20",
                    opacity: 1,
                  },
                  "&.MuiInputBase-root": { height: "49px" },
                },
              }}
              value={onlyNums}
              helperText={
                cardNoError ? (
                  <p style={{ color: "red", margin: 0 }}>
                    Card Number should contains 16 digits
                  </p>
                ) : (
                  ""
                )
              }
              id="outlined-basic"
              placeholder="Enter Card Number"
              onChange={handleChangeOfCard}
              variant="outlined"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={5} sm={12} spacing={1} pt={isCheck ? 1.3 : ""}>
          <div style={{ textAlign: "left" }}>
            {isMobile ? (
              <FontSizCrdNoTxt>PIN Number*</FontSizCrdNoTxt>
            ) : (
              <FontSizCrdNoTxt>Enter Pin*</FontSizCrdNoTxt>
            )}
            <TextField
              autoComplete="off"
              value={pinCode}
              onChange={(event) => handlePinChange(event)}
              helperText={
                pinCodeError ? (
                  <p style={{ color: "red", margin: 0 }}>
                    Pin should contain 6 digits
                  </p>
                ) : (
                  ""
                )
              }
              sx={{
                width: isCheck ? "100%" : "95%",
                "& label.Mui-focused": {
                  color: "#AD184C",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#EAEAEA",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "0px",
                    borderColor: "#EAEAEA",
                  },
                  "&:hover fieldset": {
                    borderColor: "#EAEAEA",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#EAEAEA",
                  },
                  "& ::placeholder": {
                    color: "#231F20",
                    opacity: 1,
                  },
                  "&.MuiInputBase-root": { height: "49px" },
                },
              }}
              id="outlined-basic"
              placeholder="Enter Pin"
              variant="outlined"
            />
          </div>
        </Grid>
        {!props?.typoit ? (
          <>
            <Grid
              item
              xs={12}
              md={2}
              sm={12}
              justifyContent="flex-start"
              sx={{
                marginLeft: isMobile ? "0" : "0.1%",
                marginTop: isMobile
                  ? giftCard
                    ? "30px"
                    : "4%"
                  : giftCard
                  ? "30px"
                  : "3.5%",
                marginBottom: isMobile ? "7.5%" : "",
                display: "flex",
                gap: "10px",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <CheckBalButton
                  dbgcolor={giftCard ? "#DEA3B7" : "#231F20"}
                  dcolor={giftCard ? "#231F20" : "#FFFFFF"}
                  webWidth="167px"
                  mobWidth="100%"
                  sx={{
                    "&:hover": {
                      backgroundColor: giftCard ? "#DEA3B7" : "#231F20",
                    },
                  }}
                  onClick={() => handleOpen()}
                >
                  {Check_Wallet}
                </CheckBalButton>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sm={12}
              justifyContent="flex-start"
              sx={{ marginLeft: isMobile ? "0" : "1%" }}
            >
              <WalletTypography
                sx={{ textAlign: isCheck ? "center" : "left", marginTop: "2%" }}
                dcolor="#4F4C4D"
                dfontweight="400"
                dfontsize="14px"
                dlineheight="150%"
                mfontsize="11px"
                mlineheight="15.4px"
              >
                {props.titleThree}
              </WalletTypography>
            </Grid>

            {isCheck ? (
              <Modal
                open={open}
                height={"381px"}
                width={"91%"}
                handleClose={handleClose}
                top={"50%"}
                left={"50%"}
                Component={component()}
                display="flex"
                alignItems="center  "
                justifyContent="center"
              ></Modal>
            ) : (
              <Modal
                open={open}
                height={"381px"}
                width={"43.8%"}
                handleClose={handleClose}
                top={"50%"}
                left={"50%"}
                Component={component()}
                display="flex"
                alignItems="center  "
                justifyContent="center"
              ></Modal>
            )}
          </>
        ) : (
          <>
            <Stack
              direction={giftCard && isMobile ? "column" : "row"}
              spacing={giftCard && isMobile ? 0 : 2}
              pt={giftCard && isMobile ? 0 : "30px"}
              width="100%"
            >
              <Box
                width={
                  isCheck ? (isMobile && giftCard ? "100%" : "80%") : "unset"
                }
              >
                <CheckBalButton
                  disabled={isDisabled}
                  dbgcolor={giftCard ? "#DEA3B7" : "#231F20"}
                  dcolor={giftCard ? "#231F20" : "#FFFFFF"}
                  webWidth={giftCard ? "306px" : "167px"}
                  mobWidth="100%"
                  sx={{
                    marginTop: giftCard && isMobile ? "10px" : 0,
                    "&:hover": {
                      backgroundColor: giftCard ? "#DEA3B7" : "#231F20",
                    },
                  }}
                  onClick={() => {
                    if (firstTimeCaptcha) {
                      handleShowBal();
                    } else {
                      handleOpen();
                    }
                    callButton(giftCard ? " CHECK CARD BALANCE" : Check_Wallet);
                  }}
                >
                  <Typography
                    sx={{
                      color: giftCard
                        ? "#231F20                      "
                        : "white",
                      fontSize: { xs: "11px", sm: "12px" },
                    }}
                  >
                    {giftCard ? " CHECK CARD BALANCE" : Check_Wallet}
                  </Typography>
                </CheckBalButton>
              </Box>
              <Box width={isCheck ? "100%" : "unset"}>
                {cookie.get("accessToken") && (
                  <CheckBalButton
                    disabled={isDisableCard}
                    dbgcolor={giftCard ? "#E5E5E5" : "#DEA3B7"}
                    dcolor={"#231F20"}
                    webWidth={giftCard ? "306px" : "233px"}
                    mobWidth="100%"
                    sx={{
                      marginTop: giftCard && isMobile ? "10px" : 0,
                      "&:hover": {
                        backgroundColor: giftCard ? "#E5E5E5" : "#DEA3B7",
                      },
                    }}
                    onClick={() => {
                      getDetails();
                      callButton(Add_Wallet);
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#231F20",
                        fontSize: { xs: "11px", sm: "12px" },
                      }}
                    >
                      {Add_Wallet}
                    </Typography>
                  </CheckBalButton>
                )}
                <Modal
                  open={open}
                  height={isCheck ? "37%" : "381px"}
                  width={isCheck ? "91%" : "43.8%"}
                  handleClose={handleClose}
                  top={"50%"}
                  left={"50%"}
                  Component={component()}
                  display="flex"
                  alignItems="center  "
                  justifyContent="center"
                ></Modal>
              </Box>
            </Stack>
          </>
        )}
        <Grid
          item
          xs={12}
          md={12}
          sm={12}
          sx={{
            width: giftCard ? "50%" : "",
          }}
          justifyContent="flex-start"
        >
          <CaptchaBox
            giftCard={giftCard}
            isMobile={isMobile}
            captchaRender={captchaRender}
          >
            {captchaRender && captchaClose && (
              <Captcha
                isOnChange={true}
                show={handleShowBal}
                setIsCaptcha={setIsCaptcha}
                giftCard={giftCard}
              ></Captcha>
            )}

            {captchaRender && captchaClose && (
              <button
                style={giftCard ? giftCardSubmitBtn : submitButton}
                onClick={() => {
                  verifyOnSubmit();
                }}
              >
                SUBMIT
              </button>
            )}
          </CaptchaBox>
        </Grid>
        {giftCard ? (
          <>
            {!cookie.get("accessToken") ? (
              <Typography sx={{ fontSize: "14px", color: "#231F20" }}>
                Kindly login to add gift card/e gift voucher balance to your
                wallet
              </Typography>
            ) : (
              (userDataItems?.walletNumber === "na" ||
                !userDataItems?.walletNumber) && (
                <Box>
                  <GiftCardInfoTypography>
                    *Your wallet needs to be activated to add your gift card
                    balance
                  </GiftCardInfoTypography>
                </Box>
              )
            )}
          </>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}
export default Mywallet;
