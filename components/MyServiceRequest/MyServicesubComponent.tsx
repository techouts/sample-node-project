import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import FollowUp from "./FollowUp";
import BasicModal from "../../HOC/Modal/ModalBlock";
import {
  ServiceRequestData,
  AccordionContentType,
  getTicketStatus,
} from "./MyServiceUtils";
import { useMobileCheck } from "../../utility/isMobile";

const MyServiceRequestSubComponent = (props: {
  serviceData?: ServiceRequestData;
  accordionContent?: AccordionContentType[];
  customerSupportDetails?: string;
  customerSupportReopenDetails?: string;
  displayLoader?: boolean;
}) => {
  const {
    serviceData = null,
    accordionContent,
    customerSupportDetails,
    customerSupportReopenDetails,
    displayLoader,
  } = props;
  const [open, setOpen] = useState(false);
  const isMobile = useMobileCheck();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  function getAccordionText(key?: string) {
    let returnData: string | null | undefined = null;
    if (key === "firstName" || key === "lastName") {
      const fullNames = serviceData?.fullname?.split(" ");
      returnData = key === "firstName" ? fullNames?.[0] : fullNames?.[1];
    } else if (key === "email_id") {
      returnData = serviceData?.email_id;
    } else if (key === "mobilephone") {
      returnData = serviceData?.mobilephone;
    } else if (key === "sscs_Order_id") {
      returnData =
        serviceData?.incident_customer_contacts?.[0]?.sscs_ordernumber;
    } else if (key === "description") {
      returnData = serviceData?.incident_customer_contacts?.[0]?.description
        ?.replace(/(?:\\r\\n)+/g, "")
        ?.replace(/\\\"/g, '"');
    } else if (key === "caseStatus") {
      returnData = getTicketStatus(
        serviceData?.incident_customer_contacts?.[0]?.statecode
      );
    } else if (key === "remarks") {
      returnData =
        serviceData?.incident_customer_contacts?.[0]?.incident_resolutions
          ?.subject;
    } else if (key === "sscs_Category_name") {
      returnData =
        serviceData?.incident_customer_contacts?.[0]?.sscs_Category_name;
    } else if (key === "sscs_SubCategory_name") {
      returnData =
        serviceData?.incident_customer_contacts?.[0]?.sscs_SubCategory_name;
    } else if (key === "title") {
      returnData = serviceData?.incident_customer_contacts?.[0]?.title;
    }
    return returnData;
  }

  return (
    <Box>
      {accordionContent?.map((item, index: number) => {
        const key = item?.accordionText;
        const value = getAccordionText(item?.dataKey);
        const isCaseStatus = ["caseStatus"]?.includes(item?.dataKey ?? "");
        return (
          <>
            <Divider />
            <>
              {value && (
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    <Typography
                      sx={{
                        margin: `${isMobile ? "10px 0px 0px 0px" : "20px 0px"}`,
                        fontWeight: isCaseStatus ? "700" : "600",
                        padding: "0px 20px",
                      }}
                    >
                      {key}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    {value && (
                      <Typography
                        sx={{
                          margin: `${
                            isMobile ? "0px 0px 10px 0px" : "20px 0px"
                          }`,
                          fontWeight: isCaseStatus ? "bold" : "600",
                          padding: "0px 20px",
                          color: "#757575",
                          wordWrap: "break-word",
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {value}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              )}
            </>
          </>
        );
      })}

      <Divider />
      {!displayLoader && (
        <Button
          sx={{
            backgroundColor: "black",
            color: "white",
            padding: "5px 80px",
            margin: "10px 0px 10px 20px",
            fontWeight: "700",
            ":hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
          onClick={() => {
            handleOpen();
          }}
        >
          {serviceData?.incident_customer_contacts?.[0]?.statecode === "0"
            ? "FOLLOW - UP"
            : "RE-OPEN"}
        </Button>
      )}
      {open && (
        <>
          <BasicModal
            height={"auto"}
            width={isMobile ? "70%" : "50%"}
            top="50%"
            left="50%"
            toggle={false}
            pdpPopup={true}
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={open}
            closeIconStyles={{
              color: "lightgray",
              fontSize: "large !important",
              fontWeight: "bold",
              width: isMobile ? "2em" : "1.3em",
              height: isMobile ? "2em" : "1.3em",
              background: isMobile ? "#ffffff" : "",
              borderRadius: isMobile ? "50%" : "",
              position: isMobile ? "absolute" : "",
              Top: isMobile ? "3px" : "",
              marginTop: isMobile ? "-24px" : "",
              left: isMobile ? "-12px" : "",
            }}
            Component={
              <FollowUp
                handleClose={handleClose}
                details={
                  serviceData?.incident_customer_contacts?.[0]?.statecode ===
                  "0"
                    ? customerSupportDetails
                    : customerSupportReopenDetails
                }
              />
            }
          />
        </>
      )}
    </Box>
  );
};

export default MyServiceRequestSubComponent;
