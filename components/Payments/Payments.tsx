import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
import client from "../../apollo-client";
import {
  OrderPlaceQuery,
  SetPaymentMethodQuery,
} from "../../graphQLQueries/PaymentQuery";
import useStorage from "../../utility/useStoarge";
import { toast } from "../../utility/Toast";
import Loader from "../../HOC/Loader/Loader";
import { Cookies } from "react-cookie";
import { JUSPAY_RETURN_URL } from "../../utility/Constants";
import { getSourceInfo } from "../../utility/commonUtility";
import handleErrorResponse from "../../utility/ErrorHandling";


const Payments = () => {
  const router = useRouter();
  const { getItem } = useStorage();
  const [displayLoader, setLoader] = useState(false);
  const [value, setValue] = React.useState("cashondelivery");
  const cookie = new Cookies();

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const { setItem } = useStorage();
  const handleContinue = async () => {
    setLoader(true);
    await client
      .mutate({
        mutation: SetPaymentMethodQuery,
        variables: {
          cartId: getItem("BuyNowCartID", "local")
            ? `${getItem("BuyNowCartID", "local")}`
            : `${getItem("cartID", "local")}`,
          code: "cashondelivery",
        },
      })
      .then((response: any) => {


      })
      .catch((error: any) => {
        toast.error("Someting went wrong, Please try again!!!");
        console.log(error)});

    await client
      .mutate({
        mutation: OrderPlaceQuery,
        variables: {
          cart_id: getItem("BuyNowCartID", "local")
            ? `${getItem("BuyNowCartID", "local")}`
            : `${getItem("cartID", "local")}`,
            access_token: cookie.get("accessToken"),
            source_from_info: getSourceInfo()
        },
      })
      .then((response: any) => {
        const hasError =  handleErrorResponse(response?.data) //response checking
        if (hasError) return null;
        if (response?.data) {
          const orderId = response?.data?.confirmPlaceOrder?.order?.order_number;
          router?.push(`${JUSPAY_RETURN_URL}?id=${orderId}`);
        }
      })
      .catch((error: any) => {
        toast.error("Someting went wrong, Please try again!!!");
        setLoader(false);
      });
  };

  return (
    <>
      {displayLoader && <Loader />}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
            defaultValue={value}
            row
            sx={{
              "& .MuiRadio-root.Mui-checked": { color: "#AD184C" },
              "& .MuiButtonBase-root.MuiRadio-root": { padding: "4px" },
            }}
          >
            <FormControlLabel
              value="cashondelivery"
              control={<Radio />}
              label="Cash On Delivery"
            />
            <FormControlLabel
              value="Online Payment"
              control={<Radio />}
              disabled
              label="Online Payment"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box
        sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}
      >
        <Button
          sx={{
            width: "auto",

            borderRadius: "0", //in shorthand property not working

            border: " solid #DEA3B7 thin",

            marginRight: "10px",

            color: "black",

            height: "45px",

            marginTop: "25px",

            padding: "0 30px 0 30px",

            "&:hover, &.Mui-focusVisible": {
              backgroundColor: "#DEA3B7",

              color: "black",

              border: "1px solid #231F20",
            },
          }}
          onClick={handleContinue}
        >
          CONTINUE
        </Button>
      </Box>
    </>
  );
};

export default Payments;
