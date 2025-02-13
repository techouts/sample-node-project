import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { PRODUCT_FALLBACK_URL } from "../../../HOC/ProductCard/Constants";
import { ContactedGraphqlUrl } from "../../../utility/MagentoImageUrlConcatConstant";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { ExchangeTypography } from "./ExchangeOrderStyled";
import ExchangeStatusCardSingle from "./ExchangeStatusCardSingle";
import { ExchangeBox, PrimaryBox } from "./ExchangeStatusCardStyled";

const ExchangeStatusCard = ({ orderItem }: any) => {
  return (
    <>
      {orderItem && (
        <Box margin={"0 auto"} sx={{ width: { xs: "296px", sm: "525px" } }}>
          <PrimaryBox>
            <ExchangeStatusCardSingle
              productImage={
                orderItem?.image
                  ? ContactedGraphqlUrl + orderItem?.image
                  : ReplaceImage(PRODUCT_FALLBACK_URL)
              }
              productName={orderItem?.product_name}
              rating={orderItem?.average_rating}
              price={
                orderItem?.product_sale_price?.value *
                orderItem?.quantity_ordered
              }
              quantityOrdered={orderItem?.quantity_ordered}
            />
            <Box>
              <Divider sx={{ padding: " 0px" }}>
                <ExchangeBox>
                  <img
                    src="https://i.ibb.co/fDr06z7/arrow-swap.png"
                    alt="arrow"
                    width="24px"
                    height="24px"
                  />
                  <ExchangeTypography>EXCHANGE WITH</ExchangeTypography>
                </ExchangeBox>
              </Divider>
            </Box>
            <ExchangeStatusCardSingle
              productImage={
                orderItem?.image
                  ? ContactedGraphqlUrl + orderItem?.image
                  : ReplaceImage(PRODUCT_FALLBACK_URL)
              }
              productName={orderItem?.product_name}
              rating={orderItem?.average_rating}
              price={
                orderItem?.product_sale_price?.value *
                orderItem?.quantity_ordered
              }
              quantityOrdered={orderItem?.quantity_ordered}
            />
          </PrimaryBox>
        </Box>
      )}
    </>
  );
};
export default ExchangeStatusCard;
