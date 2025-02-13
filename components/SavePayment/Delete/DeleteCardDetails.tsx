import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useState } from "react";
import client from "../../../apollo-client";
import { DELETE_CARD_DETAILS } from "../../../graphQLQueries/SavedPayments";
import Loader from "../../../HOC/Loader/Loader";
import { useMobileCheck } from "../../../utility/isMobile";
import { toast } from "../../../utility/Toast";
import handleErrorResponse from "../../../utility/ErrorHandling";
const DeleteCardDetails = (props: any) => {
  const [displayLoader, setDisplayLoader] = useState(false);
  const {
    deleteData,
    deletehandleClose,
    ToggleHandler,
    HandleSnackBar,
    DeleteCardId,
  } = props;
  const isMobile = useMobileCheck();

  const handleDeleteCard = (DeleteCardId: any) => {
    setDisplayLoader(true);
    if (DeleteCardId) {
      client
        .mutate({
          mutation: DELETE_CARD_DETAILS,
          variables: {
            card_token: DeleteCardId,
          },
        })
        .then((resp) => {
          const hasError =    handleErrorResponse(resp?.data?.DeleteCustomerCard?.status) //response checking
          if (hasError) return null;
          
          if (resp?.data?.DeleteCustomerCard?.status) {
            deletehandleClose();
            setDisplayLoader(false);
            ToggleHandler();
            HandleSnackBar("Your Card deleted successfully");
          }
        })
        .catch((err) => {
          toast.error("Someting went wrong, Please try again!!!");
          console.log("err=====>", err);
        })
        .finally(() => {
          setDisplayLoader(false);
        });
    }
  };
  return (
    <>
      {displayLoader && <Loader />}
      <Box
        p={deleteData?.bgPadding}
        sx={{ textAlign: "center", margin: isMobile ? "0px" : "26px" }}
      >
        <Typography sx={{ padding: "20px 0px" }}>
          {deleteData?.delete?.deleteTitle}
        </Typography>
        <Typography>
          <Button
            onClick={() => handleDeleteCard(DeleteCardId)}
            sx={{
              backgroundColor: "black",
              borderRadius: "0px",
              color: "white",
              margin: "10px",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            {deleteData?.delete?.deleteSave}
          </Button>
          <Button
            sx={{
              backgroundColor: "pink",
              borderRadius: "0px",
              color: "black",
              margin: "10px",

              "&:hover": {
                backgroundColor: "pink",
              },
            }}
            onClick={() => deletehandleClose()}
          >
            {deleteData?.delete?.deleteCancel}
          </Button>
        </Typography>
      </Box>
    </>
  );
};

export default DeleteCardDetails;
