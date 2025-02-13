import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import React, { useState} from "react";
import AppBlogInterface from "../../schemas/AppBlogSchema";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import {
  ButtonGrid,
  Listofview,
  QuickTyography,
} from "../BlogDetail/BlogDetailStyles";
import {
  MainBox,
  TitleText,
  SubTitleText,
  DescriptionText,
  ContentGrid,
  TextGrid,
  TopBox,
  TitleTypography,
} from "./styles";
const FaceCleansing = ({ quickView, Info }: AppBlogInterface) => {
  const isMobile = useMobileCheck();
  const [show, setShow] = useState(false);
  const loadMore = () => {
    setShow(!show);
  };
  let refsArray: any = [];
  return (
    <Box>
      <Box sx={{ bgcolor: " #F0F0F4", padding: "15px" }}>
        <TopBox>
          <QuickTyography> {quickView}</QuickTyography>
          <Button>
            <ButtonGrid onClick={() => setShow(!show)}>
              {show ? "[Hide]" : "[Show]"}
            </ButtonGrid>
          </Button>
        </TopBox>
        {show ? (
          <Box>
            {Info?.Information?.map((InfoData, indexValue) => (
              <Box key={indexValue}>
                <TitleTypography>{InfoData?.headLine}</TitleTypography>
                {InfoData?.items?.map((Title, index) => (
                  <Box key={index}>
                    <Listofview
                      onClick={() =>
                        refsArray["" + indexValue + index].scrollIntoView()
                      }
                    >
                      {Title?.title}
                    </Listofview>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        ) : (
          ""
        )}
      </Box>
      <MainBox>
        <Stack direction="column">
          {Info?.Information.map((InfoData, indexValue) => (
            <Box key={indexValue}>
              <TitleTypography>{InfoData?.headLine}</TitleTypography>

              {InfoData?.items?.map((itemData, index) => (
                <Box
                  pb={4}
                  key={index}
                  ref={(ref) => (refsArray["" + indexValue + index] = ref)}
                >
                  <Box sx={{ marginBottom: "18px" }}>
                    <TitleText>{itemData?.title}</TitleText>
                  </Box>
                  {itemData?.data?.map((item, index) => (
                    <ContentGrid
                      direction={index % 2 === 0 ? "row-reverse" : "row"}
                      container
                      key={index}
                      sx={{ margin: "0px 0px 40px 0px" }}
                    >
                      <Grid item sm={6}>
                        <Box
                          sx={{
                            display: "flex",
                            width: isMobile ? "100%" : "97%",
                            height: isMobile ? "95%" : "100%",
                            alignSelf: "center",
                            boxShadow: "-15px 15px #F7F6F9",
                          }}
                        >
                          <img
                            src={`${ReplaceImage(item?.imageUrl)}`}
                            alt="img"
                            height="100%"
                            width="100% "
                          />
                        </Box>
                      </Grid>
                      <TextGrid
                        item
                        xs={12}
                        sm={6}
                        lg={6}
                        pr={isMobile ? 0 : 4}
                        sx={{ textAlign: "left" }}
                      >
                        <Box sx={{ marginBottom: "10px" }}>
                          <SubTitleText>{item?.subTitle}</SubTitleText>
                        </Box>
                        <Box>
                          <DescriptionText>{item?.description}</DescriptionText>
                        </Box>
                      </TextGrid>
                    </ContentGrid>
                  ))}
                </Box>
              ))}
            </Box>
          ))}
        </Stack>
      </MainBox>
    </Box>
  );
};
export default FaceCleansing;
