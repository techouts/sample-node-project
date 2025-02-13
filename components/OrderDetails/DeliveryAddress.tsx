import React from "react";
import {
  AddressBox,
  AddressText,
  NameNumber,
  TitleTypography,
  AddressSectionTitle,
  DeliverySectionKeys,
  ContainerFragment,
} from "./OrderDetailsStyles";

const Address = ({
  sectionTitle,
  title,
  name,
  telephoneNumber,
  street,
  city,
  postcode,
  deliveryMode,
}: any) => {
  return (
    <>
      <AddressBox>
        <AddressSectionTitle>{sectionTitle}</AddressSectionTitle>
        {deliveryMode && (
          <TitleTypography>
            <DeliverySectionKeys>Delivery Mode -</DeliverySectionKeys>{" "}
            <AddressText sx={{ display: "inline-block" }}>
              {deliveryMode}
            </AddressText>
          </TitleTypography>
        )}
        <div style={{ display: "flex" }}>
          {title && <DeliverySectionKeys>{`${title} - `}</DeliverySectionKeys>}
          <ContainerFragment>
            <NameNumber>{`${name} ${telephoneNumber ? "|" : ""} ${
              telephoneNumber ? telephoneNumber : ""
            }`}</NameNumber>
            {street && (
              <AddressText
                dangerouslySetInnerHTML={{
                  __html: street,
                }}
              ></AddressText>
            )}
            {postcode && (
              <AddressText>
                {city},{postcode}
              </AddressText>
            )}
          </ContainerFragment>
        </div>
      </AddressBox>
    </>
  );
};

export default Address;
