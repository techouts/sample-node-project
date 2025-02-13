import { ComponentRenderingUtility } from "../../utility/ComponentRenderingUtility";
const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
const logger = require("../../next-logger.config");

export const GiftCard = (props: any) => {
  return (
    <ComponentRenderingUtility
      props={props}
      isBreadCrumbsRequired={true}
      analyticsPageType={props?.analyticsPageType}
      currentPageType="Gift Card Page"
    />
  );
};
export default GiftCard;

export async function getStaticPaths() {
  const res = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/gift-cards?fields[0]=slug`
  );
  const slugs = await res.json();

  const paths = slugs.data.map((slug: any) => ({
    params: { pid: slug?.slug || "home", pageId: slug.id },
  }));
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps(context: any) {
  const res = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/gift-cards?filters[slug][$eq]=${context?.params.pid}&publicationState=live`
  );
  const appIcons = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/app-settings/1?populate[appIcons][populate]=*`
  );
  const headerData = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/headers?filters[slug][$eq]=ssb-header&publicationState=live`
  );
  const header = await headerData.json();
  const appLogos = await appIcons.json();
  const pageData = await res.json();
  if (pageData?.error) {
    logger.error(
      {
        URL: `${NEXT_PUBLIC_CMS_URL}/api/gift-cards?filters[slug][$eq]=${context.params.pid}`,
        type: "server",
        Response: pageData?.error,
      },
      `${pageData?.error?.message}`
    );
  }
  return {
    props: {
      pageNotFound:
        pageData?.data?.[0]?.components?.length > 0 ? false : true,
      model: pageData?.data?.[0] || null,
      appLogos: appLogos,
      header: header || null,
      analyticsPageType: "giftcard"
    }, // will be passed to the page component as props
  };
}
