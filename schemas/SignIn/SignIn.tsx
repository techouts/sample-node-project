type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export default interface SignInComponentInterface {
  componentId: string;
  _Id: number;
  data: {
    isSocialLoginCheck: Function;
    title: string;
    subTitle: string;
    PlaceHolder: string;
    buttontext: string;
    buttonUrl: string;
    signupText: string;
    signuplink: string;
    signinText: string;
    signinlink: string;
    signupDescription: string;
    ImageUrl: string;
    helpIconUrl: string;
    helpText: string;
    signinBox: string;
    bgColor: RGB | RGBA | HEX | string;
    columns: number;
    items: [
      {
        logoUrl: string;
        redirectUrl: string;
        id: string;
      }
    ];
  };
  cartJourney: any;
  getIsSignUp: Function;
  setIsCartJourney: Function;
  getSignUp: Function;
  getIsSignIn: Function;
  isBottomImage: Function;
  isScreen: string;
  userDetails: Function;
  isInitial: boolean;
  isEmail: boolean;
  isForgotPasswordInitial: boolean;
  isForgotPasswordVerifyScreen: boolean;
  isSignUp: boolean;
  isRegister: boolean;
  isMobileOtpScreen: boolean;
  isFullDetails: boolean;
  setIsSocialAuth: any;
  setSocialProfile: any;
  setCustomerID: any;
  handleClose: any;
  setNetworkError: any;
  setNetworkErrorMessage: any;
  setSocialGraphDomain: any;
  setLoader: any;
  setSocialAccessToken: any;
  setReRender: any;
  isRegisterSignUp: any;
  isMobileSignUp: any;
  isCartJourney: boolean;
}
