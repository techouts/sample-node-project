import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Loader from "../../HOC/Loader/Loader";
import React, { useEffect, useState } from "react";
import { TextFieldBox, Buttonlabel } from "./pdcardstyle";
import { useMobileCheck } from "../../utility/isMobile";
import { toast } from "../../utility/Toast";

import BasicModal from "../../HOC/Modal/ModalBlock";
import { CHECK_ALL_AVAILABILITY } from "../../graphQLQueries/CheckAvailabilityEDD";
import graphql from "../../middleware-graphql";
import { DateFormate } from "../../utility/DateFormate";
import useStorage from "../../utility/useStoarge";
import {
  widget_powered_by,
  widget_type,
  event_type,
} from "../../utility/GAConstants";
import { pinCodeBasedCoordinates } from "../../utility/GeoAPI";
import triggerGAEvent from "../../utility/GaEvents";
import UserInfoInterface from "../../schemas/userInfoAtom";
import { CHANGE_LABEL, CHECK_LABEL } from "./Constants";
import { GoogleMapDirections } from "../../utility/GoogleMapDirections";
import { RadioButtonIcon } from "../../utility/CartUtilities";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  CHECKED_RADIO_ICON,
  UNCHECKED_RADIO_ICON,
} from "../../utility/AppIcons";
import PickUpDailogContent from "./PickUpDailogContent";
import { EXPRESS_CUSTOM_TEXT } from "../../utility/Constants";
import handleErrorResponse from "../../utility/ErrorHandling";
import { useRouter } from "next/router";
import { fetchExploreStoreModeServiceability, StoreAvailabilityRequestPayload } from "../../graphQLQueries/checkStoreAvailabilityForHLD";
import axios from "axios";
import AxiosInstance from "../../utility/AxiosInstance";
import { arcClient } from "../../utility/ArcInstance";
function DeliveryPickupNew({
  data,
  psd,
  setPsd,
  setMode,
  productDetails,
  userDataItems,
  setUserDataItems,
  typeOfDelivery,
  setTypeOfDelivery,
  mode,
}: any) {
  const _pincode = userDataItems?.pincode || "400050";

  const [showLoader, setLoader] = useState(false);
  const { setItem } = useStorage();
  const [limit, setLimit] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [filteredText, setFilteredText] = React.useState(undefined);
  const [pincode, setPincode] = useState(_pincode);
  const [delivery, setDelivery] = useState<any>({});
  const [pinErr, setPinErr] = useState("");
  const [pinValidate, setPinValidate] = useState(true);
  const [text, setText] = useState(false);
  const isMobile = useMobileCheck();
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(0);
  const router = useRouter();
  const handleChange = (value: any, index: number, psd: string) => {
    console.log(index,value,psd,"IND VAL PSD")
    setTypeOfDelivery(value);
    setSelectedDeliveryType(index);
    setMode(psd);
    setText(true);
    if (index === 2) {
      setLimit(2);
    } else {
      setLimit(1);
    }
  };

  const pickpointHandler = (id: any) => {
    const FilteredMetaText = data?.deliveryTypes?.[2]?.metaData?.filter(
      (myId: any) => myId.id === id
    );
    setFilteredText(FilteredMetaText?.[0]?.text);
    setLimit(1);
    setOpen(false);
    if (id === 2) {
      const defaultLat = userDataItems?.storeCords?.lat;
      const defaultLong = userDataItems?.storeCords?.long;
      const ccLat = psd?.cc?.address?.latitude;
      const ccLong = psd?.cc?.address?.longitude;
    
      if ((ccLat && ccLong) || (defaultLat && defaultLong)) {
        const destinationLat = ccLat || defaultLat;
        const destinationLong = ccLong || defaultLong;
    
        window.location.href = `https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${destinationLat},${destinationLong}`;
        
      }
    }
    
    
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function checkExploreModeServiceability() {
    const requestPayload: StoreAvailabilityRequestPayload[] = [
      {
        deliveryMode: "pick",
        quantity: 1,
        sku: productDetails?.sku,
        storeId: `${userDataItems?.storeCode}`,
      },
    ];
    const res = await fetchExploreStoreModeServiceability(requestPayload);
    const _status = res?.data?.checkStoreAvailabilityForHLD?.status === "Serviceable";
    let data = res?.data?.checkStoreAvailabilityForHLD?.products;
    handleServiceabilityResponse({data,_status});
  }

  useEffect(() => {
    if (data?.type_id === "simple" || productDetails?.type_id === "simple") {
      if (
        userDataItems?.storeMode &&
        userDataItems?.storeModeType === "cc" &&
        userDataItems?.storeCode
      ){
        checkExploreModeServiceability()
      } else {
        checkDeliveryReport();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.type_id, productDetails?.type_id, productDetails?.sku, userDataItems?.storeMode]);

  const checkDeliveryReport = async () => {
    setPincode(_pincode);
    await handleCheckService(_pincode);
  };

  const renderDocuments = (data: any) => {
    return (
      <div>
        <Typography
          onClick={handleClickOpen}
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#AD184C",
            paddingTop: "16px",
          }}
        >
          VIEW All
        </Typography>
        <BasicModal
          height={"400px"}
          width={"700px"}
          top="50%"
          left="50%"
          handleOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
          Component={
            <PickUpDailogContent
              data={data}
              pickpointHandler={pickpointHandler}
            />
          }
        />
      </div>
    );
  };
  const expressDeliveryMode = (mode: any) => {
    if (mode?.deliveryMode == "ED") {
      mode?.serviceableStores?.map((store: any) => {
        // if (store?.lspEDDs?.length !== 0) {
        if(store?.DeliveryDate){
          setPsd((prvData: any) => ({
            ...prvData,
            ed:{
              edd:store?.DeliveryDate
            },
          }));
        } else {
          setPsd((prvData: any) => ({
            ...prvData,
            ed: false,
          }));
        }
      });
    }
  };
  const standardDeliveryMode = (mode: any) => {
    if (mode?.deliveryMode == "SD") {
      mode?.serviceableStores?.map((store: any) => {
        // if (store?.lspEDDs?.length !== 0) {
        if(store?.DeliveryDate){
          setPsd((prvData: any) => ({
            ...prvData,
            sd: {
              edd:store?.DeliveryDate
            },
          }));
        } else {
          setPsd((prvData: any) => ({
            ...prvData,
            sd: false,
          }));
        }
      });
    }
  };

  function handleServiceabilityResponse({data, _status}:{data:any, _status:boolean}){
    console.log(_status,"status")
    setPsd({
      status: _status,
      sd: false,
      ed: false,
      cc: false,
    });
    if (data) {
      console.log(data,"test123")
      data?.[0]?.fulfillments?.map((fulfillment: any) => {
        if (fulfillment?.type == "HD") {
          fulfillment?.deliveryModeEDDs?.map((mode: any) => {

            {
              expressDeliveryMode(mode);
            }
            {
              standardDeliveryMode(mode);
            }
          });
        } else if (fulfillment?.type == "CC") {
          if (fulfillment?.type == "CC" && fulfillment?.store?.address) {
            setPsd((prvData: any) => ({
              ...prvData,
              cc: fulfillment?.store,
            }));
          } else {
            setPsd((prvData: any) => ({
              ...prvData,
              cc: false,
            }));
          }
        }
      });
    } else {
      setPsd({
        status: _status,
        sd: false,
        ed: false,
        cc: false,
      });
    }
  }
  async function checkServiceability(lat: number, long: number, pincode: any) {
    setLoader(true);
    const address = {
      postcode: userDataItems?.storeMode
        ? userDataItems?.storePincode
        : pincode,
      latitude: lat,
      longitude: long,
    };
    const productsArr = [
      {
        productRef: productDetails?.sku,
        requestedQuantity: 1,
        deliveryModes: ["ED", "SD"],
      },
    ];
  
  await axios.get(`${process.env.NEXT_PUBLIC_ORC_LAYER}/PinCodeService/api/SkuAvailabilityRMultiYarp?sku=${productDetails?.sku}&pincode=${pincode}&reqQuantity=1&channel=2`,{auth: {
    username: "admin",
    password: "password",
  },}).then((res)=>{
     if (res?.data == "Out of Stock"){
      setPsd({
        sd: false,
        ed: false,
        cc: false,
      });
      setLoader(false);
      const customData = {
        data: {
          checkAvailabilityAndEDD: {
            status: "Out Of Stock",
            destinationPincode: null,
            products: [
              {
                status: "Out Of Stock",
                sku: productDetails?.sku, // takes sku from 1st object
                requestedQuantity: 1, // keep static
                fulfillments: [
                  {
                    type: "HD",
                    errorMessage: null,
                    store: null,
                    __typename: "Fulfillment",
                  },
                ],
                __typename: "ProductFulfillment",
              },
            ],
          },
        },
      }
      const _status = customData.data.checkAvailabilityAndEDD.status;
      const data = customData.data.checkAvailabilityAndEDD.products;
      handleServiceabilityResponse({ data, _status });
      
      return;
}
    let transformedResponse = transformNewToOldApiResponse(res.data)
    let data = transformedResponse?.data?.checkAvailabilityAndEDD?.products;
    const _status = transformedResponse?.data?.checkAvailabilityAndEDD?.status || "";
    handleServiceabilityResponse({data,_status});
    setLoader(false)
  })  
  }
  function transformNewToOldApiResponse(res){
  let EDStores = res?.filter((stores)=> stores.DeliveryMode === "Express")
  let SDStores = res?.filter((stores)=> stores.DeliveryMode === "Standard")
  let deliveryModeEDDs = [];

  let hasDeliveryMode = res?.some(
    (item) => item.DeliveryMode && item.DeliveryMode.trim() !== '' && item.DeliveryMode !== 'Pick'
  );
  
  console.log('Final Result:', hasDeliveryMode);
  
  console.log(res,"psd ? res",hasDeliveryMode)
  if (SDStores.length > 0) {
    deliveryModeEDDs.push({
      deliveryMode: "SD",
      errorMessage: null,
      serviceableStores: SDStores,
      __typename: "DeliveryModeEDD"
    });
  }
  if (EDStores.length > 0) {
    deliveryModeEDDs.push({
      deliveryMode: "ED",
      errorMessage: null,
      serviceableStores: EDStores,
      __typename: "DeliveryModeEDD"
  });
  }
     return {data:{
          checkAvailabilityAndEDD: {
              status: hasDeliveryMode ? "Serviceable" : "Out Of Stock",
              destinationPincode: null,
              products:[
                {
                  "status": hasDeliveryMode,
                  "sku": res?.[0]?.Sku, //takes sku from 1st object,
                  "requestedQuantity": 1, //keep static
                  "fulfillments": [
                      {
                          "type": "HD",
                          "errorMessage": null,
                          "store": null,
                          deliveryModeEDDs,
                          "__typename": "Fulfillment"
                      }
                  ],
                  "__typename": "ProductFulfillment"
              }
              ]
  }
}}
  }

  useEffect(() => {
    let ccAddress = psd?.cc?.address;
    setDelivery({
      deliveryTypes: [
        {
          type: "Standard Delivery",
          psd: "sd",
          metaData: [
            {
              id: 0,
              text: psd?.sd?.edd ? (
                `Estimated Delivery by ${psd?.sd?.edd}`
              ) : (
                <span style={{ color: "#A7A5A6" }}>
                  Not available for this location
                </span>
              ),
            },
          ],
        },
        {
          type: "Express Delivery",
          psd: "ed",
          metaData: [
            {
              id: 1,
              text: psd?.ed?.edd ? (
                <span style={{ letterSpacing: isMobile ? "0.5px" : "-1.02px" }}>
                    Estimated Delivery by {psd?.ed?.edd}
                </span>
              ) : (
                <span style={{ color: "#A7A5A6" }}>
                  Not available for this location
                </span>
              ),
            },
          ],
        },
        {
          type: "Pay & Pickup",
          psd: "cc",
          metaData: [
            {
              id: 2,
              text: ccAddress ? (
                `${ccAddress?.line1}, ${ccAddress?.line2}, ${ccAddress?.city}`
              ) : (
                <span style={{ color: "#A7A5A6" }}>
                  Not available for this location
                </span>
              ),
            },
          ],
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [psd]);

  const handleCheckService = async (pin: any) => {
    const userPinCode = pin || 400090;
    if (userPinCode?.length == 6) {
      const res: any = await pinCodeBasedCoordinates(userPinCode);

      if (res == undefined) {
        setPsd({
          sd: false,
          ed: false,
          cc: false,
        });
        setPinErr("Please Enter a valid Pin code");
        setPinValidate(false);
        return false;
      }
      setPinValidate(true);
      setText(true);
      setUserDataItems((previousData: UserInfoInterface) => ({
        ...previousData,
        city: res.city,
        pincode: res?.pincode,
        geoLat: res?.latitude,
        geoLong: res?.longitude,
      }));
      setItem("pincode", userPinCode, "local");
      setItem("city", res.city, "local");
      setItem("latitude", res.latitude, "local");
      setItem("longitude", res.longitude, "local");
      checkServiceability(
        parseFloat(res.latitude),
        parseFloat(res.longitude),
        userPinCode
      );
    }
  };

  const checkedRadioButtonIcon = AppIcons(CHECKED_RADIO_ICON);
  const unCheckedRadioButtonIcon = AppIcons(UNCHECKED_RADIO_ICON);
  const callClickEvent = () => {
    triggerGAEvent(
      {
        item_name: productDetails?.name,
        item_id: data?.sku,
        event_type: event_type,
        widget_type: widget_type,
        item_type: data?.__typename,
        widget_powered_by: widget_powered_by,
        widget_title: "Delivery & Pickup",
        widget_description: "na",
        widget_position: 1,
        link_url: window?.location?.href,
        outbound: false,
        link_text: "CHECK",
        no_of_items: 1,
        index: 1,
        item_brand: data?.brand_info,
        item_category: data?.categories?.[0]?.name || "na",
        item_category2: data?.categories?.[1]?.name || "na",
        item_category3: data?.categories?.[2]?.name || "na",
        item_original_price:
          data?.price_range?.minimum_price?.regular_price?.value,
        item_price: data?.pmr_price_value?.amount?.value,
        item_rating: data?.rating_summary,
      },
      "click"
    );
  };
  const pincodeError = (pinErr: any) => {
    if (pinErr) {
      return (
        <>
          <Typography sx={{ color: "red", fontSize: "10px" }}>
            {pinErr}
          </Typography>
        </>
      );
    } else {
      return (
        <>
          {psd?.status !== "Out Of Stock" &&
            !psd?.sd?.edd &&
            !psd?.ed?.edd &&
            !psd?.cc?.address &&
            !showLoader && (
              <Typography sx={{ color: "red", fontSize: "10px" }}>
                Serviceability Not Available For This Pincode
              </Typography>
            )}
        </>
      );
    }
  };

  const DeliveryMode = ({
    indexValue,
    parentIndex,
    item,
  }: {
    indexValue: number;
    parentIndex: number;
    item: any;
  }) => {
    return (
      <>
        <Grid key={indexValue} container item xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <FormControlLabel
              value={item?.type}
              control={
                <Radio
                  checkedIcon={
                    <RadioButtonIcon imageUrl={checkedRadioButtonIcon?.url} />
                  }
                  icon={
                    <RadioButtonIcon imageUrl={unCheckedRadioButtonIcon?.url} />
                  }
                  disabled={commonFunction(
                    userDataItems?.storeMode
                      ? !["sd", "ed"].includes(item.psd)
                      : psd[`${item.psd}`],
                    false,
                    true
                  )}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(event.target.value, parentIndex, item?.psd);
                  }}
                />
              }
              label={
                <span
                  style={{
                    color: "#231F20",
                    fontSize: commonFunction(isMobile, "12px", "16px"),
                  }}
                >
                  {item?.type}
                </span>
              }
              sx={{
                "& .MuiRadio-root.Mui-checked": {
                  color: "#AD184C",
                },
                "& .MuiButtonBase-root.MuiRadio-root": {
                  padding: "4px  0",
                },
                "& .MuiTypography-root": {
                  marginLeft: commonFunction(isMobile, "10px", "8px"),
                  fontSize: {
                    lg: 16,
                    md: 14,
                    sm: 12,
                    xs: 14,
                  },
                },
                margin: "0px",
              }}
            />
          </Grid>
          <Grid
            key={indexValue}
            container
            item
            xs={12}
            sm={8}
            md={8}
            lg={8}
            sx={{
              display: "flex",
              alignItems: "center",
              ml: {
                xs: "30px",
                sm: "0px",
                md: "0px",
                lg: "0px",
              },
            }}
          >
            <Box sx={{ marginLeft: isMobile ? "0px" : "6px" }}>
              {item?.metaData
                ?.slice(0, limit)
                ?.map((Delipickdata: any, index: number) => {
                  const indexValue = index;
                  return (
                    <Box
                      pt={isMobile ? 0 : 0.5}
                      pb={isMobile ? 1.5 : 0.5}
                      key={indexValue}
                    >
                      <Typography
                        sx={{
                          lineHeight: "170%",
                          textDecoration:
                            psd?.cc?.address && Delipickdata?.id == 2
                              ? "underline"
                              : "none",
                          textDecorationSkipInk: "none",
                          cursor:
                            psd?.cc?.address && Delipickdata.id == 2
                              ? "pointer"
                              : "",
                          fontSize: isMobile ? "12px" : "16px",
                          color:
                            selectedDeliveryType === parentIndex
                              ? "#656263"
                              : "#979596",
                        }}
                        onClick={() => pickpointHandler(Delipickdata?.id)}
                      >
                        {Delipickdata.text}
                        {filteredText &&
                          Delipickdata[0]?.text?.replace(filteredText)}
                      </Typography>
                      {parentIndex === selectedDeliveryType &&
                        parentIndex === 2 &&
                        index === 1 &&
                        renderDocuments(data)}
                    </Box>
                  );
                })}
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  function buyInStoreClickHandler(){
    window.location.assign("/miscs/store")
  }

  return (
    <>
      <Grid container sx={{ display: "grid" }}>
        {!userDataItems?.storeMode && (
          <Grid container item xs={12} sx={{ display: "grid" }}>
            <Grid item>
              <Typography
                sx={{
                  fontSize: isMobile ? "12px" : "16px",
                  lineHeight: "140%",
                  color: "#231F20",
                  mt: "25px",
                }}
              >
                Delivery & Pickup
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              sx={{
                margin: isMobile ? "13px 0px 25px 0px " : "8px 0px 16px 0px",
                boxShadow: "none",
                background: "#FFFFFF",
              }}
            >
              <TextFieldBox
                id="standard-name"
                sx={{
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid  #EAEAEA",
                  },
                  "& MuiFormHelperText-root": {
                    marginLeft: "0px",
                  },
                  "& .MuiFormHelperText-contained": {
                    marginLeft: "0px",
                  },
                  "& .MuiFormHelperText-filled": {
                    marginLeft: "0px",
                  },
                }}
                placeholder={"Enter PIN code"}
                autoComplete="off"
                className="subscribeText"
                helperText={
                  pincode?.length < 6 ? (
                    <Typography sx={{ color: "red", fontSize: "10px" }}>
                      Invalid Pincode, Please enter 6 Digits Pincode
                    </Typography>
                  ) : (
                    pincodeError(pinErr)
                  )
                }
                value={pincode}
                onKeyDown={(e: any) => {
                  handleCheckService(pincode);
                  if (e?.length == 6) {
                  } else {
                    e?.key === "Enter" ||
                      (["e", "E", "+", "-", ".", "Unidentified"].includes(
                        e?.key
                      ) &&
                        e.preventDefault());
                  }
                }}
                type="tel"
                onChange={(e: any) => {
                  const pattern = /\d+/;
                  e?.target?.value == ""
                    ? setPincode("")
                    : e?.target?.value?.length <= 6 &&
                      e?.target?.value[0] != 0 &&
                      pattern.test(e?.target?.value) &&
                      setPincode(e?.target?.value);
                  setPinErr("");
                  setText(false);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Buttonlabel
                        onClick={() => {
                          handleCheckService(pincode);
                          callClickEvent();
                        }}
                      >
                        {text ? CHANGE_LABEL : CHECK_LABEL}
                      </Buttonlabel>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        )}
        {pinValidate && (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            mt={userDataItems?.storeMode ? 2 : 0}
          >
            {!showLoader && (
              <>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={typeOfDelivery}
                    name="radio-buttons-group"
                    style={{
                      background: "#F7F6F9",
                      width: `${isMobile ? "100%" : "90%"} `,
                    }}
                  >
                    <Grid
                      container
                      pt={isMobile ? "13px" : "21px"}
                      pb={"22px"}
                      pl={isMobile ? "10px" : "20px"}
                    >
                      {userDataItems?.storeMode
                        ? delivery?.deliveryTypes
                            ?.filter((i: any) => i?.psd === "cc")
                            ?.map((item: any, parentIndex: number) => {
                              const indexValue = parentIndex;
                              return (
                                <DeliveryMode
                                  indexValue={indexValue}
                                  parentIndex={parentIndex}
                                  item={item}
                                />
                              );
                            })
                        : delivery?.deliveryTypes
                            ?.filter((i: any) => i?.psd !== "cc")
                            ?.map((item: any, parentIndex: number) => {
                              const indexValue = parentIndex;
                              return (
                                <DeliveryMode
                                  indexValue={indexValue}
                                  parentIndex={parentIndex}
                                  item={item}
                                />
                              );
                            })}
                    </Grid>
                  </RadioGroup>
                </FormControl>
                {!userDataItems.storeMode && (
                  <Typography
                    sx={{
                      fontSize: "14px",
                      textDecoration: "underline",
                      cursor: "pointer",         
                      color: "#AD184C",
                    }}
                    onClick={buyInStoreClickHandler}
                  >
                    Buy in store
                  </Typography>
                )}
              </>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
}

const commonFunction = (condition: any, value1: any, value2: any) => {
  if (condition) {
    return value1;
  } else {
    return value2;
  }
};

export default DeliveryPickupNew;
