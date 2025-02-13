export default interface GiftCardFormsSchema {
  __component: string;
  id: string;
  amountTitle: string;
  formTitle: string;
  senderTitle: string;
  senderBottomText: string;
  proceed: string;
  previewTitle: string;
  previewInnerSubText: string;
  pleaseNote: string;
  pleaseNoteText: string;
  from: string;
  previewLogoUrl:string;
  giftCardno: string;
  giftAmount: string;
  expireDate: string;
  setOpen: any;
  open:any;
  selectedImage: any;
  amountList: AmountList[];
  form_List: Formlist[];
  form_List_Two: FormListTwo[];
}

export interface AmountList {
  amount_value: number;
}

export interface Formlist {
  isRequired: boolean;
  label: string;
  name: string;
  type: string;
  placeHolder: string;
  validationType: any;
  errorMessage: string;
}

export interface FormListTwo {
  isRequired: boolean;
  label: string;
  name: string;
  type: string;
  placeHolder: string;
  validationType: string;
  errorMessage: string;
}
