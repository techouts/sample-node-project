const getJuspayMode = (additionalDetailsValue: string, amount: any) => {
  let text;
  const value: any = additionalDetailsValue;
  switch (value?.toLowerCase()) {
    case "nb":
      text = `Net Banking (${amount})`;
      break;
    case "cc":
      text = `Credit Card (${amount})`;
      break;
    case "dc":
      text = `Debit Card (${amount})`;
      break;
    case "upi":
      text = `UPI (${amount})`;
      break;
    case "wallet":
      text = `Wallet (${amount})`;
      break;
    default:
      text = "";
      value;
  }

  return text;
};

const getPaymentValue = (
  type: string,
  additionalDetailsValue?: string,
  amount?: any
) => {
  let text;
  switch (type?.toLowerCase()) {
    case "checkmo":
      text = "Cash On Delivery";
      break;
    case "cashondelivery":
      text = "Cash On Delivery";
      break;
    case "juspay":
      text = getJuspayMode(additionalDetailsValue || "", amount);
      break;
    default:
      text = "";
  }
  return text;
};

const getFormattedValue = (value: any) => {
  return `Rs. ${parseFloat(value)?.toFixed(2)}`;
};

const PaymentModeUtility = (orderDetails: any) => {
  let totalAmount = orderDetails?.[0]?.total?.grand_total?.value;
  let internalPaymentModes = [];
  orderDetails?.[0]?.total?.wallet_discount?.amount > 0 &&
    internalPaymentModes.push(
      `SS Wallet (${getFormattedValue(
        orderDetails?.[0]?.total?.wallet_discount?.amount
      )})`
    );
  totalAmount = totalAmount - orderDetails?.[0]?.total?.wallet_discount?.amount;
  orderDetails?.[0]?.total?.loyalty_discount?.amount > 0 &&
    internalPaymentModes.push(
      `First Citizen  Club (${getFormattedValue(
        orderDetails?.[0]?.total?.loyalty_discount?.amount
      )})`
    );
  totalAmount =
    totalAmount - orderDetails?.[0]?.total?.loyalty_discount?.amount;
  orderDetails?.[0]?.total?.egv_discount?.amount > 0 &&
    internalPaymentModes.push(
      `Gift Card (${getFormattedValue(
        orderDetails?.[0]?.total?.egv_discount?.amount
      )})`
    );
  totalAmount = totalAmount - orderDetails?.[0]?.total?.egv_discount?.amount;
  let paymentValue = getPaymentValue(
    orderDetails?.[0]?.payment_methods?.[0]?.type,
    orderDetails?.[0]?.payment_methods?.[0]?.additional_data?.[0]?.value,
    getFormattedValue(totalAmount)
  );
  orderDetails?.[0]?.payment_methods?.[0]?.type &&
    paymentValue !== "" &&
    internalPaymentModes.push(paymentValue);

  return `${
    internalPaymentModes?.length > 0
      ? internalPaymentModes?.toString()?.replace(/,/g, " + ")
      : "juspay"
  }`;
};

export default PaymentModeUtility;
