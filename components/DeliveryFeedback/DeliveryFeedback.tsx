import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import React, {useState,useEffect } from "react";
import client from "../../apollo-client";
import {
  AddDeliveryPartnerRatings,
} from "../../graphQLQueries/ProductQuery";
import Loader from "../../HOC/Loader/Loader";
import { widget_type } from "../../utility/GAConstants";
import triggerGAEvent from "../../utility/GaEvents";
import { useMobileCheck } from "../../utility/isMobile";
import { toast } from "../../utility/Toast";
import OrderDetails from "../MyOrders/OrderDetails/OrderDetails";
import {
  ButtonBox,
  ButtonTypography,
  CourierTypography,
  DescriptionTextField,
  QueryTypography,
  RatingStack,
  RatingTypography,
  SubmitButton,
  TitleTextTypography,
  TitleTypography,
} from "./DeliveryFeedbackstyles";
import handleErrorResponse from "../../utility/ErrorHandling";
import { GET_ORDER_SUMMARY } from "../../graphQLQueries/OrderDetailsQuery";
import {
  delivaryReview,
  delivaryReviewSubmit,
  getDelivaryPartner
} from "../../graphQLQueries/OrderDetailsQuery";
const data = require("../../JSON/DeliveryFeedbackData.json");

export const DeliveryFeedback = (props: any) => {
  const { shoppingFeedBack, orderID, enableSnackMessage, courierName,shipmentDetails, selectedOrderNumber , onSubmit} = props;
  const {
    courier_label,
    rating_label,
    whats_wrong_label,
    experience_label,
    buttons,
    intrest_description,
  } = data;
  const isMobile = useMobileCheck();
  const [value, setValue] = useState<number>(0);
  const [showLoader, setLoader] = useState(false);
  const [modalon, SetModalon] = useState(true);
  const [errorMsg, setErrorMessage] = useState("");
  const [reviewDesc, setReviewDesc] = useState("");
  const [label, setLabel] = useState("");
  const [isRatingClicked, setIsRatingClicked] = useState(false);
  const [deliverypartnerDetails, setDeliveryPartnerDetails] = useState();
  const [deliveryReviewReasons, SetDeliveryReviewReasons]= useState();
  const [reviewId, setReviewId]= useState();
  const [shipmentID, setShipmentID] = useState(null);
  useEffect(()=>{
   if(shipmentDetails){
    const {shipmentId}= shipmentDetails;
    if(shipmentId){
      fetchPartner();
    }
   }
  },[shipmentDetails])

  useEffect(()=>{
    if(value){
      fetchReviewResons();
    }
  },[value])

  const getShipmentId = async ()=>{
    if (selectedOrderNumber) {
      client
        .query({
          query: GET_ORDER_SUMMARY,
          variables: {
            orderNumber: selectedOrderNumber,
          },
          fetchPolicy: "no-cache",
          errorPolicy: "ignore",
        })
        .then((res) => {
          const id = 
          res?.data?.customer?.orders?.items?.[0]?.shipments?.[0]?.id;
        if (id) {
          setShipmentID(id);
        }
        })
        .catch((err) => {
          console.log(err);
        })
      
    }
  }

  const getDeliveryPartner = (partnerCode: string) => {
    let text;
    switch (partnerCode?.toLowerCase()) {
      case "bhn":
        text = "BLOWHORN";
        break;
      case "bldt":
        text = "BLUEDART";
        break;
      case "del":
        text = "DELHIVERY";
        break;
      case "dzo":
        text = "DUNZO";
        break;
      case "ecex":
        text = "ECOM EXPRESS";
        break;
      case "sdl":
        text = "SHIPDELIGHT";
        break;
      case "xprb":
        text = "XPRESSBEES";
        break;
      default:
        text = "BLUEDART";
    }
    return text;
  };

  const handleSubmit = () => {
    if (value < 1) {
      setErrorMessage("Add stars to post this rating");
    } else {
      setLoader(true);
      SetModalon(false);
      client
        .mutate({
          mutation: AddDeliveryPartnerRatings,
          variables: {
            DeliveryPartner: getDeliveryPartner(courierName),
            OrderID: orderID,
            RatingValue: Number(value),
            Title: label,
            Description: reviewDesc,
          },
        })
        .then((response: any) => {
         

          const hasError =    handleErrorResponse(response?.data?.AddDeliveryPartnerRatings?.message) //response checking
          if (hasError) return null;

          setValue(0);
          setReviewDesc("");
          setLabel("");
          enableSnackMessage(
            response?.data?.AddDeliveryPartnerRatings?.message
          );
        })
        .catch(() => {
          enableSnackMessage("Delivery Partner FeedBack is not submitted");
        })
        .finally(() => setLoader(false));
    }
  };

  const fetchPartner = () => {
    const {shipmentId}= shipmentDetails;
      client
        .query({
          query: getDelivaryPartner,
          fetchPolicy: "no-cache",
          variables: {
            shipment_id:shipmentId
          },
        })
        .then((response: any) => {
         console.log("fetchPartner response",response);
         const partnerDetails = response?.data?.getDeliveryPartner;
         setDeliveryPartnerDetails(partnerDetails)
 
        })
        .catch(() => {
          enableSnackMessage("Delivery Partner data not found");
        })
  };

  const fetchReviewResons = async() => {
    await getShipmentId();
    client
    .query({
      query: delivaryReview,
      fetchPolicy: "no-cache",
      variables: {
        rating: Number(value)
      },
    })
    .then((response: any) => {
     console.log("fetchReview reason response",response);
     const deliveryReasons = response?.data?.getReviewReasons;
     SetDeliveryReviewReasons(deliveryReasons);
    })
    .catch(() => {
      enableSnackMessage("Delivery Review resons not found");
    })
  };

  console.log("shipmentDetails",shipmentDetails);
  
    const handleReviewSubmit = async () => {
    
      const shipmentId = shipmentDetails?.shipmentId;
    if (value < 1) {
      setErrorMessage("Add stars to post this rating");
    } else if(label ===""){
      toast.error("Select reason to post this rating");
    } else{
      setErrorMessage("");
      setLoader(true);
      SetModalon(false);
      client
        .mutate({
          mutation: delivaryReviewSubmit,
          variables: {
            shipment_id: shipmentId || shipmentID ,
            rating: Number(value),
            reason: String(reviewId),
            comment: reviewDesc,
          },
        })
        .then((response: any) => {
          setValue(0);
          setReviewDesc("");
          setLabel("");
          setReviewId("");
          enableSnackMessage(
            "Delivery Experience Submitted Successfully"
          );
        })
        .catch((err) => {
          const errMessage = JSON.parse(JSON.stringify(err));
          console.log("error check", errMessage?.message);
          enableSnackMessage(errMessage?.message);
        })
        .finally(() => {
          setLoader(false); 
          onSubmit(); 
        });
    }
  };

  const handleReviewReason = (value:any, id:any) => {
    console.log("handleReviewReason",value,id);
    setLabel(value);
    setReviewId(id)
  }

  const handleReview = (value: any) => {
    const SelectedLabel = buttons?.filter(
      (id: any) => id?.label_name === value
    );
    if (SelectedLabel?.length == 0) {
      const selectedLabel = buttons?.filter((id: any) => id?.label === value);
      setLabel(selectedLabel[0]?.label);
    } else {
      setLabel(SelectedLabel[0]?.label_name);
    }
  };
  const handleRating = (event: any) => {
    setIsRatingClicked(true);
    setValue(event?.target?.value);
  };
  const callEvent = (orderDetails: any) => {
    triggerGAEvent(
      {
        item_name: orderDetails?.product?.name,
        item_id: orderDetails?.item?.name,
        widget_type: widget_type,
        item_type: "",
        widget_title: orderDetails?.title,
        widget_description: "",
        widget_postion: "",
        link_url: "",
        link_text: "",
        no_of_items: orderDetails?.length,
        index: "",
        item_brand: "",
        item_category: "",
        item_image_link: "",
        item_category2: "",
        item_category3: "",
        item_original_price: "",
        item_price: "",
        item_rating: "",
        event_type: "",
      },
      "click"
    );
  };
  return (
    <>
      {showLoader && <Loader />}
      <Box
        p={isMobile ? "15px 16px 50px 16px" : "15px 30px 60px 30px"}
        mt={shoppingFeedBack ? "" : isMobile ? "25px" : "29px"}
        bgcolor="#FFFFFF"
        boxShadow={shoppingFeedBack ? "unset" : "0px 0px 8px -7px #231F20"}
      >
        <Stack flexDirection="column" spacing="20px">
          {!shoppingFeedBack && (
            <Stack flexDirection={isMobile ? "column" : "row"}>
              <TitleTypography>{`${courier_label}:`}</TitleTypography>
              <CourierTypography>
                {/* {getDeliveryPartner(courierName)} */}
                {deliverypartnerDetails?.delivery_partner}
              </CourierTypography>
            </Stack>
          )}
          <RatingStack flexDirection="column">
            <RatingTypography>
              {shoppingFeedBack
                ? "Rate your Shopping Experience"
                : rating_label}
            </RatingTypography>
            <Box>
              <Rating
                sx={{ color: "#AD184C" }}
                name="half-rating"
                value={value}
                size="large"
                onClick={(event) => {
                  handleRating(event);
                  callEvent("click");
                }}
              ></Rating>
            </Box>
          </RatingStack>
          {isRatingClicked && (
            <>

<Stack flexDirection="column">
                {value > 0 && (
                  <QueryTypography>
                    {value <= 3 ? whats_wrong_label : intrest_description}
                  </QueryTypography>
                )}
                {value > 0 && (
                  <ButtonBox>
                   {deliveryReviewReasons?.map((item: any, index: number) => (
                        <ButtonTypography
                        key={index}
                        onClick={() => {
                          handleReviewReason(
                            item?.reason,
                            item?.reviewreasons_id
                          ),
                            callEvent("click");
                        }}
                        selectedlabel={label}
                        buttonLabel={item?.reason}
                      >
                        {item?.reason}
                      </ButtonTypography>
                     ))}
                  </ButtonBox>
                )}
              </Stack>
              {value > 0 && (
              <Stack flexDirection="column">
                <TitleTextTypography>{experience_label}</TitleTextTypography>
                <Box>
                  <DescriptionTextField
                    multiline={true}
                    rows={6}
                    value={reviewDesc}
                    onChange={(event) => setReviewDesc(event?.target.value)}
                    fullWidth
                    placeholder="Write about your experience here"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset ": {
                          "&.MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgb(196,196,196,1)",
                            borderWidth: "1px",
                          },
                        },
                      },
                    }}
                  >
                    {" "}
                  </DescriptionTextField>
                </Box>
              </Stack>
              )}
            </>
          )}
        </Stack>
        {value > 0 && (
          <Box sx={{ paddingTop: "10px" }}>
            <SubmitButton
              onClick={() => {
                // handleSubmit(),
                handleReviewSubmit(),
                 callEvent(OrderDetails);
              }}
            >
              Submit
            </SubmitButton>
          </Box>
        )}
      </Box>
    </>
  );
};
