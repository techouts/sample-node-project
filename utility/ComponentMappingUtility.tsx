import dynamic from "next/dynamic";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import ShopByCollection from "../components/ShopByCollection/ShopByCollection";
import SingleBanner from "../components/SingleBanner/SingleBanner";
import HorizontalSpacer from "../components/HorizontalSpacer/HorizontalSpacer";
import OffersGrid from "../components/OffersGrid/OffersGrid";
import BannerTimer from "../components/BannerTimer/BannerTimer";

let AllComponents: any = {};

AllComponents["widget.single-banner"] = SingleBanner;
AllComponents["widget.hero-banner"] = HeroBanner;
AllComponents["widget.shop-by-collection"] = ShopByCollection;
AllComponents["widget.offers-grid"] = OffersGrid;
AllComponents["widget.banner-timer"] = BannerTimer;

AllComponents["widget.grid-carousel"] = dynamic(
  () => import("../components/BuyingGuides/BuyingGuides"),
  { ssr: false }
);
AllComponents["widget.quick-links"] = dynamic(
  () => import("../components/QuickLinks/QuickLinks"),
  { ssr: false }
);
AllComponents["widget.multi-banner"] = dynamic(
  () => import("../components/MultiBanner/MultiBanner"),
  { ssr: false }
);
AllComponents["widget.show-case"] = dynamic(
  () => import("../components/ShowCase/ShowCase"),
  { ssr: false }
);
AllComponents["widget.split-banner"] = dynamic(
  () => import("../components/SplitBanner/SplitBanner"),
  { ssr: false }
);
AllComponents["widget.horizontal-spacer"] = HorizontalSpacer;

AllComponents["widget.multi-show-case"] = dynamic(
  () => import("../components/MulitShowcase/MultiShowcase"),
  { ssr: false }
);
AllComponents["widget.beauty-stop"] = dynamic(
  () => import("../components/BeautyStop/BeautyStop"),
  { ssr: false }
);
AllComponents["widget.brands-grid"] = dynamic(
  () => import("../components/BrandsGrid/BrandsGrid"),
  { ssr: false }
);
AllComponents["widget.shop-by-luxury"] = dynamic(
  () => import("../components/ShopByLuxury/ShopByLuxury"),
  { ssr: false }
);
AllComponents["widget.button"] = dynamic(
  () => import("../HOC/Button/SingleButton"),
  { ssr: false }
);
AllComponents["widget.title"] = dynamic(
  () => import("../HOC/HOCTitle/HOCTitle"),
  { ssr: false }
);
AllComponents["widget.brand-description"] = dynamic(
  () => import("../components/BrandDescription/BrandDescription"),
  { ssr: false }
);
AllComponents["widget.gift-card-store"] = dynamic(
  () => import("../components/GiftCard/GiftCard"),
  { ssr: false }
);
AllComponents["widget.accordion"] = dynamic(
  () => import("../components/FirstCitizenFAQ/FirstCitizenQuestions"),
  { ssr: false }
);
AllComponents["widget.category-carousel"] = dynamic(
  () => import("../components/CategoryCarousel/CategoryCarousel"),
  { ssr: false }
);
AllComponents["widget.shop-look"] = dynamic(
  () => import("../components/CategoryShop/CategoryShop"),
  { ssr: false }
);
AllComponents["widget.stepper-banner"] = dynamic(
  () => import("../components/StepperBanner/StepperBanner"),
  { ssr: false }
);
AllComponents["slots.product-carousel"] = dynamic(
  () => import("../components/MSDPowered/DynamicDataFetcher"),
  { ssr: false }
);
AllComponents["slots.unbxd-carousel"] = dynamic(
  () => import("../components/UNBXDWidget"),
  { ssr: false }
);
AllComponents["widget.title-tab"] = dynamic(
  () => import("../HOC/TitleTab/TitleTab"),
  { ssr: false }
);
AllComponents["widget.tabs-component"] = dynamic(
  () => import("../components/Filters/TabsUI"),
  { ssr: false }
);

// Blogs
AllComponents["blog-widget.blog-beauty-stop"] = dynamic(
  () => import("../components/TrendingStories/TrendingStories"),
  { ssr: false }
);

AllComponents["blog-widget.blog-beauty-shots"] = dynamic(
  () => import("../HOC/BeautyShots/BeautyShots"),
  { ssr: false }
);

AllComponents["blog-widget.blog-carousel"] = dynamic(
  () => import("../components/BlogCarousel/BlogCarouselComponent"),
  { ssr: false }
);

AllComponents["blog-widget.blog-thumbnail"] = dynamic(
  () => import("../components/BlogThumbnail/BlogThumbnail"),
  { ssr: false }
);

AllComponents["blog-widget.blog-links"] = dynamic(
  () => import("../components/BlogLinks/BlogLinksComponent"),
  { ssr: false }
);

AllComponents["blog-widget.blog-videos"] = dynamic(
  () => import("../components/BlogVideos/BlogVideoContent"),
  { ssr: false }
);

AllComponents["blog-widget.blog-grid"] = dynamic(
  () => import("../components/BlogGrid/BlogGrid"),
  { ssr: false }
);

AllComponents["blog-widget.blog-detail"] = dynamic(
  () => import("../components/BlogDetail/BlogDetail"),
  { ssr: false }
);

AllComponents["blog-widget.blog-benefits"] = dynamic(
  () => import("../components/SocialBlog/SocialBlog"),
  { ssr: false }
);

AllComponents["blog-widget.blog-quote"] = dynamic(
  () => import("../components/BlogParagraph/BlogParagraphQuote"),
  { ssr: false }
);

AllComponents["blog-widget.blog-list"] = dynamic(
  () => import("../components/BlogAuthor/BlogAuthor"),
  { ssr: false }
);

AllComponents["blog-widget.blog-profile"] = dynamic(
  () => import("../components/BlogProfie/BlogProfile"),
  { ssr: false }
);

AllComponents["blog-widget.blog-paragraph"] = dynamic(
  () => import("../components/BlogParagraph/BlogParagraph"),
  { ssr: false }
);

AllComponents["blog-widget.blog-hero-banner"] = dynamic(
  () => import("../components/BlogHeroBanner/BlogHeroBanner"),
  { ssr: false }
);
export default AllComponents;