import {FormControlLabelProps,useRadioGroup} from "@mui/material";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import { Cookies } from "react-cookie";
import { useMobileCheck } from "../../utility/isMobile";
import { toast } from "../../utility/Toast";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import SelectAddress from "./SelectAddress";
import {
  TextFieldBox,
  Buttonlabel,
  TypographyTitle,
  TypographyAddressText,
  TypographyShowMore,
  TypographyLocText,
  TypographyShowLess,
  TypographySignIn,
  TypographySignUp,
  TypographyOr,
  MainGrid,
  RadioButtonStyle,
} from "./SelectLocationStyles";
import { GET_PROFILE_DATA } from "../../graphQLQueries/MyProfileQuery";
import client from "../../apollo-client";
import { pinCodeBasedCoordinates } from "../../utility/GeoAPI";
import useStorage from "../../utility/useStoarge";
import { useRecoilState } from "recoil";
import { userState, SSBLogos } from "../../recoilstore";
import { widgetType } from "../../utility/GAConstants";
import triggerGAEvent from "../../utility/GaEvents";
import graphql from "../../middleware-graphql";
import { GEO_PINCODE } from "../../graphQLQueries/GeoPincode";
import { AppIcons } from "../../utility/AppIconsConstant";
import { current_location_pointer_ICON } from "../../utility/AppIcons";
import handleErrorResponse from "../../utility/ErrorHandling";
interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}
const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  alignItems: "unset",
  "& .MuiButtonBase-root": {
    alignItems: "unset",
    color: "#AD184C",
  },
  "& .Mui-checked": {
    color: "#AD184C !important",
  },
  ".MuiFormControlLabel-label": {
    width: "100%",
  },
}));
function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();
  let checked = false;
  if (radioGroup) {
    (checked == radioGroup.value) === props.value;
  }
  return <StyledFormControlLabel checked={checked} {...props} />;
}
const SelectLocation = (props: any) => {
  const {
    selectdata,
    setZipcodeData,
    userCity,
    setUserCity,
    setUserPincode,
    CustomerID,
    handleSignup,
    setSignUpScreen,
    setInitialScreen,
    handleSignIn,
    handleClose,
    BlockhandleOpen,
    pincode,
    selectedAddressID,
    setSelectedAddressID,
    city,
    setCoordinates,
  } = props;
  const cookie = new Cookies();
  const isMobile = useMobileCheck();
  const accessToken = cookie.get("accessToken");
  const [showMore, setShowMore] = useState(true);
  const { setItem } = useStorage();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [error, setError] = useState(false);
  const [customerAddresses, setCustomerAddresses] = useState<any>([]);
  const current_location_pointer = AppIcons(current_location_pointer_ICON);
  const controlProps = (item: any) => ({
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  const showhandleMore = () => {
    setShowMore(!showMore);
  };
  const getGeoLocation = (location: any) => {
    if (location?.coords?.latitude && location?.coords?.longitude) {
      setCoordinates({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      });
    }
    handleClose();
  };
  const [pincodeData, setPincodeData] = useState("");
  useEffect(() => {
    if (accessToken) {
      const getAddresses = async () => {
        await client
          .query({
            query: GET_PROFILE_DATA,
            fetchPolicy: "no-cache",
          })
          .then((response) => {
          
            setCustomerAddresses(response?.data?.customer?.addresses);
          })
          .catch((err) => {
            console.log("error", err);
          });
      };
      getAddresses();
    }
  }, [accessToken]);
  const searchPincode = async (pincode: any) => {
    callGaEvent("search");
    if (pincode?.length == 6) {
      setError(false);
      const response = await graphql
        .mutate({
          mutation: GEO_PINCODE,
          variables: {
            pincode: pincode,
          },
        })
        .then((res) => {
        
          let locationData = res?.data?.getLatLongValues;
          setZipcodeData(locationData);
          handleClose();
          setItem("city", locationData?.city, "local");
          setItem("state", locationData?.state, "local")
          setUserDataItems((previousData) => ({
            ...previousData,
            geoLat: locationData?.latitude,
            geoLong: locationData?.longitude,
            pincode: locationData?.pincode,
            city: locationData?.city,
            state: locationData?.state
          }));
          setUserPincode(locationData?.pincode);

          setUserCity(locationData?.city);
        })
        .catch((err) => {
          console.log("in error=====>", err);
          toast.error("Someting went wrong, Please try again!!!");
          return { error: "Network Error", errorMessage: err };
        });
    } else {
      setError(true);
      callErrorEvent();
    }
  };
  useEffect(() => {
    if (navigator?.geolocation) {
    }
  }, []);
  const showError = (error: any) => {
    if (error?.message === "User denied Geolocation") {
      BlockhandleOpen();
    }
    handleClose();
  };
  const count = customerAddresses?.length - 3;
  const handlePermission = () => {
    callGaEvent("use my current location");
    navigator?.geolocation?.getCurrentPosition(getGeoLocation, showError, {
      maximumAge: 60000,
      timeout: 5000,
      enableHighAccuracy: true,
    });
  };
  const handleSignUpLocation = () => {
    callGaEvent("signup");
    handleSignup(true);
    setSignUpScreen(true);
    setInitialScreen(false);
    handleClose();
  };
  const handleSignInLocation = () => {
    callGaEvent("signin");
    handleSignIn(true);
    setSignUpScreen(false);
    setInitialScreen(true);
    handleClose();
  };
  const handleRadioChange = async (option: any) => {
    setSelectedAddressID(option.id);
    const res = await pinCodeBasedCoordinates(option?.postcode);
   

    localStorage.setItem("geoLat", res?.latitude);
    localStorage.setItem("geoLong", res?.longitude);
    setUserDataItems((previousData) => ({
      ...previousData,
      geoLat: res?.latitude,
      geoLong: res?.longitude,
    }));
    searchPincode(option?.postcode);
  };
  const callGaEvent = (link_text: string) => {
    triggerGAEvent(
      {
        link_text: link_text,
        link_url: "na",
        widget_type: widgetType,
        widget_title: selectdata?.data?.title,
        widget_description: selectdata?.data?.addressText,
        event_type: "change_location",
      },
      "click",
      cookie.get("accessToken") ? userCity : "guest user",
      "Location"
    );
  };
  const callErrorEvent = () => {
    triggerGAEvent(
      {
        error_message: "Not Found",
        error_type: "API failure",
        status: "ZERO_RESULTS",
        items: [
          {
            item_name: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_URL}/json?address=333333&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
          },
        ],
      },
      "error_event",
      cookie.get("accessToken") ? city : "guest user",
      "Location"
    );
  };
  const handleChange = (e: any) => {
    const pattern = /^[0-9]*$/;
    const x = e.target.value;

    if (x && !pattern.test(x)) {
      return;
    }

    x.length == 6 ? setError(false) : setError(true);
    setPincodeData(x.slice(0, 6));
  };

  const handlePincodeKeyDown = (event: any) => {
    let keyCharCode = event.keyCode;
    if (["e", "E", "+", "-", ".", "Unidentified"]?.includes(event.key)) {
      event.preventDefault();
    }
    if ((keyCharCode >= 48 && keyCharCode <= 57) || keyCharCode == 8) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Stack sx={{ width: "100%" }}>
      <Box p={selectdata?.bgPadding}>
        <TypographyTitle>{selectdata?.data?.title}</TypographyTitle>
        <TypographyAddressText>
          {selectdata?.data?.addressText}
        </TypographyAddressText>
        {CustomerID || cookie.get("accessToken") ? (
          <>
            {customerAddresses
              ?.slice(0, showMore ? 3 : customerAddresses?.length)
              .map((option: any, index: number) => (
                <RadioButtonStyle
                  key={index}
                  name="use-radio-group"
                  onChange={() => handleRadioChange(option)}
                  value={selectedAddressID}
                >
                  <MyFormControlLabel
                    value={selectedAddressID}
                    key={index}
                    label={<SelectAddress option={option} />}
                    control={
                      <Radio
                        sx={{
                          "&:hover": {
                            bgcolor: "transparent",
                          },
                        }}
                        disableRipple
                        {...controlProps(index)}
                        size="small"
                        checked={selectedAddressID === option.id}
                      />
                    }
                  />
                </RadioButtonStyle>
              ))}
            {customerAddresses?.length > 3 ? (
              showMore ? (
                <TypographyShowMore onClick={showhandleMore}>
                  {count + `${selectdata?.data?.showMore}`}
                </TypographyShowMore>
              ) : (
                <TypographyShowLess onClick={showhandleMore}>
                  {selectdata?.data?.showLess}
                </TypographyShowLess>
              )
            ) : null}
          </>
        ) : (
          <MainGrid container spacing={0} columns={12}>
            <Grid item xs={5.5}>
              <TypographySignIn onClick={() => handleSignInLocation()}>
                {selectdata?.data?.signIn}
              </TypographySignIn>
            </Grid>
            <Grid item xs={1}>
              <TypographyOr>{isMobile ? "" : "or"}</TypographyOr>
            </Grid>
            <Grid item xs={5.5}>
              <TypographySignUp onClick={() => handleSignUpLocation()}>
                {selectdata?.data?.signUp}
              </TypographySignUp>
            </Grid>
          </MainGrid>
        )}
        {pincode ? (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0px",
            }}
          >
            <Typography sx={{ fontWeight: "400", fontSize: "16px" }}>
              Current location
            </Typography>
            <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
              {pincode}
            </Typography>
          </Typography>
        ) : (
          ""
        )}
        <TypographyTitle>{selectdata?.data?.choosePincode}</TypographyTitle>
        <TextFieldBox
          id="standard-name"
          placeholder={selectdata?.data?.inputPincode}
          className="subscribeText"
          type="tel"
          value={pincodeData}
          helperText={error && "Invalid Pincode Please enter 6 Digits Pincode"}
          onKeyDown={handlePincodeKeyDown}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Buttonlabel
                  onClick={() => {
                    error ? " " : searchPincode(pincodeData);
                  }}
                >
                  {selectdata?.data?.searchButton}
                </Buttonlabel>
              </InputAdornment>
            ),
          }}
        />
        <TypographyLocText
          onClick={() => {
            handlePermission();
          }}
        >
          <img
            src={current_location_pointer?.url}
            alt="location_logo"
            style={{ position: "relative", top: "4px" }}
          />
          {selectdata?.data?.locationText}
        </TypographyLocText>
      </Box>
    </Stack>
  );
};
export default SelectLocation;
