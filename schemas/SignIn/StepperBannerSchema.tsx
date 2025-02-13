export default interface StepperBannerSchema {
  id: number;
  __component: string;
  bgColor: string;
  bgPadding: string;
  buttonText: string;
  categories: CategoryItem[];
  position:number;
  categoryId?:string;
}

type CategoryItem = {
  id: number;
  bgImageUrl: string;
  bgImageUrlMobile: string;
  titleNo: number;
  title: string;
  subCategories: Items[];
  checked?: Boolean;
};

type Items = {
  id: number;
  imageUrl: string;
  imageUrlMobile: string;
  text: string;
  checked?: Boolean;
};
