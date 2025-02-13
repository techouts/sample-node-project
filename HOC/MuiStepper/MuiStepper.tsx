import React from "react";
import { Dots } from "../MuiStepper/MuiStepperStyles";
const MuiStepper = ({ totalLength, selectedIndex }: any) => {
  return (
    <Dots
      aria-label="dots"
      variant="dots"
      steps={totalLength}
      position="static"
      activeStep={selectedIndex}
      backButton={undefined}
      nextButton={undefined}
    />
  );
};
export default MuiStepper;
