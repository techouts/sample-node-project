import * as React from "react";
import CardInfoInterface from "../../schemas/CardInfoSchema";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  BigBox,
  BorderGrid,
  Typography1,
  BorderBox,
  TypographyText,
} from "./CardStyles";
import { useMobileCheck } from "../../utility/isMobile";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),

  color: theme.palette.text.secondary,
}));

function CardInfo({ items, bgColor, bgPadding }: CardInfoInterface) {
  const isMobile = useMobileCheck();

  const handleClick = (url: string | URL) => {
    isMobile ? window.location.assign(url) : window.open(url);
  };
  return (
    <BigBox bgcolor={bgColor} p={bgPadding}>
      <Grid container spacing={2} xs={12} sm={12} md={12} lg={12}>
        {items?.map((item, idx) => (
          <BorderGrid item key={idx} xs={12} sm={12} md={3} lg={3}>
            <BorderBox>
              <Typography1 pb={{ xs: 0, md: 1 }}>{item?.title}</Typography1>
              {item.subText && (
                <TypographyText onClick={() => handleClick(item?.imagePath)}>
                  {item.subText}
                </TypographyText>
              )}

              {item.imageUrl && (
                <img
                  onClick={() => handleClick(item?.imagePath)}
                  src={String(item.imageUrl)}
                  alt="card_images"
                  width="100%"
                />
              )}
            </BorderBox>
          </BorderGrid>
        ))}
      </Grid>
    </BigBox>
  );
}

export default CardInfo;
