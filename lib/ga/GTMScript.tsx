import Script from "next/script";

function GTMScript() {
  return (
    <div className="container">
      <Script strategy="afterInteractive"
        id="google-analytics"
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
    </div>
  );
}

export default GTMScript;
