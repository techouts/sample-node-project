import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { UserContext } from "../components/userValidation/userValidation";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { CookiesProvider } from "react-cookie";
import createEmotionCache from "../utility/createEmotionCache";
import lightThemeOptions from "../styles/theme/lightThemeOptions";
import "../styles/globals.css";
import { ContextAppWrapper } from "../context/userInfoContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
import Loader from "../HOC/Loader/Loader";
import useStorage from "../utility/useStoarge";
import { Toast } from "../utility/Toast";
import MessengerWidget from "../utility/TestChatBot";

// import init from '../tracing';

const NEXT_PUBLIC_GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const client = new ApolloClient({
  uri: NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const clientSideEmotionCache = createEmotionCache();

export function reportWebVitals(metric: any) {
  if (metric.label === "custom") {
    if (metric.name === "Next.js-route-change-to-render") {
      localStorage.setItem("timeToRouteChangeToRender", metric.value);
    }
    if (metric.name === "Next.js-render") {
      localStorage.setItem("timeToRenderPage", metric.value);
    }
  }
  if (metric.label === "web-vital") {
    if (metric.name === "TTFB") {
      localStorage.setItem("timeToFirstByte", metric.value);
    }
  }
}
const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const [user, setUser] = useState<any>(null);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } : any = props;
  const router = useRouter();
  const { setItem, getItem } = useStorage();
  // const { tracer } = init(process.env.NEXT_PUBLIC_TRACING_SERVICE_NAME || "web", process.env.NEXT_PUBLIC_TRACING_ENVIRONMENT || "local");

  useEffect(() => {
    if (getItem("accessToken", "local")) {
      setUser(getItem("accessToken", "local"));
    }
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service-worker.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  useEffect(() => {
    if (pageProps?.protected && !localStorage.getItem("accessToken")) {
      setItem("gotoUrl", window.location.href, "local");
      router.push({
        pathname: global?.window?.location?.origin + "/home",
        query: { SignIn: false },
      });
    }
  }, [pageProps, user]);

  if (pageProps?.protected && !user) {
    return;
    <RecoilRoot>
      <Loader />
    </RecoilRoot>;
  }

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <UserContext.Provider value={user}>
        <RecoilRoot>
          <CacheProvider value={emotionCache}>
            <ContextAppWrapper>
              <CookiesProvider>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline />
                  <ApolloProvider client={client}>
                    <Component {...pageProps} />
                    {pageProps?.model?.title?.toLowerCase() ===
                      "contact us" && <MessengerWidget />}
                      <Loader isOpen={false}/>
                    <Toast />
                  </ApolloProvider>
                </ThemeProvider>
              </CookiesProvider>
            </ContextAppWrapper>
          </CacheProvider>
        </RecoilRoot>
      </UserContext.Provider>
    </GoogleOAuthProvider>
  );
};

export default MyApp;