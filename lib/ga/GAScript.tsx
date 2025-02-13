import Script from "next/script";

function GAScript() {
  return (
    <div className="container">
      <Script
        strategy="afterInteractive"
        src={`${process.env.NEXT_PUBLIC_GTM_URL}/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(attributes){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config','${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE}',
          ${JSON.parse(JSON.stringify(`{"debug_mode": ${process.env.NEXT_PUBLIC_TRACING_ENVIRONMENT === "prod"}, "send_page_view": false}`))});`,
        }}
      />
    </div>
  );
}

export default GAScript;
