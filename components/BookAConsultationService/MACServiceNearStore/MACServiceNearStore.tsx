import React, { useState } from "react";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import IconButton from "@mui/material/IconButton";
import MACServiceNearStoreSchema from "./MACServiceNearStoreSchema";
import {
  EachFindNearStore,
  FilterImageIcon,
  FindNearStoreTitleText,
  FilterStoreAndTextBox,
  FilterTextAndIcon,
  FilterTypography,
  NearStoresFindBox,
  SelectedStoreDetailsBox,
  ParticularStoreName,
  StoreAddressText,
  StorePhoneNumber,
  ParticularStoreContentBox,
} from "./MACServiceNearStoreStyles";
import { useMobileCheck } from "../../../utility/isMobile";

const MACServiceNearStore = ({
  findNearStoreTitle,
  filterImage,
  filterText,
  findNearStores,
  StoreAddress,
}: MACServiceNearStoreSchema) => {
  const isMobile = useMobileCheck();
  const [nearByStoreSelected, setNearByStoreSelected] = useState("");
  return (
    <>
      <Box>
        <Box>
          <FilterStoreAndTextBox>
            <FindNearStoreTitleText>
              {findNearStoreTitle}
            </FindNearStoreTitleText>
            <FilterTextAndIcon>
              <IconButton>
                <FilterImageIcon src={filterImage} alt="Filter Image" />
              </IconButton>
              <FilterTypography>{filterText}</FilterTypography>
            </FilterTextAndIcon>
          </FilterStoreAndTextBox>

          <NearStoresFindBox>
            {findNearStores?.map((nearStore) => (
              <>
                <EachFindNearStore
                  sx={{
                    opacity:
                      nearStore?.storeName == nearByStoreSelected ? "1" : "0.5",
                    border:
                      nearStore?.storeName == nearByStoreSelected
                        ? "1px solid #DEA3B7"
                        : "",
                  }}
                  onClick={() => setNearByStoreSelected(nearStore?.storeName)}
                >
                  {nearStore?.storeName}
                </EachFindNearStore>
              </>
            ))}
          </NearStoresFindBox>
        </Box>

        <SelectedStoreDetailsBox>
          {StoreAddress?.map((address, index) => (
            <>
              <ParticularStoreContentBox
                sx={{
                  borderBottom:
                    index !== StoreAddress?.length - 1
                      ? "1px solid #EAEAEA"
                      : "0px",
                  padding: index === 0 ? "0px 0px 16px 0px" : "16px 0px",
                }}
              >
                <Radio
                  sx={{
                    color: "#EAEAEA",
                    height: isMobile ? "10px" : "20px",
                    width: isMobile ? "10px" : "20px",
                    marginRight: "10px",
                    "&.Mui-checked": {
                      color: "#AD184C",
                    },
                  }}
                  disableRipple={true}
                />
                <Box>
                  <ParticularStoreName>
                    {address?.particularStoreTitle}
                  </ParticularStoreName>
                  <StoreAddressText>{address?.storeName}</StoreAddressText>
                  <StoreAddressText>{address?.village}</StoreAddressText>
                  <StoreAddressText>{address?.streetName}</StoreAddressText>
                  <StoreAddressText>{address?.platName}</StoreAddressText>
                  <StoreAddressText>{address?.storePincode}</StoreAddressText>
                  <StorePhoneNumber>{address?.phoneNumber}</StorePhoneNumber>
                </Box>
              </ParticularStoreContentBox>
            </>
          ))}
        </SelectedStoreDetailsBox>
      </Box>
    </>
  );
};

export default MACServiceNearStore;
