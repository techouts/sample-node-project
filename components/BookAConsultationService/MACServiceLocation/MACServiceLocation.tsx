import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import axios from "axios";
import {
  ExpandMoreImage,
  SearchIconImage,
  CitiesDropdownTitle,
  CityAddressListBox,
  NoStoresFoundText,
} from "./MACServiceLocationStyles";
import { useMobileCheck } from "../../../utility/isMobile";
import ParticularLocation from "./ParticularLocation";
import MACServiceDateSlot from "../MACServiceDateSlot/MACServiceDateSlot";
import MACServiceDateSlotJson from "../MACServiceDateSlot/MACServiceDateSlotJson.json";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { SEARCH_NORMAL, ARROWDOWN } from "../../../HOC/ProductCard/Constants";
import triggerGAEvent from "../../../utility/GaEvents";
import {
  consultationEvent_type,
  widget_type,
} from "../../../utility/GAConstants";
import { PaperComponent } from "../PaperComponent";
import { CustomSnackBar } from "../../../HOC/CustomSnackBar/CustomSnackBar";

import handleErrorResponse from "../../../utility/ErrorHandling";

const MACServiceLocation = (props: any) => {
  const {
    locationTitle,
    selectedService,
    finalPrice,
    setSelectedService,
    initialServiceValue,
    position,
    numberOfCitiesListData,
  } = props;
  const isMobile = useMobileCheck();
  const noStoresFoundText =
    "Selected store is not operational on this date. Kindly select any other store or any other date.";
  const [slotsAvailable, setSlotsAvailable] = useState(false);
  const [selectedCity, setSelectedCity] = useState<any>(
    global?.window?.localStorage.getItem("city")
      ? global?.window?.localStorage.getItem("city")
      : "mumbai"
  );
  
  const [responseToast, setResponseToast] = useState(false);
  const [responseToastMessage, setResponseToastMessage] = useState("");


  const [filtered, setFiltered] = useState(
    numberOfCitiesListData?.map((cities: any) => cities.city == selectedCity)
  );
  const selectedCityHandler = (event: any) => {
    setSelectedCity(event);
    setSlotsAvailable(false);
  };
  // For Radios Selected Purpose
  const [selectedValue, setSelectedValue] = useState("");
  const uniqueStore = filtered?.find(
    (store: any) => store?.code == selectedValue
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  // For Slot Available Purpose Only
  const slotsAvailableHandler = () => {
    setSlotsAvailable(true);
  };
  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "radio-button",
    inputProps: { "aria-label": item },
  });
  useEffect(() => {
    setSelectedCity(
      global?.window?.localStorage.getItem("city")
        ? global?.window?.localStorage.getItem("city")
        : "mumbai"
    );
  }, []);
  useEffect(() => {
    if (selectedCity) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_CONSULTATION_URL}/stores/cities/${selectedCity}`
        )
        .then((response) => {
          const fillData = response?.data?.stores?.filter(
            (store: any) =>
              store?.city?.toLowerCase() == selectedCity?.toLowerCase()
          );
          setFiltered(fillData);
        })
        .catch((err) => {
          console.log("Couldn't Find the Particular City Stores", err);
        });
    }
  }, [selectedCity, selectedService?.id]);
  const cityEvent = () => {
    triggerGAEvent(
      {
        item_name: "City",
        item_id: "na",
        component_id: "na",
        widget_type: widget_type,
        item_type: "City",
        widget_title: locationTitle,
        widget_description: "na",
        widget_postion: position,
        link_url: "na",
        link_text: selectedCity,
        no_of_items: numberOfCitiesListData?.length,
        index: 1,
        event_type: consultationEvent_type,
      },
      "click",
      "Book A Consultation",
      "Store Locator"
    );
  };

  return (
    <>
      <Box>
        <CitiesDropdownTitle>{locationTitle}</CitiesDropdownTitle>
        {/* This AutoComplete is Search for City Purpose Only */}
        <Autocomplete
          popupIcon={
            <ExpandMoreImage src={`${ReplaceImage(ARROWDOWN)}`} alt="Icon" />
          }
          onChange={(event: any) => {
            selectedCityHandler(event?.target?.innerText);
          }}
          value={selectedCity}
          PaperComponent={PaperComponent}
          id="search-state"
          options={numberOfCitiesListData?.map(
            (cities: any, index: number) => cities?.city
          )}
          renderInput={(params) => (
            <TextField
              onClick={() => cityEvent()}
              {...params}
              sx={{
                marginBottom: "18px",
                fontSize: isMobile ? "11px" : "14px",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    border: "1px solid #231F20",
                  },
                },
                "& :hover": {
                  cursor: "pointer",
                },
              }}
              InputProps={{
                ...params.InputProps,
                style: {
                  borderColor: "#E7E7E7",
                  borderRadius: "0px",
                  padding: "0px 6px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIconImage
                      src={`${ReplaceImage(SEARCH_NORMAL)}`}
                      alt="Icon"
                    />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        {filtered?.length > 0 ? (
          <>
            <CityAddressListBox
              sx={{ height: filtered.length === 1 ? "auto" : "240px" }}
            >
              {filtered &&
                filtered?.map((cities: any, index: number) => (
                  <>
                    <Box
                      sx={{
                        borderBottom:
                          index !== filtered?.length - 1
                            ? "1px solid #EAEAEA"
                            : "0px",
                        margin: "20px 20px",
                        paddingBottom:
                          index !== filtered?.length - 1 ? "20px" : "0px",
                      }}
                    >
                      {cities && (
                        <>
                          <Box sx={{ display: "flex" }}>
                            <Radio
                              disableRipple={true}
                              onClick={slotsAvailableHandler}
                              {...controlProps(cities?.code)}
                              sx={{
                                color: "#A7A5A6",
                                height: isMobile ? "16px" : "28px",
                                margin: isMobile
                                  ? "1px 10px 10px 1px"
                                  : "0px 10px 0px 0px",
                                "&.Mui-checked": {
                                  color: "#AD184C",
                                },
                                "& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root) path":
                                  {
                                    stroke: "#fff",
                                    strokeWidth: 1,
                                  },
                                "& .MuiSvgIcon-root": {
                                  fontSize: isMobile ? 18 : 28,
                                },
                                "&&:hover": {
                                  backgroundColor: "transparent",
                                },
                              }}
                            />
                            <ParticularLocation cities={cities} />
                          </Box>
                        </>
                      )}
                    </Box>
                  </>
                ))}
            </CityAddressListBox>
          </>
        ) : (
          <>
            <NoStoresFoundText>{noStoresFoundText}</NoStoresFoundText>
          </>
        )}
        {slotsAvailable ? (
          <>
            <MACServiceDateSlot
            key={selectedValue}
              {...MACServiceDateSlotJson}
              selectedService={selectedService}
              selectedValue={selectedValue}
              finalPrice={finalPrice}
              uniqueStore={uniqueStore}
              setSlotsAvailable={setSlotsAvailable}
              setSelectedValue={setSelectedValue}
              setSelectedCity={setSelectedCity}
              setSelectedService={setSelectedService}
              initialServiceValue={initialServiceValue}
              position={position}
              setResponseToast={setResponseToast}
            setResponseToastMessage={setResponseToastMessage}
            />
          </>
        ) : null}
         {responseToast && (
          <CustomSnackBar
            setSnackBarOpen={setResponseToast}
            snackBarOpen={responseToast}
            snackMessage={responseToastMessage}
          />
        )}
      </Box>
    </>
  );
};

export default MACServiceLocation;
