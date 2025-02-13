import triggerGAEvent from "./GaEvents";
import  { useCallback } from "react";

export const callScrollEvent = () => {
  const LazyCallBack = (scrollPercentageFunction: any) => {
    let scrollCallBack: any;
    return () => {
      if (scrollCallBack) clearTimeout(scrollCallBack);
      scrollCallBack = setTimeout(() => {
        scrollCallBack = null;
        //@ts-ignore
        scrollPercentageFunction.apply(this as any);
      }, 500);
    };
  };
  let position: any;
  const scrollPercentage = () => {
    let scrollEvent = "";
    let scrollPer = 0;
    if (position > window.scrollY) {
      position = window.scrollY;
      scrollPer = (window?.scrollY / document?.body?.clientHeight) * 100;
      triggerGAEvent(
        {
          percent_scrolled: scrollPer,
        },
        "scroll_up"
      );
      scrollEvent = "scroll_up";
    } else if (position < window.scrollY) {
      position = window.scrollY;
      scrollPer = (window?.scrollY / document?.body?.clientHeight) * 100;
      scrollEvent = "scroll_down";
    }
    position = window.scrollY;
  };
  const scrollCheck = useCallback(LazyCallBack(scrollPercentage), []);
  if (typeof window !== "undefined") {
    window.onscroll = () => scrollCheck() as any;
  }
};
