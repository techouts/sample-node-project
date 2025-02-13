import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const SmallBoxFontsize = { fontSize: "12px" };
export const SmallBoxStmtFontsize = {
  fontSize: "11px",
  margin: "18px 0px 0px 0px",
  color: "#231F20",
};

export const ActivateWalletButton = styled(Button)(({ disabled }: any) => ({
  borderRadius: 0,
  letterSpacing: "1px",
  fontSize: "12px",
  fontWeight: "500",
  backgroundColor: "#231F20",
  height: "44px",
  color: "#FFFFFF",
  width: "173px",
  marginTop: "20px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#231F20",
  },
  "@media(max-width:600px)": {
    width: "164px",
    height: "28px",
    marginTop: "7px",
    fontSize: "11px !important",
  },
}));
export const RadioLabelTypography = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#000000",
  fontWeight: 400,
  lineHeight: "14px",
  "@media(max-width:600px)": {
    fontSize: "12px",
  },
}));

export const MywalletAdvantagesSubtitle = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  marginBottom: "10px",
};
export const SavedPay = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "16px",
  color: " #c14470",
};

export const CheckTitleTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "20px",
  lineHeight: "24.98px",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "14.99px",
  },
}));

export const radio_button = {
  padding: "0px 7px 0px 0px",
  color: "#D1D1D6",
  "&.Mui-checked": {
    color: "#AD184C",
  },
  "@media(max-width:600px)": {
    padding: "0px 7px 0px 9px",
  },
};
export const CheckFontSize = {
  fontSize: "12px",
  color: " #231F20",
  fontWeight: 400,
};
export const FontSizCrdNoTxt = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "21px",
  color: "#4F4C4D",
  marginBottom: "4px",
  marginLeft: "4px",
  "@media(max-width:600px)": {
    fontSize: "11px",
    lineHeight: "140%",
    marginBottom: "3px",
    marginLeft: "0",
  },
}));
export const checkBalanceBut = { marginTop: "20px" };

export const checkBalanceButextra = { width: "90%", marginLeft: "5%" };
export const AmtTypography = styled(Typography)(() => ({
  marginBottom: "5%",
  fontSize: "80px",
  fontWeight: "700",
  lineHeight: "140%",
  color: "#AD184C",
  "@media(max-width:600px)": {
    fontSize: "40px",
    lineHeight: "56px",
  },
}));
export const CheckTypography = styled(Typography)(() => ({
  textAlign: "center",
  paddingBottom: "37px",
  wordBreak: "break-word",
  fontSize: "20px",
  fontWeight: "500",
  lineHeight: "124.9%",
  color: "#231F20",

  "@media(max-width:600px)": {
    fontSize: "18px",
    lineHeight: "21.98px",
  },
}));

export const ExpTypography = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "400",
  lineHeight: "150%",
  color: " #656263",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "20.4px",
  },
}));
export const TotalBaltext = styled(Typography)(() => ({
  fontSize: "22px",
  fontWeight: "600",
  lineHeight: "124.9%",
  color: "#231F20",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "124.9%",
  },
}));

export const ExpiryText = styled(Typography)(() => ({
  fontSize: "16px",
  lineHeight: "124.9%",
  color: "#4F4C4D",
  marginBottom: "25px",
  fontFamily: "Montserrat",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "124.9%",
  },
}));

export const TotalBalamt = styled(Typography)(() => ({
  fontSize: "80px",
  fontWeight: "700",
  lineHeight: "112px",
  color: "#AD184C",
  "@media(max-width:600px)": {
    fontSize: "40px",
    lineHeight: "56px",
  },
}));
export const TotalBalamtexp = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "400",
  lineHeight: "150%",
  color: "#4F4C4D",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "150%",
  },
}));
type proptype = {
  dcolor?: string;
  dfontsize?: string;
  dlineheight?: string;
  mfontsize?: string;
  mlineheight?: string;
  dfontweight?: string;
  paddingTop?: string;
  paddingBottom?: string;
};

export const ExpiryTypography = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "400",
  lineHeight: "150%",
  color: "#4F4C4D",
  textAlign: "center",
  marginBottom: "20px",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "150%",
    marginBottom: "25px",
  },
}));
export const WalletTypography = styled(Typography)(
  ({
    dcolor = "black",
    dfontweight = "600",
    dfontsize = "12px",
    dlineheight = "100%",
    mfontsize = "12px",
    mlineheight = "10px",
    paddingTop = "",
    paddingBottom = "",
    walletWhiteSpace = "wrap",
  }: any) => {
    return {
      fontSize: dfontsize,
      fontWeight: dfontweight,
      lineHeight: dlineheight,
      color: dcolor,
      paddingTop: paddingTop,
      paddingBottom: paddingBottom,
      whiteSpace: walletWhiteSpace,
      "@media(max-width:600px)": {
        fontSize: mfontsize,
        lineHeight: mlineheight,
        whiteSpace: "pre-wrap",
        fontWeight: "600",
      },
    };
  }
);

