export type CONTACT_ITEM = {
  header: string;
  details: string;
};

export type LIST_ITEM = {
  isRequired?: boolean;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  validationType?: string;
  input_type: string;
  errorMessage?: string;
  multiline: boolean;
  rows: number;
  xs: number;
  md: number;
  list?: SORT_LIST[];
  maxLength: number;
  helperText?: string;
};

export type SORT_LIST = {
  id?: number;
  value?: string;
  group?: string;
  CategoryId?: string;
  allowedUserForStore?: boolean;
};

export default interface ContactUsSchema {
  __component: string;
  id: string;
  bgPadding: string;
  title: string;
  subText: string;
  formTitle: string;
  ctaLabel: string;
  caution_note: string;
  contactDetails: CONTACT_ITEM[];
  formList: LIST_ITEM[];
  position: number;
}
