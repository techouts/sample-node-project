import React, { useState, useEffect, Fragment, useMemo } from "react";
import { useRouter } from "next/router";
import HeaderSchema from "../../schemas/HeaderSchema";
import MyAccountNavData from "../../JSON/MyAccountNavData.json";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import SelectLocation from "../SelectLocation/SelectLocation";
import selectdata from "../SelectLocation/SelectLocationData.json";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRecoilState } from "recoil";
import {
  storeSelectorModalStateHandler,
  userInfo,
  userState,
} from "../../recoilstore";
import {
  HeaderContainer,
  SignInBox,
  SignInTypo,
  ModalClick,
  StyledTextButton,
  CtaButton,
  MobileSearchBox,
  HeaderBannerBox,
  ContentBox,
  LocationTypography,
  ProfileMenu,
  ProfileMenuItems,
  HeaderNavigationBarBox,
  HeaderNavBar,
  UserCardDetails,
  UserName,
  UserDetails,
  HeaderWrapper,
  StyledBadge,
  ProfileImage,
  UserArrowLeftStyle,
  StoreSwitch,
} from "./HeaderStyle";
import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import { BootstrapDialog } from "../SigninComponent/SignInStyled";
import SignInComponent from "../SigninComponent/SignInComponent";
import SearchMobileIcon from "../Search/SearchMobileComponent/SearchMobileIconModal";
import Bottom from "../BottomNav/Bottom";
import Loader from "../../HOC/Loader/Loader";
import { event } from "../../lib/ga/index";
import useStorage from "../../utility/useStoarge";
import HeaderNavigationBar, {
  PopUpDesktop,
} from "./HeaderNavigation/HeaderNavigationBar";
import QRCodeGetMobile from "./QrcodeForGetMobileApp";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { Cookies } from "react-cookie";
import BlockLocation from "../SelectLocation/BlockLocation";
import {
  cities,
  exploreStoreModeTitles,
  URL_ACCOUNT,
  WELCOME_TEXT,
} from "./Constants";
import client from "../../apollo-client";
import { GETCUSTOMER_CART_COUNT } from "../../graphQLQueries/CartQuery";
import { CUSTOMER_WISHLIST_COUNT } from "../../graphQLQueries/WhishList/WishListQuery";
import BasicModal from "../../HOC/Modal/ModalBlock";
import {
  MERGE_ACTIVE_CARTS,
  MERGE_GUEST_CARTS,
} from "../../graphQLQueries/Cart/BuyNowCart";
import { ACC_FCC_URL, MISCS_FCC_URL } from "../../utility/Constants";
import { CART_URL, HOME_TEXT } from "../Profile/constant";
import triggerGAEvent from "../../utility/GaEvents";
import AxiosInstance from "../../utility/AxiosInstance";
import { CATEGORYLISTJSON } from "../../graphQLQueries/CategoryQuery";
import Logout from "../../utility/LogoutUtility";
import { widgetType } from "../../utility/GAConstants";
import { useAppContext } from "../../context/userInfoContext";
import { AppIcons } from "../../utility/AppIconsConstant";

import {
  GET_APP_LOGO_HEADER,
  GIFT_CARD_ICON,
  LOCATION_ICON,
  USER_SIGNIN_ICON,
  HELP_ICON,
  STORES_AND_EVENTS_ICON,
  HEADER_SEARCH_ICON,
  HEADER_WISHLIST_ICON,
  HEADER_CART_ICON,
  LEFT_ARROW_ICON,
  HEADER_BACK_ARROW,
  USER_ACCOUNT_ICON,
} from "../../utility/AppIcons";
import { deleteAllCookies } from "../../utility/storageUtility";
import { callOpenScreenEvent } from "../../utility/WebEngaerequirement";
import { MSDsetCookie } from "../../utility/MSDMadUuid";
import { BRANDLIST } from "../../graphQLQueries/BrandQuery";
import { toast } from "../../utility/Toast";
import handleErrorResponse from "../../utility/ErrorHandling";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import TextCarousel from "../StoreSwitch/TextCarousel";
import LogoCarousel from "./LogoCarousel";
import { Typography } from "@mui/material";
import StoreModeSwitch from "./StoreModeSwitch";
import dynamic from "next/dynamic";
import HomeIcon from "@mui/icons-material/Home";
import SearchIconModal from "../Search/SeachMobileView";
import { isMobile as deviceIsMobile } from 'react-device-detect';
const SearchWebIconModal = dynamic(
  () => import("../Search/SearchWebIconModel"),
  {
    ssr: false,
  }
);
const IconButton = dynamic(() => import("@mui/material/IconButton"), {
  ssr: false,
});
const CartGrid = dynamic(
  () => import("./HeaderStyle").then((mod) => mod.CartGrid),
  { ssr: false }
);
const SignInGrid = dynamic(
  () => import("./HeaderStyle").then((mod) => mod.SignInGrid),
  { ssr: false }
);

const MenuBorder = styled(Menu)(() => ({
  "& .MuiPaper-root": {
    borderRadius: "0px",
    width: "202px",
  },
}));

