import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import data from "./GiftCardConfirmation.json";
import {
  ButtonGift,
  OrderDetails,
  SubmitBox,
  SubmitButton,
  TextFieldsGift,
  TitleTextGift,
} from "./giftCardConfirmationStyles";
function GiftCardConfirmation() {
  return (
    <Grid>
      <TitleTextGift>
        {data?.title}
        <img
          src={data?.logo}
          alt="Gify confirmation logo"
          width={"20"}
          height={"20"}
        />
      </TitleTextGift>
      <Stack sx={{ margin: "12px 0px 42px 0px" }}>
        <Typography>{data?.giftText}</Typography>
        <Typography>{data?.OrderText}</Typography>
      </Stack>
      <Stack>
        <OrderDetails>Order Details</OrderDetails>
        <Stack sx={{ padding: "30px 0px 13px 0px" }}>
          <Typography sx={{ color: "#7B7979" }}>Order ID #</Typography>
          <Typography>{data?.OrderId}</Typography>
        </Stack>
        <Stack>
          <Typography sx={{ color: "#7B7979" }}>Order Placed: </Typography>
          <Typography>{data?.OrderPlaced}</Typography>
        </Stack>
        <Stack sx={{ padding: "8px 0px 30px 0px" }}>
          <Typography sx={{ color: "#7B7979" }}>
            Order Status: <b style={{ color: "black" }}>Shipped</b>
            <Typography>{data?.devileryDate}</Typography>
          </Typography>
        </Stack>
      </Stack>
      <img
        src={data?.giftImage}
        alt="GiftImage"
        style={{ padding: "32px 0px 17px 0px" }}
      ></img>
      <Typography>{data.experienceTitle}</Typography>
      <Rating
        name="half-rating"
        defaultValue={0}
        precision={0.5}
        style={{
          color: "#AD184C",
          fontSize: "35px",
          padding: "17px 0px 31px 0px",
        }}
      />
      <Typography>What Went Wrong?</Typography>
      <Stack
        direction={"row"}
        gap={"16px"}
        sx={{ padding: "12px 0px 20px 0px" }}
      >
        {data?.wentWrong?.map((item, index) => (
          <>
            <Box key={index} sx={{ whiteSpace: "nowrap" }}>
              <ButtonGift>{item?.buttonText}</ButtonGift>
            </Box>
          </>
        ))}
      </Stack>
      <Typography sx={{ fontWeight: "600" }}>
        {data?.ExperienceHeading}
      </Typography>
      <Box sx={{ padding: "10px 0px" }}>
        <TextFieldsGift
          id="outlined-basic"
          label={data?.WriteAbout}
          variant="outlined"
          sx={{}}
          fullWidth
        />
      </Box>
      <SubmitBox>
        <SubmitButton>SUBMIT</SubmitButton>
      </SubmitBox>
    </Grid>
  );
}

export default GiftCardConfirmation;
