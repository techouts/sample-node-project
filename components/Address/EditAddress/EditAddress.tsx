import React, { useEffect, useState } from "react";
import client from "../../../apollo-client";
import { PinCodeValidationRegex } from "../../../utility/Regex";
import {
  addCustomerAddress,
  updateCustomerAddress,
} from "../../../graphQLQueries/MyProfileQuery";
import { useMobileCheck } from "../../../utility/isMobile";
import { stateQuery } from "../../../graphQLQueries/stateQuery";
import { pinCodeBasedLocationDetails } from "../../../utility/GeoAPI";
import {
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  PINCODE_ERROR_MESSAGE,
} from "../../Accounts/constants";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { AppIcons } from "../../../utility/AppIconsConstant";
import { CHECKED_ICONS, UNCHECKED_ICONS } from "../../../utility/AppIcons";


import { EditAddressUI } from "./EditAddressUI";
import handleErrorResponse from "../../../utility/ErrorHandling";
const CheckedIcon = () => {
  let CHECKED_ICON = AppIcons(CHECKED_ICONS);
  return (
    <img
      src={`${ReplaceImage(CHECKED_ICON?.url)}`}
      alt="checked icon"
      width={"12.5px"}
    ></img>
  );
};
const UnCheckedIcon = () => {
  let UNCHECKED_ICON = AppIcons(UNCHECKED_ICONS);
  return (
    <img
      src={`${ReplaceImage(UNCHECKED_ICON?.url)}`}
      alt="unchecked icon"
      width={"12.5px"}
    ></img>
  );
};
const EditAddress = (props: any) => {
  const isMobile = useMobileCheck();
  const [stateList, setStateList] = useState([]);
  const {
    editingData,
    edithandleClose,
    toggleUpdated,
    setSnackBarOpen,
    setSnackMessage,
    isFromCart = false,
  } = props;
  const initialChecked = editingData?.default_billing
    ? editingData?.default_billing
    : false;
  const [checked, setChecked] = React.useState(initialChecked);
  const [isDisabled, setIsDisabled] = useState<boolean | undefined>(true);
  const [regionId, setRegionId] = useState(editingData?.region?.region_id);
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [pinCodeError, setPinCodeEError] = useState(false);
  const existingTabsValue = () => {
    if (editingData) {
      if (editingData?.save_as === "Home" || editingData?.save_as === "Work") {
        return editingData?.save_as;
      } else {
        return "Other";
      }
    } else {
      return "Home";
    }
  };
  const existingTabValue = existingTabsValue();
  const [tabValue, setTabsValue] = React.useState(existingTabValue);
  const [addressSaveTab, setAddressSaveTab] = useState(
    editingData?.save_as !== "Home" || editingData?.save_as !== "Work"
      ? editingData?.save_as
      : ""
  );
  const [errorMessages, setErrorMessages] = useState("");
  const errorMessage = {
    name: "Name should be contain first name and last name with space",
    mobile:
      "Phone number can’t be empty. It should be a valid number of 10 digits",
    pinCode: "Pin code should contain 6 digits",
    address: "Required",
  };
  const combineAddress = editingData?.street?.reduce(
    (accumlator: any, value: any) => accumlator + value
  );
  const initialValues = {
    name:
      (editingData?.firstname &&
        `${editingData?.firstname} ${editingData?.lastname}`) ||
      "",
    mobile: editingData?.telephone || "",
    pinCode: editingData?.postcode || "",
    city: editingData?.city || "",
    state: editingData?.region?.region || "",
    address: combineAddress || "",
  };
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState({
    name: false,
    mobile: false,
    pinCode: false,
    city: false,
    state: false,
    address: false,
  });
  useEffect(() => {
    if (isFormTouched && tabValue !== "" && 
        values?.name?.length > 3 &&
        values?.name.split(" ")?.[0]?.length > 0 &&
        values?.name.split(" ")?.[1]?.length > 0 &&
        values?.mobile?.length === 10 &&
        values?.pinCode &&
        values?.pinCode?.length === 6 &&
        values?.state &&
        values?.state?.length > 3 &&
        values?.address &&
        values?.address?.length > 3 &&
        values?.city &&
        values?.city?.length > 3 &&
        (values?.name != initialValues?.name ||
          values?.mobile != initialValues?.mobile ||
          values?.pinCode != initialValues?.pinCode ||
          values?.state != initialValues?.state ||
          values?.address != initialValues?.address ||
          values?.city != initialValues?.city ||
          tabValue !== existingTabValue ||
          checked !== initialChecked)) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
    }
  }, [error, isFormTouched, values, tabValue, addressSaveTab, checked]);
  const formValidation = (isFormValid: any, id: any) => {
    setError({ ...error, [id]: !isFormValid });
  };
  useEffect(() => {
    client
      .query({ query: stateQuery })
      .then((response: any) => {
      
        setStateList(response?.data?.country?.available_regions);
      })
      .catch((error: any) => console.log(error));
  }, []);
  function nameChecking(name: any, value: any, isFormValid: any) {
    if (name === "name") {
      isFormValid =
        value.length >= 2 &&
        value.match(/^[a-zA-Z ]{0,50}$/) &&
        value?.trim()?.split(" ")?.length == 2;
      formValidation(isFormValid, name);
      if (value.match(/^[a-zA-Z ]{0,50}$/) && value?.split(" ")?.length <= 2) {
        setValues({ ...values, [name]: value });
      }
    }
  }
  function mobileChecking(name: any, value: any, isFormValid: any) {
    if (name === "mobile") {
      let temp = value.toString().slice(0, 10);
      isFormValid = temp?.length == 10 || temp?.length == 0;
      if (temp?.length <= 10 && temp[0] > 5) {
        formValidation(isFormValid, name);
        setValues({
          ...values,
          [name]: Math.max(0, parseInt(temp)).toString().slice(0, 10),
        });
      } else if (temp?.length == 0) {
        setValues({ ...values, [name]: "" });
        formValidation(true, name);
      }
    }
  }
  const handleInputChange = (e: any) => {
    setIsFormTouched(true);
    let isFormValid = false;
    const addressRegx = /^[a-zA-Z0-9\s,@.#/-]*$/;
    const { name, value } = e.target;
    if (
      name !== "mobile" &&
      name !== "pinCode" &&
      name !== "name" &&
      name !== "address"
    ) {
      let regex = /^(?=.*?[1-9])[0-9()-]+$/;
      setValues({ ...values, [name]: value?.replace(regex, "") });
    }
    nameChecking(name, value, isFormValid);
    mobileChecking(name, value, isFormValid);
    switch (name) {
      case "pinCode":
        isFormValid =
          value.lenghth !== 6 &&
          value?.substring(6, 0).match(PinCodeValidationRegex);
        formValidation(isFormValid, name);
        if (value?.length <= 6) {
          setValues({ ...values, [name]: value, city: "", state: "" });
        }
        break;
      case "city":
      case "state":
        isFormValid = value.length >= 3;
        formValidation(isFormValid, name);
        break;
      case "address":
        if (value?.match(addressRegx)) {
          setValues({ ...values, [name]: value });
        }
        break;
      default:
        return null;
    }
  };
  const handleCheck = (event: any) => {
    setIsFormTouched(true);
    setChecked(event.target.checked);
  };
  const handleTabsChange = (event: any, newValue: any) => {
    setIsFormTouched(true);
    setTabsValue(newValue);
  };

  let Name = values?.name;
  let SplitNames = Name.split(" ");

  const createAddress = () => {
    edithandleClose();
    client
      .mutate({
        mutation: addCustomerAddress,
        variables: {
          firstname: SplitNames?.[0],
          lastname: SplitNames?.[1],
          street: values?.address,
          city: values?.city,
          postcode: values?.pinCode,
          default_shipping: checked,
          telephone: values?.mobile,
          save_as: tabValue !== "Other" ? tabValue : addressSaveTab,
          default_billing: checked,
          country_id: "IN",
          region: values?.state,
          region_id: regionId,
        },
      })
      .then((response: any) => {
        toggleUpdated();
        if (props?.currentPage == "profile") {
          props?.showLoader(false);
          setSnackBarOpen(true);
          setSnackMessage(ADD_ADDRESS);
        }
      })
      .catch((error: any) => {
        const errMessage = JSON.parse(JSON.stringify(error));
        props?.handleErrorAlert && props?.handleErrorAlert(errMessage?.message);
      })
      .finally(
        () => props?.currentPage == "profile" && props?.showLoader(false)
      );
  };
  const updateAddress = () => {
    edithandleClose();
    client
      .mutate({
        mutation: updateCustomerAddress,
        variables: {
          id: editingData?.id,
          firstname: SplitNames?.[0],
          lastname: SplitNames?.[1],
          street: values?.address,
          city: values?.city,
          postcode: values?.pinCode,
          default_shipping: checked,
          telephone: values?.mobile,
          save_as: tabValue !== "Other" ? tabValue : addressSaveTab,
          default_billing: checked,
          country_id: "IN",
          region: values?.state,
          region_id: regionId,
        },
      })
      .then((response: any) => {
       
        toggleUpdated();
        if (props?.currentPage == "profile") {
          props?.showLoader(false);
          setSnackBarOpen(true);
          setSnackMessage(UPDATE_ADDRESS);
        }
      })
      .catch((error: any) => {
        const errMessage = JSON.parse(JSON.stringify(error));
        props?.handleErrorAlert && props?.handleErrorAlert(errMessage?.message);
      })
      .finally(
        () => props?.currentPage == "profile" && props?.showLoader(false)
      );
  };
  const handleAddAddress = async () => {
    props?.showLoader(true);
    if (editingData?.id) {
      updateAddress();
    } else {
      createAddress();
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const findRegion: any = stateList.filter((region: any) => {
      return region?.name === value ? region?.id : "";
    });
    setValues({ ...values, [name]: value });
    setRegionId(findRegion?.[0]?.id);
  };
  useEffect(() => {
    const getLocationDetails = async () => {
      const LocationResponse = await pinCodeBasedLocationDetails(
        values?.pinCode
      );
      const city = LocationResponse?.city;
      const geoState = LocationResponse?.state;
      const regionSortedId = stateList?.find(
        (state: any) => state?.name.toLowerCase() == geoState?.toLowerCase()
      ) as any;
      setValues({ ...values, city: city || "", state: geoState });
      setRegionId(regionSortedId?.id);
      if (LocationResponse?.results?.length == 0 || LocationResponse?.error) {
        setPinCodeEError(true);
      } else {
        setErrorMessages(PINCODE_ERROR_MESSAGE);
        setPinCodeEError(false);
      }
    };
    if (values?.pinCode?.length == 6 && stateList?.length > 0) {
      getLocationDetails();
    }
  }, [values?.pinCode, stateList]);
  return (
    <EditAddressUI
      handleChange={handleChange}
      isMobile={isMobile}
      values={values}
      error={error}
      handleInputChange={handleInputChange}
      tabValue={tabValue}
      isFromCart={isFromCart}
      editingData={editingData}
      errorMessage={errorMessage}
      pinCodeError={pinCodeError}
      errorMessages={errorMessages}
      handleTabsChange={handleTabsChange}
      addressSaveTab={addressSaveTab}
      setAddressSaveTab={setAddressSaveTab}
      handleAddAddress={handleAddAddress}
      isDisabled={isDisabled}
      UnCheckedIcon={UnCheckedIcon}
      CheckedIcon={CheckedIcon}
      checked={checked}
      handleCheck={handleCheck}
    />
  );
};
export default EditAddress;
