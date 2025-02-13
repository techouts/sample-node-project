import React, { useState } from "react";
import { useRouter } from "next/router";
import Loader from "../../HOC/Loader/Loader";
import { useMobileCheck } from "../../utility/isMobile";
import {
  Typographyonelevel,
  BreadCrumbBox,
} from "../../components/BreadCrumb/BreadCrumbStyles";
import BreadcrumbSchema from "../../schemas/BreadCrumbSchema";
const BreadCrumb = ({
  levelOneText,
  levelTwoText,
  levelOnePath,
  bgColor,
  bgPadding,
  levelTwoPath,
  levelThreeText,
  levelThreePath,
  levelFourText,
  levelFourPath,
  isBlog
}: BreadcrumbSchema) => {
  const router = useRouter();
  const [displayLoader, setLoader] = useState(false);
  const isMobile = useMobileCheck();

  const breadCrumbList = isBlog
    ? [
        { text: levelOneText, path: levelOnePath },
        { text: levelTwoText, path: levelTwoPath },
        { text: levelThreeText, path: levelThreePath },
        { text: levelFourText, path: levelFourPath },
        { text: lastCrumb(), path: router?.asPath },
      ].filter((el) => el.text)
    : [
        { text: levelOneText, path: levelOnePath },
        { text: levelTwoText, path: levelTwoPath },
        { text: levelThreeText, path: levelThreePath },
        { text: levelFourText, path: levelFourPath },
      ].filter((el) => el.text);

  function lastCrumb() {
    const path = router?.query?.pid?.[router?.query?.pid?.length - 1];
    return path
      ?.split("-")
      ?.map(
        (e: any) => e?.charAt(0)?.toUpperCase() + e?.slice(1)?.toLowerCase()
      )
      ?.join(" ");
  }
  return (
    <>
      {displayLoader && <Loader />}
      <BreadCrumbBox bgcolor={bgColor} p={isMobile ? "0 4%" : bgPadding}>
        {isBlog && (
          <Typographyonelevel
            isMobile={isMobile}
            sx={{ color: "#AD184C" }}
            onClick={() => router?.push("/beauty-stop/home")}
          >
            Beauty-Blog/
          </Typographyonelevel>
        )}
        {breadCrumbList?.map((item: any, index: number) => (
          <>
            {item?.text && (
              <>
                <Typographyonelevel>
                  {index !== 0 ? "/" : " "}
                </Typographyonelevel>
                <Typographyonelevel
                  style={{
                    color: index == breadCrumbList?.length - 1 ? "#231F20" : "#AD184C",
                  }}
                  isMobile={isMobile}
                  onClick={() =>
                    item?.path != "" && [
                      window.location.assign(
                        `${window.location.origin}${item?.path}`
                      ),
                      setLoader(true),
                    ]
                  }
                >
                  {item?.text}
                </Typographyonelevel>
              </>
            )}
          </>
        ))}
      </BreadCrumbBox>
    </>
  );
};

export default BreadCrumb;
