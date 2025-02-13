import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useMobileCheck } from "../../utility/isMobile";
import FindStoresSchema from "./FindStoresSchema";
import FilteredStores from "./FilteredStores";
import {
  SearchIconImage,
  ExpandMoreImage,
  FilterAllStores,
  StoreHeading,
  NoStoresBox,
  NoStoresImage,
  NoStoresTitle,
} from "./FindStoresStyle";
import { triggerGAEvent } from "../../utility/GaEvents";
import { Widget_type } from "../../utility/GAConstants";
import { toast } from "../../utility/Toast";
import graphql from "../../middleware-graphql";
import { FETCH_STORES_FOR_EVENTS } from "../../graphQLQueries/StoreEvents/FetchStores";
import { FindStoresPaperComponent } from "./FindStoresPaperComponent";
import useStorage from "../../utility/useStoarge";
import router from "next/router";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { BoxStyled } from "../OffersGrid/OffersGridStyles";
import { ExploreUserConsent } from "../StoreSwitch/ExploreUserConsent";
import {
  getCartItems,
  RemoveCartItems,
} from "../../HOC/ProductCard/ProductCardUtils";
import { CustomSnackBar } from "../../HOC/CustomSnackBar/CustomSnackBar";
import { SSBStoreImages, userState } from "../../recoilstore";
import { useRecoilState } from "recoil";
import client from "../../apollo-client";
import { ADD_PRODUCTS_TO_WISHLIST } from "../../graphQLQueries/WhishList/AddProductsToWishList";
import Loader from "../../HOC/Loader/Loader";
import { Typography } from "@mui/material";

