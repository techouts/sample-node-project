import React, { useEffect, useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  Paper,
  AccordionDetails,
  Stack,
} from "@mui/material";
import {
  StyledArrows,
  ViewMoreTypography,
} from "../FirstCitizenFAQ/FirstCitizenQuestionStyle";
import { eventType, Widget_type } from "../../utility/GAConstants";
import { callEventBeautyProfileMyWallet } from "../BeautyProfile/BeautyProfileMyWallet";
import { useMobileCheck } from "../../utility/isMobile";
import WalletTransactionLogs from "./WalletTransactionLogs";
import LoyaltyPointsTransactionLogs from "./LoyaltyPointsTransactionLogs";
import {
  fetchLoyaltyPointsTransactionLogs,
  fetchWalletTransactionLogs,
  walletTransaction,
} from "../../graphQLQueries/TransactionLogs";
import { getDateInYYYY_MM_DD } from "../MyServiceRequest/MyServiceUtils";
import BasicModal from "../../HOC/Modal/ModalBlock";
import CustomDateRangeModel from "../MyServiceRequest/CustomDateRangeModel";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import Loader from "../../HOC/Loader/Loader";

function TransactionLogs(data: any) {
  const isMobile: boolean = useMobileCheck();
  const filters = [
    {
      id: 11,
      keyName: "Select custom Date Range",
      keyId: "customRange",
      value: undefined,
    },
  ];
 
  const [items, setItems] = useState<any>([]);
  const [parentClick, setParentClick] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(5);
  const [click, setClick] = useState(-1);
  const [range, setRange] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(),
    new Date(),
  ]);
  const [dateModelOpen, setDateModelOpen] = useState(false);
  const handleOpen = () => {
    setDateModelOpen(!dateModelOpen);
  };
  const handleClose = () => {
    setDateModelOpen(!dateModelOpen);
  };

  const handleclick = (
    index?: any,
    linkText?: string,
    description?: string
  ) => {
    callEventBeautyProfileMyWallet(
      eventType,
      Widget_type,
      data?.title,
      linkText,
      "",
      "",
      description
    );
    if (click == index) {
      setClick(-1);
    } else {
      setClick(index);
    }
  };

  async function fetchTransactionLogs() {
    try {
      if (data?.title === "Transaction Logs") {
        setLoading(true);
        const filtered = await filterTerm(range);
        setItems(filtered || []);
        setLoading(false);
      } else if (data?.title === "Loyalty Points Transactions") {
        const logs = await fetchLoyaltyPointsTransactionLogs();
        setItems(logs?.getTransaction?.getTxnResponse?.details?.txnData);
      }
    } catch (error) {
      setItems([]);
      console.log("error", error);
    }
  }
  const parentClickHandler = () => {
    callEventBeautyProfileMyWallet(
      eventType,
      Widget_type,
      data?.title,
      data?.title,
      "",
      "",
      ""
    );
    if (items?.length > 0) {
      if (!parentClick) {
        setParentClick(true);
        showless();
        handleclick();
      } else {
        setParentClick(false);
      }
    } else {
      data?.titlePath &&
        window.location.assign(`${window.location.origin}${data?.titlePath}`);
    }
  };

  const showmore = () => {
    items?.length && setItemsToShow(items?.length);
  };

  const showless = () => {
    setItemsToShow(5);
  };

  const filterTerm = async (value: string) => {
    const dates = getDates(value);
    const res = await walletTransaction(dates?.[0] as any, dates?.[1] as any);
    return res?.data?.walletTransation?.walletTransactions;
  };

  const getDates = (range: string) => {
    const todayDay = new Date();
    const currentDate = new Date();
    const yesterDayDate = new Date(
      currentDate.setDate(currentDate.getDate() - 1)
    );
    const presentDate = new Date();
    const weekBeforeDate = new Date(presentDate);
    weekBeforeDate.setDate(presentDate.getDate() - 7);
    const start = new Date(dateRange?.[0]);
    const end = new Date(dateRange?.[1]);
    switch (range?.toLowerCase()) {
      case "all":
        return [undefined, undefined];
      case "today": {
        let currentDate = new Date();
        return [getDateInYYYY_MM_DD(todayDay), getDateInYYYY_MM_DD(todayDay)];
      }
      case "yesterday":
        return [
          getDateInYYYY_MM_DD(yesterDayDate),
          getDateInYYYY_MM_DD(yesterDayDate),
        ];
      case "last 7 days":
        return [
          getDateInYYYY_MM_DD(weekBeforeDate),
          getDateInYYYY_MM_DD(todayDay),
        ];
      default:
        return [start, end];
    }
  };
  useEffect(() => {
    fetchTransactionLogs();
  }, [range, dateRange]);

  const handleSubmitHandler = (from: Date, to: Date) => {
    setRange("");
    setDateRange([from, to]);
    setDateModelOpen(false);
  };

  return (
    <Box
      p={data?.bgPadding || 0}
      sx={{
        margin: "20px 0px",
      }}>
      <Accordion
        sx={{
          boxShadow: "none",
          borderBottom: "2px solid #E1E1E1",
          border: "2px solid #E1E1E1",
          borderRadius: "0px !important",
        }}>
        <AccordionSummary
          expandIcon={<StyledArrows $click={parentClick} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{}}
          onClick={() => parentClickHandler()}>
          <Typography>{data?.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {data?.title === "Transaction Logs" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
              }}>
              <Stack
                direction={"row"}
                gap={"0.5rem"}
                onClick={() => {
                  setDateModelOpen(true);
                }}
                sx={{ border: 0.5, padding: "2%" }}>
                <EventOutlinedIcon />
                <Typography>Select Custom Date Range</Typography>
              </Stack>
              <>
                {loading && <Loader />}
                {dateModelOpen && (
                  <BasicModal
                    height={"auto"}
                    width={isMobile ? "250px" : "300px"}
                    top="50%"
                    left="50%"
                    toggle={false}
                    pdpPopup={true}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    open={dateModelOpen}
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
                    iconTop={"4%"}
                    borderRadius="10px"
                    Component={
                      <CustomDateRangeModel
                        restrictAYear={true}
                        setDateModelOpen={setDateModelOpen}
                        handleSubmitHandler={handleSubmitHandler}
                      />
                    }
                  />
                )}
              </>
            </Box>
          )}
        </AccordionDetails>
          <Box>
            {items?.length > 0 ? (
              <>
                <Box>
                  {items
                    ?.slice(0, itemsToShow)
                    .map((list: any, index: any, array: any) => {
                      return (
                        <>
                          <Paper
                            sx={{
                              boxShadow: " 0px 1px 0px 0px white",
                              borderRadius: "0px",
                              padding: "19px 16px",
                              borderBottom:
                                index === array.length - 1
                                  ? "none"
                                  : "solid 1px #EBEBEB",
                            }}
                            key={index}>
                            {data?.title === "Transaction Logs" && (
                              <WalletTransactionLogs {...list} />
                            )}
                            {data?.title === "Loyalty Points Transactions" && (
                              <LoyaltyPointsTransactionLogs {...list} />
                            )}
                          </Paper>
                        </>
                      );
                    })}
                </Box>
                {items?.length >= 5 && (
                  <>
                    {itemsToShow === 5 ? (
                      <ViewMoreTypography
                        isMobile={isMobile}
                        onClick={showmore}>
                        View More
                      </ViewMoreTypography>
                    ) : (
                      <ViewMoreTypography onClick={showless}>
                        View Less
                      </ViewMoreTypography>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {Boolean(data?.title === "Transaction Logs") && (
                  <Typography sx={{ margin: "10px auto", textAlign: "center" }}>
                    No Transactions Found
                  </Typography>
                )}
              </>
            )}
          </Box>
      </Accordion>
    </Box>
  );
}

export default TransactionLogs;
