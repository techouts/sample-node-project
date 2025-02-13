import { GetServerSideProps } from "next";
import { ComponentRenderingUtility } from "../../utility/ComponentRenderingUtility";
const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

const routeMappings = [
  { id: "page", route: "", url: "pages" },
  { id: "account", route: "account", url: "accounts" },
  { id: "blog", route: "beauty-stop", url: "blogs" },
  { id: "cart", route: "cart", url: "carts" },
  { id: "misc", route: "misc", url: "miscs" },
  { id: "pdp", route: "pdp", url: "pdps" },
  { id: "plp", route: "plp", url: "plps" },
  { id: "brand", route: "brand", url: "brands" },
  { id: "category", route: "category", url: "categories" },
];

export const PreviewContent = (props: any) => (
  <ComponentRenderingUtility
    isBreadCrumbsRequired={false}
    props={props}
    analyticsPageType="Preview Page "
    currentPageType="Preview "
  />
);

export default PreviewContent;

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: any) => {
  let pageData: any = {};
  const route = routeMappings.find((r) => r.id === query.type);

  if (
    query.secret !== process.env.NEXT_PUBLIC_STRAPI_PREVIEW_SECRET ||
    (!query.slug && !query.type)
  ) {
  } else {
    const res = await fetch(
      `${NEXT_PUBLIC_CMS_URL}/api/${route?.url}?filters[slug][$eq]=` +
      query.slug
    );
    pageData = await res.json();
  }
  const appIcons = await fetch(
    `${NEXT_PUBLIC_CMS_URL}/api/app-settings/1?populate[appIcons][populate]=*`
  );
  const appLogos = await appIcons.json();

  if (!pageData?.data?.[0]) {
    return {
      redirect: {
        permanent: false,
        destination: `/404`,
      },
    };
  }

  return {
    props: { model: pageData.data?.[0], appLogos: appLogos }, // will be passed to the page component as props
  };
};
