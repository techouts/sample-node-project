import Box from "@mui/material/Box";
import {
  TypographyBlock,
  Boxbutton,
  ButtonMain,
} from "../SelectLocation/SelectLocationStyles";

const BlockLocation = ({ selectdata, BlockhandleClose }: any) => {
  return (
    <>
      <Box p={selectdata?.bgPadding}>
        <TypographyBlock>{selectdata?.data?.message}</TypographyBlock>
        <TypographyBlock>{selectdata?.data?.instructions}</TypographyBlock>
        <Boxbutton>
          <ButtonMain onClick={BlockhandleClose}>
            {selectdata?.data?.ok}
          </ButtonMain>
        </Boxbutton>
      </Box>
    </>
  );
};

export default BlockLocation;
