import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useMobileCheck } from "../../utility/isMobile";
import {
  EnrollButton,
  Quotes,
  RichText,
  TierHeader,
  SubTitle,
  Title,
  TabBox,
  StartedText,
  CheckOutText,
  TierDetailsGrid,
  CheckOutMobileText,
  ButtonBox,
} from "./CardTierStyle";
import { Cookies } from "react-cookie";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoilstore";
import { widget_type, event_type } from "../../utility/GAConstants";
import { callEventFirstCitizen } from "./FirstCitizenAnalytics";
import {
  CHECK_OUT_ALL_TIERS,
  CHECK_OUT_ALL_TIERS_MOBILE,
  CHECK_OUT_TYPES,
  LETS_STARTED,
} from "../FirstCitizenSignUp/constant";
import { useRouter } from "next/router";

const CardTierData = ({ item }: any) => {
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");
  const userDataItems = useRecoilValue(userState);
  const isMobile = useMobileCheck();
  const router = useRouter();
  let refsArray: any = [];
  return (
    <>
        <Box
          sx={{
            marginTop: isMobile ? "25px" : "40px",
          }}
        >
          <Box
            sx={{
              marginLeft: isMobile ? "16px" : "",
            }}
          >
            {accessToken && userDataItems?.tier === "na" && (
              <>
                <Box
                  sx={{
                    paddingLeft: isMobile ? "" : "31px",
                  }}
                >
                  <StartedText isMobile={isMobile}>{LETS_STARTED}</StartedText>
                  <CheckOutText isMobile={isMobile}>
                    {isMobile ? CHECK_OUT_ALL_TIERS : CHECK_OUT_TYPES}
                  </CheckOutText>
                </Box>
              </>
            )}
            {!accessToken && (
              <Box
                sx={{
                  padding: isMobile ? "" : "0px 0px 0px 32px",
                }}
              >
                <StartedText isMobile={isMobile}>
                  {isMobile ? "" : LETS_STARTED}
                </StartedText>
                <CheckOutText isMobile={isMobile}>
                  {isMobile ? "" : CHECK_OUT_TYPES}
                </CheckOutText>
                <CheckOutMobileText isMobile={isMobile}>
                  {isMobile ? CHECK_OUT_ALL_TIERS_MOBILE : ""}
                </CheckOutMobileText>
              </Box>
            )}
          </Box>
          {item?.map((data: any, index: number) => {
            return (
              <>
                <TierDetailsGrid
                  alignment={data?.alignment}
                  isMobile={isMobile}
                  container
                  id={data?.tier}
                  key={data?.title}
                  sx={{
                    background: `url(${
                      data?.alignment ? null : data?.bgImageUrl
                    })`,
                    backgroundColor: data?.alignment ? null : data?.bgColor,
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    lg={data?.alignment ? 4 : 5}
                    sm={4}
                    md={4}
                    sx={{ padding: isMobile ? "16px" : "" }}
                  >
                    <Box sx={{ maxWidth: "305px" }}>
                      <img
                        src={data?.imageUrl}
                        alt="silver edge"
                        width="100%"
                      />
                    </Box>
                  </Grid>
                  <Grid
                    xs={12}
                    lg={data?.alignment ? 7.5 : 7}
                    sm={7}
                    md={7}
                    sx={{}}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "6px",
                      }}
                    >
                      <TierHeader
                        isMobile={isMobile}
                        ref={(ref: any) => (refsArray[index] = ref)}
                      >
                        {data?.title}
                      </TierHeader>
                      <img
                        src={data?.crownLogo}
                        alt="crownlogo"
                        width={"19px"}
                      />
                    </Box>
                    <Box>
                      <RichText
                        dangerouslySetInnerHTML={{
                          __html: data?.tierDescription,
                        }}
                      />
                    </Box>
                    {data?.enrollButtonText && (
                      <ButtonBox>
                        <EnrollButton
                          onClick={() =>
                            callEventFirstCitizen(
                              event_type,
                              widget_type,
                              data?.title,
                              data?.enrollButtonText,
                              item?.length,
                              data?.enrollButtonPath,
                              data?.tierDescription
                            )
                          }
                        >
                          {data?.enrollButtonText}
                        </EnrollButton>
                      </ButtonBox>
                    )}
                    <Box sx={{ maxWidth: data?.alignment ? "409px" : "475px" }}>
                      <Quotes>{data?.quote}</Quotes>
                    </Box>
                  </Grid>
                </TierDetailsGrid>
              </>
            );
          })}
        </Box>
    </>
  );
};
export default CardTierData;
