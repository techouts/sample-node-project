import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import { useRouter } from "next/router";
import { useMobileCheck } from "../../utility/isMobile";
import { DotsGrid, StepLabel } from "./LabelStepperStyles";
import { useRecoilState } from "recoil";
import { userState } from "../../recoilstore";
const MuiLabelStepper = ({ steps, currentStep }: any) => {
  const isMobile = useMobileCheck();
  const [userDataItems, setUserDataItems] = useRecoilState(userState);
  const router = useRouter();
  const currentIndex = steps
    ?.map((step: { textPath: string }) => step?.textPath?.toLocaleLowerCase())
    ?.indexOf(currentStep?.toLocaleLowerCase());
  const BackHandler = (index: number) => {
    if (index < currentIndex) {
      router.push(`/cart/${steps[index]?.textPath}`);
    }
  };
  const stepperLableColor = (index: number, step: any) => {
    if (currentIndex === index) {
      return step?.textColor;
    } else {
      if (index < currentIndex) {
        return step?.isTextColorActive;
      } else {
        return step?.isTextColorInactive;
      }
    }
  };

  return (
    <Stepper>
      {(userDataItems?.storeMode && userDataItems?.storeModeType === "cc"
        ? steps?.filter((item: any) => item?.textPath !== "address")
        : steps
      )?.map(
        (
          step: {
            id: number;
            text: string;
            textColor: string;
            textPath: string;
            textOnHeader: string;
            isTextColorActive: string;
            isTextColorInactive: string;
          },
          index: number,
          currentArray :any
        ) => {
          const uniqueKeyValue = index;
          return (
            <Step
              key={uniqueKeyValue}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <StepLabel
                onClick={() => BackHandler(index)}
                sx={{
                  color: stepperLableColor(index, step),
                }}
              >
                {step?.text}
              </StepLabel>
              {index != currentArray?.length - 1 && (
                <DotsGrid
                  isMobile={isMobile}
                  item
                  xs={12}
                  sx={{
                    color: stepperLableColor(index, step),
                  }}
                >
                  {"......"}
                </DotsGrid>
              )}
            </Step>
          );
        }
      )}
    </Stepper>
  );
};
export default MuiLabelStepper;
