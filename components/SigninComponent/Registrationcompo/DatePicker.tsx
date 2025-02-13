import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import IN from "date-fns/locale/en-IN";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextFieldReg } from "./RegistrationStyles";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { inputLabelClasses } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ReplaceImage } from "../../../utility/ReplaceImage";
import { CalenderIcon } from "../../CartLayout/CartConstants";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type DataSize = "medium" | "small" | "large";
type DatePickerProps = {
  dateFormatSize?: DataSize | "small";
  date?: any;
  setDate: Function;
  label: string;
  inputFormat?: string;
  disabled?: boolean;
  width?: any;
  disablePast?: boolean;
  maxDate?: any;
  minDate?: Date;
  required?: boolean;
  isonClick?: boolean;
  textFieldDisabled?: boolean;
  showClear?: boolean;
  profileDate?: boolean;
  id?: string;
  DesktopDatePickerStyles?: object;
};
export default function DatePickerComponent({
  date,
  setDate,
  label,
  disabled = false,
  width = 450,
  required = false,
  disablePast = false,
  maxDate = new Date(),
  minDate,
  dateFormatSize,
  showClear = false,
  profileDate = false,
  isonClick = false,
  id,
  DesktopDatePickerStyles,
}: DatePickerProps) {
  const handleChange = (newValue: Date | null) => {
    if (typeof setDate == "function") {
      setDate(newValue);
    }
  };
  const [open, setOpen] = useState(false);
  const [textFieldDisabled, setTextFieldDisabled] = useState(false);
  const handleTextFieldClick = () => {
    setOpen(true);
  };
  const handleDatePicker = () => {
    setOpen(true);
  };
  const Clear = () => {
    setDate(null);
    setOpen(false);
  };
  useEffect(() => {
    if (profileDate) {
      setTextFieldDisabled(true);
    }
  }, [date]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={IN}>
      <DesktopDatePicker
        sx={{ ...DesktopDatePickerStyles }}
        label={label}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={date}
        onChange={handleChange}
        disabled={profileDate}
        disablePast={disablePast}
        maxDate={maxDate}
        minDate={minDate}
        components={{
          SwitchViewIcon: KeyboardArrowRightIcon,
        }}
        PopperProps={{
          sx: {
            "& .MuiButtonBase-root.MuiIconButton-root.MuiPickersArrowSwitcher-button":
              {
                color: "#AD184C  ",
              },
            "& .MuiButtonBase-root.MuiIconButton-root.MuiPickersArrowSwitcher-button.Mui-disabled":
              {
                color: "#AD184C  ",
                opacity: "0.5",
              },

            "& .MuiButtonBase-root.MuiIconButton-root": {
              color: "#AD184C  ",
              fontSize: "8px",
            },
            "& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected": {
              color: "#fff",
              backgroundColor: "#AD184C",
            },
            "& .Mui-selected": {
              color: "#fff",
              backgroundColor: "#AD184C !important",
            },
          },
        }}
        renderInput={(params: any) => (
          <TextFieldReg
            onKeyDown={(e: any) => e.preventDefault()}
            {...params}
            // size="small"
            id={id}
            disabled={profileDate}
            margin="none"
            required={required}
            size={dateFormatSize}
            onClick={() => {
              !isonClick && handleTextFieldClick();
            }}
            InputLabelProps={{
              sx: {
                color: "#1C191A",
                [`&.${inputLabelClasses.shrink}`]: {
                  color: "#AD184C",
                  fontWeight: "500",
                  fontSize: "12px",
                },
              },
            }}
            InputProps={{
              ...params.InputProps,
              style: {
                margin: 0,
                borderRadius: 0,
                height: "49px",
                "&.MuiCalendarPicker-viewTransitionContainer": {
                  position: "absolute",
                },
              },
              endAdornment: (
                <>
                  {date && showClear && (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle clear "
                        edge="end"
                        style={{
                          paddingRight: "4px",
                        }}
                        onClick={(event: any) => {
                          Clear(), event.stopPropagation();
                        }}
                      >
                        <ClearIcon
                          style={{
                            width: "20px",
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  )}

                  {
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle date "
                        edge="end"
                        disabled={date && profileDate}
                        onClick={() => handleDatePicker()}
                      >
                        <img
                          src={`${ReplaceImage(CalenderIcon)}`}
                          alt="Calendar"
                          width="18px"
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                </>
              ),
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
