import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  NavigationCardTitle,
  NavigationCard,
  NavigationCardContent,
  NavigationCardSubTitle,
} from "./BeautyAdviceMobileStyled";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";

export const BeautyAdviceMsite = (data: any) => {
  const beautyData = data?.items?.[3]?.subItems;
  const router = useRouter();
  const handleBeauty = (path: any) => {
    router.push(path);
  };
  return (
    <>
      {beautyData?.map((beautyCardItem: any, index: number) => {
        return (
          <NavigationCard
            $backgroundImageUrl={beautyCardItem.imgUrlMobile}
            key={index}
            onClick={() => handleBeauty(beautyCardItem?.path)}
          >
            <Grid sx={{ width: "60%" }}>
              <NavigationCardContent direction={"row"}>
                <NavigationCardTitle>
                  {beautyCardItem.title}
                </NavigationCardTitle>
                <ChevronRightIcon />
              </NavigationCardContent>
              <NavigationCardSubTitle>
                {beautyCardItem.subTitle}
              </NavigationCardSubTitle>
            </Grid>
            <Grid sx={{ width: "40%" }}>
              <img
                src={beautyCardItem.imgUrlMobile}
                width="100%"
                height="100%"
                alt="beauty_card"
              />
            </Grid>
          </NavigationCard>
        );
      })}
    </>
  );
};
