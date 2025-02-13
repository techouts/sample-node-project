type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export interface RatingsList {
  stars: string;
  percent: number;
}
export interface ItemsList {
  id: number;
  userName: string;
  userImage: string;
  rating: number;
  verified: boolean;
  verfiedtick: string;
  commentTitle: string;
  verifeduser: string;
  comment: string;
  uploadedImages: [
    {
      imageUrl: string;
    }
  ];
  postDate: string;
  queryText: string;
  LikedImage: string;
  likes: number;
}
export default interface RatingComponentSchema {
  component: string;
  id: string;
  data: {
    bgColor: RGB | RGBA | HEX;
    bgPadding: string;
    title: string;
    overallrating: number;
    overalltext: string;
    allreviews: string;
    ratings: RatingsList[];
    items: ItemsList[];
    showUp:boolean;
  };
}
