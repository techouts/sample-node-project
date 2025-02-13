import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import {
  PremiumBox,
  PremiumTypography,
  DetailsTypography,
  MemberTypography,
  MemberTextBox,
  TierImageBox,
  CardDetailsGrid,
  ListOne,
  ListTwo,
  ToolTipBox,
  InfoIcon,
  ViewBenefitsButton,
  ButtonBox,
  BenefitsBox,
  TextTypography,
} from "./LoyalityDataStyle";
import { useMobileCheck } from "../../utility/isMobile";
import {
  GetFCCDetails,
  GetLoyaltyData,
} from "../../graphQLQueries/LoyalityData";
import { ViewMoreTypography } from "../Profile/ProfileStyles";
import { ReplaceImage } from "../../utility/ReplaceImage";

import {
  CARD_NUMBER_TEXT,
  CARD_TYPE_TEXT,
  DATE_EXPIRE,
  EXCLUSIVE_OFFERS,
  FULLNAME_TEXT,
  MEMBER_TEXT,
  OFFERS_TEXT,
  PRIMARY_POINTS_TEXT,
  PROMOTIONS_POINTS_TEXT,
  TEXT,
  VIEW_BENEFITS_TEXT,
  VIEW_LESS_TEXT,
  VIEW_MORE_TEXT,
  WELCOME_TEXT,
} from "../FirstCitizenSignUp/constant";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoilstore";
import Title from "../../HOC/HOCTitle/HOCTitle";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  InfoCircle_Grey_ICON,
  TIER0_ICON,
  TIER1_ICON,
  TIER2_ICON,
  TIER3_ICON,
  TIER4_ICON,
} from "../../utility/AppIcons";
const LoyalityData = ({ setLoader, displayLoader, item }: any) => {
  const userDataItems = useRecoilValue(userState);
  const [update, setUpdate] = useState<any>(null);
  const [points, setPoints] = useState<any>(undefined);
  const [promitionOffers, setPromotionOffers] = useState<any>([]);
  const [primaryPoints, setPrimaryPoints] = useState();
  const [promotionPoints, setPromotionPoints] = useState();
  const [benefits, setBenefits] = useState<any>("");
  const [tierData, setTierData] = useState("");
  const [userTierLogo, setUserTierLogo] = useState<any>("");
  const InfoCircle_Grey = AppIcons(InfoCircle_Grey_ICON);
  let barcodeImage = "";
  if (update?.sslLoyaltyDetails?.barcodeImage != "")
    barcodeImage =
      "data:image/png;base64," + update?.sslLoyaltyDetails?.barcodeImage;
  const isMobile = useMobileCheck();
  const TIER0_LOGO = AppIcons(TIER0_ICON);
  const TIER1_LOGO = AppIcons(TIER1_ICON);
  const TIER2_LOGO = AppIcons(TIER2_ICON);
  const TIER3_LOGO = AppIcons(TIER3_ICON);
  const TIER4_LOGO = AppIcons(TIER4_ICON);

  const BenefitsData = (data: any) => {
    return setBenefits(
      item?.filter(
        (list: any, index: number) => list?.tier?.toLowerCase() === data
      )[0]?.tierBenefits
    );
  };
  useEffect(() => {
    (async () => {
      const response = await GetFCCDetails();
      if (response?.data?.getFirstCitizenClubPoints) {
        setUpdate(response?.data?.getFirstCitizenClubPoints);
        const balances = response?.data?.getFirstCitizenClubPoints?.balances;
        setPrimaryPoints(
          response?.data?.getFirstCitizenClubPoints?.totalBalance
        );
        setPoints(
          balances?.find((i: any) => i?.loyalty_account === "FC Points")
            ?.balance
        );
        setTierData(
          response?.data?.getFirstCitizenClubPoints?.sslLoyaltyDetails?.tier
        );
      }
      const loyaltyResponse = await GetLoyaltyData("B");
      if (
        loyaltyResponse?.data?.getLoyaltyPoints?.getGroupLoyaltyPointsResponse
      ) {
        setPromotionPoints(
          loyaltyResponse?.data?.getLoyaltyPoints?.getGroupLoyaltyPointsResponse
            ?.redeemablePointsValue
        );
        const promotionsDataOffer =
          loyaltyResponse?.data?.getLoyaltyPoints?.getGroupLoyaltyPointsResponse
            ?.promoPoints?.data;
        let offers: any = [];
        promotionsDataOffer?.map((e: any) => {
          if (e?.split("~")?.[2]) {
            offers.push(e?.split("~")?.[2]);
          }
        });
        setPromotionOffers([...offers]);
      }
      setLoader(false);
    })();
    // loyalityData();
    // eslintlet -disable-next-line react-hooks/exhaustive-deps
    switch (userDataItems?.tier?.toLowerCase()) {
      case "tier1":
        BenefitsData("tierone");
        break;
      case "tier2":
        BenefitsData("tiertwo");
        break;
      case "tier3":
        BenefitsData("tierthree");
        break;
      case "tier4":
        BenefitsData("tierfour");
        break;
      default:
        return;
    }
  }, []);

  const [itemsToShow, setItemsToShow] = useState(2);
  const [itemsShow, setItemsShow] = useState(6);
  const showmore = () => {
    setItemsToShow(promitionOffers.length);
  };
  const showless = () => {
    setItemsToShow(2);
  };

  const showMore = () => {
    setItemsShow(promitionOffers.length);
  };
  const showLess = () => {
    setItemsShow(6);
  };
  const onTierImageError = (e: any) => {
    e.target.src = userDataItems?.tierLogo;
  };
  useEffect(() => {
    switch (tierData) {
      case "Tier0":
        setUserTierLogo(
          ReplaceImage(TIER0_LOGO?.url || userDataItems?.tierLogo)
        );
        break;
      case "Tier1":
        setUserTierLogo(
          ReplaceImage(TIER1_LOGO?.url || userDataItems?.tierLogo)
        );
        break;
      case "Tier2":
        setUserTierLogo(
          ReplaceImage(TIER2_LOGO?.url || userDataItems?.tierLogo)
        );
        break;
      case "Tier3":
        setUserTierLogo(
          ReplaceImage(TIER3_LOGO?.url || userDataItems?.tierLogo)
        );
        break;
      case "Tier4":
        setUserTierLogo(
          ReplaceImage(TIER4_LOGO?.url || userDataItems?.tierLogo)
        );
        break;
      default:
        setUserTierLogo(userDataItems?.tierLogo);
    }
  }, [userTierLogo, userTierLogo]);
  return (
    <>
      {!displayLoader &&  (
        <Box sx={{ marginBottom: "40px" }}>
          <Box>
            <MemberTextBox>
              <MemberTypography isMobile={isMobile}>
                {`${WELCOME_TEXT} ${
                  update?.sslLoyaltyDetails?.cardDesc ?? ""
                } ${MEMBER_TEXT}`}
              </MemberTypography>

              {update?.sslLoyaltyDetails?.cardDesc && (
                <TierImageBox>
                  <img
                    src={tierData && userTierLogo}
                    onError={onTierImageError}
                    width={"20px"}
                    alt={update?.sslLoyaltyDetails?.cardDesc}
                  />
                </TierImageBox>
              )}
            </MemberTextBox>
            <Box>
              <TextTypography isMobile={isMobile}>
                Hi {update?.member_name},<br />
                {TEXT}
              </TextTypography>
            </Box>
          </Box>
          <Grid
            container
            columnSpacing={"40px"}
            mt={isMobile ? "16px" : "30px"}
          >
            <Grid item lg={4} md={5} sm={5} xs={12}>
              <Box sx={{ position: "relative" }}>
                {update?.sslLoyaltyDetails?.fccCardImage && (
                  <Box sx={{ maxWidth: isMobile ? "100%" : "350px" }}>
                    <img
                      style={{ width: "100%" }}
                      src={update?.sslLoyaltyDetails?.fccCardImage}
                      alt="image"
                    />
                  </Box>
                )}
                <CardDetailsGrid
                  container
                  px={2}
                  isMobile={isMobile}
                  sx={{ maxWidth: isMobile ? "100%" : "350px" }}
                >
                  <Grid item lg={8}>
                    <Typography sx={{ fontSize: "14px" }}>
                      {
                        update?.sslLoyaltyDetails
                          ?.original16DigitCardNumberFormatted
                      }
                    </Typography>
                  </Grid>
                  <Grid item lg={4} sx={{ textAlign: "right" }}>
                    <Typography sx={{ fontSize: "14px" }}>
                      {DATE_EXPIRE}
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      {update?.sslLoyaltyDetails?.cardValidDate}
                    </Typography>
                  </Grid>
                </CardDetailsGrid>
              </Box>
              <Box m={"2% 10%"} sx={{ textAlign: "center" }}>
                <img src={barcodeImage} alt="bar-code" />
              </Box>
            </Grid>
            <Grid item lg={7.5} md={7} sm={7} xs={12}>
              <PremiumBox isMobile={isMobile}>
                <DetailsTypography isMobile={isMobile}>
                  {FULLNAME_TEXT}
                </DetailsTypography>
                <PremiumTypography isMobile={isMobile}>
                  {update?.member_name}{" "}
                </PremiumTypography>
              </PremiumBox>
              <PremiumBox isMobile={isMobile}>
                <DetailsTypography isMobile={isMobile}>
                  {CARD_NUMBER_TEXT}
                </DetailsTypography>
                <PremiumTypography isMobile={isMobile}>
                  {
                    update?.sslLoyaltyDetails
                      ?.original16DigitCardNumberFormatted
                  }
                </PremiumTypography>
              </PremiumBox>
              <PremiumBox isMobile={isMobile}>
                <DetailsTypography isMobile={isMobile}>
                  {CARD_TYPE_TEXT}
                </DetailsTypography>
                <PremiumTypography isMobile={isMobile}>
                  {update?.sslLoyaltyDetails?.cardDesc}
                </PremiumTypography>
              </PremiumBox>
              <PremiumBox isMobile={isMobile}>
                <DetailsTypography isMobile={isMobile}>
                  {PRIMARY_POINTS_TEXT}
                </DetailsTypography>
                <PremiumTypography isMobile={isMobile}>
                  {primaryPoints}{" "}
                </PremiumTypography>
              </PremiumBox>
              <PremiumBox isMobile={isMobile}>
                <DetailsTypography isMobile={isMobile}>
                  {PROMOTIONS_POINTS_TEXT}
                </DetailsTypography>
                <PremiumTypography isMobile={isMobile}>
                  {promotionPoints && promotionPoints}
                </PremiumTypography>
              </PremiumBox>
            </Grid>
          </Grid>
          {benefits && (
            <Box>
              <BenefitsBox isMobile={isMobile}>
                <Box>
                  <Typography
                    sx={{ fontSize: isMobile ? "11px" : "14px" }}
                    dangerouslySetInnerHTML={{
                      __html: benefits,
                    }}
                  ></Typography>
                </Box>
                {!isMobile && (
                  <ButtonBox isMobile={isMobile}>
                    <ViewBenefitsButton
                      onClick={() =>
                        window.location.assign("/miscs/first-citizen")
                      }
                      isMobile={isMobile}
                    >
                      {VIEW_BENEFITS_TEXT}
                    </ViewBenefitsButton>
                  </ButtonBox>
                )}
              </BenefitsBox>
              {isMobile && (
                <ButtonBox isMobile={isMobile}>
                  <ViewBenefitsButton
                    onClick={() =>
                      window.location.assign("/miscs/first-citizen")
                    }
                    isMobile={isMobile}
                  >
                    {VIEW_BENEFITS_TEXT}
                  </ViewBenefitsButton>
                </ButtonBox>
              )}
            </Box>
          )}
          {promitionOffers?.slice(0, itemsShow)?.length > 0 && (
            <>
              <Title
                bgColor={"#fff"}
                bgPadding={"40px 0 0 0"}
                title={EXCLUSIVE_OFFERS}
                titleColor={"#1C191A"}
                strikeThrough={false}
              ></Title>
              <Box
                sx={{
                  marginTop: isMobile ? "10px" : "38px",
                  marginBottom: isMobile ? "10px" : "20px",
                }}
              >
                <ToolTipBox>
                  <Typography
                    sx={{
                      marginBottom: "15px",
                    }}
                  >
                    {OFFERS_TEXT}
                  </Typography>
                  {promitionOffers
                    ?.slice(0, itemsShow)
                    ?.map((list: any, index: number) => (
                      <ListTwo key={list}>{list}</ListTwo>
                    ))}
                  {itemsShow === 6 ? (
                    <ViewMoreTypography
                      sx={{ marginTop: "12px" }}
                      onClick={showMore}
                    >
                      {VIEW_MORE_TEXT}
                    </ViewMoreTypography>
                  ) : (
                    <ViewMoreTypography
                      sx={{ marginTop: "12px" }}
                      onClick={showLess}
                    >
                      {VIEW_LESS_TEXT}
                    </ViewMoreTypography>
                  )}
                </ToolTipBox>
              </Box>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default LoyalityData;
