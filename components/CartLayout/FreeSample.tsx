import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { useMobileCheck } from "../../utility/isMobile";
import data from "./FreeSampleModal/FreeSampleModal.json";
import { BoxStyled, ButtonStyled, StyledBox } from "./CartLayoutStyles";
import { FreeSampleModalpopUp } from "./FreeSampleModal/FreeSampleModalpopUp";
import { useRecoilState } from "recoil";
import { cartState } from "../../recoilstore";

function FreeSample({ freeSample, addingFreeSample, removeFreeSample }: any) {
  const isMobile = useMobileCheck();
  const [cartStore, setCartStore] = useRecoilState(cartState);
  const [freeSampleModalOPen, setFreeSampleModalOPen] = useState(false);
  const handleClose = () => {
    setFreeSampleModalOPen(false);
  };

  const getMaxGiftCount = () => {
    let count = 0;
    freeSample.map((rules: any) => {
      count = rules?.max_gift + count;
    });
    return count;
  };

  const getSelectedCount = () => {
    let count = 0;
    cartStore?.cartItems?.cart?.items?.map((item: any) => {
      if (item?.mp_free_gifts?.is_free_gift) {
        count = 1 + count;
      }
    });
    return count;
  };

  const TextFieldComponent = () => {
    return (
      <>
        <Typography
          sx={{
            width: "100%",
            margin: "auto",
            paddingLeft: "20px",
            fontSize: isMobile ? "11px" : "14px",
          }}>
          Choose free samples of your choice ({getSelectedCount()}/
          {getMaxGiftCount()})
        </Typography>
      </>
    );
  };
  return (
    <>
      <BoxStyled>
        <StyledBox>Free Sample</StyledBox>
        <Box
          sx={{
            display: "flex",
            border: "2px solid lightgray",
            width: "100%",
          }}>
          {TextFieldComponent()}
          {data?.data?.length != 1 && (
            <ButtonStyled
              onClick={() => setFreeSampleModalOPen(true)}
              $isMobile={isMobile}>
              SELECT
            </ButtonStyled>
          )}
        </Box>
        <BasicModal
          top={"50%"}
          width={isMobile ? "92%" : "50%"}
          overflowData={"scroll"}
          left={"50%"}
          height={"440px"}
          open={freeSampleModalOPen}
          handleClose={handleClose}
          Component={
            <FreeSampleModalpopUp
              data={data}
              addingFreeSample={addingFreeSample}
              freeSampleData={freeSample}
              removeFreeSample={removeFreeSample}
            />
          }></BasicModal>
      </BoxStyled>
    </>
  );
}

export default FreeSample;
