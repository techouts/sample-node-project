import { Box } from "@mui/material";
import MyOrders from "./MyOrders";
import React, { useState, useEffect, useCallback } from "react";
import MyOrdersSearchBar from "./MyOrdersSearchBar/MyOrdersSearchBar";
import client from "../../apollo-client";
import { GET_ORDERS_DATA } from "../../graphQLQueries/OrdersQuery";
import OrderSummary from "../OrderDetails/OrderSummary";
import Loader from "../../HOC/Loader/Loader";
import { useRouter } from "next/router";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import { callScrollEvent } from "../../utility/ScrollEventAnalytics";

let size = 10;
function MyOrdersLayout({__component, id,position}: any) {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [ordersData, setordersData] = useState([]);
  const [isSearch, setIsSearch] = useState<any>("");
  const [selectedOrderFilter, setSelectedOrderFilter] = useState<any>("");
  const [orderId, setOrderId] = useState<any>();
  const [isSelected, setIsSelected] = useState(false);
  const [displayLoader, setLoader] = useState(false);
  const [snackBarToast, setSnackBarToast] = useState<boolean>(false);
  const [isSearchClick, setIsSearchClick] = useState<boolean>(false);
  const [isSnackBarMessage, setIsSnackBarMessage] = useState<String>("");
  const [isItemId, setIsItemId] = useState("");
  const [allOrdersRerender, setAllOrdersRerender] = useState("");
  const [selectedOrderNumber, setSelectedOrderNumber] = useState<
    String | undefined | null
  >(undefined);

  useCallback(
    () =>
      setSelectedOrderNumber(
        new URLSearchParams(window.location.search).get("orderNumber")
      ),
    []
  );
  const searchClickHandler = () => {
    setIsSearchClick(!isSearchClick);
  };
  const router = useRouter();
  useEffect(() => {
    if (router?.query?.orderNumber && router?.query?.orderNumber?.length > 0) {
      setIsSelected(true);
      setOrderId(router?.query?.orderNumber);
    }
  }, [router?.query?.orderNumber]);
  const getFormattedDate = (date: any, endDay?: boolean) => {
    let year = date?.getFullYear();
    let month = ("0" + (date?.getMonth() + 1)).slice(-2);
    let day = ("0" + date?.getDate()).slice(-2);
    return `${year}-${month}-${day} ${endDay ? "23:59:59" : "00:00:00"}`;
  };
  useEffect(() => {
    let finalVariables: any = {
      search: isSearch,
    };
    if (
      selectedOrderFilter == "refund_complete" ||
      selectedOrderFilter == "Delivered" ||
      selectedOrderFilter == "Cancelled"
    ) {
      finalVariables = {
        search: isSearch,
        filter: {
          status: selectedOrderFilter.toLowerCase(),
        },
      };
    } 
    else if(selectedOrderFilter == "default"){
      finalVariables = {...finalVariables}
    }
    else if (selectedOrderFilter) {
      let tillDate = new Date();
      switch (selectedOrderFilter) {
        case "1M":
          tillDate.setMonth(tillDate.getMonth() - 1);
          break;
        case "6M":
          tillDate.setMonth(tillDate.getMonth() - 6);
          break;
        case "12M":
          tillDate.setMonth(tillDate.getMonth() - 12);
          break;
        default:
          finalVariables = { search: isSearch };
          break;
      }
      finalVariables = {
        search: isSearch,
        filter: {
          created_at: {
            from: getFormattedDate(tillDate),
            to: getFormattedDate(new Date(), true),
          },
        },
      };
    }
    Object.assign(finalVariables, {
      sort: { created_at: "DESC" },
      pageSize: size,
      currentPage: page,
    });
    setLoader(true);
    client
      .query({
        query: GET_ORDERS_DATA,
        variables: finalVariables,
        fetchPolicy: "no-cache",
        errorPolicy: "ignore",
      })
      .then((res) => {
      
        setLoader(false);
        if (
          isSearch ||
          selectedOrderFilter ||
          selectedOrderFilter == "refund_complete" ||
          selectedOrderFilter == "delivered" ||
          selectedOrderFilter == "Cancelled"
        ) {
          if (res?.data?.customer?.orders?.items?.length == 0) {
            enableSnackMessage(
              `No Results Found for the ${selectedOrderFilter || isSearch}.`
            );
          } else {
            const filteredSearchOrders =
              res?.data?.customer?.orders?.items?.map((data: any) => {
                const filteringChildItem = data?.items?.filter((data1: any) =>
                  data1?.product_name
                    ?.toLowerCase()
                    .includes(isSearch?.toLowerCase())
                );
                return { ...data, items: filteringChildItem };
              });
            setordersData(filteredSearchOrders);
          }
        } else {
          setordersData(res?.data?.customer?.orders?.items);
        }
        setCount(res?.data?.customer?.orders?.total_count);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoader(false);
      });
  }, [page, isSearchClick, selectedOrderFilter, allOrdersRerender]);


  const enableSnackMessage = (message: string) => {
    setSnackBarToast(true);
    setIsSnackBarMessage(message);
  };

  callScrollEvent();

  return (
    <>
      {displayLoader && <Loader />}
      {!displayLoader && (
        <Box
          sx={{
            width: "100%",
          }}
        >
          {!isSelected ? (
            <>
              {ordersData?.length > 0 && (
                <MyOrdersSearchBar
                  setIsSearch={setIsSearch}
                  isSearch={isSearch}
                  setSelectedOrderFilter={setSelectedOrderFilter}
                  searchClickHandler={searchClickHandler}
                  selectedOrderFilter={selectedOrderFilter}
                  ordersData={ordersData}
                  __component={__component}
                  id={id}
                  position={position}
                />
              )}
              <MyOrders
                items={ordersData}
                setOrderId={setOrderId}
                setIsSelected={setIsSelected}
                page={page}
                setPage={setPage}
                count={count}
                displayLoader={displayLoader}
                orderNumber={orderId}
                setIsItemId={setIsItemId}
                enableSnackMessage={enableSnackMessage}
                id={id}
                 __component={__component}
                 position={position}
              />
            </>
          ) : (
            <OrderSummary
              orderNumber={orderId}
              setIsSelected={setIsSelected}
              displayLoader={displayLoader}
              isItemId={isItemId}
              setAllOrdersRerender={setAllOrdersRerender}
              id={id}
              __component={__component}
              position={position}
            ></OrderSummary>
          )}
          <CustomSnackBar
            setSnackBarOpen={setSnackBarToast}
            snackBarOpen={snackBarToast}
            snackMessage={isSnackBarMessage}
            setSnackMessage={setIsSnackBarMessage}
          />
        </Box>
      )}
    </>
  );
}
export default MyOrdersLayout;
