import React, { useEffect, useMemo, useRef, useState } from "react";
import { AccordionDetails, Box, Stack, Typography } from "@mui/material";
import {
  AccordionSpanTitle,
  AccordionText,
  AccordionTitle,
  MainBox,
  StyledAccordion,
  StyledArrow,
  StyledSummary,
} from "./MyServiceRequestStyles";
import { useMobileCheck } from "../../utility/isMobile";
import MyServiceRequestSubComponent from "./MyServicesubComponent";
import MultipleSelectPlaceholder from "./ServiceFilters";
import {
  AccordionContentType,
  FilterContentType,
  FiltersInput,
  GetServiceByFilter,
  ServiceRequestData,
  ServiceTicketDetailsType,
  getFilterInputs,
} from "./MyServiceUtils";
import Loader from "../../HOC/Loader/Loader";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import CustomPagination from "../../HOC/CustomPagination/CustomPagination";
import { useRouter } from "next/router";

type MyServiceRequestType = {
  filters?: FilterContentType[];
  accordionContent?: AccordionContentType[];
  queiriesText?: string;
  customerSupportDetails?: string;
  customerSupportReopenDetails?: string;
  contactusText?: string;
  serviceRequestAttributes?: any;
};

export default function MyServiceRequest(props: MyServiceRequestType) {
  const {
    contactusText,
    customerSupportDetails,
    customerSupportReopenDetails,
    queiriesText,
    filters,
    accordionContent,
  } = props;
  const isMobile = useMobileCheck();

  const router = useRouter();
  const [displayLoader, setLoader] = useState(false);
  const [userDataItems] = useRecoilState(userState);
  const [serviceRequestData, setServicesRequestData] =
    useState<ServiceRequestData>();
  const [ticketsData, setTicketsData] = useState<
    {
      ticketNumber: string;
      data: ServiceRequestData;
    }[]
  >([]);

  const fieldRef = useRef<HTMLInputElement>(null);
  const size = 20;
  const boundaryCount = 3;
  const siblingCount = 0;
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

  const serviceRequestAttributes = useMemo(() => {
    const routerQueryParams: any = {};
    window.location.search
      ?.split("?")[1]
      ?.split("&")
      ?.map((i) => {
        const obj = i?.split("=");
        routerQueryParams[obj[0]] = obj[1];
      });
    const filterName = routerQueryParams?.filterName?.replaceAll("+", " ");
    const currentPage = routerQueryParams?.page
      ? Number(routerQueryParams?.page)
      : 1;
    const customDateRange = routerQueryParams?.customDateRange;
    setPage(currentPage);
    return {
      filterName: filterName,
      currentPage: currentPage,
      customDateRange: customDateRange,
    };
  }, [router.asPath, global?.window?.location]);

  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }

  useEffect(() => {
    if (router?.isFallback) return;
    (async () => {
      let inputs: FiltersInput | undefined;
      const customDateRangeValue =
        serviceRequestAttributes?.customDateRange &&
        decodeURIComponent(serviceRequestAttributes?.customDateRange);
      if (serviceRequestAttributes?.customDateRange) {
        inputs = {
          filter_type: "daterange",
          filter_val: customDateRangeValue,
        };
      } else {
        const selectedFilter = filters?.find(
          (i) => i?.keyName === serviceRequestAttributes?.filterName
        );

        inputs = getFilterInputs({
          filter: {
            keyId: selectedFilter?.keyId,
            value: selectedFilter?.value,
          },
        });
      }
      if (inputs?.filter_val !== "") {
        try {
          setLoader(true);
          const res = await GetServiceByFilter({
            type: inputs?.filter_type ?? "",
            filterValue: inputs?.filter_val ?? "",
            currentPage: String(serviceRequestAttributes?.currentPage),
            value: localStorage?.getItem("customerEmailID") || "",
            mobile: localStorage?.getItem("mobileNumber") || "",
          });
          if (res?.getCRMCasesByFilter?.total_count) {
            setCount(Number(res?.getCRMCasesByFilter?.total_count));
          }
          setServicesRequestData(res?.getCRMCasesByFilter);
          setLoader(false);
        } catch (error) {
          setLoader(false);
          console.error(error);
        }
      }
    })();
    return () => {};
  }, [serviceRequestAttributes]);

  useEffect(() => {
    if (page !== Number(serviceRequestAttributes?.currentPage)) {
      const { categoryFilter, ...routerQuery } = router?.query;
      router.push({
        pathname: router.pathname,
        query: {
          ...routerQuery,
          page: page,
        },
      });
    }
  }, [page]);

  async function UpdateTicketDetails(ticketNumber?: string) {
    if (ticketNumber) {
      const index = ticketsData?.findIndex(
        (i) => i.ticketNumber === ticketNumber
      );
      if (index > -1) {
        const updatedData = ticketsData?.filter(
          (i) => i.ticketNumber !== ticketNumber
        );
        setTicketsData(updatedData);
      } else {
        setLoader(true);
        const res = await GetServiceByFilter({
          type: "caseid",
          filterValue: ticketNumber,
          currentPage: String(page),
          value: localStorage?.getItem("customerEmailID") || "",
          mobile: localStorage?.getItem("mobileNumber") || "",
        });
        const updatedData = [
          ...ticketsData,
          {
            ticketNumber: ticketNumber,
            data: { ...res?.getCRMCasesByFilter },
          },
        ];
        setTicketsData(updatedData);
        setLoader(false);
      }
    }
  }

  return (
    <>
      {displayLoader && <Loader />}
      <>
        {isMobile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            <MultipleSelectPlaceholder
              filters={filters}
              serviceRequestAttributes={serviceRequestAttributes}
              isTransactionLogs={false}
            />
          </Box>
        )}
        <MainBox>
          {!isMobile && (
            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <MultipleSelectPlaceholder
                filters={filters}
                serviceRequestAttributes={serviceRequestAttributes}
                isTransactionLogs={false}
              />
            </Box>
          )}
          {serviceRequestData?.incident_customer_contacts?.map(
            (service: ServiceTicketDetailsType, index: number, originData) => {
              let creationDate = null;
              if (service?.createdon && service?.createdon !== "") {
                const date = new Date(service?.createdon);
                const month = date.getMonth() + 1;
                creationDate = `${
                  date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
                }/${month < 10 ? "0" + month : month}/${date.getUTCFullYear()}`;
              }
              return (
                <StyledAccordion
                  sx={{
                    margin: "0px !important",
                  }}
                  $isMobile={isMobile}
                  isLastItem={index === originData?.length - 1}
                >
                  <StyledSummary
                    expandIcon={<StyledArrow />}
                    onClick={() => {
                      UpdateTicketDetails(service?.ticketnumber);
                    }}
                  >
                    {isMobile ? (
                      <Stack>
                        <AccordionTitle>
                          {`Case ID - ${service?.ticketnumber}`}
                        </AccordionTitle>
                        <AccordionSpanTitle isMobile={isMobile}>
                          {creationDate ? `  Created On: ${creationDate}` : ""}
                        </AccordionSpanTitle>
                      </Stack>
                    ) : (
                      <AccordionTitle>
                        {`Case ID - ${service?.ticketnumber}`}
                        <AccordionSpanTitle isMobile={isMobile}>
                          {creationDate ? `  Created On: ${creationDate}` : ""}
                        </AccordionSpanTitle>
                      </AccordionTitle>
                    )}
                  </StyledSummary>
                  <AccordionDetails sx={{ padding: "0px", border: "0px" }}>
                    <AccordionText>
                      <MyServiceRequestSubComponent
                        serviceData={
                          ticketsData?.find(
                            (i) => i.ticketNumber === service?.ticketnumber
                          )?.data
                        }
                        accordionContent={accordionContent?.filter(
                          (i) => !i.isHidden
                        )}
                        customerSupportDetails={customerSupportDetails}
                        customerSupportReopenDetails={
                          customerSupportReopenDetails
                        }
                        displayLoader={displayLoader}
                      />
                    </AccordionText>
                  </AccordionDetails>
                </StyledAccordion>
              );
            }
          )}
          {serviceRequestData &&
            serviceRequestData?.incident_customer_contacts?.length === 0 && (
              <Box my={3}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  {"No Records Found!!"}
                </Typography>
              </Box>
            )}
        </MainBox>
      </>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "12px",
          fontWeight: 600,
          margin: "20px 0px",
        }}
      >
        {queiriesText}
        <p dangerouslySetInnerHTML={{ __html: contactusText ?? "" }}></p>
      </Box>
      {count > size && (
        <CustomPagination
          pageCount={
            count % size == 0 ? count / size : Math.floor(count / size) + 1
          }
          scrollMargin={120}
          count={count}
          setPage={setPage}
          handleChange={handlePageChange}
          page={page}
          pageSize={size}
          fieldRef={fieldRef}
          boundaryCount={boundaryCount}
          siblingCount={siblingCount}
        ></CustomPagination>
      )}
    </>
  );
}
