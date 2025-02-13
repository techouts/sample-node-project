import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import Categories from "./Categories";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { fetchCategories } from "../../api/Navigations/Categories";

import {
  HeaderNavigationInterface,
  NavData,
} from "../../schemas/NavigationBarSchema";
import { useRouter } from "next/router";
import Loader from "../../HOC/Loader/Loader";
import { FALL_BACK_IMAGE_PRODUCT } from "../../utility/AppIcons";
import { AppIcons } from "../../utility/AppIconsConstant";

export default function MobileNavigation({ data }: HeaderNavigationInterface) {
  const [currentData, setCurrentData] = useState<any>({});
  const router = useRouter();
  const pagePath = router.pathname;
  const [displayLoader, setLoader] = useState(true);
  const [initialState, setInitialState] = useState(true);
  const [categoryData, setCategoryData] = useState<any>(null);
  const CATEGORY_TEXT = "/categories";
  const PRODUCT_FALLBACK_URL = AppIcons(FALL_BACK_IMAGE_PRODUCT);

  const getCategories = async () => {
    const response = await fetchCategories();
    if (response) {
      setCategoryData(
        pagePath === CATEGORY_TEXT
          ? response?.category?.children[0]
          : response?.category?.children[1]
      );
      setLoader(false);
    }
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const RenderComponent = (data: any) => {
    const componentData = Object.assign(
      { callBack: setInitialState },
      currentData
    );

    return <Categories {...componentData} />;
  };

  const NavCard = (cardDetails: NavData | any) => {
    return (
      <>
        <img
          width="100%"
          height="100%"
          src={ReplaceImage(cardDetails.image) || ReplaceImage(PRODUCT_FALLBACK_URL?.url)}
          alt={"img"}
          onClick={() => {
            if (cardDetails?.name?.toLowerCase() === "brands") {
              router.push("/brands");
            } else {
              setCurrentData(cardDetails);
              setInitialState(false);
            }
          }}
        />
      </>
    );
  };
  return (
    <Box width="100%">
      {displayLoader && <Loader />}
      {initialState ? (
        <Grid container marginLeft={1}>
          {categoryData?.children?.map(
            (
              item: {
                children: any;
                name: string;
                url_key: string;
              },
              index: number
            ) => {
              return (
                <>
                  <Grid item xs={5.45} m={1} key={index}>
                    <NavCard {...item} />
                  </Grid>
                </>
              );
            }
          )}
        </Grid>
      ) : (
        <RenderComponent {...currentData} />
      )}
    </Box>
  );
}
