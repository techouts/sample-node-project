const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
const logger = require("../../next-logger.config");

import { ComponentRenderingUtility } from "../../utility/ComponentRenderingUtility";
import { ReplaceImage } from "../../utility/ReplaceImage";
export const Blog = (props: any) => (
  <ComponentRenderingUtility
    props={props}
    analyticsPageType={`blog-${props?.model?.type}`}
    currentPageType="bloglistingpage"
  />
);
export default Blog;
export async function getStaticPaths() {
  const res = await fetch(`${NEXT_PUBLIC_CMS_URL}/api/blogs?fields[0]=slug`);
  const slugs = await res.json();
  const paths = slugs.data.map((pageData: any) => ({
    params: {
      pid: [pageData?.slug || "home"],
      pageId: pageData.id,
    },
  }));

  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}
export async function getStaticProps(context: any) {
  const res = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/blogs?filters[slug][$eq]=${
      context?.params?.pid?.[
        context?.params?.pid?.length > 1 ? context?.params?.pid?.length - 1 : 0
      ]
    }&publicationState=live`
  );
  const appIcons = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/app-settings/1?populate[appIcons][populate]=*`
  );
  const headerData = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/headers?filters[slug][$eq]=ssb-header&publicationState=live`
  );
  const header = await headerData.json();
  const appLogos = await appIcons.json();
  const pageData = res ? await res.json() : null;
  if (pageData?.error) {
    logger.error(
      {
        URL: `${NEXT_PUBLIC_CMS_URL}/api/blogs?filters[slug][$eq]=${
          context?.params?.pid?.[
            context?.params?.pid?.length > 1
              ? context?.params?.pid?.length - 1
              : 0
          ]
        }`,
        type: "server",
        Response: pageData?.error,
      },
      `${pageData?.error?.message}`
    );
  }
   const blogPageData = {
    "@context": `${process.env.NEXT_PUBLIC_SCHEMA_URL}`,
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_DOMAIN_URL}/beauty-blog/${context.params?.pid}`,
    },
    headline: pageData?.data?.[0]?.components?.[0]?.heading || null,
    description: pageData?.data?.[0]?.components?.[0]?.paragraph?.slice(0,160) || null,
    image: pageData?.data?.[0]?.components?.[0]?.bannerItems?.[0]?.imageUrl || null,
    author: {
      type: "Person",
      name: pageData?.data?.[0]?.components?.[0]?.name || null,
      url:  `${process.env.NEXT_PUBLIC_DOMAIN_URL}/beauty-blog/${pageData?.data?.[0]?.components?.[0]?.name}` || null,
    },
    publisher: {
      "@type":"Organization",
      name: "SSBeauty",
      logo: {
        "@type": "ImageObject",
        url: ReplaceImage(pageData?.data?.[0]?.Header?.logoImageUrl) || null,
      },
    },
  };
  return {
    props: {
      pageNotFound:
        pageData?.data?.[0]?.components?.length > 0 ? false : true,
      model: pageData?.data?.[0] || null,
      appLogos: appLogos,
      header: header || null,
      isBlog: true,
       schemaMarkup: blogPageData
    }, // will be passed to the page component as props
  };
}
