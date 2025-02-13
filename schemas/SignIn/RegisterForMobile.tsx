type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export default interface RegistrationComponentInterface {
  Registration: {
    Component: string;
    id: Number;
    title: String;
    subTitle: String;
    Gender: String;
    Male: String;
    Female: string;
    Others: String;
    button: String;
    skipnow: string;
    helpIconUrl: string;
    helpText: string;
    ImageUrl: string;

    //SigIN Mobile
    mtitle: string;
    msubTitle: string;
    buttontext: string;
    buttonUrl: string;
    termsText: string;
    terms: string;
    privacy: string;
    signupText: string;
    signuplink: string;
    signupDescription: string;
    items: [
      {
        logoUrl: string;
        redirectUrl: string;
      }
    ];
  };
  bgColor: RGB | RGBA | HEX | string;
  columns: number;
  handleClose: Function;
  getUserInfo: Function;
  setCustomerID: any;
  isCartJourney: any;
}
