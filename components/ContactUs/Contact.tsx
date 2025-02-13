import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import SelectDropDown from "../../HOC/SelectDropDown/SelectDropDown";
import ContactusSchema, {
  CONTACT_ITEM,
  LIST_ITEM,
} from "../../schemas/ContactusSchema";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { event_type } from "../../utility/GAConstants";
import { toast } from "../../utility/Toast";
import {
  HeaderTitle,
  SubText,
  Selectbox,
  ColumnStack,
  StyledHeading,
  HelperText,
  StyledTextFiled,
  SubmitButton,
  SubmitTitle,
  StyledContent,
  LetterCount,
} from "./ContactUsStyle";
import { useMobileCheck } from "../../utility/isMobile";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import Captcha from "../MyWallet/CaptchaCode";
import { saveContactUsInfo } from "../../graphQLQueries/ContactUs";
import client from "../../apollo-client";
import triggerGAEvent from "../../utility/GaEvents";
import handleErrorResponse from "../../utility/ErrorHandling";
import Loader from "../../HOC/Loader/Loader";
import {
  ACCEPT_ONLY_NUMBERS,
  handleKeyDownTextField,
  validateFirstName,
  validateLastName,
} from "./contactusUtils";
const Contact = ({
  bgPadding,
  title,
  subText,
  formTitle,
  ctaLabel,
  caution_note,
  contactDetails,
  formList,
  __component,
}: ContactusSchema) => {
  const isMobile = useMobileCheck();
  const [formData, setFormData] = useState<any>({});
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState(
    "Your form submitted successfully!!"
  );
  const [isContactvalid, setIsContactvalid] = useState(false);
  const [firstTimeCaptcha, setFirstTimeCaptcha] = useState<any>(false);
  const [isCaptcha, setIsCaptcha] = useState(false);
  const [submitvalid, setsubmitvalid] = useState(true);
  const checkFontSize = isMobile ? "0.8rem" : "1rem";
  const [displayLoader, setLoader] = useState(false);
  const [errorsData, setErrorsData] = useState<any>({});

  useEffect(() => {
    let errorObject: any = {};
    formList?.map((list) => {
      errorObject[list?.name || ""] = {
        error: false,
        message: list?.errorMessage || "Invalid Data",
        type: list?.validationType,
      };
    });
    setErrorsData(errorObject);
  }, [formList]);

  const handleSelectedValue = (val: string, name: string) => {
    setFormData({ ...formData, [name]: val });
  };

  const isDisabled = useMemo(() => {
    let checkOrderNO = false;
    if (formData?.category === "Post-Order") {
      checkOrderNO = true;
    } else {
      if (formData["order_no"]?.length > 0) checkOrderNO = true;
    }

    let finalCheck =
      Object.keys(formData)?.length >= (checkOrderNO ? 9 : 8) &&
      !Object.values(errorsData).some((item: any) => item.error === true);
    if (
      formData?.category === "Post-Order" &&
      Object.values(formData).some((value) => value === "")
    ) {
      finalCheck = false;
    }
    return finalCheck;
  }, [formData, errorsData]);

  useEffect(() => {
    if (formData?.order_no === "" && formData?.category !== "Post-Order") {
      handleErrors("order_no", false);
    } else if (!formData?.order_no && formData?.category === "Order Related") {
      handleErrors("order_no", true);
    } else {
      handleErrors("order_no", false);
    }
  }, [formData]);

  function mobileFun(name: any, val: any) {
    let value = val;
    if (name === "mobile_no") {
      value = value?.replace(/\D/g, "");
      let numpattern = /^[6-9]\d{0,10}$/;
      if (value?.length <= 10 && value[0] > 5) {
        setFormData({ ...formData, [name]: value });
      } else if (value?.length == 0) {
        setFormData({ ...formData, [name]: "" });
      }
      if (value.length >= 10 && val?.match(numpattern)) {
        handleErrors(name, false);
      } else {
        handleErrors(name, true);
      }
    }
  }
  function emailFun(name: any, val: any) {
    if (name === "emailId") {
      setFormData({ ...formData, [name]: val });
      let pattern = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
      if (val?.match(pattern)) {
        handleErrors(name, false);
      } else if (val === "") {
        handleErrors(
          name,
          true,
          formList?.find((i: any) => i?.name === name)?.errorMessage
        );
      } else {
        handleErrors(name, true, "Provide a valid email-id");
      }
    }
  }

  function handleErrors(name: string, error: boolean, message?: string) {
    setErrorsData((prev: any) => {
      return {
        ...prev,
        [name]: {
          ...prev?.[name],
          error: error,
          message: message ? message : prev?.[name]?.message,
        },
      };
    });
  }

  //CONTACT-US VALIDATION
  function handleValidation(
    val: any,
    name: string,
    id: number,
    validationType?: string,
    // arr?: any,
    maxLength?: number
  ) {
    switch (validationType) {
      case "firstName":
        {
          const isFirstNameValid = validateFirstName(val);
          if (isFirstNameValid || val === "") {
            const valArr = val?.split(/\s+/);
            let firstNameVal = "";
            if (valArr?.length >= 1 && valArr?.length <= 3) {
              firstNameVal = valArr?.join(" ");
            } else if (valArr?.length > 3) {
              firstNameVal = valArr?.join(" ")?.trim();
            }
            setFormData({ ...formData, [name]: firstNameVal });
          }
          if (isFirstNameValid) {
            handleErrors(name, false);
          } else {
            handleErrors(name, true);
          }
        }
        break;
      case "lastName":
        {
          const isLastNameValid = validateLastName(val);
          if (isLastNameValid || val === "") {
            setFormData({ ...formData, [name]: val?.trim() });
          }
          if (isLastNameValid) {
            handleErrors(name, false);
          } else {
            handleErrors(name, true);
          }
        }
        break;
      case "mobile":
        {
          mobileFun(name, val);
        }
        break;
      case "email":
        {
          emailFun(name, val);
        }
        break;
      case "orderNo":
        {
          const orderNumber = val?.toUpperCase()?.trim();
          let pattern = /^(U_SSB_\d+|SSBS_\d+|SSB_\d+)$/;
          setFormData({ ...formData, [name]: orderNumber });
          if (formData?.category === "Post-Order" && orderNumber === "") {
            if (pattern?.test(orderNumber)) {
              handleErrors(name, false);
            } else if (orderNumber === "") {
              handleErrors(
                name,
                true,
                formList?.find((i: any) => i?.name === name)?.errorMessage
              );
            } else {
              handleErrors(name, true, "Provide a valid order number");
            }
          } else {
            if (pattern?.test(val?.trim())) {
              handleErrors(name, false);
            } else {
              handleErrors(name, true, "Provide a valid order number");
            }
          }
        }
        break;
      case "multiline":
        {
          if (val?.split("")?.length <= (maxLength || 300)) {
            setFormData({ ...formData, [name]: val });
          }
          if (val?.length == 0) {
            handleErrors(name, true);
          } else {
            handleErrors(name, false);
          }
        }
        break;
      default: {
        setFormData({ ...formData, [name]: val });
        handleErrors(name, false);
      }
    }
  }

  const handleFormSubmits = () => {
    setsubmitvalid(false);
    if (firstTimeCaptcha === true) {
      handleShowBal();
    } else {
      setIsContactvalid(true);
    }
  };

  const handleShowBal = async () => {
    setIsContactvalid(false);
    setsubmitvalid(true);
    setFormData({});
    setFirstTimeCaptcha(true);
    setLoader(true);
    await client
      .mutate({
        mutation: saveContactUsInfo,
        variables: {
          firstname: formData?.first_name,
          lastname: formData?.last_name,
          emailid: formData?.emailId,
          phoneNumber: formData?.mobile_no.toString(),
          category:
            formList
              ?.find((i) => i?.name === "category")
              ?.list?.find((i) => i?.value === formData?.category)
              ?.CategoryId ?? "",
          subCategory:
            formList
              ?.find((i) => i?.name === "subCategory")
              ?.list?.find((i) => i?.value === formData?.subCategory)
              ?.CategoryId ?? "",
          orderNumber: formData?.order_no?.toString() || "",
          comment: formData?.comment,
          caseorigin: "web",
          title: formData?.title,
        },
      })
      .then((response: any) => {
        setLoader(false);
        const hasError = handleErrorResponse(response); //response checking
        if (hasError) return null;
        if (response?.data?.saveContactUsInfo?.status !== "true") {
          setSnackBarMessage(response?.data?.saveContactUsInfo?.message);
        }
        return response;
      })
      .catch((error: any) => {
        setSnackBarMessage("Failed to submit your query, Please try again!!!");
        toast.error("Something went wrong, Please try again!!!");
        console.log("error!!!!", error);
      })
      .finally(() => {
        setLoader(false);
        setSnackBarOpen(true);
      });
  };

  const gaTriggerEvent = (linktext: string) => {
    triggerGAEvent(
      {
        event_type: event_type,
        widget_title: __component,
        link_url: "na",
        link_text: linktext,
        item_name: formData?.comment,
        Item_category: "na",
      },
      "click"
    );
  };

  function submitValidWithCaptcha() {
    if (submitvalid) {
      handleFormSubmits();
    } else {
      if (isCaptcha) {
        handleShowBal();
      } else {
        return "";
      }
    }
  }

  return (
    <Box p={bgPadding}>
      {displayLoader && <Loader />}
      <CustomSnackBar
        snackBarOpen={snackBarOpen}
        setSnackBarOpen={setSnackBarOpen}
        snackMessage={snackBarMessage}
      />
      <Box>
        {!isMobile && <HeaderTitle>{title}</HeaderTitle>}
        <SubText>{subText}</SubText>
      </Box>
      <Grid
        container
        columnSpacing={8}
        flexDirection={isMobile ? "column-reverse" : "row"}
      >
        <Grid item xs={12} sm={12} md={4.5} lg={4.5}>
          <ColumnStack>
            {contactDetails?.map((contact: CONTACT_ITEM) => (
              <Box key={contact?.header}>
                <StyledHeading>{contact?.header}</StyledHeading>
                <StyledContent
                  dangerouslySetInnerHTML={{ __html: contact?.details }}
                />
              </Box>
            ))}
          </ColumnStack>
        </Grid>
        <Divider orientation="vertical" flexItem></Divider>
        <Grid item xs={12} sm={12} md>
          <Box>
            <SubmitTitle>{formTitle}</SubmitTitle>
            <Grid
              container
              rowSpacing={isMobile ? 2 : 4}
              columnSpacing={isMobile ? 1 : 3}
            >
              {formList?.map((item: LIST_ITEM, id: number) => (
                <Grid item xs={item?.xs} md={item?.md} key={item?.name}>
                  {item?.input_type === "text" ? (
                    <>
                      <StyledTextFiled
                        inputProps={{ pattern: ["/d*"] }}
                        InputLabelProps={{
                          style: { fontSize: checkFontSize },
                        }}
                        required={
                          item?.name === "order_no"
                            ? formData?.category === "Post-Order"
                            : item?.isRequired
                        }
                        fullWidth
                        label={item?.label}
                        name={item?.name}
                        helperText={
                          errorsData[`${item?.name}`]?.error
                            ? errorsData[`${item?.name}`]?.message ||
                              item?.errorMessage
                            : ""
                        }
                        type={item?.type}
                        multiline={item?.validationType === "multiline"}
                        rows={item?.validationType === "multiline" ? 6 : 1}
                        value={formData?.[item?.name] || ""}
                        onKeyDown={(event) => {
                          handleKeyDownTextField({
                            event: event,
                            type: item?.validationType,
                          });
                        }}
                        onChange={(e) =>
                          handleValidation(
                            e.target.value,
                            item?.name,
                            id,
                            item?.validationType,
                            // errors,
                            item?.maxLength
                          )
                        }
                        error={errorsData[`${item?.name}`]?.error}
                        aria-label={`input-${item?.label}`}
                      />
                      {item?.helperText && (
                        <LetterCount>{item?.helperText}</LetterCount>
                      )}
                      {item?.validationType === "multiline" && (
                        <LetterCount>{`${
                          0 + (formData?.[item?.name]?.length || 0)
                        }/${item?.maxLength}`|| 0}</LetterCount>
                      )}
                    </>
                  ) : (
                    <Selectbox key={item?.name}>
                      <SelectDropDown
                        // helperText={errors[id] && "invalid data"}
                        list={
                          item?.name == "category"
                            ? item?.list
                            : item?.list?.filter(
                                (li) => li?.group == formData?.["category"]
                              )
                        }
                        placeholders={item?.placeholder}
                        label={item?.label}
                        handleSelectedValue={(e: any) =>
                          handleSelectedValue(e, item?.name)
                        }
                        value={
                          Object?.keys(formData)?.length === 0 &&
                          !formData?.[item?.name]
                            ? ""
                            : formData?.[item?.name]
                        }
                        icon={<ArrowDropDownIcon />}
                      />
                    </Selectbox>
                  )}
                </Grid>
              ))}
            </Grid>
            <HelperText>{caution_note}</HelperText>
            {isContactvalid && (
              <Box pb={isMobile ? 1 : 2}>
                <Captcha
                  show={() => {}}
                  setIsCaptcha={setIsCaptcha}
                  iscontactus={true}
                />
              </Box>
            )}
            <SubmitButton
              disabled={!isDisabled}
              onClick={() => {
                submitValidWithCaptcha();
                gaTriggerEvent(ctaLabel);
              }}
            >
              {ctaLabel}
            </SubmitButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Contact;
