/* eslint-disable @next/next/next-script-for-ga */
import { Button, Grid } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { ReplaceImage } from "../utility/ReplaceImage";
import Script from "next/script";

export default function Custom404() {
  const router = useRouter();
  const CMSImageUrl = `${process.env.NEXT_PUBLIC_CMS_IMAGES_URL}`;
  const pageNotFoundImage = `${CMSImageUrl}/404_Page_Not_Found_0bad7cdcfa.svg`;
  return (
    <Grid className={styles?.notFoundContainer} sx={{ display: "grid" }}>
      <Head>
        <title>
          Online Shopping India - Shop for clothes, shoes, Bags, watches @
          Shoppersstop.com
        </title>
        <link
          rel="icon"
          href="/ssblogo_favicon.png"
        />
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
              '${process.env.NEXT_PUBLIC_GTM_URL}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CODE}');
              `,
          }}
        />
      </Head>
      <Grid sx={{ margin: "0 auto", maxWidth: "1440px" }}>
        <Grid>
          <img
            width="100%"
            src={`${ReplaceImage(pageNotFoundImage)}`}
            alt="Page-not-foun"
          />
        </Grid>
        <Grid className={styles?.notFoundText} sx={{ display: "grid" }}>
          <Grid>{`What do you hate more than a broken lipstick? A 404 error like this one!`}</Grid>
          <Grid
            onClick={() => router.push("/home")}
            sx={{ cursor: "pointer", textAlign: "center" }}
          >
            <Button
              sx={{
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "1px",
                color: "#231F20",
                borderRadius: "0%",
                width: "200px",
                padding: "14px 0px",
                margin: "40px 0px",
                backgroundColor: "#DEA3B7",
                "&:hover": {
                  backgroundColor: "#DEA3B7",
                },
              }}
            >
              {`GO BACK TO HOME`}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
