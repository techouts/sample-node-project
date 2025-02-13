import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import Card from "@mui/material/Card";
import axios from "axios";
import ConsultationServiceCardSchema from "./ConsultationServiceCardSchema";
import {
  ServiceCardTitle,
  ServiceCardBox,
  ServiceCardAndRadioButton,
  TrailText,
  PriceTypo,
  CardPaymentsText,
  OnlyTextForServiceCard,
  ServiceCardImgTitle,
  ServiceCardImgSubtitle,
  ImgFreeTextServiceCard,
} from "./ConsultationServiceCardStyles";
import { useMobileCheck } from "../../utility/isMobile";
import MACService from "../BookAConsultationService/MACService/MACService";
import MACServiceLocation from "../BookAConsultationService/MACServiceLocation/MACServiceLocation";
import {
  consultaionApi,
  listOfCitiesDataAPI,
  priceTypography,
} from "./ConsultationConstants";
import handleErrorResponse from "../../utility/ErrorHandling";

const ConsultationServiceCard = ({
  title,
  bgColor,
  bgPadding,
  items,
  position,
}: ConsultationServiceCardSchema) => {
  const isMobile = useMobileCheck();
  const initialServiceValue = items?.[0]?.identifier;
  const [selectedValue, setSelectedValue] = useState<any>();
  const [selectedService, setSelectedService] = useState<any>({
    id: initialServiceValue,
    name: items?.[0]?.title,
  });
  const [servicesData, setServicesData] = useState([]);
  const [servicesDropdown, setServicesDropdown] = useState<any>([]);
  const selectedServiceHandler = (cardItem: any) => {
    setSelectedService(cardItem);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "radio-button",
    inputProps: { "aria-label": item },
  });
  const bothServicesAPI = () => {
    axios
      .get(consultaionApi)
      .then((response) => {
      
        setServicesData(response?.data?.services);
      })
      .catch((err) => {
        console.log("Can't Find Initial Services Data", err);
      });
    axios
      .get(
        `${process.env.NEXT_PUBLIC_CONSULTATION_URL}/appointment/services/${selectedService?.id}/nodes`
      )
      .then((response) => {
       

        setServicesDropdown(response?.data?.services);
      })
      .catch((err) => {
        console.log("Can't Find Child M.A.C.Services Data", err);
      });
  };
  useEffect(() => {
    bothServicesAPI();
  }, [selectedService]);
  const [cityList, setCityList] = useState([]);
  const numberOfCitiesList = async () => {
    await axios
      .get(listOfCitiesDataAPI)
      .then((response: any) => {
        setCityList(response?.data?.stores);
      })
      .catch((err) => {
        console.log("Can't Find List of Cities Data", err);
      });
  };
  let uniqueCityList: any[] = [];
  const uniqueCities = cityList.filter(
    (cityItem: any, ind: number) =>
      cityItem?.city &&
      !uniqueCityList.includes(
        cityItem?.city?.toLowerCase().trim().replace(",", "")
      ) &&
      uniqueCityList.push(cityItem?.city?.toLowerCase().trim().replace(",", ""))
  );
  useEffect(() => {
    numberOfCitiesList();
  }, []);

  const combineServices = items?.map((cmsServicedata: any, index: number) => {
    const apiServiceItems: any = servicesData?.find(
      (apiServicedata: any, idx: number) =>
        cmsServicedata?.identifier === apiServicedata?.id
    );
    return { ...cmsServicedata, ...apiServiceItems };
  });
  return (
    <Box bgcolor={bgColor} p={isMobile ? "0px 16px" : bgPadding}>
      <Box sx={{ margin: isMobile ? "16px auto" : "40px auto" }}>
        <ServiceCardTitle>{title}</ServiceCardTitle>
        <ServiceCardBox>
          {combineServices?.map((cardItem: any) => (
            <>
              <ServiceCardAndRadioButton key={cardItem?.id}>
                <Radio
                  onClick={() => selectedServiceHandler(cardItem)}
                  {...controlProps(cardItem?.selectedItem)}
                  sx={{
                    color: "#A7A5A6",
                    height: isMobile ? "20px" : "36px",
                    padding: "0px",
                    margin: isMobile ? "12px 0px 12px 0px" : "0px 16px 0px 0px",
                    "&.Mui-checked": {
                      color: "#AD184C",
                    },
                    "& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root) path":
                      {
                        stroke: "#fff",
                        strokeWidth: 1,
                      },
                    "& .MuiSvgIcon-root": {
                      fontSize: isMobile ? 20 : 36,
                    },
                    "&&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  disableRipple={true}
                  checked={selectedService?.id == cardItem?.id}
                />
                <Card square>
                  {cardItem?.isTrial === true ? (
                    <>
                      {cardItem?.trailText && cardItem?.trailText != "null" && (
                        <TrailText>{cardItem?.trailText}</TrailText>
                      )}
                    </>
                  ) : null}
                  <img
                    src={cardItem?.imgUrl}
                    alt="Service Card Image"
                    width="100%"
                  />
                  <OnlyTextForServiceCard>
                    <ServiceCardImgTitle>{cardItem?.name}</ServiceCardImgTitle>
                    <ServiceCardImgSubtitle>
                      {cardItem?.description}
                    </ServiceCardImgSubtitle>
                    {cardItem?.isTrial === true && (
                      <CardPaymentsText>
                        {cardItem?.paymentsTrailText}
                      </CardPaymentsText>
                    )}
                    {cardItem?.isTrial !== true && (
                      <>
                        {cardItem?.price > 0 ? (
                          <>
                            <PriceTypo>{priceTypography}</PriceTypo>
                            {`Rs ${cardItem?.price}/-`}
                          </>
                        ) : (
                          <ImgFreeTextServiceCard>
                            {cardItem?.freeText}
                          </ImgFreeTextServiceCard>
                        )}
                      </>
                    )}
                  </OnlyTextForServiceCard>
                </Card>
              </ServiceCardAndRadioButton>
            </>
          ))}
        </ServiceCardBox>

        {(servicesDropdown?.[0]?.isTrial || selectedService) && (
          <MACServiceLocation
            {...(servicesDropdown?.[0]?.isTrial
              ? { listOfServicesData: servicesDropdown }
              : { position })}
            numberOfCitiesListData={uniqueCities}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            initialServiceValue={initialServiceValue}
          />
        )}
      </Box>
    </Box>
  );
};

export default ConsultationServiceCard;
