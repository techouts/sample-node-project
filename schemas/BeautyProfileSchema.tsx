export interface BeautyProfileSchema {
  bgImageUrl: string;
  bgImageUrlMobile: string;
  buttonText?: string;
  categories: CATEGORIES[];
  id: number;
  subText?: string;
  title?: string;
  code?: string | null;
}

export type CATEGORIES = {
  backgroundImg: string;
  backgroundImgMobile: string;
  buttonText?: string;
  buttonPath?: string;
  id: number;
  subCategories?: LIST_ITEMS[];
  title?: string;
  code?: string | null;
};

export type LIST_ITEMS = {
  id: number;
  imageUrl?: string;
  text?: string;
};
