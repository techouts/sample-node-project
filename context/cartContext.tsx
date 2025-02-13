import { createContext, useContext, useState } from "react";
import { fetchAddress } from "../api/Account/UserAddress";
import {
  productAvailabilityCheck,
  productAvailabilityForCCFulfillment,
} from "../api/Cart/CartProductAvailabilityServiceability";
import { fetchCartDetails } from "../api/Cart/CustomerCart";
import useStorage from "../utility/useStoarge";
import { pinCodeBasedCoordinates } from "../utility/GeoAPI";

export type cartContextType = {
  cartData: {
    cartItems: any;
    serviceabilityData: any;
    pincode: any;
    userAddress: any;
    serviceability: any;
    currentDeliveryMode: any;
    shippingAddress: any;
    billingAddress: any;
    refreshPage: any;
    storeId: any;
    standardDeliveryDate: any;
    setStandardDeliveryDate: Function;
    userDeliveryAddress: any;
    tost: any;
    setTostMessge: any;
    serviceabilityStores: any;
    expressDeliveryDate: any;
    setCartItems: Function;
    setServiceabilityData: Function;
    setPincode: Function;
    setAddress: Function;
    setServiceability: Function;
    setCurrentDeliveryMode: Function;
    setShippingAddress: Function;
    setBillingAddress: Function;
    setRefreshPage: Function;
    setStoreId: Function;
    setUserDeliveryAddress: Function;
    setServiceabilityStores: Function;
    setExpressDeliveryDate: Function;
    fetchServiceability: Function;
    fetchUserAddress: Function;
    fetchUserCartDetails: Function;
    fetchServiceableStores: Function;
    getCartItemServiceability: Function;
  };
};

export const CartContext = createContext<cartContextType | any>(null);

