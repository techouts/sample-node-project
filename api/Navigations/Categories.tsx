import client from "../../apollo-client";
import { CATEGORYLIST } from "../../graphQLQueries/CategoryQuery";
import handleErrorResponse from "../../utility/ErrorHandling";

export const fetchCategories = async () => {
  const response = await client
    .query({
      query: CATEGORYLIST,
    })
    .then((res) => {
    
      return res?.data;
    })
    .catch((err) => console.log(err));
  return response;
};
  