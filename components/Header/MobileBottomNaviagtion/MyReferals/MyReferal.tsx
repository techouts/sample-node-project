import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MyReferalsMobileInterface } from "../../../../schemas/MyReferalsMobile";
import { useMobileCheck } from "../../../../utility/isMobile";
import {
  RewardsBox,
  StyledBox,
  TypographyStyled,
  TitleBox,
  MainBox,
} from "./MyReferalsStyled";

export const MyReferals = (referalData: MyReferalsMobileInterface) => {
  const isMobile = useMobileCheck();
  const total = referalData?.rewardsPoints?.reduce(
    (accumulator: any, value: { points: any }) => accumulator + value?.points,
    0
  );

  return (
    <MainBox>
      {isMobile && (
        <Box>
          <TitleBox>{referalData.MyReferrals}</TitleBox>
          <StyledBox>
            <Typography>{referalData.rewards}</Typography>
            <TypographyStyled>₹{total}</TypographyStyled>
          </StyledBox>
          <Box>
            {referalData?.rewardsPoints?.map((rewardDetails, index) => {
              return (
                <RewardsBox key={index}>
                  <Box>
                    <Typography>{rewardDetails.name}</Typography>
                    <Typography> {rewardDetails.date}</Typography>
                  </Box>
                  <Typography> ₹{rewardDetails.points}</Typography>
                </RewardsBox>
              );
            })}
          </Box>
        </Box>
      )}
    </MainBox>
  );
};
