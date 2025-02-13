import React, { useCallback, useRef } from "react";
import Script from "next/script";
import { ButtonStyled } from "../SigninComponent/InitialScreen/InitialScreenStyled";

interface GoogleRecaptchaProps {
  onTokenReceived: (token: string) => void;
  isDisabled: boolean;
  buttonText: string;
}

const GoogleRecaptcha: React.FC<GoogleRecaptchaProps> = ({
  onTokenReceived,
  isDisabled,
  buttonText,
}) => {
  const reCaptchaRef = useRef<HTMLDivElement>(null);

  const loadReCaptcha = useCallback(() => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        window.grecaptcha.render(reCaptchaRef.current, {
          sitekey:process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          size: "invisible",
          callback: (token: string) => {
            console.log(token, "mytoken");
            onTokenReceived(token);
          },
        });
      });
    }else{
      console.error("recaptcha not available")
    }
  }, [onTokenReceived]);

  const handleButtonClick = () => {
    if (window.grecaptcha) {
      window.grecaptcha.execute();
    }
  };

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
        onLoad={loadReCaptcha}
      />
      <ButtonStyled
        onClick={handleButtonClick}
        disabled={isDisabled}
        ref={reCaptchaRef}
        className="g-recaptcha"
        data-size="invisible"
      >
        {buttonText}
      </ButtonStyled>
    </>
  );
};

export default GoogleRecaptcha;
