import { render } from "@testing-library/react";

import { ColorType } from "../utility/ColorType";
import BeautyGiftCards from "../components/GiftCard/GiftCard";

const beautyGiftCardData = {
  componentId: "",
  cardtitle: "",
  viewAll: "",
  ReceivedGiftTitle: "",
  CheckBalanceTitle: "",
  GiftCardRadioLabel: "",
  EVoucherRadioLabel: "",
  CardNumberLabel: "",
  EnterPinLabel: "",
  CheckBalanceButton: "",
  AddBalanceButton: "",
  CheckBalanceNote: "",
  HowTousetitle: "",
  EcardContent: "",
  StoreUseContent: "",
  TnCTitle: "",
  TnCContent: "",
  setOpen: () => {
    ("");
  },
  selectedImage: "",
  setSelectedImage: "",
  setEditModal: "",
  editModal: "",
  setCroppedImage: "",
  croppedImage: "",
  id: 1,
  __component: "widget.gift-card-store",
  bgColor: "#FFFFFF",
  bgPadding: "0%",
  title: "SEND A GIFT CARD",
  subTitle: "Browse Gift Cards By Occasion",
  buttonText: "CHOOSE AMOUNT",
  buttonPath: "#",
  amountTitle: "CHOOSE  AN AMOUNT",
  formTitle: "WHO IS THIS FOR ?",
  senderTitle: "SENDER’S DETAILS",
  senderBottomText: "We will be sending you the confirmation over here",
  previewTitle: "Preview",
  previewLogoUrl:
    "https://s3.ap-south-1.amazonaws.com/images-cms.sit.shopper-stop.in/Gift_Card_SSB_Eautylogo_cc30d8115a.png",
  previewLogoUrlPath: "/home",
  previewInnerTitle: "Hi prateek, ",
  previewInnerSubText: "You have received a Gift Card.  ",
  pleaseNoteText:
    "1. The Gift Card can't be cancelled after being purchased.\n2. Recipient Email ID can't be modified once the Gift Card is purchased as it is sent to the recipient immediately after payment has been completed.",
  items: [
    {
      id: 1,
      giftName: "Birthday ",
      giftNamePath: null,
      identifer: null,
      subItems: [
        {
          id: 3,
          imgUrl:
            "https://s3.ap-south-1.amazonaws.com/images-cms.sit.shopper-stop.in/Giftcard_ballonsimage_710991c334.png?updated_at=2022-10-10T07:51:15.848Z",
          imageUrlMobile:
            "https://s3.ap-south-1.amazonaws.com/images-cms.sit.shopper-stop.in/Giftcard_ballonsimage_710991c334.png?updated_at=2022-10-10T07:51:15.848Z",
          imagePath: null,
          editIcon:
            "https://s3.ap-south-1.amazonaws.com/images-cms.sit.shopper-stop.in/Edit_I_Con_d2fdd693e1.svg",
          path: null,
          rows: null,
          cols: null,
          showEditIcon: false,
        },
      ],
      cardtitle: "",
      browsertitle: "",
      listImages: [],
      path: "",
    },
  ],
  imageitems: [
    {
      bannerwebUrl: "",
      bannermobileUrl: "",
      path: "",
    },
  ],
  amountList: [
    {
      id: 1,
      Text: "500",
      proceedText: null,
      ProceedButtonPath: null,
    },
  ],
  senderList: [
    {
      id: 5,
      Text: null,
      proceedText: null,
      ProceedButtonPath: null,
    },
  ],
  formList: [
    {
      id: 2,
      Text: null,
      proceedText: null,
      ProceedButtonPath: null,
    },
  ],
  position: 2,
};
describe("Single Button", () => {
  it("renders a single button component", () => {
    const { container } = render(<BeautyGiftCards {...beautyGiftCardData} />);
    expect(container).toMatchSnapshot();
  });
});
