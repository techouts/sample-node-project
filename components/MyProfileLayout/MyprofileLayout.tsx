import React, { useEffect, useState } from "react";
import AddAddress from "../Address/AddAddress";
import MyProfile from "../Profile/MyProfile";
import { GET_PROFILE_DATA } from "../../graphQLQueries/MyProfileQuery";
import Loader from "../../HOC/Loader/Loader";
import client from "../../apollo-client";
import { Cookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";

export const MyprofileLayout = () => {
  const cookie = new Cookies();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [dataProfile, setDataProfile] = useState([]);
  const [updated, setToggleUpdated] = useState(false);
  const [displayLoader, setLoader] = useState(true);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);

  const toggleUpdated = () => {
    setLoader(true);
    setToggleUpdated((updated) => !updated);
  };
  useEffect(() => {
    client
      .query({
        query: GET_PROFILE_DATA,
        fetchPolicy: "no-cache",
      })
      .then((res) => {
      
        cookie.set(
          "customer_Name",
          res?.data?.customer?.firstname + " " + res?.data?.customer?.lastname,
          {
            path: "/",
            sameSite: true, 
            secure: true
          }
        );
        let addresses = res?.data?.customer?.addresses;
        let defaultAddress = addresses.find(
          (addr: any) => addr?.default_billing == true
        );
        localStorage.setItem("customer_ref", res?.data?.customer?.customer_ref);
        localStorage.setItem("customerEmailID", res?.data?.customer?.email);
        userDataItems &&
          setUserDataItems({
            ...userDataItems,
            customerName:
              res?.data?.customer?.firstname +
              " " +
              res?.data?.customer?.lastname,
            profileImage: res?.data?.customer?.customer_image,
            pincode: defaultAddress?.postcode,
            city: defaultAddress?.city,
            state: defaultAddress?.state,
            userEmail: res?.data?.customer?.email,
          });
        setDataProfile(res?.data?.customer);
        setLoader(false);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoader(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  return (
    <>
      {displayLoader && <Loader />}
      {!displayLoader && (
        <>
          <CustomSnackBar
            snackBarOpen={snackBarOpen}
            setSnackBarOpen={setSnackBarOpen}
            snackMessage={snackMessage}
          ></CustomSnackBar>
          <MyProfile
            myProfile={dataProfile}
            setDataProfile={setDataProfile}
            toggleUpdated={toggleUpdated}
            setSnackBarOpen={setSnackBarOpen}
            setSnackMessage={setSnackMessage}
          />
          <AddAddress
            addressdata={dataProfile}
            toggleUpdated={toggleUpdated}
            setSnackBarOpen={setSnackBarOpen}
            setSnackMessage={setSnackMessage}
          />
        </>
      )}
    </>
  );
};
