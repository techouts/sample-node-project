import axios from "axios";
import { fetchAddress } from "../api/Account/UserAddress";
import {
  productAvailabilityCheck,
  productAvailabilityForCCFulfillment,
} from "../api/Cart/CartProductAvailabilityServiceability";
import { fetchCartDetails } from "../api/Cart/CustomerCart";
import { fetchExploreStoreModeServiceability } from "../graphQLQueries/checkStoreAvailabilityForHLD";
import CartStoreInterface from "../schemas/cartStoreAtom";
import { pinCodeBasedCoordinates } from "./GeoAPI";

export async function UpdatePincode(pincode: string, updateUserInfo: Function) {
  const pincodeResponse = await pinCodeBasedCoordinates(pincode);
  if (!pincodeResponse?.error) {
    updateUserInfo((previousData: any) => ({
      ...previousData,
      city: pincodeResponse?.city,
      pincode: pincodeResponse?.pincode,
      geoLat: pincodeResponse?.latitude,
      geoLong: pincodeResponse?.longitude,
      state: pincodeResponse?.state,
    }));
  }
  return pincodeResponse;
}

export async function GetCartAddresses(updateCart: Function) {
  const response = await fetchAddress();
  if (response?.message) {
    updateCart((previousData: CartStoreInterface) => ({
      ...previousData,
      userAddresses: null,
    }));
  } else {
    updateCart((previousData: CartStoreInterface) => ({
      ...previousData,
      userAddresses: response,
    }));
  }
  return response;
}
function handleExploreStoreModeServiceabilityResponse(
  response: any,
  updateCart: Function,
) {
 
    const products = response?.data?.checkStoreAvailabilityForHLD?.products || [];
    const serviceableProducts = products.filter((product: any) => product?.status === "Serviceable");
    if (serviceableProducts.length > 0) {
      updateCart((previousData: CartStoreInterface) => ({
        ...previousData,
        serviceableProducts: {
          ...previousData.serviceableProducts,
          cc: serviceableProducts,
          non_cc:null,
        },
        serviceability: {
          ...previousData.serviceability,
          cc: true,
          sd: false,
          ed: false,
        },
      }));
    } else {
      updateCart((previousData: CartStoreInterface) => ({
        ...previousData,
        serviceability: {
          ...previousData.serviceability,
          cc: false,
          sd: false,
          ed: false,
        },
        serviceableProducts: {
          ...previousData.serviceableProducts,
          cc: null,
          non_cc: null,
        },
        standardDeliveryDate: null,
        expressDeliveryDate: null,
      }));
    }
  }
  
export async function GetCartItems(cartID: any, updateCart: Function) {
  const response: any = await fetchCartDetails(cartID);
  updateCart((previousData: CartStoreInterface) => ({
    ...previousData,
    cartItems: response?.data,
  }));
  return response?.data;
}

