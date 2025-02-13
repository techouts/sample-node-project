import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ExpandMoreImage, ServicesDropdownTitle } from "./MACServiceStyles";
import { useMobileCheck } from "../../../utility/isMobile";
import MACServiceLocation from "../MACServiceLocation/MACServiceLocation";
import MACServiceLocationJson from "../MACServiceLocation/MACServiceLocationJson.json";
import { AppIcons } from "../../../utility/AppIconsConstant";
import { DOWN_ARROW_ICON } from "../../../utility/AppIcons";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { PaperComponent } from "../PaperComponent";

const MACService = ({
  listOfServicesData,
  selectedService,
  setSelectedService,
  initialServiceValue,
  numberOfCitiesListData,
  position
}: any) => {
  const Down_Arrow = AppIcons(DOWN_ARROW_ICON);
  const [selectSubService, setSelectSubService] = useState(
    listOfServicesData?.[0]?.name
  );
  const isMobile = useMobileCheck();
  const allListOfServiceChilds = listOfServicesData?.[0]?.childServices?.map(
    (services: any) => {
      return `${services?.name} - Rs. ${services?.price}`;
    }
  );
  const selectedPrice = selectSubService && selectSubService?.split("- Rs. ");
  const finalPrice = Number(selectedPrice?.[selectedPrice?.length - 1]);
  return (
    <>
      <Box>
        <ServicesDropdownTitle>
          {listOfServicesData?.[0]?.name}
        </ServicesDropdownTitle>
        {/* This AutoComplete is Search for Service Purpose Only */}
        <Autocomplete
          popupIcon={
            <ExpandMoreImage
              src={`${ReplaceImage(Down_Arrow?.url)}`}
              alt="Expand Icon"
            />
          }
          onChange={(event: any) => {
            setSelectSubService(event?.target?.innerText);
          }}
          PaperComponent={PaperComponent}
          id="search-state"
          options={allListOfServiceChilds}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={selectSubService}
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
              }}
            />
          )}
        />
        {selectSubService != listOfServicesData?.[0]?.name ? (
          <>
            <MACServiceLocation
              {...MACServiceLocationJson}
              finalPrice={finalPrice}
              numberOfCitiesListData={numberOfCitiesListData}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              initialServiceValue={initialServiceValue}
              position={position}
            />
          </>
        ) : null}
      </Box>
    </>
  );
};

export default MACService;
