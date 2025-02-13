import { Items } from "../../schemas/EditorPickSchema";
import { ColorType } from "../../utility/ColorType";

export default interface CardTierDataSchema {
  bgColor: ColorType;
  bgPadding: string;
  headerData: {
    title: string;
    buttons: ButtonItems[];
  };

  loggedIn: {
    bannerImage: string;
    notAMember: {
      title: string;
      subTitle: string;
      buttonText1: string;
      imageUrlweb: string;
      imageUrlMobile: string;
      buttonText2: string;
      overView: {
        TierInfo: {
          title: string;
          SubText: string;
        };
        tiersData: ListTiers[];
      };
    };
  };
}

type ButtonItems = {
  title: string;
};

type ListTiers = {
  tier1: {
    tierHeader: string;
    crownLogo: string;
    imageURL: string;
    alignment: boolean;
    bgImageURL: string;
    tierDescription: string;
    enrollButtonText: string;
    quote: string;
  };
};
