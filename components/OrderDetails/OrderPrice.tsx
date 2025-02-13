import { useState } from "react";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { useMobileCheck } from "../../utility/isMobile";
import {
  AddressBox,
  AmountGrid,
  BreakupTypo,
  PaymentMode,
  SaveamountBox,
  StyledBox,
  TitlePrice,
  TitleTypography,
} from "./OrderDetailsStyles";
import MyOrderModel from "./ViewBreakModal";
import PaymentModeUtility from "../../utility/PaymentModeUtility";

const OrderPrice = ({ orderPrice, orderItemData }: any) => {
  const InvoiceDownload = (pdfUrl: String) => {
    const link = document.createElement("a");
    link.download = `${pdfUrl}`;
    link.href = `${pdfUrl}`;
    link.click();
  };
  const [breakModal, setBreakModal] = useState(false);
  const handleClose = () => {
    setBreakModal(false);
  };
  const isMobile = useMobileCheck();
  return (
    <AddressBox>
      <TitlePrice>
        <TitleTypography>Total Order Price</TitleTypography>
        <TitleTypography>
          ₹{orderPrice?.[0]?.total?.grand_total?.value?.toFixed(2)}
        </TitleTypography>
      </TitlePrice>
      <SaveamountBox>
        <AmountGrid>
          {orderPrice?.[0]?.total?.discounts?.[0]?.amount?.value > 0 ?
            `You have saved Rs. ${orderPrice?.[0]?.total?.discounts?.[0]?.amount?.value?.toFixed(2)} on this order` : ""}

          <BreakupTypo onClick={() => setBreakModal(true)}>
            View Breakup
          </BreakupTypo>
        </AmountGrid>
        <BasicModal
          height={isMobile ? "350px" : "60vh"}
          width={isMobile ? "328px" : "737px"}
          top="50%"
          left="50%"
          overflowData="auto"
          handleClose={handleClose}
          open={breakModal}
          Component={<MyOrderModel viewBreakUp={orderPrice} />}
        />
      </SaveamountBox>
      <PaymentMode>
        {PaymentModeUtility(orderPrice)}
      </PaymentMode>
      {!!orderItemData?.invoice_url && (
        <StyledBox
          onClick={() => InvoiceDownload(orderItemData.invoice_url)}
        >
          Download Invoice
        </StyledBox>
      )}
    </AddressBox>
  );
};

export default OrderPrice;
