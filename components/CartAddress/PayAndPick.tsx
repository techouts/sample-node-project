import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import BasicModal from "../../HOC/Modal/ModalBlock";
import PincodeChangeModal from "../CartLayout/FreeSampleModal/PincodeChangeModal";
import {
  FormControlStyled,
  StyledRadioGroup,
  FormControlLabelStyled,
} from "./AddressComponentStyled";
import {
  SubTitle,
  ButtonStyled,
  PayAndPickupSubText,
  NearestStoreTypography,
  PayAndPickupSubTextMobile,
} from "./PrimaryComponentStyled";
import SelectStoreComponent from "./SelectStoreComponent";
import { useMobileCheck } from "../../utility/isMobile";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import useStorage from "../../utility/useStoarge";
import { UpdatePincode } from "../../utility/CartServiceability";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  SELECT_TEXT,
  STORE_TEXT,
  PAY_AND_PICK,
  CHANGE_TEXT,
  CHECK_TEXT,
  NEAREST_STORE,
} from "../../utility/Constants";
import { RadioButtonIcon } from "../../utility/CartUtilities";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  CHECKED_RADIO_ICON,
  TICK_CIRCLE_WARNING,
  UNCHECKED_RADIO_ICON,
  VERIFIED_IMAGE_ICON,
} from "../../utility/AppIcons";

export function PayAndPick({
  setLoader,
  handleErrorAlert,
  cartStore,
  setCartStore,
}: any) {
  const isMobile = useMobileCheck();
  const [isVerify, setIsVerify] = useState(false);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [pincode, setPincode] = useState(userDataItems?.pincode);
  const [pincodeChangeModalpop, setPincodeChangeModalpop] = useState(false);
  const [selectedStore, setSelectedStore] = useState<any>(0);
  const checkedRadioButtonIcon = AppIcons(CHECKED_RADIO_ICON);
  const unCheckedRadioButtonIcon = AppIcons(UNCHECKED_RADIO_ICON);
  const handlepincodeChangeModalclose = () => {
    setPincodeChangeModalpop(false);
  };
  const handleVerifyPinCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pinValue = event.target.value;
    const changePincode = async () => {
      const response = await UpdatePincode(pinValue, setUserDataItems);
      if (response != undefined) {
        setPincode(pinValue);
      } else {
        setLoader(false);
        handleErrorAlert(" Failed to change the pincode ");
      }
    };
    if (pinValue.length == 6) {
      changePincode();
    }

    if (event?.target?.value == pincode) {
      setIsVerify(true);
    } else {
      setIsVerify(false);
    }
  };
  const handleStoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedStore(value);
  };

  useEffect(() => {
    {
      cartStore?.serviceability?.cc ||
      cartStore?.serviceability?.ed ||
      cartStore?.serviceability?.sd
        ? setIsVerify(true)
        : setIsVerify(false);
    }
  }, [cartStore?.serviceability]);

  useEffect(() => {
    setCartStore((previousData: any) => ({
      ...previousData,
      storeId: cartStore?.serviceabilityStores?.[selectedStore]?.id,
    }));
  }, [selectedStore, cartStore?.serviceabilityStores]);

  const VERIFIED_IMAGE = AppIcons(VERIFIED_IMAGE_ICON);
  const TickCircleWarning = AppIcons(TICK_CIRCLE_WARNING);
  return (
    <>
      {/* For searching stores */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "top",
          paddingTop: "40px",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {!isMobile && (
          <Stack>
            <SubTitle $isMobile={isMobile}>
              {cartStore?.serviceabilityStores.length !== 0
                ? `${SELECT_TEXT} ${STORE_TEXT}`
                : `${PAY_AND_PICK} Not Available For This Pincode`}
            </SubTitle>
            {!cartStore?.serviceabilityStores?.length && (
              <PayAndPickupSubText isMobile={isMobile}>
                {"Either change your delivery mode or pincode"}
              </PayAndPickupSubText>
            )}
          </Stack>
        )}

        {isMobile && (
          <SubTitle $isMobile={isMobile}>
            {`${SELECT_TEXT} ${STORE_TEXT}`}
          </SubTitle>
        )}
        <Box
          width={isMobile ? "100%" : "40%"}
          height={isMobile ? "49px" : "40px"}
          sx={{ backgroundColor: "#F7F6F9" }}
        >
          <Box
            sx={{
              width: "100%",
              height: isMobile ? "49px" : "40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgb(247, 246, 249)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                marginLeft: isMobile ? "12px" : "20px",
                gap: "6px",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "140%",
                  color: "#231F20",
                }}
              >
                {userDataItems?.pincode}
              </Typography>
              {isVerify && (
                <>
                  <img
                    src={
                      isMobile
                        ? `${ReplaceImage(TickCircleWarning?.url)}`
                        : `${ReplaceImage(VERIFIED_IMAGE?.url)}`
                    }
                    alt="verify"
                    width="20px"
                    height="20px"
                  />
                </>
              )}
            </Box>
            <Box>
              <ButtonStyled
                $isMobile={isMobile}
                onClick={() => {
                  setPincodeChangeModalpop(true);
                }}
              >
                {userDataItems?.pincode ? CHANGE_TEXT : CHECK_TEXT}
              </ButtonStyled>
            </Box>
          </Box>
          {pincodeChangeModalpop && (
            <BasicModal
              top={"50%"}
              width={isMobile ? "100%" : "521px"}
              left={"50%"}
              height={"70%"}
              overflowData={"scroll"}
              open={pincodeChangeModalpop}
              handleClose={handlepincodeChangeModalclose}
              Component={
                <PincodeChangeModal
                  setLoader={setLoader}
                  setPincodeChangeModalpop={setPincodeChangeModalpop}
                />
              }
            ></BasicModal>
          )}
        </Box>
      </Box>
      {isMobile && !cartStore?.serviceabilityStores?.length && (
        <Stack>
          <PayAndPickupSubTextMobile>
            {"Pay and Pick Up Not Available For This Pincode"}
          </PayAndPickupSubTextMobile>
          <PayAndPickupSubText isMobile={isMobile}>
            {"Either change your delivery mode or pincode"}
          </PayAndPickupSubText>
        </Stack>
      )}
      {/* For displaying stores */}
      {cartStore?.serviceabilityStores?.length ? (
        <FormControlStyled isMobile={isMobile}>
          <StyledRadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selectedStore}
            onChange={handleStoreChange}
            style={{ position: "relative", float: "right" }}
          >
            <NearestStoreTypography $isMobile={isMobile}>
              {NEAREST_STORE}
            </NearestStoreTypography>
            {cartStore?.serviceabilityStores?.map((store: any, index: any) => (
              <>
                {store && (
                  <Box
                    key={index}
                    sx={{
                      border: "1px solid #DEDEDE",
                      padding: isMobile ? "12px 16px" : "20px",
                      marginLeft: isMobile ? "9%" : "",
                      marginBottom: isMobile ? "5%" : "2%",
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
                      value={index}
                      sx={{
                        display: "flex",
                        position: "relative",
                        float: "right",
                        right: isMobile ? "103%" : "",
                        bottom: isMobile ? "86%" : "0px",
                        marginRight: isMobile ? "14px !important" : "0px",
                        marginTop: isMobile
                          ? "-18px !important"
                          : "0px !important",
                      }}
                    />
                    <SelectStoreComponent
                      store={store.address}
                      userLat={userDataItems?.geoLat}
                      userLng={userDataItems?.geoLong}
                    />
                  </Box>
                )}
              </>
            ))}
          </StyledRadioGroup>
        </FormControlStyled>
      ) : null}
    </>
  );
}
