const NEXT_PUBLIC_JUSPAY_APIURL = process.env.NEXT_PUBLIC_JUSPAY_APIURL;
export const merchant_id = "ssbeauty";
export const oauth_token = "authorizationserver/oauth/token";
export const otp_services = "services/v2_1/ssl/sendOTP/OB";
export const otp_service_verifier =
  "services/v2_1/ssl/users/loginOrSignup?mobileNumber=9640558040&otp=782253&cliend_id=mobile_android";
export const SignUp_client_id = "mobile_android";
export const getPaymentMethods = `${NEXT_PUBLIC_JUSPAY_APIURL}/merchants/${merchant_id}/paymentmethods?options.add_emandate_payment_methods=false&options.check_wallet_direct_debit_support=false&options.add_supported_reference_ids=false`;
export const CardBin = `${NEXT_PUBLIC_JUSPAY_APIURL}/cardbins/`;
export const CardTokenization = `${NEXT_PUBLIC_JUSPAY_APIURL}/card/tokenize`;
export const CardTransaction = `${NEXT_PUBLIC_JUSPAY_APIURL}/txns`;
export const QyPaymentStatus = `${NEXT_PUBLIC_JUSPAY_APIURL}/order/payment-status?merchant_id=ssbeauty&order_id=`;
export const paymentStatus =
  "/order/payment-status?merchant_id=ssbeauty&order_id=";
export const GOOGLE_MAP_DIRECTIONS_API = (
  origin: string,
  destination: string
) =>
  `${process.env.NEXT_PUBLIC_GOOGLE_MAP_URL}?api=1&origin=${origin}&destination=${destination}&travelmode=car`;
  export const UNBXD_HOST = process.env.NEXT_UNBXD_HOST;

  export const IS_UNBXD_ENABLED = process.env.NEXT_PUBLIC_IS_UNBXD_ENABLED === "true";

  export const MIDDLEWARE_UNBXD = process.env.NEXT_PUBLIC_MIDDLEWARE_UNBXD_SEARCH;

  export const IS_UNBXD_MIDDLEWARE_ENABLED = process.env.NEXT_PUBLIC_IS_UNBXD_MIDDLEWARE_ENABLED === "true"

  const NEXT_PUBLIC_D365_APP_ID_GUEST = process.env.NEXT_PUBLIC_D365_APP_ID_GUEST;

  const NEXT_PUBLIC_D365_APP_ID_LOGGED_IN = process.env.NEXT_PUBLIC_D365_APP_ID_LOGGED_IN;

  const NEXT_PUBLIC_D365_ORG_ID = process.env.NEXT_PUBLIC_D365_ORG_ID;
  
  const NEXT_PUBLIC_D365_ORG_URL = process.env.NEXT_PUBLIC_D365_ORG_URL;
  export const Google_API_KEY = "AIzaSyCBo5PdGTw5Z0BS6hTboacbxkMC7vIZ6FY";

  export {NEXT_PUBLIC_D365_APP_ID_LOGGED_IN, NEXT_PUBLIC_D365_APP_ID_GUEST, NEXT_PUBLIC_D365_ORG_ID, NEXT_PUBLIC_D365_ORG_URL}
  export const IS_RECAPTCHA_ENABLED = process.env.NEXT_PUBLIC_IS_RECAPTCHA_ENABLED === "true";