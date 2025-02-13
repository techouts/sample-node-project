import { ColorType } from "../utility/ColorType";

export default interface SavePaymentInterface {
  _id: number;
  _component: string;
  bgColor: ColorType;
  bgPadding: string;
  categories: [
    {
      id: number;
      title: string;
      subCategories: [
        {
          id: number;
          errorMessage: string;
          imgUrl: string;
          buttonText: string;
          buttonPath: string;
        },
        {
          id: number;
          errorMessage: string;
          imgUrl: string;
          buttonText: string;
          buttonPath: string;
        }
      ];
    },
    {
      id: number;
      title: string;
      subCategories: [
        {
          id: number;
          errorMessage: string;
          imgUrl: string;
          buttonText: string;
          buttonPath: string;
        }
      ];
    }
  ];
}
