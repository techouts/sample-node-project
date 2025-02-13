export const ReplaceVideo = (url: string) => {
  try {
    if (url) {
      let domain = new URL(url);
      if (
        domain?.origin === "https://ssbeauty-cms.s3.ap-south-1.amazonaws.com" ||
        domain.origin === "https://s3.ap-south-1.amazonaws.com"
      ) {
        if (
          domain?.pathname?.includes("/images-cms.sit.shopper-stop.in") ||
          domain?.pathname?.includes("/images-cms.dev.shopper-stop.in") ||
          domain?.pathname?.includes("/images-cms.uat.shopper-stop.in") ||
          domain?.pathname?.includes("/cmsimages.ssbeauty.in") && process.env.NEXT_PUBLIC_TRACING_ENVIRONMENT === "prod"
        ) {
          let url = domain.pathname
          const FinalUrl = domain.origin.replace(domain.origin, "https:/");
          url = url.replace("/images-cms.sit.shopper-stop.in", "/ssbvideos.ssbeauty.in")
          url = url.replace("/images-cms.dev.shopper-stop.in", "/ssbvideos.ssbeauty.in")
          url = url.replace("/images-cms.uat.shopper-stop.in", "/ssbvideos.ssbeauty.in")
          url = url.replace("/cmsimages.ssbeauty.in", "/ssbvideos.ssbeauty.in")
          return FinalUrl.concat(url);
        }
        else if( domain?.pathname?.includes("/images-cms.sit.shopper-stop.in") ||
        domain?.pathname?.includes("/images-cms.dev.shopper-stop.in") ||
        domain?.pathname?.includes("/images-cms.uat.shopper-stop.in") ||
        domain?.pathname?.includes("/cmsimages.ssbeauty.in") ||
        domain?.pathname?.includes("/ssbvideos.ssbeauty.in")){
          const FinalUrl = domain.origin.replace(domain.origin, "https:/");
          return FinalUrl.concat(domain.pathname);
        } 
        else {
          const FinalUrl = domain.origin.replace(
            domain.origin,
            process.env.NEXT_PUBLIC_VIDEO_URL || "https://ssbvideos.ssbeauty.in"
          );
          return FinalUrl.concat(domain.pathname);
        }
      } else return url;
    } else return url;
  } catch (e) {
    return url;
  }
};
