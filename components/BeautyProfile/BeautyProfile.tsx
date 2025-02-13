import { Grid } from "@mui/material";
import client from "../../apollo-client";
import { GridSlides } from "./GridSlides";
import { apiErrorMessage } from "./constants";
import React, { useEffect, useState } from "react";
import { useMobileCheck } from "../../utility/isMobile";
import { FlexBox } from "./Styles";
import { BeautyProfileSchema } from "../../schemas/BeautyProfileSchema";
import { GET_BEAUTY_PROFILE } from "../../graphQLQueries/BeautyProfile/getBeautyProfileQuery";
import { SET_BEAUTY_PROFILE } from "../../graphQLQueries/BeautyProfile/setBeautyProfileMutation";
import Loader from "../../HOC/Loader/Loader";
import { useRecoilState } from "recoil";
import { beautyProfileData } from "../../recoilstore";
import { useRouter } from "next/router";
import handleErrorResponse from "../../utility/ErrorHandling";

export const BeautyProfile = (data: BeautyProfileSchema) => {
  const { categories } = data;
  const [beautyProfile, setBeautyProfile] = useRecoilState(beautyProfileData);
  const isMobile = useMobileCheck("(min-width : 900px )");
  const [slide, setSlide] = useState<any>(-1);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorState, setErrorState] = useState<any>(false);
  const [displayLoader, setDisplayLoader] = useState<any>(false);
  const [selectedBeautyProfile, setSelectedBeautyProfile] = useState<any>([]);
  const router = useRouter();
  const slug = router.query?.pid;
  const setBeautyProfileFun = async (beautyProfileContent: string) => {
    await client
      .mutate({
        mutation: SET_BEAUTY_PROFILE,
        variables: {
          beauty_profile: beautyProfileContent,
        },
      })
      .then((res) => {
        const hasError = handleErrorResponse(
          res?.data?.UpdateCustomerBeautyProfile?.beauty_profile
        ); //response checking
        if (hasError) return null;
        setBeautyProfile(
          JSON.parse(res?.data?.UpdateCustomerBeautyProfile?.beauty_profile)
        );
      })
      .catch((err) => {
        console.log("err:", err);
        setErrorState(true);
        setDisplayLoader(false);
        setErrorMessage(apiErrorMessage);
      });
  };

  const getBeautyProfile = async () => {
    setDisplayLoader(true);
    await client
      .query({
        query: GET_BEAUTY_PROFILE,
        fetchPolicy: "no-cache",
      })
      .then((res) => {
        const BeautyProfile = res?.data?.customer?.BeautyProfile;
        setBeautyProfile(JSON.parse(BeautyProfile ? BeautyProfile : "{}"));
        if (BeautyProfile) {
          setSelectedBeautyProfile(JSON.parse(BeautyProfile));
          setSlide(categories?.length - 1);
          setDisplayLoader(false);
        }
        setDisplayLoader(false);
      })
      .catch((err) => {
        console.log("err:", err);
        setErrorState(true);
        setDisplayLoader(false);
        setErrorMessage(apiErrorMessage);
      });
  };

  useEffect(() => {
    getBeautyProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {displayLoader ? (
        <Loader />
      ) : (
        <>
          <Grid
            sx={{
              height: "100%",
              backgroundPosition: "right",
              backgroundSize: "cover",
            }}
          >
            <Grid
              container
              aria-label="beauty-slide"
              alignItems={slide === 0 ? "center" : "flex-start"}
            >
              <Grid item xs={12} sm={isMobile ? 12 : 7}>
                <FlexBox>
                  <GridSlides
                    slide={slide}
                    slug={typeof slug === "string" ? slug : slug?.[0]}
                    details={data}
                    setSlide={setSlide}
                    items={categories}
                    setBeautyProfile={setBeautyProfileFun}
                    getBeautyProfile={getBeautyProfile}
                    errorState={errorState}
                    setErrorState={setErrorState}
                    errorMessage={errorMessage}
                    displayLoader={displayLoader}
                    setDisplayLoader={setDisplayLoader}
                    selectedBeautyProfile={selectedBeautyProfile}
                    setSelectedBeautyProfile={setSelectedBeautyProfile}
                  />
                </FlexBox>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
