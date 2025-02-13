import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import {
  ACCOUNT_TEXT,
  CART_TEXT,
  HOME_TEXT,
} from "../components/Profile/constant";
import { LOGOUT } from "../graphQLQueries/LogoutQuery";
import graphql from "../middleware-graphql";
import { deleteAllCookies } from "./storageUtility";
import { useRecoilState } from "recoil";
import { userState } from "../recoilstore";
import Loader from "../HOC/Loader/Loader";
import { chatBotUtility } from "./chatBotObjUtility";
import handleErrorResponse from "./ErrorHandling";

export const Logout = () => {
  const cookie = new Cookies();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [displayLoader, setLoader] = useState(true);
  const isStoreMode = userDataItems?.storeMode && userDataItems?.storeModeType === "cc"

  const router = useRouter();
  useEffect(() => {
    graphql
      .query({
        query: LOGOUT,
      })
      .then((res) => {
       
        if (window?.od?.messenger) {
          window.od.messenger("shutdown");
          window.od.messenger("pushMessage", chatBotUtility());
          window.od.messenger("init");
        }
        logout();
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, []);

  const facebookSignOut = () => {
    (window as any)?.FB?.logout(function (response: any) {
      console.log(response);
    });
  };

  const logout = async () => {
    try {
      googleLogout();
      facebookSignOut();
    } catch (error) {
      console.log("SM Error ", error);
    } finally {
      if (
        isStoreMode
      ) {
        emptyCache();
        setLoader(false);
        window.location.assign(`/store/${userDataItems.storeCode}/?SignIn=true`);
      } else {
        emptyCache();
        setLoader(false);
        window.location.href = window.location.origin + "/?SignIn=true";
      }
    }
  };

  const emptyCache = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    cookie.remove("accessToken");
    deleteAllCookies();
    setUserDataItems({
      ...userDataItems,
      userWishListCount: 0,
      userCartCount: 0,
      customerName: "",
      primaryCardNumber: "na",
      tier: "na",
      walletNumber: "na",
      productQAIndex: "1",
      state: "Maharastra",
      cardValidDate: "",
      city: "Mumbai",
      pincode: "400050",
      geoLat: 19.05648,
      geoLong: 72.83138,
      profileImage: "",
      userEmail: "",
      tierLogo: "",
      tierText: "",
    });
  };

  return <>{displayLoader && <Loader />}</>;
};

export default Logout;
