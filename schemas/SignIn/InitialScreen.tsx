export default interface InitialScreenComponentInterface {
  componentId: string;
  _Id: number;
  data: {
    title: string;
    subTitle: string;
    PlaceHolder: string;
    buttontext: string;
    buttonUrl: string;
  };
  getIsEmail: Function;
  getIsMobile: Function;
  getIsEmailVerified: Function;
  enteredValue: string;
  getUserInfo: Function;
  getAccessToken: Function;
  setNetworkError: Function;
  setNetworkErrorMessage: Function;
  setLoader: Function;
  socialAuth: boolean;
  socialProfile: any;
  socialGraphDomain: any;
  setSnackBarMessage: any;
  setOtpErrorSnackBarOpen: any;
}
