import React from "react";
import { Box } from "@mui/material";
import { Cookies } from "react-cookie";
import axios from "axios";
import MACServiceRegisterForm from "./MACServiceRegisterForm";
import {
  MakeupTrailTitle,
  StoreAddressText,
  TextFieldsBox,
} from "./MACServiceRegisterStyles";
import { DateFormate } from "../../../utility/DateFormate";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoilstore";
import { DateFormatToMeridian } from "../../../utility/DateFormatToMeridian";

const MACServiceRegister = (props: any) => {
  const {
    selectedService,
    selectedValue,
    slotTimeSelected,
    finalPrice,
    uniqueStore,
    handleModalClose,
    setResponseToastMessage,
    setResponseToast,
    setSlotTimeSelected,
    setSlotsAvailable,
    setSelectedValue,
    setPickTheDate,
    setSelectedCity,
    setSelectedService,
    initialServiceValue,
    ctaServiceEvent,
  } = props;
  const [getUserData, setGetUserData] = useRecoilState(userState);
  const userPhoneNumber = localStorage?.getItem("mobileNumber");
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");
  const registerButtonChecked = accessToken
    ? "Proceed To Book"
    : "Register Now";
  const registerProceedText = `By clicking "${registerButtonChecked}" you agree to the`;
  const termsConditionTypo = "Terms and Conditions";
  const uniqueStoreItemsData = `${
    uniqueStore?.name ? uniqueStore?.name + "," : ""
  } 
  ${uniqueStore?.line1 ? uniqueStore?.line1 + "," : ""} 
  ${uniqueStore?.line2 ? uniqueStore?.line2 + "," : ""}
  ${uniqueStore?.landmark ? uniqueStore?.landmark + "," : ""} 
  ${uniqueStore?.city ? uniqueStore?.city : ""}`;
  const serviceBookingHandler = (
    email: string,
    name: string,
    mobile: string
  ) => {
    const appointmentPrice = selectedService?.price;
    const initialCardServiceId = selectedService?.id;
    const selectedSlotTime = slotTimeSelected;
    function prices() {
      if (finalPrice > 0) {
        return finalPrice;
      } else {
        return appointmentPrice;
      }
    }
    const accuratePrice = prices();
    const appointmentInfo = {
      customer: {
        uid: email,
        name: name,
        mobile: mobile,
      },
      appointment: {
        mobile: mobile,
        storeCode: selectedValue,
        serviceId: initialCardServiceId,
        servicePrice: accuratePrice,
        appointmentDateTime: selectedSlotTime,
      },
    };
    axios
      .post(
        `${process.env.NEXT_PUBLIC_CONSULTATION_URL}/appointment/book`,
        appointmentInfo
      )
      .then((response) => {
        if (response.data?.status === "Success") {
          const appointTime = response?.data?.appointment?.appointmentDateTime;
          const formattedDate =
            DateFormate(
              `${appointTime?.substring(0, 4)}/${appointTime?.substring(
                4,
                6
              )}/${appointTime?.substring(6, 8)}`
            ) +
            "," +
            DateFormatToMeridian(appointTime);
          setResponseToast(true);
          setResponseToastMessage(
            `Your Service Booked Successfully on ${formattedDate} at ${uniqueStore?.name}`
          );
        } else {
          setResponseToast(true);
          setResponseToastMessage(
            "Your Booking Service has Failed, Please try again "
          );
        }
      })
      .catch((err) => {
        console.log("Cann't Find Any Appointment Details", err);
      })
      .finally(() => {
        handleModalClose();
        setSelectedCity(
          global?.window?.localStorage.getItem("city")
            ? global?.window?.localStorage.getItem("city")
            : "mumbai"
        );
        setSlotTimeSelected("");
        setSelectedValue("");
        setPickTheDate(new Date());
        setSelectedService({ id: initialServiceValue });
        global?.window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
  };
  return (
    <Box sx={{ margin: "20px" }}>
      <MakeupTrailTitle>{selectedService?.name}</MakeupTrailTitle>
      <Box>
        <StoreAddressText>{uniqueStoreItemsData}</StoreAddressText>
        <StoreAddressText>
          {DateFormate(
            `${slotTimeSelected?.substring(0, 4)}/${slotTimeSelected?.substring(
              4,
              6
            )}/${slotTimeSelected?.substring(6, 8)} `
          )}
          , &nbsp;{DateFormatToMeridian(slotTimeSelected)}
        </StoreAddressText>
      </Box>
      <TextFieldsBox>
        <MACServiceRegisterForm
          registerProceedText={registerProceedText}
          termsConditionTypo={termsConditionTypo}
          serviceBookingHandler={serviceBookingHandler}
          registerButtonChecked={registerButtonChecked}
          setSlotTimeSelected={setSlotTimeSelected}
          setSlotsAvailable={setSlotsAvailable}
          getUserData={getUserData}
          setGetUserData={setGetUserData}
          setSelectedValue={setSelectedValue}
          userPhoneNumber={userPhoneNumber}
          finalPrice={finalPrice}
          setPickTheDate={setPickTheDate}
          setSelectedCity={setSelectedCity}
          ctaServiceEvent={ctaServiceEvent}
        />
      </TextFieldsBox>
    </Box>
  );
};

export default MACServiceRegister;