export function CartContextWrapper({ children }: any) {
  const { getItem } = useStorage();
  const [cartItems, setCartItems] = useState<any>(null);
  const [serviceabilityData, setServiceabilityData] = useState<any>({
    cc: null,
    non_cc: null,
  });
  const [serviceabilityStores, setServiceabilityStores] = useState<any>([]);
  const [pincode, setPincode] = useState<any>(getItem("pincode", "local"));
  const [userAddress, setUserAddress] = useState<any>(null);
  const [currentDeliveryMode, setCurrentDeliveryMode] = useState<any>(null);
  const [shippingAddress, setShippingAddress] = useState<any>(null);
  const [billingAddress, setBillingAddress] = useState<any>(null);
  const [refreshPage, setRefreshPage] = useState(false);
  const [storeId, setStoreId] = useState<any>(null);
  const [standardDeliveryDate, setStandardDeliveryDate] = useState(null);
  const [tost, setTost] = useState(false);
  const [tostMessage, setTostMessge] = useState("");
  const [expressDeliveryDate, setExpressDeliveryDate] = useState(null);
  const [userDeliveryAddress, setUserDeliveryAddress] = useState({
    sd: {
      billingAddress: null,
      shippingAddress: null,
    },
    cc: {
      billingAddress: null,
    },
    ed: {
      billingAddress: null,
      shippingAddress: null,
    },
  });
  const [serviceability, setServiceability] = useState<any>({
    sd: false,
    cc: false,
    ed: false,
  });

  const fetchUserAddress = async () => {
    const response = await fetchAddress();
    setUserAddress(response);
  };

  const fetchUserCartDetails = async (cartID: any) => {
    const response = await fetchCartDetails(cartID);
    setCartItems(response);
    return response;
  };

  const getCartItemServiceability = async (cartDetails: any) => {
    const currentPincode = getItem("pincode", "local");
    const locationCoordinates = await pinCodeBasedCoordinates(
      `${currentPincode}`
    );
    if (locationCoordinates === undefined) {
      setServiceability({
        sd: false,
        cc: false,
        ed: false,
      });
      setServiceabilityData((perviousData: any) => ({
        cc: null,
        non_cc: null,
      }));
      return;
    }
    let items: any = [];
    cartDetails?.data?.cart?.items?.map((product: any) =>
      items?.push({
        productRef: product?.product?.sku,
        requestedQuantity: product?.quantity,
        deliveryModes: ["ED", "SD"],
      })
    );
    if (items?.length !== 0) {
      await fetchServiceableStores(
        currentPincode,
        locationCoordinates?.latitude,
        locationCoordinates?.longitude,
        items
      );
      await fetchServiceability(
        currentPincode,
        locationCoordinates?.latitude,
        locationCoordinates?.longitude,
        items
      );
    }
  };

  const fetchServiceableStores = async (
    customerPinCode: any,
    latitude: any,
    longitude: any,
    products: any
  ) => {
    const response = await productAvailabilityForCCFulfillment(
      customerPinCode,
      latitude,
      longitude,
      products
    );
    if (
      response?.data?.checkAvailabilityForCCFulfillment?.status === "Available"
    ) {
      if (
        response?.data?.checkAvailabilityForCCFulfillment?.stores?.length ===
        products?.length
      ) {
        setServiceabilityStores(
          response?.data?.checkAvailabilityForCCFulfillment?.stores
        );
        setServiceabilityData((perviousData: any) => ({
          ...perviousData,
          cc: response?.data?.checkAvailabilityForCCFulfillment?.stores,
        }));
        setServiceability((perviousData: any) => ({
          ...perviousData,
          cc: true,
        }));
      } else {
        setServiceability((perviousData: any) => ({
          ...perviousData,
          cc: false,
        }));
      }
    } else {
      setServiceabilityStores([]);
      setStandardDeliveryDate(null);
      setServiceability((perviousData: any) => ({
        ...perviousData,
        cc: false,
      }));
    }
  };

  const fetchServiceability = async (
    customerPinCode: any,
    latitude: any,
    longitude: any,
    products: any
  ) => {
    const response = await productAvailabilityCheck(
      customerPinCode,
      latitude,
      longitude,
      products,
      "HD",
      "HD"
    );
    if (response?.data?.checkAvailabilityAndEDD?.status === "Serviceable") {
      setServiceabilityData((perviousData: any) => ({
        ...perviousData,
        non_cc: response?.data?.checkAvailabilityAndEDD?.products,
      }));
      if (
        response?.data?.checkAvailabilityAndEDD?.products?.length ===
        products?.length
      ) {
        filterDeliveryModes(response);
      } else {
        setServiceability((perviousData: any) => ({
          ...perviousData,
          sd: false,
          ed: false,
        }));
      }
    } else {
      setServiceability((perviousData: any) => ({
        ...perviousData,
        sd: false,
        ed: false,
      }));
    }
  };

  const filterDeliveryModes = (serviceabilityData: any) => {
    let data: {}[] = [];
    serviceabilityData?.data?.checkAvailabilityAndEDD?.products?.map(
      (product: { sku: any; fulfillments: any[] }) => {
        let productsData: {
          sku?: string;
          sd?: any;
          ed?: any;
        } = {};
        productsData.sku = product?.sku;
        product?.fulfillments.map(
          (type: { type: string; store: any; deliveryModeEDDs: any[] }) => {
            if (type?.type !== "CC") {
              type?.deliveryModeEDDs.map(
                (typeMode: {
                  deliveryMode: string;
                  serviceableStores: { lspEDDs: any[] }[];
                }) => {
                  if (typeMode?.deliveryMode === "SD") {
                    if (
                      typeMode?.serviceableStores?.length !== 0 &&
                      typeMode?.serviceableStores[0]?.lspEDDs.length !== 0
                    ) {
                      productsData.sd =
                        typeMode?.serviceableStores[0]?.lspEDDs[0];
                      setStandardDeliveryDate(
                        typeMode?.serviceableStores[0]?.lspEDDs[0]?.edd
                      );
                    }
                  } else if (typeMode?.deliveryMode === "ED") {
                    if (
                      typeMode?.serviceableStores?.length !== 0 &&
                      typeMode?.serviceableStores[0]?.lspEDDs.length !== 0
                    ) {
                      productsData.ed =
                        typeMode?.serviceableStores[0]?.lspEDDs[0];
                      setExpressDeliveryDate(
                        typeMode?.serviceableStores[0]?.lspEDDs[0]?.edd
                      );
                    }
                  }
                }
              );
            }
          }
        );
        data?.push(productsData);
      }
    );

    if (data.length !== 0) {
      let standardDelivery: any[] = [];
      let expressDelivery: any[] = [];
      data.map((item: { sd?: any; ed?: any; store?: any }) => {
        {
          item?.sd && standardDelivery.push(item?.sd);
        }
        {
          item?.ed && expressDelivery.push(item?.ed);
        }
      });
      setServiceability((previousData: any) => ({
        ...previousData,
        sd: standardDelivery ? standardDelivery.length === data.length : false,
        ed: process.env.NEXT_PUBLIC_ENABLE_SPLIT_ED_SD !== "true" ? expressDelivery?.length === data.length ? true : false : expressDelivery?.length !== 0 ? true : false,
      }));
    }
  };

  return (
    <CartContext.Provider
      value={{
        tost,
        tostMessage,
        cartItems,
        serviceabilityData,
        pincode,
        userAddress,
        serviceability,
        currentDeliveryMode,
        shippingAddress,
        billingAddress,
        refreshPage,
        storeId,
        standardDeliveryDate,
        setStandardDeliveryDate,
        userDeliveryAddress,
        setTostMessge,
        setTost,
        serviceabilityStores,
        expressDeliveryDate,
        setCartItems,
        setServiceabilityData,
        setPincode,
        setUserAddress,
        setServiceability,
        setCurrentDeliveryMode,
        setShippingAddress,
        setBillingAddress,
        setRefreshPage,
        setStoreId,
        setUserDeliveryAddress,
        setExpressDeliveryDate,
        setServiceabilityStores,
        fetchServiceability,
        fetchUserAddress,
        fetchUserCartDetails,
        fetchServiceableStores,
        getCartItemServiceability,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function userCartContext() {
  return useContext(CartContext);
}
