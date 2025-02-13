import { default as styled, default as styledComponent } from "@emotion/styled";
import { Stack, Typography } from "@mui/material";

export const OrText = styled(Typography)(
  ({ isInitial, isEmail, isForgotPasswordInitial }: any) => ({
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "19.6px",
    color:"#4F4C4D",
    textAlign: "center",
    letterSpacing: "0.1em",
    "@media (max-width:600px)": {
      paddingTop: `${
        (isInitial && "55px") ||
        (isEmail && "0px") ||
        (isForgotPasswordInitial && "50px")
      } `,
    },
  })
);

export const StackedText = styled(Stack)(() => ({
  justifyContent: "center",
  marginTop: "20px !important",
  "@media (max-width:600px)": {
    marginTop: "10px !important",
  },
}));
export const LoginIcons = styledComponent.img(() => ({
  width: "33px",
  height: "33px",
  cursor: "pointer",
}));
export const SignUpText = styled(Typography)(
  ({
    isInitial,
    isEmail,
    isForgotPasswordInitial,
    isSignUp,
    isForgotPasswordVerifyScreen,
  }: any) => ({
    justifyContent: "center",
    fontStyle: "normal ",
    fontWeight: "600",
    lineHeight: "22.4px",
    textAlign: "center",
    paddingTop: `${(isSignUp && "30px") || "70px"} `,
    display: "flex",
    alignItems: "center",
    color: "#231F20 !important",
    "@media (max-width:600px)": {
      paddingTop: `${
        (isInitial && "70px") ||
        (isEmail && "25px") ||
        (isForgotPasswordInitial && "50px") ||
        (isForgotPasswordVerifyScreen && "25px") ||
        (isSignUp && "25px")
      } `,
    },
  })
);
export const SocialIcon = styled(Stack)(
  ({ isInitial, isEmail, isSignUp }: any) => ({
    paddingTop: "20px",
    "@media (max-width:600px)": {
      paddingTop: `${
        (isInitial && "10px") || (isEmail && "10px") || (isSignUp && "25px")
      }`,
    },
  })
);
export const SignUpTypography = styled(Typography)(() => ({
  color: "#AD184C",
  textDecoration: "underline",
  paddingLeft: "5px",
  fontWeight: "600",
}));
export const SignUpDescription = styled(Typography)(() => ({
  paddingTop: "10px",
  textAlign: "center",
  width: "60%",
  fontSize: "14px",
  color: "#4F4C4D",
  "@media (max-width:600px)": {
    fontSize: "12px",
    paddingTop: "40px",
    width: "80%",
  },
}));
