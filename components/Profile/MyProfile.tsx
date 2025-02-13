import { useState, useEffect, useRef } from "react";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import ResetPassword from "./ChangePassword/ResetPassword";
import editData from "../Profile/ChangePassword/editData.json";
import Badge from "@mui/material/Badge";
import {
  ANNIVERSARY,
  EMAIL,
  GENDER,
  MOBILE,
  USER_TIER1_TEXT,
  USER_TIER2_TEXT,
  USER_TIER3_TEXT,
  USER_TIER4_TEXT,
  DOB,
  EDIT_PERSONAL_DETAILS,
  PRIMARY_POINTS_TEXT,
  PROMOTION_POINTS_TEXT,
} from "./constant";

import {
  TierTextTypography,
  UserName,
  TierLogoImage,
  ProfileBox,
  UserKeyTypography,
  UserDetailsBox,
  EditLogo,
  EditBox,
  EditTextTypography,
  MainGrid,
  UserValueTypography,
  ParentGrid,
  UserNameBox,
  VerifiactionBox,
  TierPointsTypography,
  AvatarView,
  ViewMoreTypography,
} from "./ProfileStyles";
import {
  GetFCCDetails,
  GetLoyaltyData,
} from "../../graphQLQueries/LoyalityData";
import AccountsProfile from "../Accounts/AccountsProfile";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { PROFILE_UPDATE } from "../Accounts/constants";
import Loader from "../../HOC/Loader/Loader";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
import { AppIcons } from "../../utility/AppIconsConstant";
import {
  Camera_ICON,
  EDIT_IMAGE_ICON,
  InfoCircle_Grey_ICON,
  Profile_Add_ICON,
  TIER0_ICON,
  TIER1_ICON,
  TIER2_ICON,
  TIER3_ICON,
  TIER4_ICON,
} from "../../utility/AppIcons";
import { upload_Customer_Profile_Pic } from "../../graphQLQueries/UpdateProfileQuery";
import client from "../../apollo-client";
import { convertBase64 } from "../../utility/ConvertBade64";
import { displayFormattedDate } from "../../utility/DateFormate";

