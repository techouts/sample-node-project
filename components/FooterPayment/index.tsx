import FooterPaymentInterface from "../../schemas/FooterPaymentSchema";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  BorderGrid,
  Typography1,
  BorderBox,
  BoxText,
  ImgBox,
} from "./FootePaymentStyles";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import triggerGAEvent from "../../utility/GaEvents";

function FooterPayment({ items, bgColor, bgPadding }: FooterPaymentInterface) {
  function footerPayAnalytics(title: any, URL: any, outbound?: any) {
    triggerGAEvent(
      {
        widget_description: "na",
        link_text: title,
        link_url: URL || "na",
        outbound: outbound,
      },
      "hyperlink"
    );
  }
  const isMobile = useMobileCheck();

  const handleClick = (url: string | URL) => {
    isMobile ? window.location.assign(url) : window.open(url);
  };
  return (
    <Box bgcolor={bgColor} p={isMobile ? "0px" : bgPadding} width={"100%"}>
      <Grid container justifyContent={{ sm: "center", md: "" }}>
        {items?.map((item, idx) => (
          <BorderGrid item key={idx} xs={12} sm={5} md={3} lg={3}>
            <BorderBox $isText={item?.subTextMobile ? true : false}>
              <Typography1 pb={{ xs: 0, sm: 1.5, md: 2 }}>
                {item?.title}
              </Typography1>
              {item.subText && (
                <>
                  <BoxText
                    sx={{
                      "& > span": {
                        paddingleft: "20px",
                      },
                    }}
                    onClick={() =>
                      footerPayAnalytics(item?.title, item?.imagePath, false)
                    }
                    dangerouslySetInnerHTML={{
                      __html: isMobile ? item.subTextMobile : item.subText,
                    }}
                  ></BoxText>
                </>
              )}
              <ImgBox>
                {item?.imageUrl && (
                  <img
                    onClick={() => {
                      footerPayAnalytics(item?.title, item?.imagePath, true);
                      idx == 0 || idx == 3 ? "" : handleClick(item?.imagePath);
                    }}
                    src={`${ReplaceImage(item.imageUrl)}`}
                    alt={`${item.id}card_images`}
                    width={item?.secondImageUrl !== null ? "47%" : "100%"}
                    style={{
                      cursor:
                        item.id == 2 || item.id == 3 ? "pointer" : "default",
                    }}
                  />
                )}
                {item?.secondImageUrl && (
                  <img
                    onClick={() => {
                      footerPayAnalytics(
                        item?.title,
                        item?.secondImageUrlPath,
                        true
                      );
                      handleClick(item?.secondImageUrlPath);
                    }}
                    src={`${ReplaceImage(item?.secondImageUrl)}`}
                    alt="card_images"
                    width={item?.secondImageUrl !== null ? "47%" : "100%"}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                  />
                )}
              </ImgBox>
            </BorderBox>
          </BorderGrid>
        ))}
      </Grid>
    </Box>
  );
}
export default FooterPayment;
