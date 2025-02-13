import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import {
  SlotTimeText,
  DateAndTimeTitle,
  TimeDuration,
  AvailableSlotTitle,
  SlotTimingsBox,
  BookServiceButton,
  NoAvailableSlotsTitle,
} from "./MACServiceDateSlotStyles";
import axios from "axios";
import DatePicker from "../../SigninComponent/Registrationcompo/DatePicker";
import MACServiceRegister from "../MACServiceRegister/MACServiceRegister";
import MACServiceRegisterJson from "../MACServiceRegister/MACServiceRegisterJson.json";
import { useMobileCheck } from "../../../utility/isMobile";
import BasicModal from "../../../HOC/Modal/ModalBlock";
import { CustomSnackBar } from "../../../HOC/CustomSnackBar/CustomSnackBar";
import { DateFormatToMeridian } from "../../../utility/DateFormatToMeridian";
import triggerGAEvent from "../../../utility/GaEvents";
import { BookEvent, BookingClick } from "../../../utility/GAConstants";

const MACServiceDateSlot = (props: any) => {
  const {
    dateAndTimeTitle,
    availableSlotTitle,
    selectedService,
    selectedValue,
    finalPrice,
    uniqueStore,
    setSlotsAvailable,
    setSelectedValue,
    setSelectedCity,
    setSelectedService,
    initialServiceValue,
    position,
    setResponseToastMessage,
    setResponseToast
  } = props;
  const isMobile = useMobileCheck();
  const noAvailableSlotsText =
    "All slots are booked for the selected date. Please select any other store or any other date.";
  const bookServiceBtn = isMobile ? "BOOK A SERVICE" : "BOOK SERVICE";
  const [pickTheDate, setPickTheDate] = useState<any>(new Date());
  const [availableSlots, setAvailableSlots] = useState<any>([]);
  const [slotTimeSelected, setSlotTimeSelected] = useState("");
  const [registerServicePopup, setRegisterServicePopup] = useState(false);
  const handleClose = () => {
    setRegisterServicePopup(!registerServicePopup);
  };
  useEffect(() => {
    if (pickTheDate) {
      const setsFinalDate = [
        pickTheDate?.getFullYear(),
        ("0" + (pickTheDate?.getMonth() + 1)).slice(-2),
        ("0" + pickTheDate?.getDate())?.slice(-2),
      ].join("");
      axios
        .get(
          `${process.env.NEXT_PUBLIC_CONSULTATION_URL}/stores/${selectedValue}/slots?day=${setsFinalDate}`
        )
        .then((response) => {
          setAvailableSlots(response?.data?.stores);
        })
        .catch((err) => {
          console.log("Couldn't Find the Date & Time Slots", err);
        });
    }
  }, [pickTheDate, selectedValue, selectedService?.id]);
  const ctaServiceEvent = (data?: any) => {
    triggerGAEvent(
      {
        item_name: "na",
        item_id: "na",
        component_id: "na",
        widget_type: BookEvent,
        item_type: "City",
        widget_title: dateAndTimeTitle,
        widget_description: "na",
        widget_postion: position,
        link_url: "na",
        link_text: data,
        no_of_items: 1,
        index: 1,
        event_type: BookingClick,
        item_rating: "na",
      },
      "Click",
      "Book A Consultation",
      "Store Locator"
    );
  };
  return (
    <>
      <Box>
        {selectedValue && (
          <Box>
            <DateAndTimeTitle>{dateAndTimeTitle}</DateAndTimeTitle>
            {availableSlots?.[0]?.appointmentSlotDuration && (
              <TimeDuration>{`Duration: ${availableSlots?.[0]?.appointmentSlotDuration} mins`}</TimeDuration>
            )}
            <DatePicker
              label={"Date"}
              date={pickTheDate}
              setDate={setPickTheDate}
              showClear={false}
              disablePast={true}
              maxDate={
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth() + 6,
                  new Date().getDate()
                )
              }
            />
          </Box>
        )}
        {selectedValue && (
          <Box>
            {availableSlots?.[0]?.slots &&
              availableSlots?.[0]?.slots?.[0]?.slots?.length ? (
              <AvailableSlotTitle>{availableSlotTitle}</AvailableSlotTitle>
            ) : (
              <NoAvailableSlotsTitle>
                {noAvailableSlotsText}
              </NoAvailableSlotsTitle>
            )}
            {availableSlots?.map((slotMapOne: any) => (
              <>
                {slotMapOne?.slots?.map((slotMapTwo: any) => (
                  <>
                    {slotMapTwo?.slots?.length > 0 && (
                      <>
                        <SlotTimingsBox>
                          {slotMapTwo?.slots?.map((slotsData: any) => {
                            return (
                              <SlotTimeText
                                key={slotsData.timing}
                                sx={{
                                  cursor: slotsData.isFull
                                    ? 'not-allowed'
                                    : 'pointer',
                                  opacity: slotsData.isFull && '0.5',
                                  border:
                                    slotsData.timing == slotTimeSelected
                                      ? '1px solid #DEA3B7'
                                      : '',
                                }}
                                onClick={() => {
                                  if (!slotsData.isFull) { setSlotTimeSelected(slotsData.timing) }
                                }
                                }
                              >
                                {DateFormatToMeridian(slotsData.timing)}
                              </SlotTimeText>
                            );
                          })}
                        </SlotTimingsBox>
                      </>
                    )}
                  </>
                ))}
              </>
            ))}
          </Box>
        )}
        {availableSlots && (
          <BookServiceButton
            sx={{ opacity: slotTimeSelected ? 1 : 0.5 }}
            onClick={() => {
              ctaServiceEvent(bookServiceBtn);
              slotTimeSelected && handleClose();
            }}
          >
            {bookServiceBtn}
          </BookServiceButton>
        )}
        <BasicModal
          width={isMobile ? "100%" : "60%"}
          height={isMobile ? "100%" : "90%"}
          left="50%"
          top={isMobile ? "64.5%" : "50%"}
          overflowData="auto"
          handleClose={handleClose}
          open={registerServicePopup}
          Component={
            <MACServiceRegister
              {...MACServiceRegisterJson}
              selectedService={selectedService}
              selectedValue={selectedValue}
              slotTimeSelected={slotTimeSelected}
              setSlotTimeSelected={setSlotTimeSelected}
              finalPrice={finalPrice}
              uniqueStore={uniqueStore}
              handleModalClose={handleClose}
              setResponseToastMessage={setResponseToastMessage}
              setResponseToast={setResponseToast}
              setSlotsAvailable={setSlotsAvailable}
              setSelectedValue={setSelectedValue}
              setPickTheDate={setPickTheDate}
              setSelectedCity={setSelectedCity}
              setSelectedService={setSelectedService}
              initialServiceValue={initialServiceValue}
              ctaServiceEvent={ctaServiceEvent}
            />
          }
        />
      </Box>
    </>
  );
};

export default MACServiceDateSlot;