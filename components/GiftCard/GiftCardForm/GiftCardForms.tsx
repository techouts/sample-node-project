import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  AmountNote,
  ChooseAmount,
  Choosingamount,
  FromSenderStyle,
  Giftcards,
  GiftFormMainBox,
  Heading,
  Headingtwo,
  Helptext,
  Images,
  Importantnote,
  Note,
  PleaseNote,
  Preview,
  ProceedPayButton,
  Selectamount,
  StyledBox,
  StyledCloseicon,
  Styleddate,
  Stylednames,
  Styledpoints,
  StyledTextFiled,
  StyledTextFiledtwo,
  Text,
  TitleImage,
  AmounthelperText,
} from "./GiftCardFormsStyled";
import { useMobileCheck } from "../../../utility/isMobile";
import { ModalBox } from "../GiftCardStyle";
import client from "../../../apollo-client";
import { AddEGVToCartQuery } from "../../../graphQLQueries/giftCard/giftCardQuery";
import { fetchCartDetails } from "../../../api/Cart/CustomerCart";
import { useRecoilState } from "recoil";
import { cartState, userState } from "../../../recoilstore";
import triggerGAEvent from "../../../utility/GaEvents";
import { toast } from "../../../utility/Toast";
import handleErrorResponse from "../../../utility/ErrorHandling";

const FormList = require("../../../JSON/BeautyGiftCard.json");

