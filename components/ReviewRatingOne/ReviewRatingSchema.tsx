
export default interface ReviewRatingSchema {
  wholeJsonData: SchemaItems[];
}

export type SchemaItems = {
  name: string;
  created_at: string;
  review_id: number;
  detail: string;
  image: string;
  rating_value: number;
  firstImageUnderMessage: string;
  removeItem: Function;
  parentIndex: number;
  status: string;
  review_images: [string];
  ToggleHandler: Function;
  handleSnackbarMessage: Function;
  __component:string;
  id:number;
  position:number;
  componentNameFromCMS: string;
};