export async function GetCartItemServiceability(
  cartDetails: any,
  userInfo: any,
  updateCart: Function,
  updateUserInfo: Function
) {
  let items: any = [];
  cartDetails?.cart?.items?.map((product: any) => {
    if (product && product?.product?.stock_status == "IN_STOCK") {
      if (
        userInfo?.storeMode &&
        userInfo?.storeModeType === "cc" &&
        userInfo?.storeCode
      ) {
        items?.push({
          sku: product?.configured_variant
            ? product?.configured_variant?.sku
            : product?.product?.sku,
          quantity: product?.quantity,
          deliveryMode: "pick",
          storeId: `${userInfo?.storeCode}`,
        });
      } else {
        items?.push({
          productRef: product?.configured_variant
            ? product?.configured_variant?.sku
            : product?.product?.sku,
          requestedQuantity: product?.quantity,
          deliveryModes: ["ED", "SD"],
        });
      }
    }
  });
  if (items?.length == 0) {
    updateCart((previousData: CartStoreInterface) => ({
      ...previousData,
      serviceability: {
        sd: undefined,
        cc: undefined,
        ed: undefined,
      },
      serviceableProducts: {
        cc: null,
        non_cc: null,
      },
    }));
    return;
  } else {
    if (userInfo?.storeMode && userInfo?.storeModeType === "cc") {
      const response = await fetchExploreStoreModeServiceability(items);
      handleExploreStoreModeServiceabilityResponse(
        response,
        updateCart
      );
    } else {
      if (!userInfo?.pincode || !userInfo?.geoLat || !userInfo?.geoLong) {
        const pincodeResponse = await UpdatePincode(
          userInfo?.pincode,
          updateUserInfo
        );
        const geoLat = pincodeResponse?.latitude;
        const geoLong = pincodeResponse?.longitude;
        if (pincodeResponse != undefined) {
          fetchServiceableStores(
            userInfo?.storeMode && userInfo?.storePincode
              ? userInfo?.storePincode
              : userInfo?.pincode,
            geoLat,
            geoLong,
            items,
            updateCart
          );
          fetchServiceability(
            userInfo?.storeMode && userInfo?.storePincode
              ? userInfo?.storePincode
              : userInfo?.pincode,
            geoLat,
            geoLong,
            items,
            updateCart
          );
        } else {
          updateCart((previousData: CartStoreInterface) => ({
            ...previousData,
            serviceability: {
              sd: undefined,
              cc: undefined,
              ed: undefined,
            },
            serviceableProducts: {
              cc: null,
              non_cc: null,
            },
          }));
          return;
        }
      } else {
        fetchServiceableStores(
          userInfo?.storeMode && userInfo?.storePincode
            ? userInfo?.storePincode
            : userInfo?.pincode,
          userInfo?.geoLat,
          userInfo?.geoLong,
          items,
          updateCart
        );
        fetchServiceability(
          userInfo?.storeMode && userInfo?.storePincode
            ? userInfo?.storePincode
            : userInfo?.pincode,
          userInfo?.geoLat,
          userInfo?.geoLong,
          items,
          updateCart
        );
      }
    }
  }
}
export function filterOutDuplicates(data: any) {
  const uniqueValues = data.filter(
    (currentValue: any, index: number, array: any) =>
      array.findIndex(
        (otherValue: any) => otherValue?.id === currentValue?.id
      ) === index
  );
  return uniqueValues;
}
const fetchServiceableStores = async (
  customerPinCode: any,
  latitude: any,
  longitude: any,
  products: any,
  updateCart: Function
) => {
  const response = await productAvailabilityForCCFulfillment(
    customerPinCode,
    parseFloat(latitude),
    parseFloat(longitude),
    products
  );
  if (
    response?.data?.checkAvailabilityForCCFulfillment?.status == "Available"
  ) {
    if (response?.data?.checkAvailabilityForCCFulfillment?.stores?.length > 0) {
      updateCart((previousData: CartStoreInterface) => ({
        ...previousData,
        serviceabilityStores:
          response?.data?.checkAvailabilityForCCFulfillment
            ?.availableStoresForAllProducts,
        serviceability: {
          ...previousData.serviceability,
          cc: true,
        },
        serviceableProducts: {
          ...previousData.serviceableProducts,
          cc: response?.data?.checkAvailabilityForCCFulfillment?.stores,
        },
      }));
    } else {
      updateCart((previousData: CartStoreInterface) => ({
        ...previousData,
        serviceability: {
          ...previousData.serviceability,
          cc: false,
        },
      }));
    }
  } else {
    updateCart((previousData: CartStoreInterface) => ({
      ...previousData,
      serviceability: {
        ...previousData.serviceability,
        cc: false,
      },
      serviceabilityStores: [],
      serviceableProducts: {
        ...previousData.serviceableProducts,
        cc: null,
      },
    }));
  }
};

