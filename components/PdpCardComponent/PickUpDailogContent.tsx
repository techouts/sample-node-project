import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import React from "react";

const PickUpDailogContent = (props: any) => {
  const { data, pickpointHandler } = props;
  
  return (
    <div>
      <DialogTitle id="customized-dialog-title">
        <Typography
          style={{
            fontSize: "16px",
            fontWeight: "400",
          }}
        >
          {data?.deliveryTypes && data?.deliveryTypes[2]?.type}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {data?.deliveryTypes &&
          data?.deliveryTypes[2]?.metaData?.map(
            (pickup: any, index: number) => {
              const indexValue = index;
              return (
                <Typography
                  key={indexValue}
                  pb={1}
                  sx={{ color: "#656263", cursor: "pointer" }}
                  onClick={() => pickpointHandler(pickup?.id)}
                >
                  {pickup.text}
                </Typography>
              );
            }
          )}
      </DialogContent>
    </div>
  );
};

export default PickUpDailogContent;
