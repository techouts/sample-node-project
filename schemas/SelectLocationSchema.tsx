type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export interface SelectLocationInterface {
  _component: string;
  id: number;
  bgColor: RGB | RGBA | HEX | string;
  bgPadding: string;
  data: {
    title: string;
    addressText: string;
    items: [
      {
        id: number;
        custname: string;
        addressDetails: string;
        addressStreet: string;
        addressCity: string;
        mobileNumber: string;
      }
    ];
    showMore: string;
    showLess: string;
    signIn: string;
    signUp: string;
    choosePincode: string;
    inputPincode: string;
    searchButton: string;
    locationLogo: string | URL;
    locationText: string;
    message: string;
    instructions: string;
    ok: string;
  };
}