function transformNewToOldApiResponse(res) {
  // Group the input data by SKU
  const groupedBySku = res.reduce((acc, item) => {
    if (!acc[item.Sku]) {
      acc[item.Sku] = [];
    }
    acc[item.Sku].push(item);
    return acc;
  }, {});

  // Iterate over each unique SKU to generate `products` array
  const products = Object.keys(groupedBySku).map((sku) => {
    const skuGroup = groupedBySku[sku];
    
    const EDStores = skuGroup.filter((stores) => stores.DeliveryMode === "Express");
    const SDStores = skuGroup.filter((stores) => stores.DeliveryMode === "Standard");

    let deliveryModeEDDs = [];
    if (SDStores.length > 0) {
      deliveryModeEDDs.push({
        deliveryMode: "SD",
        errorMessage: null,
        serviceableStores: SDStores,
        __typename: "DeliveryModeEDD",
      });
    }
    if (EDStores.length > 0) {
      deliveryModeEDDs.push({
        deliveryMode: "ED",
        errorMessage: null,
        serviceableStores: EDStores,
        __typename: "DeliveryModeEDD",
      });
    }

    return {
      status: skuGroup.some((item) => item.DeliveryMode && item.DeliveryMode.trim() !== '' && item.DeliveryMode !== 'Pick'),
      sku, // Takes the current SKU
      requestedQuantity: 1, // Keep static
      fulfillments: [
        {
          type: "HD",
          errorMessage: null,
          store: null,
          deliveryModeEDDs,
          __typename: "Fulfillment",
        },
      ],
      __typename: "ProductFulfillment",
    };
  });

  // Check overall serviceability
  const hasDeliveryMode = res.some((item) =>item.DeliveryMode && item.DeliveryMode.trim() !== '' && item.DeliveryMode !== 'Pick')

  // Return the transformed response
  return {
    data: {
      checkAvailabilityAndEDD: {
        status: hasDeliveryMode ? "Serviceable" : "Non Serviceable",
        destinationPincode: null,
        products, // Include all products
      },
    },
  };
}

const fetchServiceability = async (
  customerPinCode: any,
  latitude: any,
  longitude: any,
  products: any,
  updateCart: Function
) => {
  let allProductsSku = []
  console.log(products,"products")
  products.map((item)=>{
    allProductsSku.push(item.productRef)
  })
  let encodedSkus = encodeURIComponent(allProductsSku.join(","));
  await axios.get(`${process.env.NEXT_PUBLIC_ORC_LAYER}/PinCodeService/api/SkuAvailabilityRMultiYarp?sku=${encodedSkus}&pincode=${customerPinCode}&reqQuantity=1&channel=2`,{auth: {
    username: "admin",
    password: "password",
  },}).then((res)=>{
    if (res?.data == "Out of Stock"){
      updateCart((previousData: CartStoreInterface) => ({
        ...previousData,
        serviceability: {
          sd: false,
          ed: false,
        },
      }));
      return
    }
    let response = transformNewToOldApiResponse(res.data)
  if (response?.data?.checkAvailabilityAndEDD?.status == "Serviceable") {
    updateCart((previousData: CartStoreInterface) => ({
      ...previousData,
      serviceableProducts: {
        ...previousData.serviceableProducts,
        non_cc: response?.data?.checkAvailabilityAndEDD?.products,
      },
    }));
    if (
      response?.data?.checkAvailabilityAndEDD?.products?.length ===
      products?.length
    ) {
      filterDeliveryModes(response?.data?.checkAvailabilityAndEDD, updateCart);
    } else {
      updateCart((previousData: CartStoreInterface) => ({
        ...previousData,
        serviceability: {
          ...previousData.serviceability,
          sd: false,
          ed: false,
        },
      }));
    }
  } else {
    updateCart((previousData: CartStoreInterface) => ({
      ...previousData,
      serviceability: {
        ...previousData.serviceability,
        sd: false,
        ed: false,
      },
      serviceableProducts: {
        ...previousData.serviceableProducts,
        non_cc: null,
      },
      standardDeliveryDate: null,
      expressDeliveryDate: null,
    }));
  }
})}

/**
 * Filters delivery modes (Standard Delivery and Express Delivery) from the provided serviceability data
 * and updates the cart with the relevant information.
 *
 * @param {any} serviceabilityData - The raw serviceability data containing products and their delivery modes.
 * @param {Function} updateCart - A function to update the cart state.
 */
