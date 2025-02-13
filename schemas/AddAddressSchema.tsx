type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export interface AddressInterface {
  _component: string;
  id: number;
  bgColor: RGB | RGBA | HEX | string;
  bgPadding: string;
  data: {
    title: string;
    addLogo: string;
    addressText: string;
    items: [
      {
        id: number;
        locationPlace: [];
        logo: {
          editLogo: string;
          deleteLogo: string;
        };
        details: {
          name: string;
          addressDetails: string;
          addressStreet: string;
          addressCity: string;
          mobileNumber: string;
        };
      }
    ];
  };
}
