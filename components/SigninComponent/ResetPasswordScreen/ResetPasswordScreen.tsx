import React, { useEffect, useState } from "react";
import {
  Title,
  SmallTitle,
  ButtonStyled,
  TextFieldStyled,
  BoxStyled,
  StyledList,
  ToastMessage,
  ButtonTypography,
  PrimaryBox,
} from "./ResetPasswordStyled";
import IconButton from "@mui/material/IconButton";
import  Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import { Box } from "@mui/system";
import { useMobileCheck } from "../../../utility/isMobile";
const ResetPasswordScreen = (ResetPasswordScreenData: any) => {
  const { data } = ResetPasswordScreenData;
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [highlighted, setHighlighted] = useState<number[] | any>([]);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const isMobile = useMobileCheck();

  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);
  const [confirmValues, setConfirmValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowPasswordConfirm = () => {
    setConfirmValues({
      ...confirmValues,
      showPassword: !confirmValues.showPassword,
    });
  };
  const startTimer = () => {
    setShowMessage(false);
  };
  const handleReset = () => {
    if (error) {
      setHelperText("Password doesn't match");
      setShowMessage(true);
      setTimeout(startTimer, 4000);
    } else {
      setHelperText("Password reset successfully!");
      setShowMessage(true);
      setTimeout(startTimer, 4000);
    }
  };
  const handleName =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      let value = event.target.value;
      const regexCapital = /(?=.*[A-Z])/;
      const regexLower = /(?=.*[a-z])/;
      const regexDigital = /\d/;
      const regexSpecial = /[!@#$%]+/;
      if (value.length >= 8) {
        addElement(0);
      } else {
        removeElement(0);
      } 
      if (regexCapital.test(value)) {
        addElement(1);
      } else {
        removeElement(1);
      }
      if (regexLower.test(value)) {
        addElement(2);
      } else {
        removeElement(2);
      }
      if (regexDigital.test(value) || regexSpecial.test(value)) {
        addElement(3);
      } else {
        removeElement(3);
      }
    };
  const handleNameconfirm =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmValues({ ...confirmValues, [prop]: event.target.value });
      if (values.password != event.target.value) {
        setShowError(true);
        setError(true);
      } else {
        setShowError(false);
        setError(false);
      }
    };
  const handleChange = (val: string) => {
    const regexDigital = /\d/ && /(?=.*[A-Z])/ && /(?=.*[a-z])/;
    if (val.length >= 8) {
      addElement(0);
    } else {
      removeElement(0);
    }
    if (regexDigital.test(val)) {
      addElement(0);
    } else {
      removeElement(0);
    }
  };
  const removeElement = (ele: number) => {
    let index = highlighted.indexOf(ele);
    if (index !== -1) {
      setHighlighted([
        ...highlighted.slice(0, index),
        ...highlighted.slice(index + 1, highlighted.length),
      ]);
    }
  };
  const addElement = (ele: number) => {
    if (highlighted.filter((num: any) => num === ele)[0] !== ele) {
      setHighlighted((highlighted: any) => [...highlighted, ele]);
    }
  };
  return (
    <PrimaryBox>
      {showMessage && <ToastMessage>{helperText}</ToastMessage>}
      <Title> {data?.title} </Title>
      <SmallTitle sx={{ mt: 1 }}>{data?.subTitle}</SmallTitle>
      {/* new password */}
      <BoxStyled width={isMobile ? "90%" : "75%"} pt="53px">
        <TextFieldStyled
          id="outlined-basic"
          fullWidth
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleName("password")}
          placeholder="Enter new password"
          InputLabelProps={{
            style: { color: "#AD184C" },
          }}
          InputProps={{
            style: {
              padding: 0,
              margin: 0,
              borderRadius: 0,
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  style={{ padding: "20px" }}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box>
          {highlighted.length !== 4 && (
            <Stack direction={{ xs: "column" }}>
              <Grid>
                <ul
                  style={{
                    listStyle: "none",
                    paddingInlineStart: 0,
                    textAlign: "left",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  {data?.checkList?.map((item: any, index: number) => (
                    <StyledList
                      key={index}
                      highlight={
                        index ===
                        highlighted.filter((num: any) => num === index)[0]
                      }
                    >
                      <Box style={{ display: "flex" }}>
                        <DoneIcon sx={{ fontSize: "small", width: "2em" }} />
                        <Box>{item?.message}</Box>
                      </Box>
                    </StyledList>
                  ))}
                </ul>
              </Grid>
            </Stack>
          )}
        </Box>
      </BoxStyled>
      {/* confirm password */}
      <BoxStyled
        width={isMobile ? "90%" : "75%"}
        highlighted={highlighted.length === 4}
      >
        <TextFieldStyled
          id="outlined-basic"
          fullWidth
          type={confirmValues.showPassword ? "text" : "password"}
          value={confirmValues.password}
          onChange={handleNameconfirm("password")}
          error={error}
          helperText={error && helperText}
          placeholder="Confirm new password"
          InputLabelProps={{
            style: { color: "#AD184C" },
          }}
          InputProps={{
            style: {
              padding: 0,
              margin: 0,
              borderRadius: 0,
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordConfirm}
                  edge="end"
                  style={{ padding: "20px" }}
                >
                  {confirmValues.password !== "" &&
                  values.password === confirmValues.password ? (
                    <DoneIcon />
                  ) : confirmValues.showPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </BoxStyled>

      <ButtonStyled onClick={handleReset}>
        <ButtonTypography
          sx={{
            fontSize: { lg: 12, md: 11, sm: 10, xs: 10 },
            letterSpacing: "1px",
          }}
        >
          {data?.buttontext}
        </ButtonTypography>
      </ButtonStyled>
    </PrimaryBox>
  );
};
export default ResetPasswordScreen;