const GiftCardForms = ({
  amountTitle,
  formTitle,
  senderTitle,
  senderBottomText,
  previewTitle,
  pleaseNoteText,
  previewInnerSubText,
  expireDate,
  giftCardno,
  previewLogoUrl,
  amountList,
  form_List,
  form_List_Two,
  setOpen,
  open,
  selectedImage,
  setLoader,
  croppedImage,
  setCroppedImage,
}: any) => {
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [base64Image, setBase64Image] = useState<any>("");
  const [amount, setAmount] = useState<any>();
  const [formData, setFormData] = useState<any>({
    receivers_email: "",
    receivers_confirm_email: "",
    receivers_name: "",
    senders_name:
      (userDataItems?.customerName && userDataItems?.customerName) || "",
    senders_email:
      (userDataItems?.userEmail && userDataItems?.userEmail) || "",
  });

  useEffect(() => {
    setFormData({...formData,senders_name:
      userDataItems?.customerName ? userDataItems?.customerName : "",
    senders_email:
      userDataItems?.userEmail ? userDataItems?.userEmail : "",})
  },[userDataItems])

  const [errors, setErrors] = useState<any>({
    receivers_email_error: false,
    receivers_confirm_email_error: false,
    receivers_name_error: false,
    senders_name_error: false,
    senders_email_error: false,
  });

  const [textAreaCount, setTextAreaTotal] = useState("");
  const [flag, setFlag] = React.useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const recalculate = (e: any) => {
    setTextAreaTotal(e.target.value);
  };
  const handleClick = () => {
    setFlag(!flag);
  };
  useEffect(() => {
    if (
      formData.receivers_email &&
      formData.receivers_confirm_email &&
      formData.receivers_email != formData.receivers_confirm_email
    ) {
      setErrors({ ...errors, receivers_confirm_email_error: true });
    } else {
      if (errors.receivers_confirm_email_error) {
        setErrors({ ...errors, receivers_confirm_email_error: false });
      }
    }
  }, [formData.receivers_email, formData.receivers_confirm_email]);

  useEffect(() => {
    if (selectedImage) {
      let image = selectedImage.toString();
      let blob = new Blob([image]);
      let url = URL.createObjectURL(blob);
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          let fr = new FileReader();
          fr.onload = () => {
            let b64 = fr.result;
            if (b64) {
              setBase64Image(b64);
            }
          };
          fr.readAsDataURL(blob);
        });
    }
  }, [selectedImage]);
  const isMobile = useMobileCheck();
  function handleValidation(
    val: string,
    name: string,
    id: number,
    validationType?: string,
    arr?: any,
    compare_name: string = ""
  ) {
    if (name == "receivers_name" || name == "senders_name") {
      const pattern = /^[A-Za-z][a-zA-z ]*$/;
      if (!pattern.test(val) && val.length >= 1) {
        console.log("failed");
        return;
      }

      if (val?.split(" ")?.length < 3) {
        setFormData({ ...formData, [name]: val });
      }
      if (
        val.trim().match(/^[^\s].+\w+\s+\w+$/) &&
        val?.split(" ")?.length >= 2
      ) {
        setErrors({ ...errors, [`${name}_error`]: false });
      } else {
        setErrors({ ...errors, [`${name}_error`]: true });
      }
    }
    const receiversEmail = "receivers_email";
    const sendersEmail = "senders_email";
    const receiversConfirmEmail = "receivers_confirm_email";

    if (name == receiversEmail ||
    name == sendersEmail ||
    name == receiversConfirmEmail) {
      const pattern = /^[a-z0-9@.]*$/;
      if (pattern.test(val)) {
        setFormData({ ...formData, [name]: val.toLowerCase() });
        if (name == receiversEmail || name == sendersEmail) {
          const emailPattern = /^([a-z0-9]+\.?[a-z0-9]+)+@([\w-]+\.)+[\w-]{1,5}$/;
          setErrors({ ...errors, [`${name}_error`]: !emailPattern.test(val) });
        }
      }
    }
    
  }

  const handleModalClose = () => {
    setOpen(false);
    setCroppedImage("");
    setBase64Image("");
    setAmount(undefined);
    setFormData({
      receivers_email: "",
      receivers_confirm_email: "",
      receivers_name: "",
      senders_name:
        (userDataItems?.customerName && userDataItems?.customerName) || "",
      senders_email:
        (userDataItems?.customerName && userDataItems?.userEmail) || "",
    });
  };
  const handleProceedToPay = () => {
    setLoader(true);
    callProceedPay();
    if (
      amount &&
      formData?.receivers_name &&
      textAreaCount &&
      formData?.receivers_email &&
      formData?.senders_email &&
      formData?.senders_name &&
      selectedImage
    ) {
      client
        .mutate({
          mutation: AddEGVToCartQuery,
          fetchPolicy: "no-cache",
          variables: {
            price: Number(amount),
            fullName: formData?.receivers_name,
            email: formData?.receivers_email,
            telephone: localStorage.getItem("mobileNumber"),
            message: textAreaCount,
            senderName: formData?.senders_name,
            senderEmail: formData?.senders_email,
            sku: "gcecom1",
            image:
              (croppedImage.length > 0 && croppedImage) ||
              (base64Image && base64Image),
          },
        })
        .then(async (response: any) => {
          const hasError =    handleErrorResponse(response?.data?.AddEGVToCart.status) //response checking
          if (hasError) return null;
          if (response?.data?.AddEGVToCart.status.toLowerCase() == "success") {
            const egvCartId = response?.data?.AddEGVToCart?.cartID;
            const cartData = await fetchCartDetails(egvCartId);
            if (cartData?.data?.cart?.items?.length > 0) {
              localStorage.setItem("BuyNowCartID", egvCartId);
              localStorage.setItem("retryFlowCartID", egvCartId);
              setCartStore((previousData) => ({
                ...previousData,
                cartItems: cartData?.data?.cart,
              }));
              window.location.assign(`${window.location.origin}/cart/payment`);
            }
          }
          if (response?.data?.AddEGVToCart.status.toLowerCase() == "error") {
            console.log(response?.data?.AddEGVToCart.status, "EGV Cart Error");
          }
          setLoader(false);
        })
        .catch((err: any) => {
          console.log("error", err);
          toast.error("Someting went wrong, Please try again!!!");
          setLoader(false);
        });
    }
  };
  useEffect(() => {
    if (
      amount >= 500 &&
      amount <= 10000 &&
      formData?.receivers_name &&
      textAreaCount &&
      formData?.receivers_email &&
      formData?.senders_email &&
      formData?.senders_name &&
      !errors?.receivers_email_error &&
      !errors?.receivers_confirm_email_error &&
      !errors?.receivers_name_error &&
      !errors?.senders_name_error &&
      !errors?.senders_email_error
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [
    amount,
    formData?.receivers_name,
    textAreaCount,
    formData?.receivers_email,
    formData?.senders_email,
    formData?.senders_name,
    errors?.receivers_email_error,
    errors?.receivers_confirm_email_error,
    errors?.receivers_name_error,
    errors?.senders_name_error,
    errors?.senders_email_error,
  ]);
  //click event for proceed to pay
  const callProceedPay = () => {
    triggerGAEvent(
      {
        event_type: "gift_card_Creation",
        widget_title: "Choose An Amount",
        link_url: "",
        link_text: " PROCEED TO PAY",
        item_name: "<item_name>",
      },
      "click"
    );
  };
  return (
    <>
      <Modal
        sx={{
          overflowY: "scroll",
          height: "100%",
        }}
        open={open}
        hideBackdrop={true}
      >
        <ModalBox>
          <Typography
            sx={{
              top: "180px",
              left: "5%",
              position: "absolute",
              display: { xs: "none", sm: "flex" },
            }}
          >
            {" "}
            &#8377;
          </Typography>
          <GiftFormMainBox>
            <StyledCloseicon>
              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={handleModalClose}
              />
            </StyledCloseicon>
            <ChooseAmount>{amountTitle}</ChooseAmount>
            <Box sx={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                display={{ xs: "inline", sm: "none" }}
                paddingRight={"10px"}
              >
                &#8377;
              </Typography>
              <Box width="100%">
                <input
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onKeyDown={(event: any) => {
                    ["e", "E", "+", "-", "."]?.includes(event.key) &&
                      event.preventDefault();
                  }}
                  onChange={(e: any) => {
                    if (e?.target?.value > 10000) {
                      e.preventDefault();
                    } else setAmount(e?.target?.value?.replace(/[^0-9]*/g, ""));
                  }}
                  min="500"
                  max="10000"
                  style={{
                    fontSize: isMobile ? "12px" : "16px",
                    fontWeight: "500",
                    textAlign: "center",
                    marginTop: "3px 0px",
                    width: isMobile ? "156px" : "199px",
                    height: isMobile ? "45px" : "64px",
                  }}
                ></input>
                {amount && (amount < 500 || amount > 10000) && (
                  <AmounthelperText>
                    The Minimum EGV amount should be 500 and Maximum amount
                    should be 10000
                  </AmounthelperText>
                )}
                <Choosingamount>
                  {amountList?.map((item: any, id: number) => (
                    <Selectamount
                      key={id}
                      onClick={() => {
                        setAmount(item?.Text);
                      }}
                    >
                      &#8377;{item.Text}
                    </Selectamount>
                  ))}
                </Choosingamount>
              </Box>
            </Box>
            <>
              <Grid container gap={"10px"} justifyContent={"space-between"}>
                <Grid lg={5.5} sm={12} md={4} xs={12}>
                  <Heading>{formTitle}</Heading>
                  <StyledBox>
                    {FormList?.form_List?.map((item: any, id: number) => (
                      <StyledTextFiled
                        required={item?.isRequired}
                        fullWidth
                        key={id}
                        id="outlined-number"
                        label={item?.placeHolder}
                        value={formData[item?.name]}
                        name={item?.name}
                        helperText={
                          errors[`${item?.name}_error`]
                            ? item?.errorMessage || "invalid data"
                            : ""
                        }
                        type={item?.type}
                        rows={6}
                        onChange={(e) => {
                          handleValidation(
                            e.target.value,
                            item?.name,
                            id,
                            item?.validationType,
                            errors,
                            item?.compare_name
                          );
                        }}
                        error={errors[`${item?.name}_error`]}
                        aria-label={`input-${item?.label}`}
                      />
                    ))}
                  </StyledBox>
                  <StyledTextFiled
                    multiline
                    rows={6}
                    aria-label="maximum height"
                    onChange={recalculate}
                    label="Your Message"
                    inputProps={{ maxLength: 300 }}
                    style={{
                      width: "100%",
                      resize: "none",
                      marginTop: "31px",
                    }}
                  />
                  <Typography style={{ color: "#A7A5A6", fontSize: "14px" }}>
                    {300 - textAreaCount.length} characters left
                  </Typography>
                  <Headingtwo>{senderTitle}</Headingtwo>
                  {FormList?.form_List_Two?.map((item: any, id: number) => (
                    <StyledTextFiledtwo
                      required={item?.isRequired}
                      fullWidth
                      key={id}
                      value={formData[item?.name]}
                      id="outlined-number"
                      label={item?.placeHolder}
                      name={item?.name}
                      helperText={
                        errors[`${item?.name}_error`]
                          ? item?.errorMessage || "invalid data"
                          : ""
                      }
                      type={item?.type}
                      rows={6}
                      onChange={(e) => {
                        handleValidation(
                          e.target.value,
                          item?.name,
                          id,
                          item?.validationType,
                          errors,
                          item?.compare_name
                        );
                      }}
                      error={errors[`${item?.name}_error`]}
                      aria-label={`input-${item?.label}`}
                    />
                  ))}
                  <Helptext>{senderBottomText}</Helptext>
                </Grid>
                <Grid lg={5.5} sm={12} md={6} xs={12}>
                  <Preview>{previewTitle}</Preview>
                  <Card
                    sx={{
                      border: "1px solid #A7A5A6",
                      boxShadow: "none",
                      borderRadius: "0",
                    }}
                  >
                    <CardContent>
                      <TitleImage>
                        <img
                          src={previewLogoUrl}
                          alt="none"
                          width="125px"
                          height="30px"
                        />
                      </TitleImage>
                      <Importantnote>
                        {`Hi ${formData?.["receivers_name"] || "Receiver"}`},
                      </Importantnote>
                      <Importantnote
                        dangerouslySetInnerHTML={{
                          __html: previewInnerSubText,
                        }}
                      />
                      <Text>
                        {textAreaCount.length ? textAreaCount : "Your Message"}
                      </Text>
                      {(croppedImage?.length > 0 ||
                        selectedImage?.length > 0) && (
                        <Images isMobile={isMobile}>
                          <img
                            src={croppedImage || selectedImage}
                            alt="none"
                            style={{
                              width: isMobile ? "280px" : "360px",
                              height: isMobile ? "180px" : "240px",
                              borderRadius: "20px",
                            }}
                          />
                        </Images>
                      )}
                      <Giftcards>
                        <FromSenderStyle>
                          <Stylednames>From:</Stylednames>
                          <Note>{formData?.["senders_name"] || "Sender"}</Note>
                        </FromSenderStyle>
                        <Grid sx={{ textAlign: "center" }}>
                          <Importantnote>{giftCardno}</Importantnote>
                          <AmountNote>
                            Gift Amount: Rs {amount ? `${amount}` : "0"}
                          </AmountNote>
                          <Styleddate>{expireDate}</Styleddate>
                        </Grid>
                      </Giftcards>
                    </CardContent>
                  </Card>
                  <PleaseNote>Please Note:</PleaseNote>
                  <Styledpoints
                    dangerouslySetInnerHTML={{ __html: pleaseNoteText }}
                  />
                </Grid>
                <ProceedPayButton
                  onClick={() => {
                    handleProceedToPay();
                  }}
                  disabled={isDisabled}
                >
                  PROCEED TO PAY
                </ProceedPayButton>
              </Grid>
            </>
          </GiftFormMainBox>
        </ModalBox>
      </Modal>
    </>
  );
};
export default GiftCardForms;
