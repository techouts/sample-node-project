import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { square_tick } from "../../../components/CartLayout/CartConstants";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { BorderBox, TitleText, DescText } from "./CheckListStyles";

export const CheckList = ({ items }: any) => {
  const CheckedIcon = () => {
    return (
      <img
        src={`${ReplaceImage(square_tick)}`}
        alt="checked icon"
        width={"18px"}
      ></img>
    );
  };

  return (
    <div>
      {items?.map((item: any, index: any) => (
        <BorderBox key={index}>
          <Grid container>
            <Grid item xs={10}>
              <TitleText>{item?.title}</TitleText>
              <DescText>{item?.desc}</DescText>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Checkbox
                sx={{ alignItems: "flex-start", padding: "0px" }}
                checkedIcon={<CheckedIcon />}
              ></Checkbox>
            </Grid>
          </Grid>
        </BorderBox>
      ))}
    </div>
  );
};
