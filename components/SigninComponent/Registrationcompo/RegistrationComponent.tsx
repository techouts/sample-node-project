import Box from "@mui/material/Box";
import { inputLabelClasses } from "@mui/material";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CryptoJS from "crypto-js";
import { useContext, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useRecoilState } from "recoil";
import client from "../../../apollo-client";
import { useAppContext } from "../../../context/userInfoContext";
import { LIST_OF_STATES } from "../../../graphQLQueries/StateList";
import { userState } from "../../../recoilstore";
import {
  access_token_flow,
  getTierLogo,
  getTierTitle,
} from "../../../utility/commonUtility";
import {
  checkValidity,
  elementDetail,
  updateObject,
} from "../../../utility/CustomValidations";
import triggerGAEvent from "../../../utility/GaEvents";
import {
  pinCodeBasedCoordinates,
  pinCodeBasedLocationDetails,
} from "../../../utility/GeoAPI";
import { useMobileCheck } from "../../../utility/isMobile";
import useStorage from "../../../utility/useStoarge";
import { MobileContext } from "../SignInComponent";
import {
  createProfileAPI,
  getProfileAPI,
  getProfileData,
} from "../utils/SSOAPI";
import DatePicker from "./DatePicker";
import {
  ButtonSave,
  DisplayGrid,
  FormControlStyle,
  FormLabelReg,
  RadioButton,
  RadioGroups,
  SkipNow,
  SmallTitle,
  StyledStack,
  TextFieldReg,
  Title,
  GridRadio,
  TypographySpan,
  FormControlLabelStyled,
} from "./RegistrationStyles";
import { chatBotUtility } from "../../../utility/chatBotObjUtility";
import handleErrorResponse from "../../../utility/ErrorHandling";

