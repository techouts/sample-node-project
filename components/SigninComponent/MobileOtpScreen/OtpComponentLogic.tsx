import { Box } from "@mui/system";
import { useMobileCheck } from "../../../utility/isMobile";
import { OtpBox } from "./MobileOtpStyled";
import OTPInput from "./OtpInput";

export const OtpComponentLogic = (props: any) => {
  const isMobile = useMobileCheck();

  const {
    setOtp,
    VerifyHandler,
    resendOtp,
  } = props;

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <OtpBox component="form" sx={{ ...props?.sysprops }}>
          <OTPInput
            autoFocus
            isNumberInput
            length={6}
            onChangeOTP={(otp) => setOtp(otp)}
            VerifyHandler={VerifyHandler}
            resendOtp={resendOtp}
          />
        </OtpBox>
      </Box>
    </>
  );
};