const Header = ({
  bgColor,
  bgPadding,
  ctaLabel,
  ctaLabelBgColor,
  ctaLabelColor,
  items,
  logoImageUrl,
  searchText,
  signInPath,
  signInText,
  wishListPath,
  isHideBottomNav,
  signOpen,
  setAccountRerender = () => {},
  accountRerender = false,
  topItems,
  Brands,
  BrandItems,
  popularBrands,
  setSignOpen,
  isPDP,
  isPLP,
  popularCategories,
  unbxdCarousel,
  searchbarTexts,
  productData,
}: HeaderSchema) => {
  const userInfoContext = useAppContext();
  const { contextData, updateContextData } = userInfoContext;
  const { getItem, setItem } = useStorage();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [userCity, setUserCity] = useState();
  const [userPincode, setUserPincode] = useState();
  const [city, setCity] = useState<any>();
  const [pincode, setPincode] = useState();
  const [open, setOpen] = React.useState<any>(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [searchVisible, setSearchVisible] = useState(false);
  const [displayLoader, setLoader] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [filterItems, setFilterItems] = useState<any>([{}]);
  const [qrcode, setQrcode] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const [webUrl, setWebUrl] = useState("");
  const isMobile = deviceIsMobile;
  const [isAccountPage, setAccountPage] = useState(false);
  const [initialScreen, setInitialScreen] = useState(true);
  const [signUpScreen, setSignUpScreen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [defaultCity, setDefaultCity] = useState("");
  const [defaultPincode, setDefaultPincode] = useState(false);
  const [categoryData, setCategoryData] = useState<any>({});
  const [brandData, setBrandData] = useState([]);
  const Get_App = AppIcons(GET_APP_LOGO_HEADER);
  const Gift_Card = AppIcons(GIFT_CARD_ICON);
  const Stores_And_Events = AppIcons(STORES_AND_EVENTS_ICON);
  const Help = AppIcons(HELP_ICON);
  const user_signin = AppIcons(USER_SIGNIN_ICON);
  const location = AppIcons(LOCATION_ICON);
  const LEFTARROW = AppIcons(LEFT_ARROW_ICON);
  const USER_ICON = AppIcons(USER_ACCOUNT_ICON);
  const SEARCH_ICON = AppIcons(HEADER_SEARCH_ICON);
  const WISHLIST_ICON = AppIcons(HEADER_WISHLIST_ICON);
  const CART_ICON = AppIcons(HEADER_CART_ICON);
  const headerNavigationIcon = AppIcons(HEADER_BACK_ARROW);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    storeSelectorModalStateHandler
  );

  //open_screnn event Analytics
  useEffect(() => {
    if (!localStorage.getItem("appLaunched")) {
      callOpenScreenEvent(userDataItems);
      localStorage.setItem("appLaunched", "true");
    }
  }, []);

  //msd mad_uuid generated
  useEffect(() => {
    let madcookie = "";
    madcookie = cookie.get("MADid");
    if (!madcookie) {
      cookie.set("MADid", MSDsetCookie("MADid", 365, "/"), {
        path: "/",
        sameSite: true,
        secure: true,
      });
    }
  }, []);

  const callGaEvent = (link_text: string) => {
    triggerGAEvent(
      {
        link_text: link_text,
        link_url: "na",
        widget_type: widgetType,
        widget_title: selectdata?.data?.title,
        widget_description: selectdata?.data?.addressText,
        event_type: "modal_click",
      },
      "click",
      cookie.get("accessToken") ? city : "guest user",
      "Location"
    );
  };
  const BlockhandleOpen = () => {
    setBlockOpen(true);
  };
  const BlockhandleClose = () => setBlockOpen(false);
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const [zipcodeData, setZipcodeData] = useState({
    city: "",
    pinCode: "",
  });
  const cookie = new Cookies();
  const key = `key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
  const router = useRouter();
  const LocationhandleClose = () => {
    setLocationOpen(false);
  };
  const [selectedAddressID, setSelectedAddressID] = useState("");
  const [CustomerID, setCustomerID] = useState<any>(
    userDataItems?.customerName
      ? userDataItems?.customerName
      : getItem("customer_Name", "local")
      ? getItem("customer_Name", "local")
      : null
  );

  const [reRender, setReRender] = useState(false);
  const [customerCartCount, setCustomerCartCount] = useState(
    userDataItems?.userCartCount ?? 0
  );
  const [customerWishListCount, setCustomerWishListCount] = useState(
    userDataItems?.userWishListCount ?? 0
  );
  const [customerAddresses, setCustomerAddresses] = useState([] as any);
  const [dialogClose, setDialogClose] = useState(false);
  const getGeoLocation = (location: any) => {
    if (location?.coords?.latitude && location?.coords?.longitude) {
      setCoordinates({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      });
    }
  };
  const [tierText, setTierText] = useState("");
  const [tierLogo, setTierLogo] = useState("");

  useEffect(() => {
    setTierText(userDataItems?.tierText);
    setTierLogo(userDataItems?.tierLogo);
  }, [userDataItems]);

  useEffect(() => {
    if (customerAddresses.length > 0) {
      const defaultAddress = customerAddresses.find(
        (addr: any) => addr?.default_billing == true
      );
      defaultAddress &&
        setUserDataItems((prevUserState) => ({
          ...prevUserState,
          pincode: defaultAddress?.postcode,
          city: defaultAddress?.city,
          state: defaultAddress?.state,
        }));
    }
  }, [customerAddresses]);
  useEffect(() => {
    if (
      userDataItems?.storeMode &&
      [`/${HOME_TEXT}`, "/"].includes(router?.asPath)
    ) {
      if (userDataItems?.storePath && userDataItems?.storePath !== "") {
        window.location.assign(userDataItems?.storePath);
      } else {
        window.location.assign("/miscs/store");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoggedout = isLogout || router?.query?.Logout === "true";

  const isSignIn = router.query?.SignIn === "true";

  useEffect(() => {
    if (isSignIn) {
      setOpen(true);
      if (!dialogClose) {
        setOpen(true);
      } else {
        setOpen(false);
        if (
          window?.location?.origin.length != 0 &&
          router?.query?.pid != undefined &&
          router?.query?.pid != null
        ) {
          router.replace(
            {
              pathname: window?.location?.origin + router?.query?.pid,
              query: "",
            },
            undefined,
            { shallow: true }
          );
        }
      }
    }
  }, [isSignIn, dialogClose]);

  useEffect(() => {
    {
      coordinates?.latitude &&
        coordinates?.longitude &&
        fetch(
          `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_URL}/json?latlng=${coordinates?.latitude},${coordinates?.longitude}&${key}`
        )
          .then((res) => res.json())
          .then((json) => {
            let cityData: string = "";
            let pincodeData: string = "";
            let stateData: string = "";
            json?.results[0]?.address_components?.forEach((add: any) => {
              let info = add;
              add.types.forEach((type: any) => {
                if (type.indexOf("locality") !== -1) {
                  setCity(info.short_name);
                  setItem("city", info.short_name, "local");
                  cityData = info.short_name;
                }
                if (type.indexOf("administrative_area_level_1") !== -1) {
                  stateData = info.long_name;
                }
                if (type.indexOf("postal_code") !== -1) {
                  setPincode(info.short_name);
                  setItem("pincode", info.short_name, "local");
                  pincodeData = info.short_name;
                }
              });
              if (
                cityData &&
                pincodeData &&
                cityData !== "" &&
                pincodeData !== ""
              ) {
                setUserDataItems({
                  ...userDataItems,
                  city: cityData,
                  pincode: pincodeData,
                  state: stateData,
                  geoLat: parseFloat(coordinates?.latitude),
                  geoLong: parseFloat(coordinates?.longitude),
                });
              }
            });
          });
    }
  }, [coordinates]);

  const LocationhandleOpen = () => {
    if (userDataItems?.storeMode) {
      router.push(userDataItems?.storePath || "/miscs/store");
    } else {
      setLocationOpen(true);
      callGaEvent(userDataItems?.city);
    }
  };

  useEffect(() => {
    setCustomerID(
      userDataItems
        ? userDataItems?.customerName
        : getItem("customer_Name", "local")
        ? getItem("customer_Name", "local")
        : null
    );
    setTierText(userDataItems?.tierText);
    setTierLogo(userDataItems?.tierLogo);
    customerCountData();
    setAccountRerender(!accountRerender);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRender]);

  useEffect(() => {
    if (userDataItems) {
      setItem(
        "pincode",
        userDataItems?.pincode ?? userPincode ?? pincode ?? "400050",
        "local"
      );
    }
  }, [userDataItems]);

  useEffect(() => {
    AxiosInstance(CATEGORYLISTJSON)
      .then((response) => {
        setCategoryData(response?.data?.data);
      })
      .catch(function (error: any) {
        console.log(error);
      });
    if (!isMobile) {
      AxiosInstance(BRANDLIST)
        .then((response) => {
          setBrandData(response?.data?.data?.customAttributeMetadata?.items);
        })
        .catch(function (error: any) {
          console.log(error);
        });
    }
  }, []);

  const handleClick = (path?: string, iconPath?: string, index?: Number) => {
    if (index == 0) {
      if (isMobile) {
        if (true) router?.push("/miscs/get-the-app");
      } else {
        setWebUrl(`${path}`);
        if (true) router?.push("/miscs/get-the-app");
      }
    } else if (path) {
      window.location.assign(`${window.location.origin}${path}`);
    } else {
      toast.error("Someting went wrong, Please try again!!");
    }
  };

  const handleStoreLogoClick = () => {
    if (
      userDataItems?.storeMode &&
      userDataItems?.storePath &&
      userDataItems?.storePath !== ""
    ) {
      window.location.assign(userDataItems?.storePath);
    }
  };

  //page load time
  let pageRenderStart = new Date().getTime();
  function Pageloadtime() {
    let pageLoadTime;
    let pageRenderFinish = new Date().getTime();
    let pageRenderTime = pageRenderFinish - pageRenderStart;
    if (localStorage.getItem("timeToFirstByte")) {
      pageLoadTime = localStorage.getItem("timeToFirstByte")
        ? localStorage.getItem("timeToFirstByte")
        : "" + pageRenderTime;
    } else {
      pageLoadTime = localStorage.getItem("timeToRouteChangeToRender")
        ? localStorage.getItem("timeToRouteChangeToRender")
        : "" + localStorage.getItem("timeToRenderPage");
    }
    localStorage.removeItem("timeToFirstByte");
    localStorage.removeItem("timeToRouteChangeToRender");
    localStorage.removeItem("timeToRenderPage");
    return Number(pageLoadTime);
  }

  const handleDialog = (url: string | URL) => {
    let loadTime = Pageloadtime();
    const seconds = Math.floor(loadTime / 1000);
    setDialogClose(false);
    if (CustomerID) {
      setOpen(false);
    } else {
      const details = {
        page_title: "signindetailpage",
        page_type: "SSO",
        page_slug: getItem("currentPageSlug", "local"),
        page_referrer:
          JSON?.parse(localStorage?.getItem("pageReferrer") as string)?.[
            JSON?.parse(localStorage?.getItem("pageReferrer") as string)
              ?.length - 2
          ]?.previousPagePath || "na",
        page_path: window?.location?.pathname,
        page_referrer_title:
          JSON.parse(localStorage?.getItem("pageReferrer") as string)?.[
            JSON?.parse(localStorage?.getItem("pageReferrer") as string)
              ?.length - 2
          ]?.previousPageTitle || "na",
        platform: window?.innerWidth > 768 ? "PWA" : "MobilePWA",
        customer_id: getItem("customerID", "local")
          ? getItem("customerID", "local")
          : cookie.get("MADid"),
        msd_user_id: getItem("customerID", "local")
          ? getItem("customerID", "local")
          : "",
        loyalty_level: getItem("loyalitylevel", "local")
          ? getItem("loyalitylevel", "local")
          : "na",
        page_load_time: seconds,
      };

      const params = {
        action: "page_view",
        params: details,
      };
      localStorage.setItem("gotoUrl", `${url}`);
      event(params);
      setOpen(true);
      setInitialScreen(true);
      setSignUpScreen(false);
    }
  };
  const handleClosed = (booleanValue: boolean) => {
    setOpen(booleanValue);
    localStorage.removeItem("gotoUrl");
    setOpen(false);
    const details = {
      page_title: "signindetailpage",
      page_type: "SSO",
      page_referrer: getItem("previousPagePath", "local"),
      page_path: window?.location?.pathname,
      page_referrer_title: getItem("previousPageTitle", "local"),
      platform: window?.innerWidth > 768 ? "PWA" : "MobilePWA",
      customer_id: cookie.get("customerID") ?? cookie.get("MADid"),
      msd_user_id: getItem("customerID", "local")
        ? getItem("customerID", "local")
        : "",
      loyalty_level: "na",
    };
    const params = {
      action: "close",
      params: details,
    };
    event(params);
    setDialogClose(true);
    if (setSignOpen) {
      setSignOpen(!signOpen);
    }
  };

  const handleClickSearch = () => {
    setMobileOpen(true);
  };

  useEffect(() => {
    if (signOpen) {
      setOpen(signOpen);
    }
  }, [signOpen]);

  const mergeCarts = () => {
    if (
      getItem("BuyNowCartID", "local") &&
      (!getItem("retryFlowCartID", "local") ||
        getItem("retryFlowCartID", "local") === "")
    ) {
      client
        .mutate({
          mutation: MERGE_ACTIVE_CARTS,
          variables: {
            BuyNowCart: getItem("BuyNowCartID", "local"),
            CustomerCart: getItem("cartID", "local"),
          },
        })
        .then((res) => {
          const hasError = handleErrorResponse(
            res?.data?.mergeActiveCarts?.cart_id
          ); //response checking
          if (hasError) return null;
          if (res?.data?.mergeActiveCarts?.cart_id) {
            setItem("cartID", res?.data?.mergeActiveCarts?.cart_id, "local");
            localStorage.removeItem("BuyNowCartID");
          }
        })
        .catch((err) => {
          toast.error("Someting went wrong, Please try again!!!");
          console.log(err);
        });
    }
  };

  const mergeGuestCarts = (id: any) => {
    client
      .mutate({
        mutation: MERGE_GUEST_CARTS,
        variables: {
          source_cart_id: getItem("cartID", "local")
            ? getItem("cartID", "local")
            : getItem("BuyNowCartID", "local"),
          destination_cart_id: id,
        },
      })
      .then((res) => {
        const hasError = handleErrorResponse(res?.data?.mergeCarts?.id); //response checking
        if (hasError) return null;
        if (res?.data?.mergeCarts?.id) {
          setCustomerCartCount(res?.data?.mergeCarts?.total_quantity);
          localStorage.setItem("cartID", res?.data?.mergeCarts?.id);
          cookie.set("userCartCount", res?.data?.mergeCarts?.total_quantity, {
            path: "/",
            sameSite: true,
          });
          setUserDataItems((previousData) => ({
            ...previousData,
            userCartCount: res?.data?.mergeCarts?.total_quantity,
          }));
        }
      })
      .catch((err) => {
        toast.error("Someting went wrong, Please try again!!!");
        console.log(err);
      });
  };

  const userCartCount = () => {
    if (cookie.get("accessToken")) {
      client
        .query({
          query: GETCUSTOMER_CART_COUNT,
          fetchPolicy: "no-cache",
        })
        .then((res) => {
          if (res?.data?.customerCart) {
            if (
              reRender === true &&
              getItem("cartID", "local") &&
              getItem("cartID", "local") !== "" &&
              res?.data?.customerCart?.id !== getItem("cartID", "local")
            ) {
              setCustomerCartCount(res?.data?.customerCart?.total_quantity);
              if (
                getItem("BuyNowCartID", "local") &&
                (!getItem("retryFlowCartID", "local") ||
                  getItem("retryFlowCartID", "local") === "")
              ) {
                localStorage.setItem("cartID", res?.data?.customerCart?.id);
              }

              mergeGuestCarts(res?.data?.customerCart?.id);
            } else {
              setCustomerCartCount(res?.data?.customerCart?.total_quantity);
              localStorage.setItem("cartID", res?.data?.customerCart?.id);
              cookie.set(
                "userCartCount",
                res?.data?.customerCart?.total_quantity,
                {
                  path: "/",
                  sameSite: true,
                }
              );
              setUserDataItems((previousData) => ({
                ...previousData,
                userCartCount: res?.data?.customerCart?.total_quantity,
              }));
            }
          } else {
            setCustomerCartCount(0);
          }
        })
        .catch((err) => {
          console.log(err);

          setCustomerCartCount(0);
        });
    }
  };

  const userWishListCount = () => {
    if (
      cookie.get("accessToken") &&
      !userDataItems.storeMode &&
      userDataItems.storeModeType !== "cc"
    ) {
      client
        .mutate({
          mutation: CUSTOMER_WISHLIST_COUNT,
        })
        .then((res) => {
          setCustomerWishListCount(res?.data?.wishlist?.items_count);
          cookie.set("userWishListCount", res?.data?.wishlist?.items_count, {
            path: "/",
            sameSite: true,
          });
          userDataItems &&
            setUserDataItems({
              ...userDataItems,
              userCartCount: customerCartCount,
              userWishListCount: res?.data?.wishlist?.items_count,
            });
        })
        .catch((err) => {
          toast.error("Someting went wrong, Please try again!!!");
          console.log(err);
          setUserDataItems({
            ...userDataItems,
            userCartCount: customerCartCount,
            userWishListCount: 0,
          });
        });
    }
  };

  const customerCountData = () => {
    userWishListCount();
    mergeCarts();
    userCartCount();
  };
  useEffect(() => {
    setCustomerID(userDataItems?.customerName);
  }, [userDataItems?.customerName]);

  useEffect(() => {
    setCustomerCartCount(userDataItems?.userCartCount);
  }, [userDataItems?.userCartCount]);

  useEffect(() => {
    setCustomerWishListCount(userDataItems?.userWishListCount);
  }, [userDataItems?.userWishListCount]);

  useEffect(() => {
    if (contextData?.openSSO) {
      handleDialog(signInPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextData?.openSSO]);

  useEffect(() => {
    isMobile ? setFilterItems([items?.[0]]) : setFilterItems(topItems);
  }, [isMobile, items]);

  useEffect(() => {
    if (router.pathname === URL_ACCOUNT) {
      setAccountPage(true);
    } else {
      setAccountPage(false);
    }
  }, [router]);

  const handleNavigation = (path: string | URL) => {
    setLoader(true);
    window.location.assign(path);
  };
  const [anchorElForMenu, setAnchorElForMenu] =
    React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorElForMenu);
  const handleClickSign = (event: any) => {
    setAnchorElForMenu(event.currentTarget);
  };

  const handleCloseForRouting = async (event: any) => {
    event.preventDefault();
    const { myValue } = event.currentTarget.dataset;
    if (myValue) window.location.assign(window.location.origin + myValue);
    else {
      setLogout(true);
    }
    setAnchorElForMenu(null);
  };

  const handleCloseOfMenu = () => {
    setAnchorElForMenu(null);
  };

  const HeaderIcons = (
    path: URL | string,
    imageUrl: string,
    altText: string
  ) => (
    <>
      {imageUrl && (
        <img
          width={isMobile ? "25px" : "18px"}
          onClick={() =>
            altText === "wishList Icon"
              ? cookie.get("accessToken")
                ? handleNavigation(path)
                : handleDialog(path)
              : handleNavigation(path)
          }
          style={{ position: "relative", top: "2px" }}
          src={`${ReplaceImage(imageUrl)}`}
          alt={altText}
        />
      )}
    </>
  );
  const handleFCC = () => {
    setLoader(true);
    callEvent(
      "menu",
      "Join in the first Citizen",
      cookie.get("accessToken") ? ACC_FCC_URL : MISCS_FCC_URL
    );
    if (cookie.get("accessToken")) {
      router.push(ACC_FCC_URL);
    } else {
      router.push(MISCS_FCC_URL);
    }
  };
  //event for signin,wishlist,carticon,first citizen
  const callHyperlinkEvent = (
    eventName: string,
    link_text: string,
    link_url: any
  ) => {
    triggerGAEvent(
      {
        widget_description: "na",
        link_text: link_text,
        link_url: `${global?.window?.location?.origin}${link_url}`,
      },
      eventName
    );
  };
  const callEvent = (eventName: string, link_text: string, link_url: any) => {
    triggerGAEvent(
      {
        widget_title: "na",
        link_text: link_text,
        link_url: `${global?.window?.location?.origin}${link_url}` || "na",
      },
      eventName
    );
  };
  // event triggering for account
  const callAccount = (link_text: string, url: any) => {
    triggerGAEvent(
      {
        widget_title: link_text,
        link_text: link_text,
        link_url: `${global?.window?.location?.origin}${url}`,
      },
      "menu"
    );
  };
  const handleSignup = (trueValue: any) => {
    setOpen(trueValue);
    setDialogClose(false);
  };
  const handleSignIn = (value: any) => {
    setOpen(value);
    setDialogClose(false);
  };

  useEffect(() => {
    if (!cookie.get("accessToken") && userDataItems?.userEmail) {
      localStorage.clear();
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
        city: "Mumbai",
        pincode: "400050",
        state: "Maharastra",
        cardValidDate: "",
        geoLat: 19.05648,
        geoLong: 72.83138,
        profileImage: "",
        userEmail: "",
        tierLogo: "",
        tierText: "",
      });
      window.location.reload();
    }
  }, [cookie.get("accessToken")]);

  const historyBackWFallback = () => {
    setLoader(true);
    if (history.length > 1) {
      history.back();
    } else {
      window.location.href = "/";
    }
    setLoader(false);
  };

  useEffect(() => {
    setSearchVisible(false);
    setMobileOpen(false);
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("mousemove", function (e: any) {
      if (e.target.localName !== "ul") {
        if (document.getElementById("profile-menu")) {
          const menu: any =
            document.getElementById("profile-menu")?.children?.[2];
          const menuBoundary: any = {
            left: menu.offsetLeft,
            top: e.target.offsetTop + e.target.offsetHeight,
            right: menu.offsetLeft + menu.offsetHeight,
            bottom: menu.offsetTop + menu.offsetHeight,
          };
          if (
            e.clientX >= menuBoundary.left &&
            e.clientX <= menuBoundary.right &&
            e.clientY <= menuBoundary.bottom
          ) {
            return;
          } else {
            handleCloseOfMenu();
          }
        }
      }
    });
  }, []);

  const autoScrollText = useMemo(() => {
    if (userDataItems?.storeMode) {
      if (router.asPath === "/miscs/store") {
        return [...exploreStoreModeTitles, ...cities];
      } else {
        if (userDataItems?.storeName) {
          return [
            ...exploreStoreModeTitles,
            { title: userDataItems?.storeName },
          ];
        } else {
          return [...exploreStoreModeTitles, ...cities];
        }
      }
    }
  }, [userDataItems]);

  const handleBackClick = () => {
    if (
      userDataItems?.storeMode &&
      userDataItems?.storePath &&
      userDataItems?.storePath !== ""
    ) {
      window.location.assign(userDataItems?.storePath);
    } else {
      window.location.assign("/home");
    }
  };

  return (
    <>
      {displayLoader && <Loader />}
      {isLoggedout && <Logout />}
      {qrcode && <QRCodeGetMobile setQrcode={setQrcode} path={webUrl} />}
      <CustomSnackBar
        snackBarOpen={snackBarOpen}
        setSnackBarOpen={setSnackBarOpen}
        snackMessage={snackMessage}
      ></CustomSnackBar>
      <Box
        sx={{
          height: isMobile ? (isAccountPage ? "160px" : "121px") : "160px",
        }}
      >
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={open}
          fullScreen
          onClose={handleClosed}
          disableScrollLock
        >
          <SignInComponent
            handleClosed={handleClosed}
            setCustomerID={setCustomerID}
            setLoader={setLoader}
            setReRender={setReRender}
            initialScreen={initialScreen}
            signUpScreen={signUpScreen}
          />
        </BootstrapDialog>
        <HeaderBannerBox
          $isStoreMode={userDataItems?.storeMode}
          $isAccountPage={isAccountPage}
          p={isMobile ? "0 16px" : bgPadding}
        >
          <HeaderWrapper width="100%">
            <Stack
              flexDirection={"row"}
              sx={{ width: "50%" }}
              alignItems={"center"}
            >
              <ContentBox onClick={LocationhandleOpen}>
                {location?.url && (
                  <IconButton
                    sx={{
                      padding: "7px 4px 7px 0px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    <img
                      src={`${ReplaceImage(location?.url)}`}
                      alt="web image"
                    />
                  </IconButton>
                )}
          
                {!userDataItems?.storeMode && (
                  <LocationTypography
                    $isStoreMode={userDataItems?.storeMode}
                    dangerouslySetInnerHTML={{
                      __html: `${
                        userDataItems?.city || userCity || city || "Mumbai"
                      }, ${
                        userDataItems?.pincode ||
                        userPincode ||
                        pincode ||
                        "400050"
                      }`,
                    }}
                  />
                )}
               
                {isMobile && !userDataItems?.storeMode && <ExpandMoreIcon />}
              </ContentBox>
              {userDataItems?.storeMode && (
                <TextCarousel
                  data={autoScrollText}
                  isStoreMode={userDataItems?.storeMode}
                />
              )}
            </Stack>

            <BasicModal
              height={CustomerID || userDataItems?.customerName ? "90%" : "60%"}
              width={isMobile ? "100%" : "500px"}
              top="50%"
              left="50%"
              overflowData={isMobile ? "auto" : "scroll"}
              handleOpen={LocationhandleOpen}
              handleClose={LocationhandleClose}
              open={locationOpen}
              widget_title={selectdata?.data?.title}
              widget_description={selectdata?.data?.addressText}
              Component={
                <SelectLocation
                  selectdata={selectdata}
                  zipcodeData={zipcodeData}
                  setZipcodeData={setZipcodeData}
                  userCity={userCity}
                  setUserCity={setUserCity}
                  userPincode={userPincode}
                  setUserPincode={setUserPincode}
                  getGeoLocation={getGeoLocation}
                  CustomerID={CustomerID}
                  handleSignup={handleSignup}
                  handleSignIn={handleSignIn}
                  setInitialScreen={setInitialScreen}
                  setSignUpScreen={setSignUpScreen}
                  handleClose={LocationhandleClose}
                  BlockhandleOpen={BlockhandleOpen}
                  pincode={pincode}
                  setPincode={setPincode}
                  coordinates={coordinates}
                  selectedAddressID={selectedAddressID}
                  setSelectedAddressID={setSelectedAddressID}
                  setCity={setCity}
                  city={city}
                  setDefaultCity={setDefaultCity}
                  setCoordinates={setCoordinates}
                />
              }
            />
            <BasicModal
              height={isMobile ? "35%" : "200px"}
              width={isMobile ? "100%" : "400px"}
              top="50%"
              left="50%"
              handleOpen={BlockhandleOpen}
              handleClose={BlockhandleClose}
              open={blockOpen}
              Component={
                <BlockLocation
                  selectdata={selectdata}
                  BlockhandleClose={BlockhandleClose}
                />
              }
            />
            <ContentBox sx={{ justifyContent: "flex-end", width: "50%" }}>
              {filterItems?.[0] && (
                <Fragment>
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      callHyperlinkEvent(
                        "hyperlink",
                        filterItems?.[0]?.iconText,
                        filterItems?.[0]?.iconPath
                      );
                      handleClick(
                        filterItems?.[0]?.path,
                        filterItems?.[0]?.iconPath,
                        0
                      );
                    }}
                  >
                    <IconButton sx={{ fontFamily: "Montserrat" }}>
                      <img
                        src={`${ReplaceImage(Get_App?.url)}`}
                        alt="web image"
                      />
                    </IconButton>
                    <LocationTypography $isStoreMode={userDataItems?.storeMode}>
                      {filterItems?.[0]?.iconText
                        ? filterItems?.[0]?.iconText
                        : filterItems?.[0]?.mobileText}
                    </LocationTypography>
                  </Grid>
                </Fragment>
              )}
              {filterItems?.[1] && (
                <Fragment>
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (!userDataItems?.storeMode) {
                        setUserDataItems((prev: any) => {
                          return {
                            ...prev,
                            storeMode: true,
                            storeModeType: "sd",
                          };
                        });
                      }
                      callHyperlinkEvent(
                        "hyperlink",
                        filterItems?.[1]?.iconText,
                        filterItems?.[1]?.iconPath
                      );
                      handleClick(
                        filterItems?.[1]?.path,
                        filterItems?.[1]?.iconPath,
                        1
                      );
                    }}
                  >
                    <IconButton sx={{ fontFamily: "Montserrat" }}>
                      <img
                        src={`${ReplaceImage(Gift_Card?.url)}`}
                        alt="web image"
                      />
                    </IconButton>
                    <LocationTypography $isStoreMode={userDataItems?.storeMode}>
                      {filterItems?.[1]?.iconText}
                    </LocationTypography>
                  </Grid>
                </Fragment>
              )}

              {filterItems?.[2] && (
                <Fragment>
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      callHyperlinkEvent(
                        "hyperlink",
                        filterItems?.[2]?.iconText,
                        filterItems?.[2]?.iconPath
                      );
                      handleClick(
                        filterItems?.[2]?.path,
                        filterItems?.[2]?.iconPath,
                        2
                      );
                    }}
                  >
                    <IconButton sx={{ fontFamily: "Montserrat" }}>
                      <img
                        src={`${ReplaceImage(Stores_And_Events?.url)}`}
                        alt="web image"
                      />
                    </IconButton>
                    <LocationTypography $isStoreMode={userDataItems?.storeMode}>
                      {filterItems?.[2]?.iconText}
                    </LocationTypography>
                  </Grid>
                </Fragment>
              )}

              {filterItems?.[3] && (
                <Fragment>
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      callHyperlinkEvent(
                        "hyperlink",
                        filterItems?.[3]?.iconText,
                        filterItems?.[3]?.iconPath
                      );
                      handleClick(
                        filterItems?.[3]?.path,
                        filterItems?.[3]?.iconPath,
                        3
                      );
                    }}
                  >
                    <IconButton sx={{ fontFamily: "Montserrat" }}>
                      <img src={`${ReplaceImage(Help?.url)}`} alt="web image" />
                    </IconButton>
                    <LocationTypography $isStoreMode={userDataItems?.storeMode}>
                      {filterItems?.[3]?.iconText}
                    </LocationTypography>
                  </Grid>
                </Fragment>
              )}
            </ContentBox>
          </HeaderWrapper>
          {isAccountPage && (
            <Box sx={{ pb: 1, pt: 1, background: "#F8EDF1" }}>
              <ContentBox>
                <ProfileImage
                  src={
                    userDataItems?.profileImage ||
                    `${ReplaceImage(USER_ICON?.url)}`
                  }
                  alt="user-icon"
                />
                <Stack direction="column" sx={{ ml: 2 }}>
                  {!cookie.get("accessToken") ? (
                    <>
                      <UserName>{WELCOME_TEXT}</UserName>
                      <UserCardDetails $isSigned={false}>
                        {"Access your profile to get personalized option "}
                      </UserCardDetails>
                    </>
                  ) : (
                    <>
                      <UserDetails>
                        <UserName>{`Hello, ${CustomerID}`}</UserName>
                        {tierLogo && (
                          <img src={tierLogo} alt="points-icon" width="19px" />
                        )}
                        <UserArrowLeftStyle
                          src={`${ReplaceImage(LEFTARROW?.url)}`}
                          alt="arrow-icon"
                          style={{
                            textIndent: "100%",
                          }}
                        />
                      </UserDetails>
                      <UserCardDetails
                        $isSigned={true}
                        onClick={() => {
                          setLoader(true);
                          window.location.assign(ACC_FCC_URL);
                        }}
                      >
                        {!tierLogo || tierLogo === "" || tierLogo === "na"
                          ? "Become A First Citizen Club Member & Avail Exciting Benefits"
                          : `${tierText} First Citizen Club Member` || ""}
                      </UserCardDetails>
                    </>
                  )}
                </Stack>
              </ContentBox>
            </Box>
          )}
        </HeaderBannerBox>
        {!isAccountPage && (
          <HeaderContainer
            sx={{
              background: bgColor,
              padding: isMobile ? "0 16px" : bgPadding,
            }}
          >
            <HeaderNavBar>
              <HeaderWrapper width="100%">
                <Grid
                  container
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  sx={{ display: "flex" }}
                >
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={4}
                    mt={isMobile ? "10px" : "0px"}
                    sx={{ display: "flex" }}
                  >
                
                    <Stack flexDirection={"row"} alignItems={"center"}>
                      <ExpandMoreIcon
                        sx={{
                          color: "#bb466d",
                          fontSize: "3rem",
                          cursor: "pointer",
                        }}
                        onClick={() => setIsModalOpen(true)}
                      />

                      {userDataItems?.storeMode ? (
                        <Grid
                          item
                          md={12}
                          lg={12}
                          sm={12}
                          xs={12}
                          sx={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            onClick={handleStoreLogoClick}
                            src={"/ssb store logo.svg"}
                            alt="web image SSBeauty"
                            width={"100%"}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              cursor: "pointer",
                            }}
                          />
                        </Grid>
                      ) : (
                        <LogoCarousel />
                      )}
                    </Stack>

                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={8}
                    sx={{
                      display: {
                        xs: "none",
                        sm: "block",
                        lg: "block",
                        md: "block",
                      },
                      margin: "auto 0",
                    }}
                  >
                    {!isMobile &&
                      (userDataItems?.storeMode
                        ? !["/miscs/store"].includes(router?.asPath)
                        : true) && (
                        <SearchWebIconModal
                          searchVisible={searchVisible}
                          setSearchVisible={setSearchVisible}
                          searchIconUrl={SEARCH_ICON?.url}
                          searchText={searchText}
                          setMobileOpen={setMobileOpen}
                          setLoader={setLoader}
                          popularBrands={popularBrands}
                          unbxdCarousel={unbxdCarousel}
                          productData={productData}
                          isPDP={isPDP}
                          popularCategories={popularCategories}
                          searchbarTexts={searchbarTexts}
                          userDataItems={userDataItems}
                        />
                      )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  lg={7.1}
                  md={6.7}
                  sm={7}
                  xs={5}
                  alignItems="center"
                  sx={{
                    justifyContent: {
                      xs: "end",
                      sm: "start",
                      lg: "end",
                      md: "end",
                    },
                  }}
                >
                  <Grid
                    item
                    lg={7}
                    md={6.7}
                    sm={6}
                    sx={{
                      display: {
                        xs: "none",
                        sm: "flex",
                        lg: "flex",
                        md: "flex",
                      },
                      justifyContent: {
                        xs: "end",
                        sm: "end",
                        lg: "end",
                        md: "end",
                      },
                      px: "20px",
                    }}
                  >
                    {!isMobile && isPLP && userDataItems?.storeMode ? (
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            cursor: "pointer",
                            color: "#AC184C",
                          }}
                          onClick={handleBackClick}
                        >
                          <HomeIcon
                            sx={{
                              verticalAlign: "middle",
                              fontSize: "16px",
                              fontWeight: 600,
                              marginRight: "8px",
                              lineHeight: "20px",
                            }}
                          />
                          Go to{" "}
                          {userDataItems?.storeMode &&
                          userDataItems?.storePath &&
                          userDataItems?.storePath !== ""
                            ? "store"
                            : "home"}
                        </Typography>
                      </Box>
                    ) : (
                      <HeaderNavigationBarBox>
                        {!isMobile && !userDataItems.storeMode && (
                          <HeaderNavigationBar
                            headerNavigationData={items}
                            categoriesData={categoryData}
                            brandData={brandData}
                            cmsBrandsData={Brands}
                            brandItems={BrandItems}
                          />
                        )}
                      </HeaderNavigationBarBox>
                    )}
                  </Grid>
                  {isMobile && isPLP && userDataItems?.storeMode && (
                    <HomeIcon onClick={handleBackClick} />
                  )}
                  <SignInGrid
                    item
                    lg={4}
                    md={4.2}
                    sm={4.5}
                    sx={{
                      display: isMobile ? "none" : " flex",
                      cursor: "pointer",
                    }}
                  >
                    {!userDataItems.storeMode && (
                      <Divider
                        sx={{ display: isMobile ? "none" : "vertical" }}
                        orientation="vertical"
                        flexItem
                      />
                    )}
                    <SignInBox
                      onClick={() => {
                        callEvent("menu", "Sign In", "na");
                      }}
                    >
                      <ModalClick
                        id="menu-button"
                        onMouseEnter={(event) => {
                          if (CustomerID) {
                            return handleClickSign(event);
                          }
                        }}
                        onClick={(event) => {
                          return handleDialog(signInPath);
                        }}
                      >
                        <Stack
                          direction={{
                            xs: "column",
                            sm: "column",
                            md: "column",
                            lg: "row",
                          }}
                          spacing={{ lg: 1 }}
                          alignItems="center"
                          sx={{ cursor: "pointer" }}
                        >
                          {(user_signin?.url || tierLogo) && (
                            <img
                              src={
                                tierLogo
                                  ? tierLogo
                                  : `${ReplaceImage(user_signin?.url)}`
                              }
                              alt="Tier icon"
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                              }}
                            />
                          )}
                          <SignInTypo>
                            {CustomerID
                              ? CustomerID?.split(" ")?.[0]?.length <= 7
                                ? CustomerID?.split(" ")?.[0]
                                : CustomerID?.split(" ")?.[0]?.substring(0, 7) +
                                  "..."
                              : signInText}
                          </SignInTypo>
                        </Stack>
                      </ModalClick>
                      {CustomerID && (
                        <MenuBorder
                          disableScrollLock={true}
                          id="profile-menu"
                          disableAutoFocusItem={true}
                          anchorEl={anchorElForMenu}
                          open={openMenu}
                          sx={ProfileMenu}
                          onClose={handleCloseOfMenu}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <Box
                            onMouseLeave={() => {
                              handleCloseOfMenu();
                            }}
                          >
                            {MyAccountNavData?.data?.map(
                              (menuListItem: any, index: number) => {
                                return (
                                  <>
                                    <MenuItem
                                      key={menuListItem?.titlePath}
                                      data-my-value={menuListItem?.titlePath}
                                      onClick={(event) => {
                                        callAccount(
                                          menuListItem?.title,
                                          menuListItem?.titlePath
                                        );
                                        handleCloseForRouting(event);
                                      }}
                                      sx={ProfileMenuItems}
                                    >
                                      {menuListItem?.title}
                                    </MenuItem>
                                  </>
                                );
                              }
                            )}
                          </Box>
                        </MenuBorder>
                      )}
                    </SignInBox>
                    {tierText && cookie.get("accessToken") ? (
                      <CtaButton
                        onClick={handleFCC}
                        sx={{
                          pt: 1,
                          background: ctaLabelBgColor,
                          color: ctaLabelColor,
                          ":hover": { bgcolor: "#AD184C" },
                        }}
                      >
                        <StyledTextButton
                          dangerouslySetInnerHTML={{
                            __html: `First Citizen Club <span>${
                              tierText || ""
                            }</span>`,
                          }}
                        ></StyledTextButton>
                      </CtaButton>
                    ) : (
                      <CtaButton
                        onClick={handleFCC}
                        sx={{
                          pt: 1,
                          background: ctaLabelBgColor,
                          color: ctaLabelColor,
                          ":hover": { bgcolor: "#AD184C" },
                        }}
                      >
                        <StyledTextButton
                          dangerouslySetInnerHTML={{ __html: ctaLabel }}
                        ></StyledTextButton>
                      </CtaButton>
                    )}

                    <Divider
                      sx={{ display: isMobile ? "none" : "vertical" }}
                      orientation="vertical"
                      flexItem
                    />
                  </SignInGrid>
                  <CartGrid
                    item
                    lg={userDataItems?.storeMode ? 0.5 : 1}
                    md={userDataItems?.storeMode ? 0.5 : 1.1}
                    sm={1.5}
                    xs={5}
                    sx={{
                      alignSelf: "center",
                      marginLeft: isMobile ? "10%" : "0%",
                      gap: { lg: "25%", md: "15%", sm: "10%", xs: "25%" },
                    }}
                  >
                    {isMobile &&
                      isPDP &&
                      (userDataItems?.storeMode
                        ? !["/miscs/store"].includes(router?.asPath)
                        : true) && (
                        <MobileSearchBox onClick={() => handleClickSearch()}>
                          <img
                            src={`${ReplaceImage(SEARCH_ICON?.url)}`}
                            alt="search icon"
                            width="25px"
                          />
                        </MobileSearchBox>
                      )}
                    {!userDataItems?.storeMode && (
                      <Box
                        onClick={() =>
                          callEvent("menu", "Wishlist", wishListPath)
                        }
                        sx={{ cursor: "pointer" }}
                      >
                        {customerWishListCount > 0 ? (
                          <StyledBadge
                            badgeContent={customerWishListCount}
                            onClick={() => router?.push(wishListPath)}
                          >
                            <img
                              src={`${ReplaceImage(WISHLIST_ICON?.url)}`}
                              alt={"wishList Icon"}
                              width={isMobile ? "24px" : "18px"}
                            />
                          </StyledBadge>
                        ) : (
                          <>
                            {HeaderIcons(
                              wishListPath,
                              WISHLIST_ICON?.url,
                              "wishList Icon"
                            )}
                          </>
                        )}
                      </Box>
                    )}
                    <Box
                      onClick={() => callEvent("menu", "cart", CART_URL)}
                      sx={{ cursor: "pointer" }}
                    >
                      {customerCartCount > 0 ? (
                        <StyledBadge
                          badgeContent={customerCartCount}
                          onClick={() => window.location.assign(CART_URL)}
                        >
                          <img
                            src={`${ReplaceImage(CART_ICON?.url)}`}
                            alt={"cartIcon"}
                            width={isMobile ? "24px" : "18px"}
                            style={{ position: "relative", top: "1px" }}
                          />
                        </StyledBadge>
                      ) : (
                        <>{HeaderIcons(CART_URL, CART_ICON?.url, "cartIcon")}</>
                      )}
                    </Box>
                  </CartGrid>
                </Grid>
              </HeaderWrapper>
            </HeaderNavBar>
            {/* Search bar for Mobile View */}
            {isMobile && !isPDP && (
              <Box
                onClick={() => {
                  setMobileOpen(true);
                }}
                sx={{
                  border: "#707070",
                  top: "104px",
                  left: "12px",
                }}
              >
                <SearchIconModal
                  setMobileOpen={setMobileOpen}
                  searchVisible={mobileOpen}
                  setLoader={setLoader}
                  popularBrands={popularBrands}
                  searchbarTexts={searchbarTexts}
                  userDataItems={userDataItems}
                />
              </Box>
            )}
            {mobileOpen && (
              <SearchMobileIcon
                setMobileOpen={setMobileOpen}
                open={mobileOpen}
                setLoader={setLoader}
                popularBrands={popularBrands}
                isPDP={isPDP}
                popularCategories={popularCategories}
                unbxdCarousel={unbxdCarousel}
                productData={productData}
                userDataItems={userDataItems}
              />
            )}
          </HeaderContainer>
        )}
        {isMobile && !isHideBottomNav && !open && <>{<Bottom />}</>}
      </Box>
      <StoreModeSwitch navigationPath={"/miscs/store"} />
    </>
  );
};

export default Header;
