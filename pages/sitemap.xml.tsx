import * as fs from "fs";
import AxiosInstance from "../utility/AxiosInstance";
import { CATEGORYLISTJSON } from "../graphQLQueries/CategoryQuery";
import { BRANDLIST } from "../graphQLQueries/BrandQuery";
import handleErrorResponse from "../utility/ErrorHandling";

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }: any) => {
  const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_URL; //This is where you will define your base url. You can also use the default dev url http://localhost:3000

  const staticPaths = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "server-sitemap.xml",
        "sitemap.xml.js",
        "404.tsx",
        "_app.tsx",
        "_document.tsx",
        "api",
        "[...pid].tsx",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${BASE_URL}/${staticPagePath.replace(".tsx", "")}`;
    });

  const pages = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/pages?fields[0]=slug`); // your custom API call
  const pageData = await pages.json();
  const dynamicPagePaths = pageData?.data?.map((singleBlog: any) => {
    return `${BASE_URL}/${singleBlog?.slug}`;
  });

  const beautyStop = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/blogs?fields[0]=slug`); // your custom API call
  const beautyStopData = await beautyStop.json();
  const dynamicbeautyStopPaths = beautyStopData?.data?.map((singleBlog: any) => {
    return `${BASE_URL}/beauty-blog/${singleBlog?.slug}`;
  });

  const account = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/accounts?fields[0]=slug`); // your custom API call
  const accountData = await account.json();
  const dynamicaccountDataPaths = accountData?.data?.map((singleBlog: any) => {
    return `${BASE_URL}/account/${singleBlog?.slug}`;
  });

  const brand = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/brands?fields[0]=slug`); // your custom API call
  const brands = await AxiosInstance(BRANDLIST)
    .then((response) => {
      
      return response?.data?.data?.customAttributeMetadata?.items?.[0]?.attribute_options;
    })
    .catch(function (error: any) {
      console.log(error);
    });
  const dynamicbrandDataPaths: any = [];
  brands?.map((brand: any) => {
    if (!brand?.label?.includes("&")) {
      dynamicbrandDataPaths?.push(
        `${BASE_URL}/${brand?.label?.trim()?.replace(/\s/g, "-")}/c/brand?brand_name=${brand?.value}`
      );
    }
  });

  const category = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/categories?fields[0]=slug`); // your custom API call
  const categoryData = await category.json();
  const dynamiccategoryDataPaths = categoryData?.data?.map((singleBlog: any) => {
    return `${BASE_URL}/category/${singleBlog?.slug}`;
  });

  const miscs = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/miscs?fields[0]=slug`); // your custom API call
  const miscsData = await miscs.json();
  const dynamicmiscsDataPaths = miscsData?.data?.map((singleBlog: any) => {
    return `${BASE_URL}/miscs/${singleBlog?.slug}`;
  });

  const plps = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/plps?fields[0]=slug`); // your custom API call
  const plpsData = await plps.json();
  const cates = await AxiosInstance(CATEGORYLISTJSON)
    .then((response) => {
     
      return response?.data?.data?.category?.children?.[0]?.children;
    })
    .catch(function (error: any) {
      console.log(error);
    });

  const dynamicplpsDataPaths: any = [];
  cates?.map((cate: any) =>
    cate?.children?.map((item: any) =>
      dynamicplpsDataPaths?.push(
        `${BASE_URL}/${cate?.url_key}/${item?.url_key}/c/${item?.id}?category_id=${item?.id}`
      )
    )
  );
  cates?.map((cate: any) =>
    cate?.children?.map((item: any) =>
      item?.children?.map((itm: any) =>
        dynamicplpsDataPaths?.push(
          `${BASE_URL}/${cate?.url_key}/${item?.url_key}/${itm?.url_key}/c/${itm?.id}?category_id=${itm?.id}`
        )
      )
    )
  );
  const allPaths = [...staticPaths, ...dynamicPagePaths, ...dynamicbeautyStopPaths, ...dynamicaccountDataPaths, ...dynamicbrandDataPaths, ...dynamiccategoryDataPaths, ...dynamicmiscsDataPaths, ...dynamicplpsDataPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      // This is where we would be putting in our URLs
      ${allPaths
      .map((url) => {
        return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
            </url>
          `;
      })
      .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
