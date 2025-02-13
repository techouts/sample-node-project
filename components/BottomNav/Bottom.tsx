import { useState, useEffect } from "react";
import { MainBox, BoxLogo, Title, NavIcon } from "./BottomStyle";
import { useRouter } from "next/router";
import { ReplaceImage } from "../../utility/ReplaceImage";
import Loader from "../../HOC/Loader/Loader";
const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
import useStorage from "../../utility/useStoarge";
import triggerGAEvent from "../../utility/GaEvents";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import { isMobile as deviceIsMobile } from 'react-device-detect';
export interface NavItemType {
  id: number;
  icon: string;
  text: string;
  path: string;
  textColor: string;
}

function Bottom() {
  const router = useRouter();
  const isMobile = deviceIsMobile;
  const [displayLoader, setLoader] = useState(false);
  const currentPagePath = router.pathname;
  const [bottomNavData, setBottomNavData] = useState<any>(null);
  const { getItem, setItem } = useStorage();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);

  useEffect(() => {
    if (
      !getItem("bottom_nav", "local") ||
      `${getItem("bottom_nav", "local")}` == "undefined"
    ) {
      fetchApi();
    } else {
      const bottomNav_val = getItem("bottom_nav", "local");
      if (`${bottomNav_val}` != "undefined") {
        setBottomNavData(JSON.parse(`${bottomNav_val}`));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchApi() {
    const bottomNav = await fetch(
      `${NEXT_PUBLIC_CMS_URL}/api/app-settings/1?populate[BottomNavigationBar][populate][items][populate]=*`
    );
    const bottomNavData = await bottomNav.json();
    const bottomNavItems = bottomNavData?.data?.BottomNavigationBar?.items;
    if (bottomNavItems != undefined) {
      setItem("bottom_nav", JSON.stringify(bottomNavItems), "local");
      setBottomNavData(bottomNavItems);
    }
  }

  const handleClick = (path: string) => {
    if (path !== router.asPath) {
      window.location.assign(`${path}`);
      setLoader(true);
    }
  };

  const callGaEvent = (link_text: string, url: any) => {
    triggerGAEvent(
      {
        widget_title: "Menu",
        link_text: link_text,
        link_url: url,
      },
      "menu"
    );
  };
  const filteredBottomNavData = userDataItems?.storeMode
    ? bottomNavData?.filter(
        (i: any) => !["categories", "luxe"].includes(i.identifiers)
      )
    : bottomNavData;

  return (
    <>
      {isMobile && (
        <MainBox>
          {displayLoader && <Loader />}
          {filteredBottomNavData !== null &&
            filteredBottomNavData?.map((navItem: NavItemType, index: any) => {
              return (
                <BoxLogo
                  key={index}
                  onClick={() => {
                    handleClick(navItem?.path),
                      callGaEvent(navItem.text, navItem?.path);
                  }}
                >
                  <NavIcon
                    alt="bottom-nav-icon"
                    src={ReplaceImage(navItem?.icon)}
                  />
                  <Title
                    $color={
                      navItem?.text?.toLowerCase() == "luxe"
                        ? "#C19F00"
                        : navItem?.textColor
                    }
                    $isactivenav={
                      currentPagePath === bottomNavData[2].path
                        ? false
                        : currentPagePath.includes(navItem.path)
                    }
                  >
                    {navItem.text}
                  </Title>
                </BoxLogo>
              );
            })}
        </MainBox>
      )}
    </>
  );
}

export default Bottom;
