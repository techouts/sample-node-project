import React, { useEffect, useRef, useState } from "react";
import { ProductSku, ProductTitle, ReadMoreLessTypo } from "./MultiTabStyles";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useMobileCheck } from "../../utility/isMobile";

const ImageGallery = (props: any) => {
  const { isAboutPage } = props || {};
  const viewMore = isAboutPage ? true : false;
  const router = useRouter();
  const isMobile = useMobileCheck();

  const toggleViewMore = () => {
    const splitUrl = router?.asPath?.split("?");
    const basePath = viewMore
      ? splitUrl?.[0]
          ?.split("/")
          .filter(
            (item: any, index: number, arr: any[]) =>
              Boolean(item) && index < arr?.length - 1
          )
          ?.join("/")
      : `${splitUrl?.[0]}/about`;

    const queryParams = splitUrl?.[1];
    router?.push(`${basePath}${queryParams ? "?" + queryParams : ""}`);
  };

  const [height, setHeight] = useState(0);
  const compRef = useRef<any>();

  useEffect(() => {
    if (compRef?.current && !viewMore) {
      setHeight(compRef?.current?.clientHeight || 0);
    } else {
      setHeight(0);
    }
  }, [compRef?.current, isMobile, viewMore]);
  return (
    <Box>
      <Box
        sx={{
          height: viewMore ? "auto" : height > 100 ? "100px" : "auto",
          overflow: "hidden",
          textAlign: "justify",
          "@media (max-width:600px)": {
            height: viewMore ? "auto" : height > 100 ? "100px" : "auto",
          },
        }}>
        <div
          ref={compRef}
          dangerouslySetInnerHTML={{ __html: props?.description }}
        />
      </Box>
      {(viewMore ? true : isMobile ? height > 100 : height >100) && (
        <ReadMoreLessTypo
          onClick={toggleViewMore}
          style={{ marginTop: "10px", cursor: "pointer" }}>
          {viewMore ? "Read Less" : "Read More"}
        </ReadMoreLessTypo>
      )}
      <ProductTitle sx={{ pt: "1rem" }}>
        Product ID: <ProductSku>{props?.productId}</ProductSku>
      </ProductTitle>
    </Box>
  );
};

export default ImageGallery;
