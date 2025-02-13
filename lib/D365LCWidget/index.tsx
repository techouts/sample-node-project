// Microsoft Dynamics 365 Live Chat Widget

import Script from 'next/script';
import D365LCWCustomizationConfig from './CustomizationsConfig';
import {
  NEXT_PUBLIC_D365_APP_ID_GUEST,
  NEXT_PUBLIC_D365_APP_ID_LOGGED_IN,
  NEXT_PUBLIC_D365_ORG_ID,
  NEXT_PUBLIC_D365_ORG_URL,
} from '../../utility/APIConstants';
import { useEffect, useMemo } from 'react';
import { Cookies, useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoilstore';
import { useRouter } from 'next/router';

export default function D365LCWidget() {
  const cookie = new Cookies();
  const router = useRouter();

  const isLoggedIn = !!cookie.get("accessToken");

  const [userDataItems, _] = useRecoilState(userState);

  const userPhoneNumber =
    global?.window?.localStorage?.getItem("mobileNumber") || "";

  const { isSSBMobileApp, email, phone } = router.query;

  const _isSSBMobileApp = isSSBMobileApp === "true";
  const isSSBMobileAppLoggedIn = _isSSBMobileApp && !!email && !!phone;

  const isUserLoggedIn = _isSSBMobileApp
    ? isSSBMobileAppLoggedIn
    : !!isLoggedIn;

  const _userData = useMemo(() => {
    if (_isSSBMobileApp) {
      return {
        Phone: { value: phone || "" },
        Email: { value: email || "" },
      };
    } else {
      return {
        Phone: { value: userPhoneNumber || "" },
        Email: { value: userDataItems?.userEmail || "" },
      };
    }
  }, [
    _isSSBMobileApp,
    email,
    phone,
    userDataItems?.userEmail,
    userPhoneNumber,
  ]);

  // useEffect(() => {
  //   function contextProvider() {
  //     return {
  //       sourceWebsite: { value: "SSBeauty", isDisplayable: true },
  //       ..._userData,
  //     };
  //   }

  //   // Reload page on chat window close
  //   window.addEventListener("lcw:onClose", function handleLivechatOnClose() {
  //     window.location.reload();
  //   });

  //   window.addEventListener("lcw:ready", function handleLivechatReadyEvent() {
  //   // @ts-ignore
  //     window?.Microsoft?.Omnichannel?.LiveChatWidget?.SDK?.setContextProvider(contextProvider);
  // });

  //   window.addEventListener("lcw:error",function handleLivechatErrorEvent(errorEvent) {
  //       console.log(errorEvent);
  //     });

  // }, [_userData]);

  // if (isUserLoggedIn) {
  //   return (
  //     <Script
  //       // v2 attribute is needed by the LC Script
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       // @ts-ignore
  //       v2
  //       strategy="afterInteractive"
  //       id="Microsoft_Omnichannel_LCWidget"
  //       type="text/javascript"
  //       src="https://oc-cdn-public-ind.azureedge.net/livechatwidget/scripts/LiveChatBootstrapper.js"
  //       data-app-id={NEXT_PUBLIC_D365_APP_ID_LOGGED_IN}
  //       data-lcw-version="prod"
  //       data-org-id={`${NEXT_PUBLIC_D365_ORG_ID}`}
  //       data-org-url={`${NEXT_PUBLIC_D365_ORG_URL}`}
  //       data-font-family-override="Arial"
  //       data-color-override="#000000"
  //       data-customization-callback={D365LCWCustomizationConfig}
  //       data-disable-telemetry="true"
  //     />
  //   )
  // } else {
  //   return (
  //     <Script
  //       // v2 attribute is needed by the LC Script
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       // @ts-ignore
  //       v2
  //       strategy="afterInteractive"
  //       id="Microsoft_Omnichannel_LCWidget"
  //       type="text/javascript"
  //       src="https://oc-cdn-public-ind.azureedge.net/livechatwidget/scripts/LiveChatBootstrapper.js"
  //       data-app-id={NEXT_PUBLIC_D365_APP_ID_GUEST}
  //       data-lcw-version="prod"
  //       data-org-id={`${NEXT_PUBLIC_D365_ORG_ID}`}
  //       data-org-url={`${NEXT_PUBLIC_D365_ORG_URL}`}
  //       data-font-family-override="Arial"
  //       data-color-override="#000000"
  //       data-customization-callback={D365LCWCustomizationConfig}
  //       data-disable-telemetry="true"
  //     />
  //   )
  // }

  useEffect(() => {
    return () => {};
  }, []);

  return null; 
}
