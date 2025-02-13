import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { useMobileCheck } from "../../../utility/isMobile";
import AddressComponent from "../../CartAddress/AddressComponent";
import { FormControlLabelStyled } from "../../CartAddress/AddressComponentStyled";
import { Cookies } from "react-cookie";

import {
  BoxStyled,
  ButtonStyled,
  TextFieldBackground,
} from "../CartLayoutStyles";
import { useRecoilState } from "recoil";
import { cartState, userState } from "../../../recoilstore";
import {
  GetCartAddresses,
  UpdatePincode,
} from "../../../utility/CartServiceability";
import {
  CHANGE_DELIVERY_ADDRESS,
  CHANGE_TEXT,
  SAVED_ADDRESS,
} from "../../../utility/Constants";
import { RadioButtonIcon } from "../../../utility/CartUtilities";
import { AppIcons } from "../../../utility/AppIconsConstant";
import {
  CHECKED_RADIO_ICON,
  UNCHECKED_RADIO_ICON,
} from "../../../utility/AppIcons";
import useStorage from "../../../utility/useStoarge";

function PincodeChangeModal({ setPincodeChangeModalpop, setLoader }: any) {
  const cookie = new Cookies();
  const isMobile = useMobileCheck();
  const { getItem, setItem } = useStorage();
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [userPinCode, setUserPinCode] = useState<any>(userDataItems?.pincode);
  const [pincodeError, setPincodeError] = useState(false);
  const [pincodeErrorMessage, setPincodeErrorMessage] = useState("");
  const accessToken = cookie.get("accessToken");
  const [checkedRadioButtonIcon, setCheckedRadioButtonIcon] = useState<
    any | null
  >(AppIcons(CHECKED_RADIO_ICON));
  const [unCheckedRadioButtonIcon, setUnCheckedRadioButtonIcon] = useState<
    any | null
  >(AppIcons(UNCHECKED_RADIO_ICON));

  useEffect(() => {
    setLoader(true);
    const getAddress = async () => {
      await GetCartAddresses(setCartStore);
      setLoader(false);
    };
    if (cookie.get("accessToken")) {
      getAddress();
    } else {
      setLoader(false);
    }
  }, []);
  const pincodeChangeHandler = async (newPincode: any) => {
    if (newPincode?.length == 6) {
      setPincodeError(false);
      setUserPinCode(newPincode);
      setItem("changedCartPincode", newPincode, "local"); 
      const response = await UpdatePincode(newPincode, setUserDataItems);
      if (response?.error) {
        setPincodeErrorMessage(response?.error);
        setPincodeError(true);
      } else {
        setPincodeChangeModalpop(false);
      }
    }
  };
  const handlerPincode = (e: any) => {
    const newPincode = e?.target?.value;
    if (newPincode[0] == "0") {
      return;
    }
    if (newPincode?.length <= 6) {
      newPincode?.match(/^[0-9]*$/) && setUserPinCode(e?.target?.value);
    }
    if (newPincode?.length === 6) {
      setPincodeError(false);
    } else {
      setPincodeError(true);
      setPincodeErrorMessage("Pin code should contain 6 digits");
    }
  };

  return (
    <>
      <Box sx={{ margin: "20px" }}>
        <Typography sx={{ fontWeight: "700", fontSize: "16px" }}>
          {CHANGE_DELIVERY_ADDRESS}
        </Typography>

        <BoxStyled sx={{ paddingTop: "24px", flexDirection: "column" }}>
          <TextFieldBackground
            id="outlined-basic"
            label=""
            sx={{
              height: isMobile ? "49px" : "40px",
              width: "100%",
              justifyContent: "space-around",
              "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiInputBase-input.MuiOutlinedInput-input": {
                color: "#231F20",
                fontWeight: 400,
                fontSize: isMobile ? "12px" : "14px",
                lineHeight: isMobile ? "14px" : "140%",
              },
            }}
            value={userPinCode}
            onChange={handlerPincode}
            variant="outlined"
            error={pincodeError}
            fullWidth
            InputLabelProps={{
              style: { color: "#231F20", fontWeight: "600" },
            }}
            InputProps={{
              style: {
                padding: 0,
                margin: 0,
                borderRadius: 0,
              },
              endAdornment: (
                <ButtonStyled
                  onClick={() => pincodeChangeHandler(userPinCode)}
                  disabled={userPinCode?.length < 6}
                  $isMobile={isMobile}
                >
                  {CHANGE_TEXT}
                </ButtonStyled>
              ),
            }}
            inputProps={{
              inputMode: "numeric",
              maxLength: 6,
              pattern: "/^[0-9]d{5}$/",
            }}
          />
          {pincodeError && (
            <Typography sx={{ color: "red", fontSize: "10px" }}>
              {pincodeErrorMessage}
            </Typography>
          )}
        </BoxStyled>
        {accessToken && cartStore?.userAddresses && (
          <Box>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "14px",
                padding: "10px 0px 10px 0px",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Divider orientation="horizontal">
                <Typography>or</Typography>
              </Divider>
            </Typography>
            <Typography
              sx={{ fontWeight: "600", fontSize: "12px", color: "#A7A5A6" }}
            >
              {SAVED_ADDRESS}
            </Typography>

            {cartStore?.userAddresses?.addresses?.map(
              (pincodeChangeAddress: any, index: any) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      border: "1px solid #DEDEDE",
                      padding: isMobile ? "12px 16px" : "20px",
                      marginLeft: isMobile ? "9%" : "",
                      marginBottom: "16px",
                    }}
                  >
                    <FormControlLabelStyled
                      labelPlacement="start"
                      label=""
                      control={
                        <Radio
                          checkedIcon={
                            <RadioButtonIcon
                              imageUrl={checkedRadioButtonIcon?.url}
                            />
                          }
                          icon={
                            <RadioButtonIcon
                              imageUrl={unCheckedRadioButtonIcon?.url}
                            />
                          }
                        />
                      }
                      checked={pincodeChangeAddress?.postcode == userPinCode}
                      onClick={() => [
                        pincodeChangeHandler(pincodeChangeAddress?.postcode),
                      ]}
                      sx={{
                        display: "flex",
                        position: "relative",
                        float: "right",
                        bottom: isMobile ? "86%" : "6px",
                        right: isMobile ? "103%" : "",
                        marginRight: isMobile
                          ? "14px !important"
                          : "-6px !important",
                        marginTop: isMobile
                          ? "-18px !important"
                          : "0px !important",
                      }}
                    />

                    <AddressComponent
                      address={pincodeChangeAddress}
                      editVisible={true}
                      cartStore={cartStore}
                      setCartStore={setCartStore}
                    />
                  </Box>
                );
              }
            )}
          </Box>
        )}
      </Box>
    </>
  );
}

export default PincodeChangeModal;
