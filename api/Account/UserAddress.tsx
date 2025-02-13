import client from "../../apollo-client";
import {
  GET_PROFILE_DATA,
  deleteCustomerAddress,
  updateCustomerAddress,
} from "../../graphQLQueries/MyProfileQuery";
import handleErrorResponse from "../../utility/ErrorHandling";
import {toast} from "../../utility/Toast";


export const fetchAddress = async () => {
  const response = await client
    .query({
      query: GET_PROFILE_DATA,
      fetchPolicy: "no-cache",
    })
    .then((response) => {
      
      return response?.data?.customer;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  return response;
};

export const deleteAddress = async (id: any) => {
  const response = await client
    .mutate({
      mutation: deleteCustomerAddress,
      variables: {
        id: id,
      },
    })
    .then((response) => {
      const hasError =    handleErrorResponse(response) //response checking
      if (hasError) return null;
      return response;
    })
    .catch((err) => {
      toast.error("Someting went wrong, Please try again!!!");
      console.log("err", err);
      return err;
    });
  return response;
};

const updateAddress = ({
  id,
  firstName,
  lastName,
  street,
  city,
  pinCode,
  isDefaultShipping,
  telephone,
  saveAs,
  isDefaultBilling = false,
  countryId = "IN",
  region,
  regionId = 579,
}: any) => {
  client
    .mutate({
      mutation: updateCustomerAddress,
      variables: {
        id: id,
        firstname: firstName,
        lastname: lastName,
        street: street,
        city: city,
        postcode: pinCode,
        default_shipping: isDefaultShipping,
        telephone: telephone,
        save_as: saveAs,
        default_billing: isDefaultBilling,
        country_id: countryId,
        region: region,
        region_id: regionId,
      },
    })
    .then((response: any) => {
      const hasError =    handleErrorResponse(response) //response checking
            if (hasError) return null;
      return response;
    })
    .catch((error: any) => {
      toast.error("Someting went wrong, Please try again!!!");
      console.log(error)});
};
