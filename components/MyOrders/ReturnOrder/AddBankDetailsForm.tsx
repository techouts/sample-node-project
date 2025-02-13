import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import client from "../../../apollo-client";
import { RMA_ADD_BANK_DETAILS } from "../../../graphQLQueries/Orders/Rma";
import TextFieldHOC from "../../../HOC/TextField/TextField";
import { useMobileCheck } from "../../../utility/isMobile";
import {
  ACCOUNT_HOLDER_NAME_TEXT,
  ACCOUNT_NUMBER_TEXT,
  ADD_BANK_DETAILS_TEXT,
  CONFIRM_ACCOUNT_NUMBER_TEXT,
  IFSC_CODE_TEXT,
  MOBILE_NUMBER_TEXT,
  SAVED_BANK_DETAILS_TEXT,
} from "../constant";
import {
  AddButton,
  ButtonsBox,
  CancelTypography,
  MainBox,
  SaveButton,
} from "./ReturnOrderStyled";

let counterId = 0;

const AddBankDetailsForm = (props: any) => {
  const {
    setIsBankDetailsModal,
    editDetails,
    isEdit,
    setTempBankDetails,
    tempBankDetails,
    order_id,
    setBankNumberForCOD,
    setSnackMessage,
    setSnackBarOpen,
    setDisplayLoader,
  } = props;
  const initialValues = {
    name: isEdit ? editDetails?.name : "",
    accountNumber: isEdit ? editDetails?.accountNumber : "",
    confirmAccountNumber: isEdit ? editDetails?.confirmAccountNumber : "",
    IFSCCode: isEdit ? editDetails?.IFSCCode : "",
    mobileNumber: isEdit ? editDetails?.mobileNumber : "",
  };
  const isMobile = useMobileCheck();

  const [values, setValues] = useState(initialValues);
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [isDisabled, setIsDisabled] = useState<boolean | undefined>(true);
  const [isValid, setIsValid] = useState<any>({
    name: false,
    mobileNumber: false,
    accountNumber: false,
    IFSCCode: false,
    confirmAccountNumber: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    name: "Please enter your name. (Your name should not contain any numbers or special characters and should be less than 50 characters).",
    mobileNumber: "Mobile number should contain atleast 10 digits.",
    accountNumber: "Your account number should contains minimum of 1 digit.",
    IFSCCode:
      "IFSC code should contain atleast 4 characters and max 11 characters",
    verify: "Your account number and confirm account number should be same.",
  });

  const [error, setError] = useState({
    name: false,
    accountNumber: false,
    confirmAccountNumber: false,
    verify: false,
    IFSCCode: false,
    mobileNumber: false,
  });
  const handleKeyRestrictions = (event: any) => {
    let key = event.key;
    let keyCharCode = key.charCodeAt(0);

    if (keyCharCode === 32 && !event.target.value.length) {
      event.preventDefault();
    }
  };
  const validate: any = () => {
   return values?.name.length > 0 &&
      values?.name.length < 50 &&
      (values?.accountNumber.length <= 20 && values?.accountNumber.length > 0) &&
      (values?.confirmAccountNumber.length <= 20 && values?.confirmAccountNumber.length > 0) &&
      values?.accountNumber === values?.confirmAccountNumber &&
      values?.IFSCCode.length === 11 &&
      values?.mobileNumber.length === 10;
  };
  useEffect(() => {
    if (isFormTouched) {
      let isValid = Object.values(error).includes(true);
      if (
        (values?.name?.length && values?.IFSCCode && values?.mobileNumber) >
          0 &&
        (values?.accountNumber?.length &&
          values?.confirmAccountNumber?.length) >= 8 &&
        isValid != true &&
        values?.accountNumber === values?.confirmAccountNumber
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [error, isFormTouched, values]);

  const formValidation = (isFormValid: any, id: any) => {
    setError({ ...error, [id]: !isFormValid });
  };

  const handleInputChange = (e: any) => {
    let { name, value } = e?.target;
    setIsFormTouched(true);
    let isFormValid = false;
    //user name validations
    if (name === "name") {
      const splitValue = value?.split(" ");
      const valuesInSplited = splitValue.filter((data: any) => data.length > 0);
      isFormValid =
        value?.match(/^[a-zA-Z ]{0,50}$/) &&
        splitValue?.length >= 2 &&
        valuesInSplited.length &&
        valuesInSplited?.length >= splitValue?.length
          ? true
          : false;

      if (value.match(/^[a-zA-Z ]{0,50}$/) && value?.split(" ")?.length <= 3) {
        setValues({
          ...values,
          [name]: value,
        });
        formValidation(isFormValid, name);
      }
    }
    //accountNumber and confirm account number validations
    if (name === "accountNumber" || name === "confirmAccountNumber") {
      value = e?.target?.value?.replace(/ /g, "");
      value = value.replace(/\D/g, "");
      if (value?.length > 0) {
        value = value.substr(0, 20);
      }
      isFormValid = value?.length >= 1 && /^[0-9]*$/.test(value);
      formValidation(isFormValid, name);
      setValues({
        ...values,
        [name]: value,
      });
    }
    if (name === "confirmAccountNumber") {
      if (values?.accountNumber !== e.target.value?.substr(0, 20)) {
        setError({ ...error, verify: true });
      } else {
        setError({ ...error, verify: false });
      }
    }

    //ifsc code validation
    if (name === "IFSCCode") {
      const pattern = /^[a-zA-Z0-9]+$/;
      if (value && !pattern.test(value)) {
        return;
      }
      const numberCheck = /[0-9]/.test(value);
      const stringCheck = /^\d+$/.test(value);
      isFormValid =
        value.length > 10 && value.length < 13 && numberCheck && !stringCheck;
      formValidation(isFormValid, name);
      setValues({
        ...values,
        [name]: value.toString().slice(0, 11),
      });
    }
    //mobile number validation
    if (name === "mobileNumber") {
      let temp = value.toString().slice(0, 10);
      isFormValid = temp?.length == 10 || temp?.length == 0;
      if (temp?.length <= 10 && temp[0] > 5) {
        formValidation(isFormValid, name);
        setValues({
          ...values,
          [name]: Math.max(0, parseInt(temp)).toString().slice(0, 10),
        });
      } else if (temp?.length == 0) {
        setValues({
          ...values,
          [name]: "",
        });
        formValidation(true, name);
      }
    }
  };
  const formValidationCheck = (updateValid: { [key: string]: boolean }) => {
    setIsValid({
      ...isValid,
      ...updateValid,
    });
  };

  useEffect(() => {
    let updateValid = {};
    Object.entries(values)?.map(([key, value]) => {
      if (value.length > 0) {
        updateValid = {
          ...updateValid,
          [key]: false,
        };
      }
    });
    formValidationCheck(updateValid);
  }, [values]);
  const handleAddBankDetails = () => {
    if (
      values?.name.length == 0 ||
      values?.accountNumber.length == 0 ||
      values?.confirmAccountNumber.length == 0 ||
      values?.IFSCCode.length == 0 ||
      values?.mobileNumber.length == 0
    ) {
      let updateValid = {};
      Object.entries(values)?.map(([key, value]) => {
        if (value.length <= 0) {
          updateValid = {
            ...updateValid,
            [key]: true,
          };
        }
      });
      formValidationCheck(updateValid);
    } else {
      if (validate()) {
        // setDisplayLoader(true);
        setIsBankDetailsModal(false);
        setTempBankDetails([
          ...tempBankDetails,
          {
            id: counterId,
            name: values?.name,
            accountNumber: values?.accountNumber,
            confirmAccountNumber: values?.confirmAccountNumber,
            IFSCCode: values?.IFSCCode,
            mobileNumber: values?.mobileNumber,
          },
        ]);
        counterId++;
        AddNEFTDETAILS(values);
      }
    }
  };
  const handleSaveDetails = () => {
    if (validate()) {
      setIsBankDetailsModal(false);
      const filteredBankDetails = tempBankDetails?.filter(
        (bankDetail: any) => bankDetail.id !== editDetails.id
      );
      setTempBankDetails([
        ...filteredBankDetails,
        {
          name: values?.name,
          accountNumber: values?.accountNumber,
          confirmAccountNumber: values?.confirmAccountNumber,
          IFSCCode: values?.IFSCCode,
          mobileNumber: values?.mobileNumber,
        },
      ]);
      AddNEFTDETAILS(values);
    }
  };
  const AddNEFTDETAILS = (values: any) => {
    setDisplayLoader(true);
    client
      .mutate({
        mutation: RMA_ADD_BANK_DETAILS,
        variables: {
          OrderID: order_id,
          AccountHolderName: values?.name,
          AccountHolderIFSC: values?.IFSCCode,
          AccountHolderAccNum: values?.accountNumber,
          AccountHolderConfirmAccNum: values?.confirmAccountNumber,
          AccountHolderMobNum: values?.mobileNumber,
        },
      })
      .then((res) => {
        if (res?.data?.AddBankDetails.status) {
          setBankNumberForCOD(res?.data?.AddBankDetails?.reference_number);
        }
        setSnackBarOpen(true);
        setSnackMessage(
          isEdit ? SAVED_BANK_DETAILS_TEXT : ADD_BANK_DETAILS_TEXT
        );
      })
      .catch((err) => console.log("err", err))
      .finally(() => setDisplayLoader(false));
  };

  const handleCancel = () => {
    setIsBankDetailsModal(false);
  };
  return (
    <>
      <MainBox isMobile={isMobile}>
        <Typography> {isEdit ? "Edit" : "Add"} Bank Details</Typography>
        <Box sx={{ paddingTop: isMobile ? "25px" : "32px" }}>
          <TextFieldHOC
            border="unset"
            borderRadius="0px"
            TextFieldHeight="49px !important"
            id="outlined-basic"
            label="Account Holder Name"
            variant="outlined"
            value={values?.name}
            name="name"
            error={error?.name}
            helperText={error?.name && errorMessage?.name}
            required
            onChange={handleInputChange}
            InputLabelPropsColor="#A7A5A6"
            onKeyDown={handleKeyRestrictions}
            maxLength="10"
          />
          {isValid.name && (
            <Typography sx={{ fontSize: "14px", color: "#AD184C" }}>
              {ACCOUNT_HOLDER_NAME_TEXT}
            </Typography>
          )}
        </Box>
        <Box sx={{ paddingTop: "16px" }}>
          <TextFieldHOC
            border="unset"
            borderRadius="0px"
            TextFieldHeight="49px"
            id="outlined-basic"
            label="Account Number "
            variant="outlined"
            value={values?.accountNumber}
            name="accountNumber"
            error={error?.accountNumber}
            helperText={error?.accountNumber && errorMessage?.accountNumber}
            required
            onChange={handleInputChange}
            InputLabelPropsColor="#A7A5A6"
          />
          {isValid.accountNumber && (
            <Typography sx={{ fontSize: "14px", color: "#AD184C" }}>
              {ACCOUNT_NUMBER_TEXT}
            </Typography>
          )}
        </Box>
        <Box sx={{ paddingTop: "16px" }}>
          <TextFieldHOC
            border="unset"
            borderRadius="0px"
            TextFieldHeight="49px"
            id="outlined-basic"
            label="Confirm Account Number "
            variant="outlined"
            value={values?.confirmAccountNumber}
            error={error?.verify}
            helperText={error?.verify && errorMessage?.verify}
            required
            name="confirmAccountNumber"
            onChange={handleInputChange}
            InputLabelPropsColor="#A7A5A6"
          />
          {isValid.confirmAccountNumber && (
            <Typography sx={{ fontSize: "14px", color: "#AD184C" }}>
              {CONFIRM_ACCOUNT_NUMBER_TEXT}
            </Typography>
          )}
        </Box>
        <Box sx={{ paddingTop: "16px" }}>
          <TextFieldHOC
            border="unset"
            borderRadius="0px"
            TextFieldHeight="49px"
            id="outlined-basic"
            label="Bank IFSC Code"
            variant="outlined"
            value={values?.IFSCCode}
            error={error?.IFSCCode}
            helperText={error?.IFSCCode && errorMessage?.IFSCCode}
            required
            name="IFSCCode"
            onChange={handleInputChange}
            InputLabelPropsColor="#A7A5A6"
          />
          {isValid.IFSCCode && (
            <Typography sx={{ fontSize: "14px", color: "#AD184C" }}>
              {IFSC_CODE_TEXT}
            </Typography>
          )}
        </Box>
        <Box sx={{ paddingTop: "16px" }}>
          <TextFieldHOC
            border="unset"
            borderRadius="0px"
            TextFieldHeight="49px"
            id="outlined-basic"
            label="Mobile Number"
            variant="outlined"
            value={values?.mobileNumber}
            error={error?.mobileNumber}
            helperText={error?.mobileNumber && errorMessage?.mobileNumber}
            required
            name="mobileNumber"
            onChange={handleInputChange}
            InputLabelPropsColor="#A7A5A6"
            sx={{
              "&.MuiFormHelperText-root": {
                marginLeft: "50px",
              },
            }}
          />
          {isValid.mobileNumber && (
            <Typography sx={{ fontSize: "14px", color: "#AD184C" }}>
              {MOBILE_NUMBER_TEXT}
            </Typography>
          )}
        </Box>
        <ButtonsBox isMobile={isMobile} isEdit={isEdit}>
          {isEdit ? (
            <>
              <SaveButton isMobile={isMobile} onClick={handleSaveDetails}>
                SAVE
              </SaveButton>
              <CancelTypography isMobile={isMobile} onClick={handleCancel}>
                CANCEL
              </CancelTypography>
            </>
          ) : (
            <AddButton isMobile={isMobile} onClick={handleAddBankDetails}>
              ADD
            </AddButton>
          )}
        </ButtonsBox>
      </MainBox>
    </>
  );
};

export default AddBankDetailsForm;