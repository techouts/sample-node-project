import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import {inputLabelClasses} from "@mui/material";
import { TextFieldStyled } from "./TextFieldStyled";
import ClearIcon from "@mui/icons-material/Clear";

const TextFieldHOC = ({
  border,
  borderRadius,
  height,
  label,
  onChange,
  variant,
  name,
  InputLabelPropsColor,
  id,
  value,
  error,
  helperText,
  disabled,
  required,
  type = "text",
  onKeyDown,
  InputProps,
  endAdornment,
  showClear = false,
  onClear,
  isColor = false,
  TextFieldHeight = "49px",
}: any) => {
  return (
    <TextFieldStyled
      sx={{
        border: border,
        borderRadius: borderRadius,
        height: height,
        "& .MuiInputBase-root.MuiOutlinedInput-root ": {
          height: TextFieldHeight,
        },
      }}
      disabled={disabled}
      id={id}
      isColor
      label={label}
      variant={variant}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      onKeyDown={onKeyDown}
      helperText={helperText}
      type={type}
      required={required}
      fullWidth
      InputLabelProps={{
        sx: {
          color: InputLabelPropsColor,
          [`&.${inputLabelClasses.shrink}`]: {
            color: "#AD184C",
            fontWeight: "500",
            fontSize: "12px",
            lineHeight: "150%",
          },
        },
      }}
      InputProps={{
        sx: {
          input: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px white inset",
            },
          },
        },
        endAdornment: (
          <>
            {value && showClear && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle clear "
                  edge="end"
                  style={{
                    paddingRight: "4px",
                  }}
                  onClick={(event: any) => {
                    onClear(), event.stopPropagation();
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
          </>
        ),
      }}
    />
  );
};

export default TextFieldHOC;