type proptypeButton = {
  dbgcolor?: string;
  dcolor: string;
  webWidth?: string;
  mobWidth?: string;
  disabled?: boolean;
};
type giftCardProps = {
  giftCard: any;
};
export const CheckBalButton = styled(Button)((props: proptypeButton) => {
  let {
    dbgcolor = "black",
    dcolor = "white",
    webWidth,
    mobWidth,
    disabled,
  } = props;
  return {
    fontSize: "12px",
    backgroundColor: dbgcolor,
    height: "44px",
    width: webWidth,
    color: dcolor,
    opacity: disabled ? "0.5" : "",
    borderRadius: "0px",
    "@media(max-width:600px)": {
      fontSize: "11px",
      lineHeight: "16px",
      height: "28px",
      width: mobWidth,
    },
  };
});
export const AddBalButton = styled(Button)(() => {
  return {
    fontSize: "12px",
    backgroundColor: "#231F20",
    height: "44px",
    color: "#FFFFFF",
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: "#231F20",
    },
    "@media(max-width:600px)": {
      height: "28px",
      fontSize: "11px",
      lineHeight: "16px",
      width: "200px",
    },
  };
});
export const Modal_Code = { marginTop: "5%", width: "100%" };
export const textToLeft = { textAlign: "left" };
export const marginSize = { marginTop: "10%", width: "100%" };
export const widthSize = { width: "100%" };
export const GridAftrVerify = {
  backgroundColor: "#F7F6F9",
  textAlign: "center",
  padding: "36px 54px 34px 53px ",
  width: "100%",
  "@media (max-width:1200px)": {
    padding: "25px",
    marginTop: "20px",
  },
  "@media (max-width:600px)": {
    padding: "25px 8px 25px 8px",
    marginTop: "20px",
  },
};
export const gridBeforeVerify = {
  backgroundColor: "#F7F6F9",
  textAlign: "center",
  padding: "3% 5.2% 3% 5.2%",
  "@media(max-width:600px)": {
    padding: "25px 28px 18px 28px",
  },
};
export const TransactionLogsMargin = { width: "100%", marginTop: "20px" };
export const accordianRelated = {
  width: "100%",
  border: "1px solid rgba(0, 0, 0, .125)",
};
export const accordianGrid = TransactionLogsMargin;
export const textToCenter = { textAlign: "center" };
export const widthAfterVerify = { width: "97%" };
export const marginAfterVerify = { marginLeft: "0%" };
export const submitButton = {
  ...checkBalanceBut,
  backgroundColor: "#DEA3B7",
  height: "34px",
  width: "50%",
  border: "0px solid",
  cursor: "pointer",
  marginTop: "20px",
};

export const giftCardSubmitBtn = {
  ...checkBalanceBut,
  backgroundColor: "#DEA3B7",
  height: "34px",
  width: "50%",
  border: "0px solid",
  cursor: "pointer",
};

export const GiftCardTitleTypography = styled(Typography)(() => ({
  marginBottom: "20px",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "20px",
  lineHeight: "24px",
  color: "#231F20",
  textAlign: "left",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "15px",
    textTransform: "uppercase",
  },
}));

export const GiftCardSubTitleTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "140%",
  color: "#4F4C4D",
  textAlign: "left",
  "@media(max-width:600px)": {
    fontSize: "12px",
    lineHeight: "14px",
    fontWeight: "400",
  },
}));

export const GiftCardInfoTypography = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "150%",
  color: "##656263",
  textAlign: "left",
  paddingTop: "12px",

  "@media(max-width:600px)": {
    fontSize: "11px",
  },
}));
export const CaptchaBox = styled(Box)(
  ({ giftCard, captchaRender, isMobile }: any) => {
    return {
      border: captchaRender && giftCard && "1px solid #F7F6F9",
      justifyContent: giftCard ? "center" : "flex-start",
      display: giftCard ? "flex" : "",
      flexDirection: giftCard && "column",
      alignItems: "center",
      margin: captchaRender && giftCard && "20px 0px",
      paddingBottom: captchaRender && giftCard && "20px",
      borderRadius: giftCard && "3px",
      boxShadow:
        captchaRender && giftCard && "0px 0px 4px 1px rgba(0, 0, 0, 0.08)",
      backgroundColor: giftCard ? "#F7F6F9" : "",
      width: isMobile
        ? giftCard
          ? " 100%"
          : ""
        : giftCard
        ? "fit-content"
        : "100%",
    };
  }
);
