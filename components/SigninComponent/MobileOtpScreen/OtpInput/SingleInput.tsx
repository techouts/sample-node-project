/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useRef, useLayoutEffect } from "react";
import usePrevious from "./usePrevious";
import { TextFieldColor } from "../MobileOtpStyled";
import { useMobileCheck } from "../../../../utility/isMobile";

export interface SingleOTPInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}

export function SingleOTPInputComponent(props: any) {
  const isMobile = useMobileCheck();

  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return (
    <>
      <TextFieldColor
        autoComplete="off"
        isMobile={isMobile}
        inputRef={inputRef}
        {...rest}
        type="tel"
        sx={{
          width: "11%",
          height: "10%",
          margin: "0 8px",
          textAlign: "center",
        }}
      />
    </>
  );
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
