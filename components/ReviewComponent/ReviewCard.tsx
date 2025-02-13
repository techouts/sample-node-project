import React from "react";
import { Grid } from "@mui/material";
import { GDCardOne, GDCardTwo } from "./ReviewCardStyle";
const ReviewCard = (props: any) => {

  return (
    <>
      <GDCardOne>
        <GDCardTwo>
          <Grid>{props.content}</Grid>
        </GDCardTwo>
      </GDCardOne>
    </>
  );
};

export default ReviewCard;