export default function RegistrationComponent({
  Registration,
  handleClose,
  setCustomerID,
  isSignUpJourney,
  setLoader,
  setNetworkError,
  setNetworkErrorMessage,
  setReRender,
  gravityUser,
  setSnackBarMessage,
  setOtpErrorSnackBarOpen,
}: any) {
  const isMobile = useMobileCheck();
  const router = useRouter();
  const userInfoContext = useAppContext();
  const { updateContextData } = userInfoContext;
  const cookie = new Cookies();
  const MobileNumber = useContext(MobileContext);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const { setItem, getItem } = useStorage();
  const [dob, setDob] = useState<Date | null>(null);
  const [genderValue, setGenderValue] = useState("Male");
  const [anniversary, setAnniversary] = useState<Date | null>(null);
  const [showSkipNow, setShowSkipNow] = useState(false);
  const [stateList, setStateList] = useState([] as any);

  const [formIsValid, setFormIsValid] = useState(false);
  const [isFormTouched, setIsFormTouched] = useState(gravityUser);
  const [populatedCity, setPopulatedCity] = useState("");
  const [populatedState, setPopulatedState] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pinCodeError, setPinCodeEError] = useState(false);
  const [regionId, setRegionID] = useState(0);

  const [userType, setUserType] = useState("");

  // useError to be updated by input change handler,enabling error management

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    emailId: false,
    pinCode: false,
    cityData: false,
    stateData: false,
    addressData: false,
  });

  useEffect(() => {
    if (isFormTouched) {
      let isValid = false;
      const validateForm = () => {
        const isValid =
          userDetails?.emailId?.value?.length > 0 &&
          !errors?.emailId &&
          !errors?.pinCode &&
          !pinCodeError &&
          (populatedCity || !errors?.cityData) &&
          (populatedState || !errors?.stateData) &&
          !errors?.addressData &&
          genderValue;
        return Boolean(isValid);
      };

      if (gravityUser || !isSignUpJourney) {
        isValid =
          userDetails?.firstName?.value?.length > 0 &&
          userDetails?.lastName?.value?.length > 0 &&
          !errors?.firstName &&
          !errors?.lastName &&
          validateForm();
      } else {
        isValid = validateForm();
      }

      setFormIsValid(isValid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    errors,
    isFormTouched,
    dob,
    anniversary,
    isSignUpJourney,
    populatedCity,
    pinCodeError,
    populatedState,
    gravityUser,
  ]);
  //useStae contatin all form elements and their validation rules to be applied

  const [userDetails, setUserDetails] = useState({
    firstName: elementDetail(
      (getItem("fName", "local") as string) || "",
      true,
      true,
      1,
      24
    ),
    lastName: elementDetail(
      (getItem("lName", "local") as string) || "",
      true,
      true,
      1,
      20
    ),
    emailId: elementDetail(
      (getItem("email", "local") as string) || "",
      true,
      true,
      8,
      64,
      undefined,
      true
    ),
    pinCode: elementDetail("", false, true, 6, 6),
    cityData: elementDetail(populatedCity || "", false, true, 1, 15),
    stateData: elementDetail(populatedState || "", false, true, 1, 30, true),
    addressData: elementDetail("", false, true, 1, 200, undefined),
  });

  useEffect(() => {
    client
      .query({
        query: LIST_OF_STATES,
        fetchPolicy: "no-cache",
      })
      .then((response: any) => {
       
        setStateList(response?.data?.country?.available_regions);
      })
      .catch((err: any) => console.log(err));
  }, []);

  // on change functaionality which does all the validations check and updates the state variable,erros state,formValid variable to help us show errors
  const inputChangedHandler = (event: any) => {
    setIsFormTouched(true);
    let inputIdentifier = event.target.name;
    let enteredValue = event.target.value;

    if (inputIdentifier === "emailId") {
      enteredValue = enteredValue.toLowerCase();
      const pattern = /^[a-z0-9@._$*#!%&'+/=?^_`{|}~-]*$/;
      if (!pattern.test(enteredValue)) {
        return;
      }
    }

    if (inputIdentifier === "firstName" || inputIdentifier === "lastName") {
      const pattern = /^[a-zA-Z]+$/;

      if (enteredValue && !pattern.test(enteredValue)) {
        return;
      }
    }

    if (inputIdentifier === "pinCode") {
      const pattern = /^[0-9]*$/;
      if (enteredValue && !pattern.test(enteredValue)) {
        return;
      }
      enteredValue = enteredValue.slice(0, 6);
    }
    if (inputIdentifier == "stateData") {
      enteredValue = enteredValue + "";
    }
    if (inputIdentifier == "addressData") {
      const addressRegx = /^[a-zA-Z0-9\s,@.#/-]*$/;

      if (enteredValue && !addressRegx.test(enteredValue)) {
        return;
      }
    }
    const updatedFormElement = updateObject(
      userDetails[inputIdentifier as keyof typeof userDetails],
      {
        value: enteredValue,
        valid: checkValidity(
          enteredValue,
          //@ts-ignore:next-line
          userDetails[inputIdentifier as keyof typeof userDetails]?.validation
        ),
        touched: true,
      }
    );

    //TO identifire all the errors in one error
    setErrors({ ...errors, [inputIdentifier]: !updatedFormElement.valid });

    //
    const updatedContactForm = updateObject(userDetails, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedContactForm) {
      formIsValid = updatedContactForm[inputIdentifier].valid && formIsValid;
    }

    //All validation true make button enable
    setUserDetails(updatedContactForm);
    setFormIsValid(formIsValid);
  };
  const handleKeyRestrictions = (event: any) => {
    const re = /[a-zA-Z :]+/g;
    if (!re.test(event.key)) {
      event.preventDefault();
    }
    let key = event.key;
    let keyCharCode = key.charCodeAt(0);

    // Allowing Alphabets  and restricting all other characters
    if (
      (keyCharCode >= 65 && keyCharCode <= 90) ||
      (keyCharCode >= 97 && keyCharCode <= 122)
    ) {
      return key;
    } else {
      if (keyCharCode === 8377 || keyCharCode === 46) {
        event.preventDefault();
      }
      event.preventDefault();
    }

    return false;
  };

  const handlePinCodeKeyRestrictions = (event: any) => {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenderValue(event.target.value);
  };

  const getFormattedDate = (date: any) => {
    let year = date?.getFullYear();
    let month = ("0" + (date?.getMonth() + 1)).slice(-2);
    let day = date?.getDate();

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const getLocationDetails = async () => {
      const LocationResponse = await pinCodeBasedLocationDetails(
        userDetails?.pinCode?.value
      );
      const city = LocationResponse?.city;
      const geoState = LocationResponse?.state;
      setPopulatedCity(city);
      setPopulatedState(geoState);
      const regionId = stateList?.find(
        (state: any) => state?.name.toLowerCase() == geoState?.toLowerCase()
      ) as any;

      setRegionID(regionId?.id);
      if (LocationResponse?.pincode?.length == 0) {
        setErrorMessage("Please enter a valid pin code");
        setPinCodeEError(true);
      } else {
        setErrorMessage("");
        setPinCodeEError(false);
      }
    };
    if (userDetails?.pinCode?.value?.length == 6 && stateList.length > 0) {
      getLocationDetails();
    } else {
      setPopulatedCity("");
      setPopulatedState("");
    }
  }, [userDetails?.pinCode?.value, stateList]);
  /////////////////////////////////////////////////
  const getProfileApiCall = async () => {
    let primaryCardNumber: string;
    let tier: string;
    let walletNumber: string;
    // setTimeout(async () => {
    const accessToken = cookie.get("accessToken");

    const getProfileApiResponse = await getProfileAPI(accessToken);

    const { status, response }: any = getProfileApiResponse;

    if (status === "success") {
      // get profile data api call for addresses
      const getProfileDataApiResponse = await getProfileData();
      const { status, responseData }: any = getProfileDataApiResponse;

      primaryCardNumber =
        response?.data?.getProfile?.loyaltyDetails?.primaryCardNumber;
      tier = response?.data?.getProfile?.loyaltyDetails?.tier;
      walletNumber = response?.data?.getProfile?.walletNumber;
      let firstName = response?.data?.getProfile?.firstName;
      let lastName = response?.data?.getProfile?.lastName;
      // let userEmail = response?.data?.getProfile?.uid;
      let userEmail = responseData?.data?.customer?.email;
      let id = responseData?.data?.customer?.customer_ref;
      let addresses = responseData?.data?.customer?.addresses;
      let cardValidDate = responseData?.data?.getProfile?.cardValidDate;

      let defaultAddress = addresses?.find(
        (addr: any) => addr?.default_billing == true
      );
      // successful sign_up
      triggerFormSubmit(
        "sign_up",
        "",
        primaryCardNumber,
        cardValidDate,
        primaryCardNumber == "na" ? "Not Activated" : "Activated",
        walletNumber == "na" ? "Not Activated" : "Activated"
      );
      setItem("customerEmailID", userEmail, "local");
      setItem(
        "customer_ref",
        responseData?.data?.customer?.customer_ref,
        "local"
      );
      let pincode = defaultAddress?.postcode
        ? defaultAddress?.postcode
        : userDataItems?.pincode;
      let city = defaultAddress?.city
        ? defaultAddress?.city
        : userDataItems?.city;
      let state = defaultAddress?.state
        ? defaultAddress?.state
        : userDataItems?.state;
      let geoLat = userDataItems?.geoLat;
      let geoLong = userDataItems?.geoLong;
      if (router?.asPath.includes("cart")) {
        if (defaultAddress?.postcode) {
          if (defaultAddress?.postcode != userDataItems?.pincode) {
            const pincodeResponse = await pinCodeBasedCoordinates(
              defaultAddress?.postcode
            );
    

            city = pincodeResponse?.city;
            pincode = pincodeResponse?.pincode;
            geoLat = pincodeResponse?.latitude;
            geoLong = pincodeResponse?.longitude;
            state = pincodeResponse?.state;
          }
        }
      }

      if (firstName === "" || firstName === null || firstName === undefined) {
        cookie.set("customer_Name", "Guest", {
          path: "/",
          sameSite: true,
          secure: true
        });

        setUserType("Guest");
        setItem("customerID", id, "local");
        setItem("customer_Name", "Guest", "local");
        setCustomerID("Guest");
        updateContextData &&
          updateContextData({
            contextCustomer_Name: "Guest",
          });
        userDataItems &&
          setUserDataItems({
            ...userDataItems,
            primaryCardNumber: primaryCardNumber,
            tier: tier,
            city: city,
            pincode: pincode,
            geoLat: geoLat,
            geoLong: geoLong,
            customerName: "Guest",
            walletNumber: walletNumber,
            userEmail: userEmail,
            tierLogo: getTierLogo(tier),
            tierText: getTierTitle(tier),
          });

        setReRender(true);
        setLoader(false);
        await window?.od?.messenger("shutdown");
        await window?.od?.messenger("pushMessage", chatBotUtility());
        await window?.od?.messenger("init");
      } else {
        cookie.set("customer_Name", `${firstName} ${lastName}`, {
          path: "/",
          sameSite: true
        });
        setUserType("Registered");
        setItem("customerID", id, "local");
        setItem("customer_Name", `${firstName} ${lastName}`, "local");
        setItem("loyalitylevel", tier, "local");
        setCustomerID(`${firstName} ${lastName}`);
        updateContextData &&
          updateContextData({
            contextCustomer_Name: `${firstName} ${lastName}`,
          });
        userDataItems &&
          setUserDataItems({
            ...userDataItems,
            primaryCardNumber: primaryCardNumber,
            tier: tier,
            state: state,
            city: city,
            pincode: pincode,
            geoLat: geoLat,
            geoLong: geoLong,
            customerName: `${firstName} ${lastName}`,
            walletNumber: walletNumber,
            userEmail: userEmail,
            tierLogo: getTierLogo(tier),
            tierText: getTierTitle(tier),
          });

        setReRender(true);
        setLoader(false);
        await window?.od?.messenger("shutdown");
        await window?.od?.messenger("pushMessage", chatBotUtility());
        await window?.od?.messenger("init");
      }
      setLoader(false);
      handleClose(true);
    }
    if (status === "fail") {
      setLoader(false);
    }
    // }, 0.5);
  };

  //  from here we can print the data ... calling
  const handleSubmit = async () => {
    setItem("previousPageTitle", "signupregister", "local");
    setItem("previousPagePath", window?.location?.pathname, "local");
    const data = new FormData();
    setLoader(true);

    const fullName = `${userDetails?.firstName?.value} ${userDetails?.lastName?.value}`;

    const gender = genderValue;
    const email = userDetails?.emailId.value;
    const mobileNumber = `91${MobileNumber}`;
    const address = userDetails?.addressData?.value;
    const anniversaryDate = anniversary
      ? getFormattedDate(anniversary)
      : "null";
    const birthday = dob ? getFormattedDate(dob) : "";
    const city = populatedCity;
    const pinCode = userDetails?.pinCode?.value;
    const state = regionId + "";
    const createProfileApiResponse = await createProfileAPI(
      fullName,
      gender,
      email,
      mobileNumber,
      address,
      anniversaryDate,
      birthday,
      city,
      pinCode,
      state
    );

    const { status, response }: any = createProfileApiResponse;

    if (status === "success") {
      const { accessToken } = response?.data?.createUser;
      cookie.set("accessToken", accessToken, { path: "/", sameSite: true });
      setItem("accessToken", accessToken, "local");
      if (access_token_flow(accessToken)) {
        await getProfileApiCall();
        setLoader(false);
      } else {
        setLoader(false);
        triggerFormSubmit("save_user_info", "invalid");
        setNetworkError(true);
        setNetworkErrorMessage("Network Error");
        setTimeout(() => {
          setNetworkError(false);
        }, 3000);
      }
      handleClose(true);
    }
    if (status === "fail") {
      triggerFormSubmit("save_user_info", "invalid");
      setLoader(false);

      if (
        response?.data?.createUser?.errorMessage !== "na" ||
        response?.data?.createUser?.errorMessage !== "unidenfied"
      ) {
        setOtpErrorSnackBarOpen(true);
        setSnackBarMessage(response?.data?.createUser?.errorMessage);
      } else {
        setNetworkError(true);
        setNetworkErrorMessage("Network Error");
        setTimeout(() => {
          setNetworkError(false);
        }, 3000);
      }
    }
  };

  const triggerFormSubmit = (
    eventName: string,
    status?: string,
    fcNo?: any,
    fc_card_validity?: string,
    fcstatus?: any,
    walletstatus?: any
  ) => {
    triggerGAEvent(
      {
        link_text: Registration.button,
        link_url: "na",
        method: "mobile",
        jounry_type: "signup",
        user_info_hash: CryptoJS.MD5(MobileNumber),
        status: status,
        age: "na",
        user_phone_number: `+91${MobileNumber}`,
        user_mail_id: userDetails?.emailId.value,
        gender: genderValue,
        user_birth_date: dob ? getFormattedDate(dob) : "",
        user_last_name: userDetails?.lastName?.value,
        user_first_name: userDetails?.firstName?.value,
        fc_status: fcstatus || "na",
        fc_points: 0,
        fc_card_number: fcNo || "na",
        fc_card_validity: fc_card_validity || "na",
        user_type: "Registered",
        wallet_status: walletstatus || "na",
        wallet_amount: 0,
      },
      eventName,
      "signupuserdetailpage",
      "SSO"
    );
  };

  const handleSkipNow = () => {
    handleClose(true);
  };
  return (
    <>
      <Title>{Registration?.title}</Title>
      <SmallTitle>{Registration?.subTitle}</SmallTitle>
      <StyledStack>
        {(gravityUser || !isSignUpJourney) && (
          <>
            <TextFieldReg
              size="medium"
              name="firstName"
              margin="none"
              id="firstName"
              label="First Name"
              variant="outlined"
              error={errors?.firstName}
              onKeyDown={handleKeyRestrictions}
              helperText={errors?.firstName ? userDetails?.firstName?.value?.length > 24 ? "First name should not exceed 24 characters" : "First Name is mandatory" : ""}
              value={userDetails?.firstName?.value}
              onChange={(e) => inputChangedHandler(e)}
              InputProps={{
                style: {
                  padding: 0,
                  margin: 0,
                  borderRadius: 0,
                  height: "49px",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#AD184C",
                  [`&.${inputLabelClasses.shrink}`]: {
                    color: "#AD184C",
                    fontWeight: "500",
                    fontSize: "12px",
                  },
                },
              }}
            />
            <TextFieldReg
              size="medium"
              name="lastName"
              margin="none"
              id="lastName"
              label="Last Name"
              variant="outlined"
              error={errors?.lastName}
              onKeyDown={handleKeyRestrictions}
              helperText={errors?.lastName ? userDetails?.lastName?.value?.length > 20 ? "Last name should not exceed 20 characters" : "Last Name is mandatory" : ""}
              value={userDetails?.lastName?.value}
              onChange={(e) => inputChangedHandler(e)}
              InputProps={{
                style: {
                  padding: 0,
                  margin: 0,
                  borderRadius: 0,
                  height: "49px",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#1C191A",
                  [`&.${inputLabelClasses.shrink}`]: {
                    color: "#AD184C",
                    fontWeight: "500",
                    fontSize: "12px",
                  },
                },
              }}
            />
          </>
        )}
        <FormControlStyle>
          <FormLabelReg id="demo-controlled-radio-buttons-group">
            Gender
          </FormLabelReg>
          <RadioGroups
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={genderValue}
            onChange={handleChange}
          >
            <GridRadio container rowSpacing={0}>
              <FormControlLabelStyled
                sx={{
                  marginLeft: "0px",
                  marginRight: isMobile ? "32px" : "42px",
                }}
                value="Male"
                control={<RadioButton id="gender_m" />}
                label="Male"
              />
              <FormControlLabelStyled
                value="Female"
                sx={{
                  marginLeft: "0px",
                  marginRight: isMobile ? "32px" : "27px",
                }}
                control={<RadioButton id="gender_f" />}
                label="Female"
              />

              <FormControlLabelStyled
                value="Other"
                sx={{ marginLeft: "0px" }}
                control={<RadioButton />}
                label="Other"
              />
            </GridRadio>
          </RadioGroups>
        </FormControlStyle>
        <TextFieldReg
          size="medium"
          name="emailId"
          margin="none"
          id="emailId"
          label="Email ID"
          variant="outlined"
          // onKeyDown={handleEmailRestriction}
          error={errors?.emailId}
          helperText={errors?.emailId ? "Enter valid email id" : ""}
          value={userDetails?.emailId?.value}
          onChange={(e) => inputChangedHandler(e)}
          InputProps={{
            style: {
              padding: 0,
              margin: 0,
              borderRadius: 0,
              height: "49px",
            },
          }}
          InputLabelProps={{
            sx: {
              color: "#1C191A",
              [`&.${inputLabelClasses.shrink}`]: {
                color: "#AD184C",
                fontWeight: "500",
                fontSize: "12px",
              },
            },
          }}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            date={dob}
            setDate={setDob}
            label={"Date Of Birth"}
            id="dob"
            showClear={true}
            maxDate={new Date((new Date().getFullYear() - 12).toString())}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            date={anniversary}
            setDate={setAnniversary}
            label={"Anniversary"}
            showClear={true}
          />
        </LocalizationProvider>
        <TextFieldReg
          size="medium"
          name="pinCode"
          margin="none"
          id="pinCode"
          label="Pin Code"
          variant="outlined"
          onKeyDown={handlePinCodeKeyRestrictions}
          inputProps={{
            inputmode: "numeric",
            pattern: "[0-9]*",
          }}
          type="tel"
          error={pinCodeError || errors?.pinCode}
          helperText={
            errors?.pinCode ? "Pincode should contain 6 digits" : errorMessage
          }
          value={userDetails?.pinCode?.value}
          onChange={(e) => inputChangedHandler(e)}
          InputProps={{
            style: {
              padding: 0,
              margin: 0,
              borderRadius: 0,
              height: "49px",
            },
          }}
          InputLabelProps={{
            sx: {
              color: "#1C191A",
              [`&.${inputLabelClasses.shrink}`]: {
                color: "#AD184C",
                fontWeight: "500",
                fontSize: "12px",
              },
            },
          }}
        />
        <TextFieldReg
          size="medium"
          name="cityData"
          margin="none"
          id="cityData"
          label="City"
          variant="outlined"
          disabled={true}
          value={populatedCity}
          InputProps={{
            style: {
              padding: 0,
              margin: 0,
              borderRadius: 0,
              height: "49px",
            },
          }}
          InputLabelProps={{
            sx: {
              color: "#AD184C",
              [`&.${inputLabelClasses.shrink}`]: {
                color: "#AD184C",
                fontWeight: "500",
                fontSize: "12px",
              },
            },
          }}
        />
        <TextFieldReg
          size="medium"
          margin="none"
          id="stateData"
          variant="outlined"
          name="stateData"
          label="State"
          disabled={true}
          value={userDetails?.stateData?.value || populatedState}
          onChange={(e) => inputChangedHandler(e)}
          InputProps={{
            style: {
              padding: 0,
              margin: 0,
              borderRadius: 0,
              height: "49px",
            },
          }}
          InputLabelProps={{
            sx: {
              color: "#1C191A",
              [`&.${inputLabelClasses.shrink}`]: {
                color: "#AD184C",
                fontWeight: "500",
                fontSize: "12px",
              },
            },
          }}
        />

        <TextFieldReg
          size="medium"
          name="addressData"
          margin="none"
          id="addressData"
          label="Address"
          variant="outlined"
          error={errors?.addressData}
          helperText={errors?.addressData ? "Address is mandatory" : ""}
          value={userDetails?.addressData?.value}
          onChange={(e) => inputChangedHandler(e)}
          rows={3}
          multiline
          InputProps={{
            style: {
              margin: 0,
              borderRadius: 0,
              height: "90px",
            },
          }}
          InputLabelProps={{
            sx: {
              color: "#1C191A",
              [`&.${inputLabelClasses.shrink}`]: {
                color: "#AD184C",
                fontWeight: "500",
                fontSize: "12px",
              },
            },
          }}
        />
        <Box>
          <TypographySpan
            sx={{
              fontSize: "14px",
              "& > span": {
                fontWeight: "700",
              },
              "@media(max-width:900px)": {
                fontSize: "12px",
              },
            }}
          >
            <span>Note:</span> Email, Date of Birth, Anniversary can't be
            modified later.
          </TypographySpan>
        </Box>
        <DisplayGrid>
          <ButtonSave
            disabled={!formIsValid}
            $isDisabled={!formIsValid}
            onClick={handleSubmit}
          >
            {Registration.button}
          </ButtonSave>
          {showSkipNow && (
            <SkipNow onClick={handleSkipNow} style={{ cursor: "pointer" }}>
              <Link sx={{ color: "black", textDecorationColor: "#8f867c" }}>
                {Registration.skipnow}
              </Link>
            </SkipNow>
          )}
        </DisplayGrid>
      </StyledStack>
    </>
  );
}
