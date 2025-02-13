export default async function handler(req: any, res: any) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const pages = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/pages?fields[0]=slug`
    ); // your custom API call
    const pageData = await pages.json();
    const dynamicPagePaths = pageData?.data?.map((singleBlog: any) => {
      return `/${singleBlog?.slug}`;
    });

    const beautyStop = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/blogs?fields[0]=slug`
    ); // your custom API call
    const beautyStopData = await beautyStop.json();
    const dynamicbeautyStopPaths = beautyStopData?.data?.map(
      (singleBlog: any) => {
        return `/beauty-stop/${singleBlog?.slug}`;
      }
    );

    const account = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/accounts?fields[0]=slug`
    ); // your custom API call
    const accountData = await account.json();
    const dynamicaccountDataPaths = accountData?.data?.map(
      (singleBlog: any) => {
        return `/account/${singleBlog?.slug}`;
      }
    );

    const brand = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/brands?fields[0]=slug`
    ); // your custom API call
    const brandData = await brand.json();
    const dynamicbrandDataPaths = brandData?.data?.map((singleBlog: any) => {
      return `/brand/${singleBlog?.slug}`;
    });

    const category = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/categories?fields[0]=slug`
    ); // your custom API call
    const categoryData = await category.json();
    const dynamiccategoryDataPaths = categoryData?.data?.map(
      (singleBlog: any) => {
        return `/category/${singleBlog?.slug}`;
      }
    );

    const miscs = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/miscs?fields[0]=slug`
    ); // your custom API call
    const miscsData = await miscs.json();
    const dynamicmiscsDataPaths = miscsData?.data?.map((singleBlog: any) => {
      return `/miscs/${singleBlog?.slug}`;
    });

    const plps = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/plps?fields[0]=slug`
    ); // your custom API call
    const plpsData = await plps.json();
    const dynamicplpsDataPaths = plpsData?.data?.map((singleBlog: any) => {
      return `/c/${singleBlog?.slug}`;
    });
    const allPaths = [
      ...dynamicPagePaths,
      ...dynamicbeautyStopPaths,
      ...dynamicaccountDataPaths,
      ...dynamicbrandDataPaths,
      ...dynamiccategoryDataPaths,
      ...dynamicmiscsDataPaths,
      ...dynamicplpsDataPaths,
    ];
    let arr: any = [];
    await allPaths?.map((slugs: any) => {
      res.revalidate(slugs);
      arr.push(slugs);
    });
    return res.json({ revalidated: true, CachePurgedSlugs: arr });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
