import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, {useState } from "react";
import client from "../../../apollo-client";
import { DELETE_UPI_DATA } from "../../../graphQLQueries/SavedPayments";
import Loader from "../../../HOC/Loader/Loader";
import { useMobileCheck } from "../../../utility/isMobile";
import { toast } from "../../../utility/Toast";
import handleErrorResponse from "../../../utility/ErrorHandling";
const DeleteUpiId = (props: any) => {
  const [displayLoader, setDisplayLoader] = useState(false);
  const {
    deleteData,
    deletehandleClose,
    upiValue,
    ToggleHandler,
    HandleSnackBar,
  } = props;
  const isMobile = useMobileCheck();

  const handleDeleteUpi = (upiValue: any) => {
    setDisplayLoader(true);
    if (upiValue) {
      client
        .mutate({
          mutation: DELETE_UPI_DATA,
          variables: {
            upiId: upiValue,
          },
        })
        .then((resp) => {
          
          setDisplayLoader(false);
          ToggleHandler();
          deletehandleClose();
          HandleSnackBar("Your UPI deleted successfully");
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
            onClick={() => handleDeleteUpi(upiValue)}
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

export default DeleteUpiId;
