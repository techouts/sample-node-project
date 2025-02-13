import React from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FilteredStores from "./FilteredStores";
import { useMobileCheck } from "../../utility/isMobile";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import {
  NavigateIconAndText,
  NavigateIconText,
  ConsultationButton,
} from "./FindStoresStyle";
import {
  navigateStoreText,
  consultationText,
  eachStoreImage,
} from "./Constants";

const ParticularStore = ({
  consultationButtonPath,
  selectedStore,
  setSelectedStore,
  bgColor,
  bgPadding,
}: any) => {
  const router = useRouter();
  const isMobile = useMobileCheck();
  const comeBackHandler = () => {
    setSelectedStore(null); 
  };
  function paddingFunc() {
    if (isMobile) {
      if (bgPadding === null || bgPadding === "0") {
        return "0px";
      } else {
        return "0px 16px";
      }
    } else {
      return bgPadding;
    }
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: bgColor,
          p: paddingFunc(),
        }}
      >
        <NavigateIconAndText>
          <IconButton>
            <NavigateBeforeIcon onClick={comeBackHandler} />
          </IconButton>
          <NavigateIconText>{navigateStoreText}</NavigateIconText>
        </NavigateIconAndText>
        <Grid
          container
          columnSpacing={isMobile ? 0 : 2}
          sx={{
            flexDirection: isMobile ? "column-reverse" : "row",
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            xl={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: isMobile ? "25px 0px" : "0px",
            }}
          >
            <FilteredStores cities={selectedStore} />
            <ConsultationButton
              onClick={() => router.push(consultationButtonPath)}
            >
              {consultationText}
            </ConsultationButton>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={7}
            lg={7}
            xl={7}
            sx={{ width: "100%" }}
          >
            <img
              src={eachStoreImage}
              alt="Particular Store Image"
              width="100%"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ParticularStore;
