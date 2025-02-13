import React from "react";
import Script from "next/script";
import { Box } from "@mui/material";

const MessengerWidget = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "2px solid red" }}>
        <Script
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.onedirectSettings = {
              brandHash: 'ODE3NF8xNzM2OTQ1NjI4Njg3XzQ=',
              widgetHash: 'f18800cf-8418-42c6-86f9-d52e793f8930',
              endpoint: 'https://shoppersstop.assist.gupshup.io/api/91110d/',
            };
            window.od = {};
            var mc = function() { mc.c(arguments); }
            mc.q = [];
            mc.c = function(args) { mc.q.push(args); };
            window.od.messenger = mc;
          `,
          }}
        />
        <Script
          strategy="afterInteractive"
          src="https://shoppersstop.assist.gupshup.io/web-sdk/od-messaging-sdk.min.js"
          onLoad={() => {
            console.log("Messaging SDK loaded.");
          }}
        />
      </Box>
    </>
  );
};

export default MessengerWidget;
