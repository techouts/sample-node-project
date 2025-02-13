export default interface PasswordScreenComponentInterface {
  componentId: string;
  _Id: number;
  data: {
    title: string;
    subTitle: string;
    PlaceHolder: string;
    buttontext: string;
    buttonUrl: string;
    ForgotPasswordtext: string;
    ForgotPasswordLink: string;
  };
  getIsForgotPassword: Function;
  getIsResetPassword: Function;
  userInfo: string;
  handleClose: Function;
  getIsFullDetails: Function;
  setCustomerID: any;
  getAccessToken: Function;
}
