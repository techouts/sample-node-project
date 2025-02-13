import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { BorderBox, PaddingBox } from "./CartLayoutStyles";
import { useMobileCheck } from "../../utility/isMobile";
import EditIcon from '@mui/icons-material/Edit';

export function CCModeBillingAddress({ address,handleAddressChange }: any) {
  const isMobile = useMobileCheck();
  return (
    <>
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{ backgroundColor: "#F7F6F9" }}
      >
        <BorderBox>
          <PaddingBox sx={{ padding: "20px",display:'flex',justifyContent:"space-between" }}>
          <Grid>
          <Typography
              sx={{
                fontSize: isMobile ? "12px" : "16px",
                color: "#231F20",
                fontWeight: "500",
                lineHeight: isMobile ? "18px" : "24px",
              }}
            >
              Billing Address:
            </Typography>
            <Typography
              sx={{
                fontSize: isMobile ? "12px" : "16px",
                color: "#231F20",
                fontWeight: "500",
                lineHeight: isMobile ? "18px" : "24px",
              }}
            >
              {address?.street[0] +
                " " +
                address?.postcode +
                "," +
                " " +
                address?.city}
            </Typography>
          </Grid>
          <Grid>
          <Typography
              sx={{
                fontSize: isMobile ? "12px" : "14px",
                cursor: "pointer",
                textDecoration: "underline",
                color: "#AD184C",
              }}
              onClick={handleAddressChange}
            >
              <EditIcon/>
            </Typography>
          </Grid>     
          </PaddingBox>
          
        </BorderBox>
      </Stack>
    </>
  );
}
