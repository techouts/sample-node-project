import { render } from "@testing-library/react";
import { ColorType } from "../utility/ColorType";
import BeautyShots from "../HOC/BeautyShots/BeautyShots";
import BlogHeroBanner from "../components/BlogHeroBanner/BlogHeroBanner";
const color: ColorType = "#0000";

const blogHeroBannerData = {
  id: 1,
  __component: "blog-widget.blog-hero-banner",
  bgColor: "#F5F5F5",
  bgPadding: "0 2%",
  title: null,
  keys: null,
  display: null,
  items: [
    {
      id: 1,
      image:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/Ojas_Rajani_Decodes_The_IT_Bridal_Trends_Of_The_Season_941e8c07d8.jpg?updated_at=2022-08-22T09:19:22.940Z",
      mobileImage:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/Ojas_Rajani_Decodes_The_IT_Bridal_Trends_Of_The_Season_941e8c07d8.jpg?updated_at=2022-08-22T09:19:22.940Z",
      chipText: "Makeup",
      readButton: "READ MORE",
      subText: "Ojas Rajani Decodes The IT Bridal Trends Of The Season",
      path: "https://maya-uat.ssecom.tech/beauty-stop/ojas-rajani-trending-bridal-makeup-tips",
      imgPath:
        "https://maya-uat.ssecom.tech/beauty-stop/ojas-rajani-trending-bridal-makeup-tips",
      imageAltText: "blog-hero-banner",
      Item_name: "banner",
      Item_type: "banner",
    },
    {
      id: 2,
      image:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/If_You_Have_Frizzy_Hair_Then_These_Products_Are_Magic_7e79e70ebf.jpg?updated_at=2022-08-22T09:23:41.626Z",
      mobileImage:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/If_You_Have_Frizzy_Hair_Then_These_Products_Are_Magic_7e79e70ebf.jpg?updated_at=2022-08-22T09:23:41.626Z",
      chipText: "Hair",
      readButton: "READ MORE",
      subText: "If You Have Frizzy Hair Then These Products Are Magic!",
      path: "https://maya-uat.ssecom.tech/beauty-stop/products-for-frizzy-hair",
      imgPath:
        "https://maya-uat.ssecom.tech/beauty-stop/products-for-frizzy-hair",
      imageAltText: null,
      Item_name: "banner",
      Item_type: "banner",
    },
    {
      id: 3,
      image:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/Ingredient_Focus_Vitamin_C_74383b5b00.jpg?updated_at=2022-08-22T09:23:41.566Z",
      mobileImage:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/Ingredient_Focus_Vitamin_C_74383b5b00.jpg?updated_at=2022-08-22T09:23:41.566Z",
      chipText: "Skin",
      readButton: "READ MORE",
      subText: "Ingredient Focus: Vitamin C",
      path: "https://maya-uat.ssecom.tech/beauty-stop/vitamin-c-products-for-skin",
      imgPath:
        "https://maya-uat.ssecom.tech/beauty-stop/vitamin-c-products-for-skin",
      imageAltText: null,
      Item_name: "banner",
      Item_type: "banner",
    },
    {
      id: 4,
      image:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/Why_Is_The_World_Obsessed_With_Cannabis_Beauty_RN_4dc38dc043.jpg?updated_at=2022-08-22T09:23:41.564Z",
      mobileImage:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/Why_Is_The_World_Obsessed_With_Cannabis_Beauty_RN_4dc38dc043.jpg?updated_at=2022-08-22T09:23:41.564Z",
      chipText: "Skin",
      readButton: "READ MORE",
      subText: "Why Is the World Obsessed With Cannabis Beauty RN?",
      path: "https://maya-uat.ssecom.tech/beauty-stop/cannabis-hemp-benefits-for-skin",
      imgPath:
        "https://maya-uat.ssecom.tech/beauty-stop/cannabis-hemp-benefits-for-skin",
      imageAltText: null,
      Item_name: "banner",
      Item_type: "banner",
    },
    {
      id: 5,
      image:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/Your_All_New_Skincare_Routine_On_A_Budget_0d72443ae9.jpg?updated_at=2022-08-25T10:12:37.242Z",
      mobileImage:
        "https://s3.ap-south-1.amazonaws.com/images-cms.uat.shopper-stop.in/Your_All_New_Skincare_Routine_On_A_Budget_0d72443ae9.jpg?updated_at=2022-08-25T10:12:37.242Z",
      chipText: "Skin",
      readButton: "READ MORE",
      subText: "Your All-New Skincare Routine On A Budget",
      path: "https://maya-uat.ssecom.tech/beauty-stop/affordable-skin-care-routine-products",
      imgPath:
        "https://maya-uat.ssecom.tech/beauty-stop/affordable-skin-care-routine-products",
      imageAltText: null,
      Item_name: "banner",
      Item_type: "banner",
    },
  ],
  position: 2,
};

describe("Blog Hero Banner", () => {
  it("renders a blog hero banner component", () => {
    const { container } = render(<BlogHeroBanner {...blogHeroBannerData} />);
    expect(container).toMatchSnapshot();
  });
});
