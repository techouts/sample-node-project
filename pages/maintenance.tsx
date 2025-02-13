/* eslint-disable @next/next/next-script-for-ga */
import { Grid } from "@mui/material";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Custom404() {

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
            src={`/maintenance.png`}
            alt="maintenance"
          />
        </Grid>
        <Grid  sx={{ display: "grid" }}>
          <Grid sx={{fontWeight: "bold",color: "#C92A6D",fontSize: "22px", margin: "40px 0px",}}>{`We're currently under maintenance. We'll be back by 6th June, 2024 08:00 AM IST. In the meantime, you can continue shopping the best of beauty at `}<a href="https://www.shoppersstop.com">www.shoppersstop.com</a></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
