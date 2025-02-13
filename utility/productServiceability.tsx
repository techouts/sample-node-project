import axios from "axios";
import { CHECK_PRODUCT_SERVICEABILITY } from "../graphQLQueries/CheckAvailabilityEDD";
import graphql from "../middleware-graphql";
import handleErrorResponse from "./ErrorHandling";
import { toast } from "./Toast";

function transformNewToOldApiResponse(res){
  let EDStores = res.filter((stores)=> stores.DeliveryMode === "Express")
  let SDStores = res.filter((stores)=> stores.DeliveryMode === "Standard")
  let deliveryModeEDDs = [];
  
  let hasDeliveryMode = res.some(item => item.hasOwnProperty('DeliveryMode'));
  if (SDStores.length > 0) {
    deliveryModeEDDs.push({
      deliveryMode: "SD",
      errorMessage: null,
      serviceableStores: SDStores,
      __typename: "DeliveryModeEDD"
    });
  }
  if (EDStores.length > 0) {
    deliveryModeEDDs.push({
      deliveryMode: "ED",
      errorMessage: null,
      serviceableStores: EDStores,
      __typename: "DeliveryModeEDD"
  });
  }
     return {data:{
          checkAvailabilityAndEDD: {
              status: hasDeliveryMode ? "Serviceable" : "Non Serviceable",
              destinationPincode: null,
              products:[
                {
                  "status": hasDeliveryMode,
                  "sku": res[0].Sku, //takes sku from 1st object,
                  "requestedQuantity": 1, //keep static
                  "fulfillments": [
                      {
                          "type": "HD",
                          "errorMessage": null,
                          "store": null,
                          deliveryModeEDDs,
                          "__typename": "Fulfillment"
                      }
                  ],
                  "__typename": "ProductFulfillment"
              }
              ]
  }
  }}
  }
  const productServiceability = async (
    lat: number,
    long: number,
    pincode: any,
    productSku: string
  ): Promise<{ isServiceable: boolean; response: any | null }> => {
    const productsArr = [
      {
        productRef: productSku,
        requestedQuantity: 1,
        deliveryModes: ["ED", "SD"],
      },
    ];
  
    const allProductsSku = productsArr.map((item) => item.productRef);
    const encodedSkus = encodeURIComponent(allProductsSku.join(","));
  
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ORC_LAYER}/PinCodeService/api/SkuAvailabilityRMultiYarp?sku=${encodedSkus}&pincode=${pincode}&reqQuantity=1&channel=2`,
        {
          auth: {
            username: "admin",
            password: "password",
          },
        }
      );
  
      if (res?.data === "Out of Stock") {
        return { isServiceable: false, response: null };
      }
  
      const transformedResponse = transformNewToOldApiResponse(res.data);
      const isServiceable =
        transformedResponse?.data?.checkAvailabilityAndEDD?.status ===
        "Serviceable";
  
      return { isServiceable, response: transformedResponse };
    } catch (error: any) {
      toast.error("Something went wrong, please try again!!!");
      console.error("Serviceability API Error:", error);
      return { isServiceable: false, response: null };
    }
  };
  
  export default productServiceability;