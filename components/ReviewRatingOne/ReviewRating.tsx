import React, { useState, useEffect, useRef } from "react";
import client from "../../apollo-client";
import ReviewRatingData from "./ReviewRatingData";
import { CUSTOMER_RATINGS } from "../../graphQLQueries/CustomerRatings/GetCustomerRatings";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ErrorOrders } from "../MyOrders/MyOrdersStyles";
import Loader from "../../HOC/Loader/Loader";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import { useMobileCheck } from "../../utility/isMobile";
import CustomPagination from "../../HOC/CustomPagination/CustomPagination";
import handleErrorResponse from "../../utility/ErrorHandling";

const ReviewRating = (props: any) => {
  const componentNameFromCMS = props?.__component;
  const position = props?.position+1;
  const id = props?.id;
  const [totalComponentData, setTotalComponentData] = useState([]);
  const [displayLoader, setLoader] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [count, setCount] = useState(1);
  const isMobile = useMobileCheck();
  const fieldRef = useRef<HTMLInputElement>(null);

  const size = 6;
  const boundaryCount = isMobile ? 2 : 3;
  const siblingCount = 0;

  const ToggleHandler = () => {
    setToggle(!toggle);
  };

  const handleSnackbarMessage = (message: string) => {
    setSnackBarOpen(true);
    setSnackMessage(message);
  };

  const removeItem = (index: number) => {
    const wholeObjectIndexOne = totalComponentData.slice(0, index);
    const wholeObjectIndexTwo = totalComponentData.slice(index + 1);
    setTotalComponentData([...wholeObjectIndexOne, ...wholeObjectIndexTwo]);
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setLoader(true);
    client
      .query({
        query: CUSTOMER_RATINGS,
        variables: {
          pagesize: size,
          CurrentPage: page,
        },
        fetchPolicy: "no-cache",
      })
      .then((res: any) => {
      
        setTotalComponentData(res?.data?.GetCustomerRatings?.[0]?.ratings);
        setCount(res?.data?.GetCustomerRatings?.[0]?.total_count);
        setLoader(false);
        scrollUp();
      })
      .catch((error: any) => {
        console.log(error);
        setPage(1);
      })
      .finally(() => setLoader(false));
  }, [toggle, page]);

  useEffect(() => {
    setPageCount(
      count % size == 0 ? count / size : Math.floor(count / size) + 1
    );
  }, [count]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setLoader(true);
    setPage(value);
  };

  return (
    <>
      {displayLoader && <Loader />}
      {!displayLoader && (
        <Grid ref={fieldRef}>
          <CustomSnackBar
            snackBarOpen={snackBarOpen}
            setSnackBarOpen={setSnackBarOpen}
            snackMessage={snackMessage}
          />
          {totalComponentData?.length > 0 ? (
            <div>
              {totalComponentData?.map((componentData: any, index: number) => {
                const itemsDataSendAsProps = {
                  ...componentData,
                  removeItem: removeItem,
                  parentIndex: index,
                  ToggleHandler: ToggleHandler,
                  handleSnackbarMessage: handleSnackbarMessage,
                };
                return (
                  <>
                    <ReviewRatingData
                      key={componentData?.review_id}
                      {...itemsDataSendAsProps}
                      componentNameFromCMS={componentNameFromCMS}
                      position={position}
                      id={id}
                    />
                  </>
                );
              })}
              {count >= 6 && (
                <CustomPagination
                  pageCount={pageCount}
                  count={count}
                  setPage={setPage}
                  handleChange={handleChange}
                  page={page}
                  pageSize={size}
                  products={totalComponentData}
                  fieldRef={fieldRef}
                  scrollMargin={true}
                  boundaryCount={boundaryCount}
                  siblingCount={siblingCount}
                />
              )}
            </div>
          ) : (
            <ErrorOrders>
              <Typography>
                You have not added any Ratings and Reviews yet
              </Typography>
            </ErrorOrders>
          )}
        </Grid>
      )}
    </>
  );
};

export default ReviewRating;
