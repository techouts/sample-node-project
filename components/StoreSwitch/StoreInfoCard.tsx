import { Grid, Stack, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import StarIcon from "@mui/icons-material/Star";
import { useMobileCheck } from "../../utility/isMobile";
const StoreInfoCard = (props: any) => {
  const isMobile = useMobileCheck();

  let data = props;
  function linkClickHandler(url: string, target?: string) {
    if (target === "sameTab") {
      window.location.href = url;
    } else {
      window.open(url, "_blank");
    }
  }

  return (
    <Grid
      sx={{
        borderRadius: "6px",
        background: "#F6F6F6",
        boxShadow: "0px 5.12px 5.12px 0px rgba(175, 175, 175, 0.5)",
        margin: "0 auto",
        marginBottom: "10px",
        width: "90%",
      }}
      container
    >
      <Grid item md={8} lg={8} p={2}>
        <Typography sx={{ fontWeight: "bold", fontSize: "19.2px" }}>
          {data?.storeTitle}
        </Typography>
        <Typography sx={{ fontSize: "14.4px", marginTop: "8px  " }}>
          {data?.storeDescription}
        </Typography>

        <Stack>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "16.2px",
              padding: "10px 0px",
            }}
          >
            Ratings ({data?.storeReviews?.storeRating}){" "}
            <StarIcon sx={{ marginRight: "4px", fontSize: "16px" }} />
            <StarIcon sx={{ marginRight: "4px", fontSize: "16px" }} />
            <StarIcon sx={{ marginRight: "4px", fontSize: "16px" }} />
          </Typography>
        </Stack>
        <Typography
          sx={{ color: "#BD446E", fontWeight: "bold", cursor: "pointer" }}
          variant={"button"}
          onClick={() => linkClickHandler(data?.storeReviews?.writeReviewCta)}
        >
          {data?.storeReviews?.writeReviewText}
        </Typography>
      </Grid>
      <Grid
        item
        md={4}
        lg={4}
        p={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile ? "start" : "end",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0px 0px 10px 0px",
            cursor: "pointer",
          }}
          onClick={() => window.open(`tel:${data?.storeContact?.phoneNumber}`)}
        >
          <CallIcon sx={{ marginRight: "4px" }} />
          {data?.storeContact?.phoneNumber}
        </Typography>
        <Stack flexDirection={"row"}>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#86985B",
              marginRight: "5px",
            }}
          >
            <QueryBuilderIcon sx={{ marginRight: "4px" }} />
            {data?.storeDetails?.storeStatus}
          </Typography>
          <Typography> {data?.storeDetails?.storeClosing}</Typography>
        </Stack>

        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#F28873",
            padding: "10px 0px",
            cursor: "pointer",
            fontWeight:"bold"
          }}
          onClick={() =>
            linkClickHandler(
              `https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${data?.storeLocation?.locationCta}`
            )
          }
        >
          <LocationOnIcon sx={{ marginRight: "4px" }} />
          {data?.storeLocation?.locationDetail}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#00B2B2",
            cursor: "pointer",
            fontWeight:"bold"
          }}
          onClick={() =>
            linkClickHandler(data?.storeLocation?.storeLocatorCta, "sameTab")
          }
        >
          <StoreMallDirectoryIcon sx={{ marginRight: "4px" }} />
          {data?.storeLocation?.storeLocator}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default StoreInfoCard;
