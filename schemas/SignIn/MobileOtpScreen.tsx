type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export default interface MobileOtpScreenComponentInterface {
  componentId: string;
  _Id: number;
  handleBackButton: any;
  isScreen: string;
  getAccessToken: Function;
  setGravityUser: any;
  isSignUpJourney: any;
  info: {
    signInTitle: string;
    signUpTitle: string;
    subTitle: string;
    otptext: string;
    resendTimer: string;
    otpSms: string;
    alertSms: string;
    resendOtp: string;
    button: string;
    signupText: string;
    signuplink: string;
    signupDescription: string;
    ImageUrl: string;
    helpIconUrl: string;
    helpText: string;
    ResendMessage: string;
    invalidOTP: string;
    invalidAttemptsCounter: number;
    bgColor: RGB | RGBA | HEX | string;
    columns: number;
    socialAccessToken: string;
  };
}
