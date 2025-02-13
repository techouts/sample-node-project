import { Box } from "@mui/material";
import { useState } from "react";
import { useMobileCheck } from "../../utility/isMobile";

import { updateProfile } from "../../graphQLQueries/MyProfileQuery";
import { getFormattedDate } from "./constants";
import graphql from "../../middleware-graphql";

import { Cookies } from "react-cookie";
import { useAppContext } from "../../context/userInfoContext";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import { upload_Customer_Profile_Pic } from "../../graphQLQueries/UpdateProfileQuery";
import client from "../../apollo-client";

import { PROFILE_UPDATE } from "../Accounts/constants";
import { callEventMyProfile } from "../MyProfileLayout/MyprofileAnalytics";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import { convertBase64 } from "../../utility/ConvertBade64";
import {toast} from "../../utility/Toast";

import AccountProfileUI from "./AccountProfileUI";

const AccountsProfile = (props: any) => {
  const {
    data,
    handleClose,
    toggleUpdated,
    setLoader,
    tierData,
    updateError,
    setSnackBarOpen,
    setSnackMessage,
    userTierName,
    genderName,
  } = props;
  const isMobile = useMobileCheck("(min-width : 900px )");
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  const cookie = new Cookies();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const userInfoContext = useAppContext();
  const { updateContextData } = userInfoContext;
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [dob, setDob] = useState(data?.dob ? new Date(data?.dob) : "");

  const [getInfo, setInfo] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const commonFunction = (condition: any, value1: any, value2: any) => {
    if (condition) {
      return value1;
    } else {
      return value2;
    }
  };

  const [anniversary, setAnniversary] = useState(data?.anniversary !== null && data?.anniversary !== "null" ? new Date(data?.anniversary) : "");

  const initialValues = {
    firstName: data?.firstname + " " + data?.lastname || "",
    lastName: data?.lastname || "",
    gender: genderName || "",
    mobile: data?.customer_mobile_number || "",
    dob: data?.dob || "",
    AnniversaryChange: data?.anniversary || "",
    emailChange: data?.email || "",
    profileImage: data?.customer_image || "",
  };
  const [values, setValues] = useState(initialValues);
  const image = { preview: "", raw: "" };
  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange1,
    value: item,
    name: "gender",
    inputProps: { "aria-label": item },
  });
  const onClear = () => {
    setValues({
      ...values,
      ["firstName"]: "",
    });
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const family = /^[a-zA-Z ]{0,50}$/;
    if (name == "firstName") {
      if (value.match(family) && value?.split(" ")?.length <= 2) {
             if (value?.split(" ")?.length <= 1) {
               setValues({
                 ...values,
                 [name]: value.slice(0, 24),
               })
             } else {
               setValues({
                 ...values,
                 [name]: value.slice(0, 45),
               })
             }
           }
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  

    const EmailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (name === "emailChange" && value.match(EmailFormat)) {
      setError(false);
    }
    if (name === "firstName" && value.match(family)) {
      setError(false);
    }

    if (name === "emailChange" && !value.match(EmailFormat)) {
      setError(true);
      setHelperText("Please Enter Your Email id");
    }
  };
  const updateProfilePic = async () => {
    if (initialValues.profileImage != values.profileImage) {
      await client
        .mutate({
          mutation: upload_Customer_Profile_Pic,
          variables: {
            base64: `${values?.profileImage}`,
            name: String(values?.firstName?.split(" ")[0]),
          },
        })
        .then((res) => {
          if (
            initialValues.firstName === values.firstName ||
            initialValues.lastName === values.lastName ||
            initialValues.gender === values.gender ||
            initialValues.emailChange === values.emailChange ||
            getInfo
          ) {
            // toggleUpdated();
          } else {
            setInfo(true);
          }
          setSnackBarOpen(true);
          setSnackMessage(PROFILE_UPDATE);
        })
        .catch((err: any) => {
          const errMessage = JSON.parse(JSON.stringify(err));
          updateError(errMessage?.message);
        })
        .finally(() => setLoader(false));
    }
  };

  const checkDetails = async () => {
    await graphql
      .mutate({
        mutation: updateProfile,
        variables: {
          firstName: String(values?.firstName?.split(" ")[0]),
          lastName: values?.firstName?.split(" ")[1]
            ? String(values?.firstName?.split(" ")[1])
            : " ",
          email: values?.emailChange,
          gender: values?.gender,
          dateOfBirth: dob ? getFormattedDate(dob) : "",
          anniversary: anniversary ? getFormattedDate(anniversary) : "",
          prefix: "",
        },
      })
      .then((res) => {
        userDataItems &&
          setUserDataItems({
            ...userDataItems,
            dob: data?.dob,
            customerName: values?.firstName,
          });
        cookie.set("customer_Name", values?.firstName, {
          path: "/",
        });
        updateContextData &&
          updateContextData({
            contextCustomer_Name: values?.firstName,
          });
        if (initialValues.profileImage === values.profileImage) {
          // toggleUpdated();
        } else {
          setInfo(true);
        }
        // if (getInfo) {
        //   toggleUpdated();
        // }
      })
      .catch((err: any) => {
        const errMessage = JSON.parse(JSON.stringify(err));

        updateError(errMessage?.message);
      })

      .finally(() => setLoader(false));
  };
  const handleMakeChanges = async (e: any) => {
    callEventMyProfile(values, data?.dob);
    handleClose();
    setLoader(true);
    Promise.allSettled([
      await updateProfilePic(),
      (initialValues.firstName != values.firstName ||
        initialValues.lastName != values.lastName ||
        initialValues.gender != values.gender ||
        initialValues.emailChange != values.emailChange ||
        finalDobDate != data?.dob ||
        finalAnniversaryDate != data?.anniversary) &&  await checkDetails()
    ]).then((results) => {
      if(results.some(result => result.status === "fulfilled")){
        toggleUpdated();
      }
    } ).finally(() => {
      setLoader(false);
    })
  };

  //date of birth
  commonFunction(
    new Date(dob).getDate() < 10,
    `0${new Date(dob).getDate()}`,
    new Date(dob).getDate()
  );

  const dobFinalDay =
    dob &&
    commonFunction(
      new Date(dob).getDate() < 10,
      `0${new Date(dob).getDate()}`,
      new Date(dob).getDate()
    );

  const dobFinalMonth =
    dob &&
    commonFunction(
      new Date(dob).getMonth() + 1 < 10,
      `0${new Date(dob).getMonth() + 1}`,
      new Date(dob).getMonth() + 1
    );

  const finalDobDate = commonFunction(
    dob,
    `${new Date(dob).getFullYear()}-${dobFinalMonth}-${dobFinalDay}`,
    null
  );
  commonFunction(
    new Date(anniversary).getDate() < 10,
    `0${new Date(anniversary).getDate()}`,
    new Date(anniversary).getDate()
  );
  const anniversaryFinalDay =
    anniversary &&
    commonFunction(
      new Date(anniversary).getDate() < 10,
      `0${new Date(anniversary).getDate()}`,
      new Date(anniversary).getDate()
    );
  const anniversaryFinalMonth = commonFunction(
    anniversary,
    commonFunction(
      new Date(anniversary).getMonth() + 1 < 10,
      `0${new Date(anniversary).getMonth() + 1}`,
      new Date(anniversary).getMonth() + 1
    ),
    null
  );

  const finalAnniversaryDate = commonFunction(
    anniversary,
    `${new Date(
      anniversary
    ).getFullYear()}-${anniversaryFinalMonth}-${anniversaryFinalDay}`,
    null
  );

  const makeChangesVisible =
    (values.firstName.length &&
      values?.firstName?.split(" ")[1]?.length &&
      values.gender.length &&
      values.emailChange.length) > 3 &&
    (initialValues.firstName != values.firstName ||
      initialValues.lastName != values?.firstName?.split(" ")[1] ||
      initialValues.gender != values.gender ||
      initialValues.emailChange != values.emailChange ||
      initialValues.profileImage != values.profileImage ||
      finalDobDate != data?.dob ||
      finalAnniversaryDate != data?.anniversary);

  const finalacceptance = makeChangesVisible;

  const fileUploadManager = async (event: any) => {
    setLoader(true);
    const oFile = event.target.files[0];
    if (oFile?.size > 5242880) {
      setOpen(true);
      setMessage("file size is greater than 5 MB");
      setLoader(false);
    } else {
      if (
        oFile.type == "image/png" ||
        oFile.type == "image/jpg" ||
        oFile.type == "image/jpeg"
      ) {
        convertBase64(event.target.files[0])
          .then((result) => {
            event.target.files[0]["base64"] = result;
            setValues({
              ...values,
              profileImage: result,
            });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoader(false);
          });
      } else console.log("Not Accepted");
    }
  };

  const handleKeyRestrictions = (event: any) => {
    let key = event.key;
    let keyCharCode = key.charCodeAt(0);

    if (keyCharCode === 32 && !event.target.value.length) {
      event.preventDefault();
    }
  };
  return (
    <Box
      sx={{
        margin: commonFunction(isMobile, "16px", ""),
        border: "1px solid rgba(155, 155, 155, 0.3)",
        padding: { xs: "0px 16px", md: "2% 23% 0% 2% " },
      }}
    >
      <CustomSnackBar
        position="absolute"
        topWeb={commonFunction(isMobile, "-50px", "0px")}
        topMob={"5px"}
        snackBarOpen={open}
        setSnackBarOpen={setOpen}
        snackMessage={message}
      ></CustomSnackBar>
      <AccountProfileUI
        fileUploadManager={fileUploadManager}
        image={image}
        isMobile={isMobile}
        values={values}
        tierData={tierData}
        userTierName={userTierName}
        onClear={onClear}
        handleKeyRestrictions={handleKeyRestrictions}
        error={error}
        handleInputChange={handleInputChange}
        controlProps={controlProps}
        helperText={helperText}
        dob={dob}
        data={data}
        setDob={setDob}
        anniversary={anniversary}
        setAnniversary={setAnniversary}
        handleMakeChanges={handleMakeChanges}
        dateAnniversary={anniversary}
        finalacceptance={finalacceptance}
      />
    </Box>
  );
};
export default AccountsProfile;