const MyProfile = (props: any) => {
  const {
    myProfile,
    toggleUpdated,
    setDataProfile,
    setSnackMessage,
    setSnackBarOpen,
  } = props;
  const isMobile = useMobileCheck();
  const inputRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reset, setReset] = useState(false);
  const resetHandleOpen = () => setReset(true);
  const resetHandleClose = () => setReset(false);
  const [primaryPoints, setPrimaryPoints] = useState<any>(null);
  const [promotionPoints, setPromotionPoints] = useState<any>(undefined);
  const [tierData, setTierData] = useState<any>(undefined);
  const [promitionOffers, setPromotionOffers] = useState<any>([]);
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const [displayLoader, setLoader] = useState(
    userDataItems?.tier && userDataItems?.tier === "na" ? false : true
  );
  const [networkError, setNetworkError] = useState(false);
  const [networkErrorMessage, setNetworkErrorMessage] =
    useState("Network Error");
  const [userTierLogo, setUserTierLogo] = useState<any>("");
  const [userTierName, setUserTierName] = useState<any>();
  const updateError = (message: any) => {
    setNetworkErrorMessage(message);
    setNetworkError(true);
  };
  useEffect(() => {
    (async () => {
      const response = await GetFCCDetails();
      if (response?.data?.getFirstCitizenClubPoints) {
        setPrimaryPoints(
          response?.data?.getFirstCitizenClubPoints?.totalBalance
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [itemsToShow, setItemsToShow] = useState(2);
  const showmore = () => {
    setItemsToShow(promitionOffers.length);
  };
  const showless = () => {
    setItemsToShow(2);
  };
  const EDIT_IMAGE = AppIcons(EDIT_IMAGE_ICON);
  const Camera_icon = AppIcons(Camera_ICON);
  const InfoCircle_Grey = AppIcons(InfoCircle_Grey_ICON);
  const Profile_Add = AppIcons(Profile_Add_ICON);
  const TIER0_LOGO = AppIcons(TIER0_ICON);
  const TIER1_LOGO = AppIcons(TIER1_ICON);
  const TIER2_LOGO = AppIcons(TIER2_ICON);
  const TIER3_LOGO = AppIcons(TIER3_ICON);
  const TIER4_LOGO = AppIcons(TIER4_ICON);

  const handleCamera = () => {
    inputRef.current.click();
  };
  const fileUploadManager = (event: any) => {
    setLoader(true);
    const oFile = event.target.files[0];
    if (oFile?.size > 5242880) {
      setSnackBarOpen(true);
      setSnackMessage("file size is greater than 5 MB");
    } else {
      if (
        oFile.type == "image/png" ||
        oFile.type == "image/jpg" ||
        oFile.type == "image/jpeg"
      ) {
        convertBase64(event.target.files[0])
          .then((result) => {
            setLoader(true);
            event.target.files[0]["base64"] = result;
            if (result) {
              client
                .mutate({
                  mutation: upload_Customer_Profile_Pic,
                  variables: {
                    base64: result,
                    name: myProfile?.firstname,
                  },
                })
                .then((res: any) => {
                  if (res?.data) {
                    toggleUpdated();
                    setUserDataItems({
                      ...userDataItems,
                      profileImage: res?.data?.uploadCustomerProfilePic?.image,
                    });
                    setDataProfile({
                      ...myProfile,
                      customer_image:
                        res?.data?.uploadCustomerProfilePic?.image,
                    });
                  }
                  setSnackBarOpen(true);
                  setSnackMessage(PROFILE_UPDATE);
                })
                .catch((err: any) => {
                  const errMessage = JSON.parse(JSON.stringify(err));
                  updateError(errMessage?.message);
                })
                .finally(() => setLoader(false));
            }
          })
          .catch((err) => {
            console.log(err);
            updateError(
              "Couldn't able to upload the image, Please try to upload different image"
            );
          })
          .finally(() => {
            setLoader(false);
          });
      } else {
        console.log("Not Accepted");
        updateError("File is not supported");
      }
    }
    setLoader(false);
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
    switch (tierData) {
      case "Tier0":
        setUserTierName("");
        break;
      case "Tier1":
        setUserTierName(USER_TIER1_TEXT);
        break;
      case "Tier2":
        setUserTierName(USER_TIER2_TEXT);
        break;
      case "Tier3":
        setUserTierName(USER_TIER3_TEXT);
        break;
      case "Tier4":
        setUserTierName(USER_TIER4_TEXT);
        break;
      default:
        setUserTierName("");
    }
  }, [tierData, userTierLogo, userTierName]);
  const genderName = () => {
    if (myProfile?.gender === 1) {
      return "Male";
    } else if (myProfile?.gender === 2) {
      return "Female";
    } else {
      return "Other";
    }
  };

  const dob = myProfile?.dob ? displayFormattedDate(myProfile?.dob) : "";

  const anniversary = !myProfile?.anniversary?.includes(null, "null", "")
    ? displayFormattedDate(myProfile?.anniversary)
    : "";

  return (
    <>
      {<Loader isOpen={displayLoader} />}

      <>
        <Box
          sx={{
            margin: isMobile ? "16px" : "0",
            border: "1px solid rgba(155, 155, 155, 0.3)",
          }}
        >
          {networkError && (
            <Alert
              style={{ position: "fixed", top: "10px" }}
              severity="error"
              onClose={() => setNetworkError(false)}
            >
              {networkErrorMessage}
            </Alert>
          )}
          <ParentGrid container spacing={1} xs={12} isMobile={isMobile}>
            <MainGrid
              item
              xs={12}
              sm={12}
              md={2.5}
              lg={2.5}
              alignItems="center"
            >
              <input
                type="file"
                id="upload"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  fileUploadManager(e);
                }}
              />
              <Badge
                sx={{ paddingTop: isMobile ? "27.5px" : "" }}
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Avatar
                    src={`${ReplaceImage(Camera_icon?.url)}`}
                    onClick={handleCamera}
                    alt="camera_icon"
                    sx={{
                      width: "42px",
                      height: "42px",
                      cursor: "pointer",
                    }}
                  />
                }
              >
                <AvatarView
                  customerImage={myProfile?.customer_image}
                  src={
                    myProfile?.customer_image ||
                    `${ReplaceImage(Profile_Add?.url)}`
                  }
                  alt="cam"
                />
              </Badge>
              {isMobile && (
                <UserNameBox>
                  <UserName>
                    {myProfile?.firstname} {myProfile?.lastname}
                  </UserName>
                  {tierData && (
                    <TierLogoImage>
                      <img
                        src={userTierLogo}
                        alt="profilename_logo"
                        height={isMobile ? "19px" : "29px"}
                        width={isMobile ? "19px" : "28px"}
                      />
                    </TierLogoImage>
                  )}
                </UserNameBox>
              )}
              <TierTextTypography>
                {tierData && userTierName}
              </TierTextTypography>
            </MainGrid>

            <Grid item xs={12} sm={12} md={9.5} lg={9.5} pr={4}>
              <Grid container alignItems={"center"} pb={4}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  sx={{
                    "@media(max-width:1200px)": {
                      display: "flex",
                      justifyContent: "center",
                    },
                  }}
                >
                  {!isMobile && (
                    <UserNameBox>
                      <UserName>
                        {myProfile?.firstname} {myProfile?.lastname}
                      </UserName>
                      {tierData && (
                        <TierLogoImage>
                          <img
                            src={userTierLogo}
                            onError={onTierImageError}
                            alt="profilename_logo"
                            height={isMobile ? "19px" : "29px"}
                            width={isMobile ? "19px" : "28px"}
                          />
                        </TierLogoImage>
                      )}
                    </UserNameBox>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  justifyContent={"flex-end"}
                >
                  <EditBox onClick={handleOpen}>
                    <EditLogo>
                      <img
                        src={
                          myProfile?.edit_logo ||
                          `${ReplaceImage(EDIT_IMAGE?.url)}`
                        }
                        alt="edit_logo"
                        width={"20px"}
                      />
                    </EditLogo>
                    <EditTextTypography>
                      {myProfile?.editText || EDIT_PERSONAL_DETAILS}
                    </EditTextTypography>
                  </EditBox>
                </Grid>
              </Grid>

              <Grid container alignItems={"flex-start"}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  sx={{
                    "@media(max-width:1200px)": {
                      paddingLeft: isMobile ? "" : "20px",
                    },
                  }}
                >
                  <ProfileBox>
                    <UserDetailsBox>
                      <UserKeyTypography>{GENDER}</UserKeyTypography>
                      <UserValueTypography
                        sx={{ marginLeft: isMobile ? "25px" : "17.5px" }}>
                        {myProfile?.gender && genderName()}
                      </UserValueTypography>
                    </UserDetailsBox>
                    <UserDetailsBox>
                      <VerifiactionBox>
                        <UserKeyTypography>{EMAIL}</UserKeyTypography>
                        <UserValueTypography
                          sx={{ marginLeft: isMobile ? "10px" : "0px" }}>
                          {myProfile?.email}
                        </UserValueTypography>
                      </VerifiactionBox>
                    </UserDetailsBox>
                    <UserDetailsBox>
                      <UserKeyTypography>{MOBILE}</UserKeyTypography>
                      <UserValueTypography
                        sx={{
                          marginLeft: isMobile ? "28px" : "1.2rem",
                        }}>
                        {myProfile?.customer_mobile_number}
                      </UserValueTypography>
                    </UserDetailsBox>
                  </ProfileBox>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <Box
                    sx={{
                      "@media(max-width:1200px)": {
                        paddingLeft: isMobile ? "" : "20px",
                      },
                    }}>
                    {!!dob && (
                      <UserDetailsBox>
                        <UserKeyTypography>{DOB}</UserKeyTypography>
                        <UserValueTypography
                          sx={{
                            marginLeft: isMobile ? "38px" : "2.1rem",
                          }}>
                          {dob}
                        </UserValueTypography>
                      </UserDetailsBox>
                    )}
                    {!!anniversary && (
                      <UserDetailsBox>
                        <UserKeyTypography>{ANNIVERSARY}</UserKeyTypography>
                        <UserValueTypography
                          sx={{
                            marginLeft: isMobile ? "4px" : "8px",
                          }}>
                          {anniversary}
                        </UserValueTypography>
                      </UserDetailsBox>
                    )}
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {primaryPoints !== null &&
                    primaryPoints !== undefined &&
                    primaryPoints >= 0 && (
                      <UserDetailsBox>
                        <TierPointsTypography isFlag={false}>
                          {PRIMARY_POINTS_TEXT}
                        </TierPointsTypography>
                        <TierPointsTypography isFlag={true}>
                          {primaryPoints}
                        </TierPointsTypography>
                      </UserDetailsBox>
                    )}

                  {promotionPoints && (
                    <UserDetailsBox>
                      <TierPointsTypography isFlag={false}>
                        {PROMOTION_POINTS_TEXT}
                      </TierPointsTypography>
                      <TierPointsTypography isFlag={false}>
                        {promotionPoints}
                      </TierPointsTypography>
                    </UserDetailsBox>
                  )}
                </Grid>
              </Grid>
              <BasicModal
                open={reset}
                width={{
                  xs: "100%",
                  sm: "60%",
                  md: "78%",
                  lg: "65%",
                  xl: "50%",
                }}
                height={{ xs: "100%", md: "auto" }}
                maxHeight={isMobile ? "100%" : "90%"}
                handleOpen={resetHandleOpen}
                handleClose={resetHandleClose}
                top={"50%"}
                left={"50%"}
                Component={<ResetPassword {...editData} />}></BasicModal>
            </Grid>
          </ParentGrid>
        </Box>
      </>
      <BasicModal
        open={open}
        width={isMobile ? "100%" : "60%"}
        height={isMobile ? "100%" : "auto"}
        maxHeight={isMobile ? "100%" : "90%"}
        handleOpen={handleOpen}
        handleClose={handleClose}
        top={"50%"}
        left={"50%"}
        overflowData="scroll"
        Component={
          <AccountsProfile
            data={myProfile}
            setSnackBarOpen={setSnackBarOpen}
            setSnackMessage={setSnackMessage}
            handleClose={handleClose}
            toggleUpdated={toggleUpdated}
            setDataProfile={setDataProfile}
            setLoader={setLoader}
            tierData={tierData}
            userTierName={userTierName}
            updateError={updateError}
            genderName={genderName()}
          />
        }></BasicModal>
    </>
  );
};
export default MyProfile;