const filterDeliveryModes = (serviceabilityData: any, updateCart: Function) => {
  // Array to store processed data for each product
  let data: { sku?: string; sd?: any; ed?: any }[] = []; // Expected to hold objects with sku, sd, and ed details.

  // Iterate over the products in the serviceability data
  serviceabilityData?.products?.map(
    (product: { sku: string; fulfillments: any[] }) => {
      // Initialize an object to hold delivery mode data for the current product
      let productsData: {
        sku?: string; // SKU (Stock Keeping Unit) of the product
        sd?: any; // Standard Delivery data
        ed?: any; // Express Delivery data
      } = {};
      productsData.sku = product?.sku; // Assign the product SKU

      // Iterate over the fulfillment options for the current product
      product?.fulfillments.map(
        (type: { type: string; store: any; deliveryModeEDDs: any[] }) => {
          // Ignore "Click and Collect" (CC) type fulfillments
          if (type?.type !== "CC") {
            // Iterate over the delivery modes (e.g., SD, ED) in the fulfillment
            type?.deliveryModeEDDs.map(
              (typeMode: {
                deliveryMode: string; // Type of delivery mode (e.g., "SD", "ED")
                serviceableStores: { lspEDDs: any[] }[]; // Array of serviceable stores with delivery dates
              }) => {
                // Handle Standard Delivery (SD)
                if (typeMode?.deliveryMode === "SD") {
                  console.log(typeMode,"worked this new typemode")
                  if (
                    typeMode?.serviceableStores?.length !== 0 && // Ensure there are serviceable stores
                    typeMode?.serviceableStores.length > 0 // Ensure there are delivery dates
                  ) {
                    productsData.sd =
                    {edd:typeMode?.serviceableStores[0].DeliveryDate,
                      lspName:"ECOM EXPRESS",
                      __typename:"LogisticEDD"}// Assign the first available EDD
                    // Update the cart with the standard delivery date
                    updateCart((previousData: CartStoreInterface) => ({
                      ...previousData,
                      standardDeliveryDate:
                      typeMode?.serviceableStores[0].DeliveryDate, // Expected Delivery Date (EDD)
                    }));
                  }
                }
                // Handle Express Delivery (ED)
                else if (typeMode?.deliveryMode === "ED") {
                  if (
                    typeMode?.serviceableStores?.length !== 0 && // Ensure there are serviceable stores
                    typeMode?.serviceableStores.length > 0// Ensure there are delivery dates
                  ) {
                    productsData.ed =
                    {edd:typeMode?.serviceableStores[0].DeliveryDate,
                      lspName:"ECOM EXPRESS",
                      __typename:"LogisticEDD"} // Assign the first available EDD
                    // Update the cart with the express delivery date
                    updateCart((previousData: CartStoreInterface) => ({
                      ...previousData,
                      expressDeliveryDate:
                      typeMode?.serviceableStores[0].DeliveryDate,// Expected Delivery Date (EDD)
                    }));
                  }else{
                    updateCart((previousData: CartStoreInterface) => ({
                      ...previousData,
                      serviceability: {
                        ...previousData.serviceability,
                        // Logic for ED depends on an environment variable
                        ed:false,
                      },
                    }))
                  }
                }
              }
            );
          }
        }
      );
      // Push the processed product data to the data array
      data?.push(productsData);
    }
  );

  // If the data array is not empty, process the delivery information
  if (data.length !== 0) {
    // Arrays to hold Standard Delivery and Express Delivery data
    let standardDelivery: any[] = []; // Array of standard delivery EDDs
    let expressDelivery: any[] = []; // Array of express delivery EDDs

    // Separate the data into standard and express delivery arrays
    data.map((item: { sd?: any; ed?: any; store?: any }) => {
      {
        item?.sd && standardDelivery.push(item?.sd); // Add SD data if available
      }
      {
        item?.ed && expressDelivery.push(item?.ed); // Add ED data if available
      }
    });
    // Update the cart with the serviceability information
    updateCart((previousData: CartStoreInterface) => ({
      ...previousData,
      serviceability: {
        ...previousData.serviceability,
        // All products must have SD for `sd` to be true
        sd: standardDelivery ? standardDelivery?.length === data.length : false,
        // Logic for ED depends on an environment variable
        ed:
          process.env.NEXT_PUBLIC_ENABLE_SPLIT_ED_SD !== "true"
            ? expressDelivery?.length === data.length // All products must have ED for `ed` to be true
            : expressDelivery?.length !== 0 // At least one product with ED is enough
            ? true
            : false,
      },
    }));
  }
};

