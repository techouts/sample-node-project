import Script from 'next/script';
import D365LCWidget from '../../lib/D365LCWidget';
import { isProdEnv } from '../../utility/UnbxdAnalytics';

export default function ChatBotWidget() {
  if (!isProdEnv) return null;

  const displayMSLCW = ["sit", "uat"].includes(process.env.NEXT_PUBLIC_TRACING_ENVIRONMENT);

  if (displayMSLCW) {
    return <D365LCWidget />;
  } else {
    return (
      <>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
        window.onedirectSettings = {
          apiKey: "${process.env.NEXT_PUBLIC_OD_MESSANGER_PRE_CHAT_APIKEY}",
          widgetHash: "${process.env.NEXT_PUBLIC_OD_WIDGET_HASH}"
        }
          `,
          }}
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
        window.od = {}; var mc = function() { mc.c(arguments);}
        mc.q = []; mc.c=function(args) { mc.q.push(args)};
        window.od.messenger = mc;
          `,
          }}
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
        fetch("${process.env.NEXT_PUBLIC_MSG_ONEDIRECT_API}")
.then((r) => r.json())
.then((r) => {
  !function (e, s, n, t, a) { el = s.createElement(n), p = s.getElementsByTagName(n)[0], el.defer = 1, el.id = "onedirect-messaging-sdk", el.src = 'https://s3-ap-southeast-1.amazonaws.com/onedirect/messaging/web-sdk/production/'+r.version+'/od-messaging.init.v1.0.min.js', p.parentNode.insertBefore(el, p) }(window, document, "script");
}).catch((error) => {
  console.log(error)
})`,
          }}
        />
      </>
    );
  }
}
