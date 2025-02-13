import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const DateAndTimeTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: "39px",
  color: "#231F20",
  margin: "0px 0px 8px 0px",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "16px",
    margin: "25px 0px 4px 0px",
  },
}));

export const NoAvailableSlotsTitle = styled(DateAndTimeTitle)(() => ({
  color: "#AD184C",
  marginTop: "20px",
}));

export const SlotTimingsBox = styled(Grid)(() => ({
  display: "grid",
  gap: "16px 10px",
  gridTemplateColumns: "repeat(9, 1fr)",
  "@media (max-width: 600px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

export const SlotTimeText = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#231F20",
  borderRadius: "0%",
  padding: "7px 18px",
  textAlign:'center',
  backgroundColor: "#EAE9EF",
  "@media (max-width: 600px)": {
    fontSize: "11px",
    padding: "7px 26px",
  },
}));

export const TimeDuration = styled(Typography)(() => ({
  fontSize: "20px",
  lineHeight: "24px",
  color: "#231F20",
  fontWeight: 500,
  marginBottom: "32px",
  "@media (max-width: 600px)": {
    fontWeight: 700,
    fontSize: "11px",
    lineHeight: "14px",
    marginBottom: "17px",
  },
}));

export const AvailableSlotTitle = styled(Typography)(() => ({
  fontSize: "20px",
  lineHeight: "28px",
  color: "#231F20",
  fontWeight: 500,
  margin: "26px 0px 20px 0px",
  "@media (max-width: 600px)": {
    fontWeight: 700,
    fontSize: "10px",
    lineHeight: "14px",
    margin: "10px 0px",
  },
}));

export const BookServiceButton = styled(Button)(() => ({
  fontWeight: 500,
  fontSize: "12px",
  letterSpacing: "1px",
  color: "#FFFFFF",
  borderRadius: "0%",
  width: "200px",
  padding: "14px 0px",
  margin: "40px 0px",
  backgroundColor: "#231F20",
  "&:hover": {
    backgroundColor: "#231F20",
  },
  "@media (max-width: 600px)": {
    width: "100%",
    padding: "8px 0px",
    fontSize: "11px",
    margin: "25px 0px",
  },
}));
