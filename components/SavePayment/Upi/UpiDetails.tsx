import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import client from "../../../apollo-client";
import { VERIFY_UPI } from "../../../graphQLQueries/PaymentQuery";
import {
  TypographyUpiDemo,
  InputLabelData,
  AddButton,
  TypographyTitle,
  TypographyUpiInfo,
  ChildGrid,
} from "./UpiStyles";
import Loader from "../../../HOC/Loader/Loader";
import { SET_UPI_DATA } from "../../../graphQLQueries/SavedPayments";
import { CustomSnackBar } from "../../../HOC/CustomSnackBar/CustomSnackBar";
import {
  EXISTING_UPIID_ERROR,
  INVALID_UPI_ID,
  SAVED_PAYMENTS,
  UPI_ID_MUTATION_ERROR,
} from "../constants";
import { callUpiDetailsEvent } from "../SavedPayAnalytics";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useMobileCheck } from "../../../utility/isMobile";
import { CustomCheckBox } from "../../../utility/CheckBoxUtility";
import handleErrorResponse from "../../../utility/ErrorHandling";

function UpiDetails({
  data,
  handleDefaultValue,
  UpihandleClose,
  ToggleHandler,
  isDefault,
  handleDefaultValueFalse,
  HandleSnackBar,
  logo,
  cartItems,
}: any) {
  //mutations
  const [displayLoader, setLoader] = useState(false);
  const [match, setMatch] = useState("");
  const [failed, setFailed] = useState(false);
  const [upiErrorMessage, setUpiErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState<boolean | undefined>(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const isMobile = useMobileCheck();
  const matchUpi = async () => {
    if (matches.test(match)) {
      setLoader(true);
      await client
        .mutate({
          mutation: VERIFY_UPI,
          variables: {
            input: match,
          },
        })
        .then((response: any) => {
          const hasError =    handleErrorResponse(response?.data?.validateVPA?.status) //response checking
          if (hasError) return null;
          if (response?.data?.validateVPA?.status === "VALID") {
            setIsDisabled(true);
            client
              .mutate({
                mutation: SET_UPI_DATA,
                variables: {
                  upiId: response?.data?.validateVPA?.vpa,
                  isDefault: isDefault,
                },
                fetchPolicy: "no-cache",
              })
              .then((response: any) => {
                const hasError =    handleErrorResponse(response?.data?.SaveCustomerUpiId) //response checking
                if (hasError) return null;
                if (response?.data?.SaveCustomerUpiId?.status === false) {
                  setLoader(false);
                  setUpiErrorMessage(EXISTING_UPIID_ERROR);
                  setIsDisabled(false);
                } else {
                  UpihandleClose();
                  ToggleHandler();
                  setUpiErrorMessage("");
                  setFailed(false);
                  setLoader(true);
                  HandleSnackBar("Your UPI added successfully");
                  callUpiDetailsEvent(cartItems, data, "UPI added");
                }
              });
            setFailed(false);
          } else {
            setFailed(true);
            setLoader(false);
            setUpiErrorMessage("");
          }
        })
        .catch((error: any) => {
          console.log(error);
          setSnackBarOpen(true);
          UpihandleClose();
        });
    } else {
      setFailed(true);
      setLoader(false);
    }
  };
  const matches = /[a-zA-Z0-9_]{3,}@[a-zA-Z]{3,}/;
  return (
    <>
      {displayLoader && <Loader />}
      <Grid container>
        <CustomSnackBar
          snackBarOpen={snackBarOpen}
          setSnackBarOpen={setSnackBarOpen}
          snackMessage={UPI_ID_MUTATION_ERROR}
        />
        {isMobile && (
          <Box
            onClick={() => {
              UpihandleClose();
              ToggleHandler();
            }}
            sx={{
              color: "#AD184C",
              margin: "20px 15px 0px 12px",
              cursor: "pointer",
              display: "flex",
            }}
          >
            <ArrowBackIosNewIcon
              sx={{
                fontSize: "16px",
                marginRight: "5px",
                marginTop: "3px",
              }}
              fontSize="medium"
            ></ArrowBackIosNewIcon>
            <Typography
              sx={{
                fontSize: "16px",
              }}
            >
              {SAVED_PAYMENTS}
            </Typography>
          </Box>
        )}
        <ChildGrid item lg={12} md={12} sm={12} xs={12} p={data?.bgPadding}>
          <TypographyTitle>{data?.title}</TypographyTitle>
          <Grid item lg={10} md={10} sm={10} xs={10} pt={1} pb={0} pr={1}>
            <img src={logo} alt="bhim_upi" width={"100%"} />
          </Grid>
          <TypographyUpiInfo>{data?.upiInfo}</TypographyUpiInfo>
          <TypographyUpiDemo>{data?.upiDemo}</TypographyUpiDemo>
          <InputLabelData>{data?.inputLabel}</InputLabelData>
          <Box sx={{ display: "flex", position: "relative" }}>
            <TextField
              value={match}
              placeholder={data?.inputPlaceHolder}
              id="fullWidth"
              onChange={(e) => setMatch(e.target.value)}
              sx={{
                width: isMobile ? "85%" : "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  borderColor: "#EAEAEA",
                  "&.Mui-focused fieldset ": {
                    "&.MuiOutlinedInput-notchedOutline": {
                      borderColor: "lightgray",
                      borderStyle: "groove",
                    },
                  },
                },
                input: {
                  "&::placeholder": {
                    textOverflow: "ellipsis !important",
                    color: "#231F20",
                    opacity: 1,
                    fontSize: "14px",
                  },
                },
              }}
            />
          </Box>
          {failed && (
            <Typography
              sx={{ color: "#AD184C", fontSize: "12px", marginTop: "2%" }}
            >
              {INVALID_UPI_ID}
            </Typography>
          )}
          {upiErrorMessage && (
            <Typography
              sx={{ color: "#AD184C", fontSize: "12px", marginTop: "2%" }}
            >
              {upiErrorMessage}
            </Typography>
          )}
          <FormControlLabel
            control={
              <CustomCheckBox
                checked={isDefault}
                sx={{ marginTop: "4px" }}
                onClick={() =>
                  isDefault ? handleDefaultValueFalse() : handleDefaultValue()
                }
              />
            }
            label={data?.defalutUpi}
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "#4F4C4D",
                fontSize: "14PX",
                marginTop: "3%",
              },
            }}
          />
          <Typography>
            <AddButton
              onClick={() => {
                matchUpi();
                callUpiDetailsEvent(cartItems, data, data?.addUpiButton);
              }}
              isMobile={isMobile}
              isDisabled={isDisabled}
            >
              {data?.addUpiButton}
            </AddButton>
          </Typography>
        </ChildGrid>
      </Grid>
    </>
  );
}

export default UpiDetails;