const FindStores = ({
  bgPadding,
  bgColor,
  storeTitle,
  searchImage,
  expandMoreImage,
  listOfCities,
  noStoresTitle,
  noStoresImgUrl,
  setSelectedStore,
  noStoresSubTitle,
  title,
  __component,
  position,
  id,
  setSignInOpen,
  setLoader,
  stateCityData,
  displayLoader
}: FindStoresSchema) => {
  const { getItem, setItem } = useStorage();
  const isMobile = useMobileCheck();
  const finalCity = getItem("city", "local") ?? "Mumbai";
  const finalState = getItem("state", "local") ?? "Maharashtra";
  const [seletedState, setSeletedState] = useState<any>(finalState);
  const [seletedCity, setSeletedCity] = useState<any>(finalCity);
  const [openPopup, setPopup] = useState<boolean>(false);
  const [filtered, setFiltered] = useState([]);
  const [rawStoreData, setRawStoreData] = useState([]);
  const lat = getItem("geoLong", "local") ?? 19.05648;
  const lng = getItem("geoLat", "local") ?? 72.83138;
  const [currentStore, setCurrentStore] = useState<any>(null);
  const [cartData, setCartData] = useState<any>();
  const [snackBar, setSnackBar] = useState({ open: false, message: "" });
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [storeImages, setStoreImages] = useRecoilState(SSBStoreImages);

  function handleSnackBar(state: boolean, message: string = "") {
    setSnackBar((prev: any) => ({
      message: message,
      open: state,
    }));
  }

  function handlePopUp() {
    setPopup((prev) => !prev);
  }

  useEffect(() => {
    if(seletedCity){
    citiesApiFunction(seletedCity);
    }
  }, [seletedCity]);

  function mergeStoreImagesToStoreData(storeData: any) {
    return storeData.map((store: any) => {
      const foundImage = storeImages?.find?.(
        (item: any) => item.name?.split('-')[0] === store.code
      );

      return {
        ...store,
        storeImageFromCMSDesktop: foundImage ? foundImage.webUrl || null : null,
        storeImageFromCMSMobile: foundImage
          ? foundImage.mobileUrl || null
          : null,
      };
    });
  }
  

  const filterAndMergeStores = (storeData: any[], storeImages: any[]) => {
    const storeCodesToFilter = [
      "101", "102", "110", "112", "115", "116", "117", "120", "121", "126", "127", "130", 
      "143", "144", "146", "147", "151", "153", "154", "155", "158", "162", "165", "166", 
      "167", "168", "171", "174", "175", "182", "184", "196", "199", "223", "225", "226", 
      "255", "257", "259", "273", "274", "290", "294", "310", "312", "314", "347", "450", 
      "478", "484", "496", "8512", "8520", "656", "8705", "8706", "8708", "8710", "8713", 
      "901","114",
    ];
  
    if (storeImages.length > 0) {
      const mergedStores = mergeStoreImagesToStoreData(storeData);
      return mergedStores.filter((store: any) => storeCodesToFilter.includes(store.code));
    }
  
    return storeData;
  };
  
  const citiesApiFunction = async (cityValue: string) => {
    setLoader(true);
    try {
      const response = await graphql.mutate({
        mutation: FETCH_STORES_FOR_EVENTS,
        variables: { SelectedCity: cityValue },
      });
  
      const storeData = response?.data?.storeFinder?.results || [];
      setRawStoreData(storeData);
  
      const filteredData = filterAndMergeStores(storeData, storeImages);
      setFiltered(filteredData);
    } catch (err) {
      console.error("store Finder error:", err);
    } finally {
      setLoader(false);
    }
  };
  

  const callEvent = (cityname: string) => {
    triggerGAEvent(
      {
        item_name: cityname,
        item_id: `${__component}__${position}`,
        cpmponent_id: id,
        widget_type: Widget_type,
        item_type: "store",
        widget_title: title,
        widget_description: "na",
        widget_postion: 2,
        link_url: router?.query?.pid,
        link_text: cityname,
        no_of_items: listOfCities?.length,
        index: 1,
        event_type: "filter",
      },
      "click"
    );
  };
  function paddingFunc() {
    if (isMobile) {
      if (bgPadding === null || bgPadding === "0") {
        return "0px";
      } else {
        return "0px 16px";
      }
    } else {
      return bgPadding;
    }
  }

  function updateStore() {
    setUserDataItems((prev: any) => ({
      ...prev,
      storeMode: true,
      storeName: currentStore?.displayName,
      storePath: `/store/${currentStore?.code}`,
      storeCode: currentStore?.code,
      storeModeType: "cc",
      storeAddress: `${currentStore?.displayName || ""} ${
        currentStore?.address?.formattedAddress || ""
      }`,
      // isStoreModeAddToCartInitial: true,
      storeCords: {
        lat: currentStore.geoPoint.latitude,
        long: currentStore.geoPoint.longitude,
      },
      storePincode: currentStore?.address?.postalCode,
    }));
  }
  async function handleWishlist() {
    const cartId = getItem("cartID", "local") as string;
    if (cartId) {
      if (cartData?.data?.cart?.items?.length > 0) {
        const cartNonWishlistItems = cartData?.data?.cart?.items
          ?.filter((i: any) => i.isWishlisted === false)
          ?.map((item: any) => {
            return {
              sku:
                item?.product?.type_id !== "simple"
                  ? item?.configured_variant?.sku
                  : item?.product?.sku,
              parent_sku: item?.product?.sku,
              quantity: 1,
            };
          });
        if (cartNonWishlistItems?.length > 0) {
          await client
            .mutate({
              mutation: ADD_PRODUCTS_TO_WISHLIST,
              fetchPolicy: "no-cache",
              variables: {
                WishListInput: cartNonWishlistItems,
              },
            })
            .then(async (res: any) => {
              const removeCartItemsRes = await RemoveCartItems(cartId);
              if (removeCartItemsRes?.data?.removeCart?.status) {
                setPopup(false);
                updateStore();
                router.push(`/store/${currentStore?.code}`);
              } else {
                //TODO: Need to handle negative case
              }
            })
            .catch((error) => {
              console.log("error", error);
              //TODO: Need to handle negative case
            });
        } else {
          const removeCartItemsRes = await RemoveCartItems(cartId);
          if (removeCartItemsRes?.data?.removeCart?.status) {
            setPopup(false);
            updateStore();
            router.push(`/store/${currentStore?.code}`);
          } else {
            //TODO: Need to handle negative case
          }
        }
        if (cartData?.data?.cart?.items?.length > 0) {
          const cartProducts = cartData?.data?.cart?.items?.map((item: any) => {
            return {
              sku:
                item?.product?.type_id !== "simple"
                  ? item?.configured_variant?.sku
                  : item?.product?.sku,
              parent_sku: item?.product?.sku,
              quantity: 1,
            };
          });
        }
      }
    }
  }

  useEffect(() => {
    const state: any = stateCityData?.find((state: any) =>
      state.cities.some(
        (city: any) =>
          city.cityName?.toLowerCase() === seletedCity?.toLowerCase()
      )
    )?.stateName;

    if (state) {
      setSeletedState(state);
    }
  }, [seletedCity, stateCityData]);

  useEffect(() => {
    if (storeImages.length > 0 && rawStoreData.length > 0) {
      const filteredData = filterAndMergeStores(rawStoreData, storeImages);
      setFiltered(filteredData);
    }
  }, [storeImages, rawStoreData]);
  

  return (
    <>
    {displayLoader && <Loader />}
      <CustomSnackBar
        snackBarOpen={snackBar?.open}
        setSnackBarOpen={handleSnackBar}
        snackMessage={snackBar?.message}
        autoHideDuration={5000}
      ></CustomSnackBar>
      <Box
        sx={{
          backgroundColor: bgColor,
          p: paddingFunc(),
        }}
      >
        {isMobile ? (
          <Typography sx={{ margin: "0px", paddingTop: "20px",paddingBottom: "20px", fontWeight: "bold" }}>
            {title}
          </Typography>
        ) : (
          <StoreHeading>{title}</StoreHeading>
        )}

        <Grid container spacing={1}>
          <Grid
            item
            lg={isMobile ? 7 : 5}
            md={isMobile ? 7 : 5}
            sm={isMobile ? 7 : 5}
            xs={isMobile ? 7 : 5}
          >
            <Autocomplete
              popupIcon={
                <ExpandMoreImage src={expandMoreImage} alt="Expand Icon" />
              }
              onChange={(event, value) => {
                setSeletedState(value);
                setSeletedCity("");
              }}
              value={seletedState}
              PaperComponent={FindStoresPaperComponent}
              // sx={{ m: 1, width: 300 }}
              id="search-state"
              options={stateCityData?.map((states: any) => states?.stateName)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Select A State"}
                  sx={{
                    marginBottom: "18px",
                    fontSize: isMobile ? "11px" : "14px",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        border: "1px solid #231F20",
                      },
                    },
                    "& :hover": {
                      cursor: "pointer",
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      borderColor: "#E7E7E7",
                      borderRadius: "0px",
                      padding: "0px 6px",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIconImage src={searchImage} alt="Search Icon" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid
            item
            sx={{ width: "100%" }}
            lg={isMobile ? 5 : 7}
            md={isMobile ? 5 : 7}
            sm={isMobile ? 5 : 7}
            xs={isMobile ? 5 : 1}
          >
            <Autocomplete
              popupIcon={
                <ExpandMoreImage src={expandMoreImage} alt="Expand Icon" />
              }
              onChange={(event, value) => {
                setSeletedCity(value);
                const innerText = (event.target as HTMLElement).innerText;

                callEvent(innerText);
              }}
              value={seletedCity}
              PaperComponent={FindStoresPaperComponent}
              id="search-city"
              options={
                stateCityData
                  ?.filter((state: any) => state?.stateName === seletedState)
                  .flatMap((state: any) =>
                    state?.cities?.map((city: any) => city?.cityName)
                  ) || []
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Select A City"}
                  sx={{
                    marginBottom: "18px",
                    fontSize: isMobile ? "11px" : "14px",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        border: "1px solid #231F20",
                      },
                    },
                    "& :hover": {
                      cursor: "pointer",
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      borderColor: "#E7E7E7",
                      borderRadius: "0px",
                      padding: "0px 6px",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIconImage src={searchImage} alt="Search Icon" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid
          container
          columnSpacing={isMobile ? 0 : 2}
          sx={{
            flexDirection: isMobile ? "column-reverse" : "row",
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              border: "1px solid #EAEAEA",
              padding: "12px",
              margin: isMobile ? "25px 0px" : "0px",
            }}
          >
            <Box>
              {filtered && filtered?.length > 0 ? (
                <>
                  <FilterAllStores>
                    {filtered &&
                      filtered?.map((cities: any, index: number) => (                     
                        <>                 
                          {cities && (
                            <Grid
                              sm={12}
                              md={12}
                              lg={12}
                              xs={12}
                              sx={{
                                border: "1px solid #EAEAEA",
                              }}
                              key={index}
                            >
                              <FilteredStores
                                cities={cities}
                                title={storeTitle}
                                lat={lat}
                                lng={lng}
                                setSignInOpen={setSignInOpen}
                                setPopup={setPopup}
                                setCurrentStore={setCurrentStore}
                                setCartData={setCartData}
                                handleSnackBar={handleSnackBar}
                              />
                            </Grid>
                          )}
                        </>
                      ))}
                  </FilterAllStores>
                </>
              ) : (
                <>
                  <NoStoresBox>
                    <NoStoresTitle>{noStoresTitle}</NoStoresTitle>
                    <NoStoresImage
                      src={noStoresImgUrl}
                      alt="No Stores Image"
                      width="100%"
                    />
                    <NoStoresTitle>{noStoresSubTitle}</NoStoresTitle>
                  </NoStoresBox>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      {openPopup && (
        <BoxStyled>
          <BasicModal
            top={"50%"}
            width={isMobile ? "100%" : "30%"}
            left={"50%"}
            open={openPopup}
            handleClose={() => {
              handlePopUp();
            }}
            Component={
              <ExploreUserConsent
                message="You have items in the cart, please checkout/Wishlist them before exploring the store"
                rightCta="Checkout Cart"
                leftCta="Wishlist"
                rightAction={() => {
                  //Checkout Cart
                  setUserDataItems((prev: any) => ({
                    ...prev,
                    storeMode: false,
                    storeModeType: null,
                    storeName: null,
                    storePath: null,
                    storeCode: null,
                  }));
                  setLoader(true);
                  handlePopUp();
                  router?.push(`/cart/info`);
                }}
                leftAction={async () => {
                  //Wishlist
                  await handleWishlist();
                }}
              />
            }
          ></BasicModal>
        </BoxStyled>
      )}
    </>
  );
};

export default FindStores;
