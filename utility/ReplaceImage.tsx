const domains = ["https://ssbeauty-cms.s3.ap-south-1.amazonaws.com", "https://s3.ap-south-1.amazonaws.com"];

const CMSCachedURLPath = 'storage.googleapis.com/images_cms_prod_ssb';

export const ReplaceImage = (url: string) => {
  try {
    if (url) {
      let domain = new URL(url);

      if (domain.href.includes(CMSCachedURLPath)) {
        return getCDNImageURL({url})
      } else if (
        domains.includes(domain?.origin) 
      ) {
        if (
          domain?.pathname?.includes(
            "/storage.googleapis.com/images_cms_sit_ssb/"
          ) ||
          domain?.pathname?.includes(
            "/storage.googleapis.com/images_cms_dev_ssb/"
          ) ||
          domain?.pathname?.includes(
            "/storage.googleapis.com/images_cms_uat_ssb/"
          ) ||
          domain?.pathname?.includes("/cmsimages.ssbeauty.in")
        ) {
          const FinalUrl = domain.origin.replace(domain.origin, "https:/");
          return FinalUrl.concat(domain.pathname);
        } else {
          const FinalUrl = domain.origin.replace(
            domain.origin,
            process.env.NEXT_PUBLIC_S3_URL || "https://cmsimages.ssbeauty.in"
          );
          return FinalUrl.concat(domain.pathname);
        }
      } else return url;
    } else return url;
  } catch (e) {
    return url;
  }
};

function getCDNImageURL({ url }: { url: string }) {

  if (url && typeof url === 'string' && url.includes(CMSCachedURLPath)) {
    return url.replace(CMSCachedURLPath, 'cmsimages.ssbeauty.in');
  }

  return url;
}
