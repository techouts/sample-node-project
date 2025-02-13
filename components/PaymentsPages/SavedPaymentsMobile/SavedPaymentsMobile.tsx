import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import AccordionDetails from "@mui/material/AccordionDetails";
import React, { Fragment, useEffect, useState } from "react";
import { useMobileCheck } from "../../../utility/isMobile";
import {
  SavedTypo,
  Icon,
  FormControlB,
  FormControlLabelB,
  CardBox,
  IconContBox,
  CardContBox,
  CardContTypo,
  CardContTypo1,
} from "./SavedPaymentsStyles";
import RadioGroup from "@mui/material/RadioGroup";
import client from "../../../apollo-client";
import { SAVED_CARD_PAYMENTS } from "../../../graphQLQueries/SavedPayments";
import { CardTextField } from "../../SavePayment/CardStyles";
import {
  TextFieldBox,
  SecondBox,
  FirstBox,
} from "../SavedPayments/SavedPaymentsStyles";
import useStorage from "../../../utility/useStoarge";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { AppIcons } from "../../../utility/AppIconsConstant";
import { CARD_PAYMENT_IMAGE } from "../../../utility/AppIcons";
import handleErrorResponse from "../../../utility/ErrorHandling";

const SavedPaymentsMobile = (data: any) => {
  const [savedCards, setSavedCards] = useState<any>([]);
  const [savedUpis, setSavedUpis] = useState([]);
  const [displayLoader, setLoader] = useState(true);
  const {
    setParentAccord,
    finalCheckCallBack,
    setSelectedOption,
    setSavedPaymentCvv,
    setRadio,
    radio,
    setSelectedUpiOrCard,
  } = data;
  const isMobile = useMobileCheck();
  const [address, setAddress] = useState("");
  const [cvvNums, setCvvNums] = useState("");
  const [selectedPaymentId, setSelectedPaymentId] = useState("");
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };
  const { getItem } = useStorage();
  useEffect(() => {
    client
      .mutate({
        mutation: SAVED_CARD_PAYMENTS,
        variables: {},
      })
      .then((resp) => {
    
        setSavedCards(resp.data.savedPaymentMethod?.cards);
        setSavedUpis(resp.data.savedPaymentMethod?.UpiIds);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log("err", err);
      });
  }, []);
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleAccordianChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const controlProps = (item: string) => ({
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  useEffect(() => {
    setRadio("");
  }, [data.OtherP]);
  const handleCvvChange = (e: any, cardData: any) => {
    let numberRegex = /^\d+$/;
    if (numberRegex.test(e?.target?.value)) {
      setCvvNums(e.target.value);
      setSelectedPaymentId(cardData.card_reference);
    } else if (cvvNums.length == 1) {
      setCvvNums(e.target.value);
    }
  };
  useEffect(() => {
    if (cvvNums.length === 3) {
      const finalCardValue = savedCards.find(
        (data: any) => data.card_reference == selectedPaymentId
      );
      selectedPaymentId;
      data?.setSavedPaymentCvv({
        ...finalCardValue,
        cardFullExp: `${
          savedCards?.[0]?.card_exp_month
        }/${savedCards?.[0]?.card_exp_year.substring(
          savedCards?.[0]?.card_exp_year.length,
          savedCards?.[0]?.card_exp_year.length - 2
        )}`,
        cardCvv: cvvNums,
      });
      finalCheckCallBack("savedCard", true);
    } else {
      data?.setSavedPaymentCvv({});
      finalCheckCallBack("savedCard", false);
    }
  }, [cvvNums]);

  useEffect(() => {
    if (radio && radio?.includes("UPI[")) {
      finalCheckCallBack("savedUpi", true, "otherPaymentDisable");
    } else {
      finalCheckCallBack("savedUpi", false, "otherPaymentDisable");
      finalCheckCallBack("otherPayments", false, "savedDisable");
    }
    setSelectedOption("");
  }, [radio]);
  const CardPaymentImage = AppIcons(CARD_PAYMENT_IMAGE);
  return (
    <Box p={"16px 16px 0px 16px"} sx={{ border: "1px solid #EAEAEA" }}>
      {isMobile && (
        <Fragment>
          <FormControlB>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              sx={{
                "& .MuiButtonBase-root.MuiRadio-root": {
                  padding: "0px",
                },
              }}
              onChange={(event) => {
                if (event?.target.value != radio) {
                  setCvvNums("");
                }

                setRadio(event?.target.value);
                setParentAccord("");
              }}
            >
              <FirstBox>
                <SavedTypo> Saved Payment Options </SavedTypo>
                <Divider />
                {savedUpis &&
                  savedUpis?.map((upi: any, idx: number) => {
                    return (
                      <>
                        <FormControlLabelB
                          value=""
                          control={
                            <Radio
                              {...controlProps("UPI[" + idx)}
                              checked={radio === "UPI[" + idx}
                              sx={{
                                position: "absolute",
                                right: 0,
                                "&.Mui-checked": {
                                  color: "#AD184C",
                                },
                              }}
                              onChange={() => setSelectedUpiOrCard(upi?.upi_id)}
                            />
                          }
                          label={
                            <Fragment>
                              <CardBox
                                sx={{
                                  border: isMobile ? "" : "1px solid #EAEAEA",
                                }}
                              >
                                <IconContBox>
                                  <Icon
                                    src={data?.payBy[0]?.icon}
                                    alt="logo..."
                                    style={{
                                      padding: isMobile
                                        ? "22px 13px 22px 0px"
                                        : "22px 13px 22px 16px",
                                    }}
                                  />
                                  <CardContBox>
                                    <CardContTypo>
                                      {data?.payBy[0]?.subtitle}
                                    </CardContTypo>
                                    <CardContTypo1>{upi?.upi_id}</CardContTypo1>
                                  </CardContBox>
                                </IconContBox>
                              </CardBox>
                              <Divider />
                            </Fragment>
                          }
                          labelPlacement="start"
                        />
                      </>
                    );
                  })}
              </FirstBox>
              <SecondBox>
                {savedCards &&
                  savedCards?.map((cardData: any, idx: any) => {
                    return (
                      <>
                        <Grid container>
                          <Grid item xs={12}>
                            <FormControlLabelB
                              value=""
                              control={
                                <Radio
                                  checked={radio === "CDDB[" + idx}
                                  {...controlProps("CDDB[" + idx)}
                                  sx={{
                                    position: "absolute",
                                    right: 0,
                                    "&.Mui-checked": {
                                      color: "#AD184C",
                                    },
                                  }}
                                />
                              }
                              label={
                                <Fragment>
                                  <CardBox
                                    sx={{
                                      border: isMobile
                                        ? ""
                                        : "1px solid #EAEAEA",
                                    }}
                                  >
                                    <IconContBox>
                                      <Icon
                                        src={`${ReplaceImage(
                                          CardPaymentImage?.url
                                        )}`}
                                        alt="logo..."
                                        style={{
                                          padding: isMobile
                                            ? "22px 13px 22px 0px"
                                            : "22px 13px 22px 16px",
                                        }}
                                      />
                                      <CardContBox>
                                        <CardContTypo>
                                          {`${cardData?.card_issuer} ${cardData?.card_type} Card`}
                                        </CardContTypo>
                                        <CardContTypo1>
                                          <Typography>
                                            {cardData?.card_number}
                                          </Typography>
                                        </CardContTypo1>
                                      </CardContBox>
                                    </IconContBox>
                                  </CardBox>
                                  {idx !== savedCards?.length - 1 && (
                                    <Divider />
                                  )}
                                </Fragment>
                              }
                              labelPlacement="start"
                            />
                          </Grid>
                          {radio == "CDDB[" + idx ? (
                            <Grid item>
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
                                    "& .MuiTextField-root": {
                                      margin: "10px 0px",
                                    },
                                  }}
                                >
                                  <CardTextField
                                    hiddenLabel
                                    id="filled-hidden-label-normal"
                                    variant="outlined"
                                    // placeholder={Data.expairyNo}
                                    disabled={true}
                                    defaultValue={`${
                                      cardData?.card_exp_month
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
                                    variant="outlined"
                                    onChange={(e) =>
                                      handleCvvChange(e, cardData)
                                    }
                                    placeholder="Enter CVV"
                                    defaultValue={cvvNums}
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
                              </AccordionDetails>
                            </Grid>
                          ) : (
                            ""
                          )}
                        </Grid>
                      </>
                    );
                  })}
              </SecondBox>
            </RadioGroup>
          </FormControlB>
        </Fragment>
      )}
    </Box>
  );
};

export default SavedPaymentsMobile;
