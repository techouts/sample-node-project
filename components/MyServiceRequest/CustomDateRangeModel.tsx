import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  CancelButton,
  ConfirmButton,
  DateText,
  ErrorText,
  MainConfirmBox,
} from "./CustomDtaeRangeStyles";
import DatePickerComponent from "../SigninComponent/Registrationcompo/DatePicker";

const CustomDateRangeModel = ({
  setDateModelOpen,
  handleSubmitHandler,
  restrictAYear = false,
}: any) => {
  const [pickFromDate, setPickFromDate] = useState<any>(null);
  const [pickToDate, setPickToDate] = useState<any>(null);
  const [maximumDate, setMaximumDate] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (error && pickFromDate && pickToDate) {
      setError(false);
    }
  }, [pickFromDate, pickToDate]);

  return (
    <Box aria-label="date range">
      <DateText>{"Date Range"}</DateText>
      <Divider sx={{ marginBottom: !!pickFromDate ? "15px" : "0px" }} />
      <Box
        p="0px 12px 4px 0px"
        sx={{
          "& .MuiFormControl-root": {
            width: "100% !important",
          },
          "& .MuiOutlinedInput-input": {
            padding: !!pickFromDate
              ? "10px 0px 9.5px 14px"
              : "20px 0px 9.5px 14px",
          },
        }}
      >
        <DatePickerComponent
          DesktopDatePickerStyles={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiPopper-root.MuiPickersPopper-root": {
              transform: "translate3d(149px, 338.5px, 0px)",
            },
            "& .MuiIconButton-root": {
              padding: "8px 0px 0px 0px !important",
            },
            "& .MuiFormLabel-root.MuiInputLabel-root": {
              fontWeight: 800,
              color: "#303030",
              "@media only screen and (max-width: 600px) ": {
                fontSize: "16px !important",
                fontWeight: 800,
              },
            },
          }}
          setDate={(date: any) => {
            const nextYear =
              date && new Date(date).setFullYear(date.getFullYear() + 1);
            const maxDate = nextYear ? new Date(nextYear) : new Date();
            const toMaxDate = maxDate > new Date() ? new Date() : maxDate;
            setMaximumDate(toMaxDate);
            setPickFromDate(date);
          }}
          label={"From"}
          minDate={
            restrictAYear ? new Date(1980, 0, 1) : new Date(pickFromDate)
          }
          maxDate={new Date()}
        />
      </Box>
      <Divider sx={{ marginBottom: !!pickToDate ? "10px" : "0px" }} />
      <Box
        p="0px 12px 4px 0px"
        sx={{
          "& .MuiFormControl-root": {
            width: "100% !important",
          },

          "& .MuiOutlinedInput-input": {
            padding: !!pickToDate
              ? "10px 0px 9.5px 14px"
              : "20px 0px 9.5px 14px",
          },
        }}
      >
        <DatePickerComponent
          DesktopDatePickerStyles={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiPopper-root.MuiPickersPopper-root": {
              transform: "translate3d(149px, 338.5px, 0px)",
            },
            "& .MuiIconButton-root": {
              padding: "8px 0px 0px 0px !important",
            },
            "& .MuiFormLabel-root.MuiInputLabel-root": {
              alignText: "left",
              fontWeight: 800,
              color: "#303030",
              "@media only screen and (max-width: 600px) ": {
                fontSize: "16px !important",
                fontWeight: 800,
              },
            },
          }}
          isonClick={false}
          setDate={setPickToDate}
          label={"To"}
          profileDate={pickFromDate ? false : true}
          minDate={
            restrictAYear
              ? pickFromDate || new Date(1980, 0, 1)
              : new Date(pickFromDate)
          }
          maxDate={restrictAYear ? maximumDate : new Date()}
          date={pickToDate}
        />
      </Box>
      <Divider />
      {error && (
        <ErrorText>{`${
          !pickFromDate ? "From" : !pickToDate ? "To" : ""
        }  Date Field Cannot be Empty`}</ErrorText>
      )}
      <MainConfirmBox textAlign={"center"} p={2}>
        <ConfirmButton
          onClick={() => {
            if (!pickFromDate || !pickToDate) {
              setError(true);
              return;
            }
            if (pickToDate && pickToDate) {
              handleSubmitHandler(pickFromDate, pickToDate);
            }
          }}
        >
          <Typography
            sx={{ color: "#ffffff", fontWeight: "600", fontSize: "12px" }}
          >
            {"CONFIRM"}
          </Typography>
        </ConfirmButton>
        <CancelButton onClick={() => setDateModelOpen(false)}>
          {"CANCEL"}
        </CancelButton>
      </MainConfirmBox>
    </Box>
  );
};
export default CustomDateRangeModel;
