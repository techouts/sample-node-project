import { styled } from "@mui/material/styles";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { CHECKBOX_URL } from "./Constants";
import { useMobileCheck } from "./isMobile";

export const CustomCheckBox = (props: CheckboxProps) => {
  const isMobile = useMobileCheck();
  const UnChecked = styled("span")(({ theme }) => ({
    borderRadius: 6,
    width: 18,
    height: 18,
    boxShadow: isMobile
      ? "inset 0 0 0 1px rgb(35,31,32), inset 0 -1px 0 rgb(35,31,32)"
      : "inset 0 0 0 1px rgba(173,24,76,.8), inset 0 -1px 0 rgba(173,24,76,.6)",
    backgroundColor: "white",
  }));
  const CheckedIcon = styled(UnChecked)({
    width: "18px",
    height: "18px",
    backgroundColor: "white",
    boxShadow:
      "inset 0 0 0 1px rgba(173,24,76,.8), inset 0 -1px 0 rgba(173,24,76,.6)",
    "&:before": {
      display: "block",
      width: 18,
      height: 18,
      borderRadius: 6,
      backgroundImage: `url(${CHECKBOX_URL})`,
      content: '""',
    },
  });
  return (
    <Checkbox
      disableRipple
      color="default"
      checkedIcon={<CheckedIcon />}
      icon={<UnChecked />}
      inputProps={{ "aria-label": "Checkbox" }}
      {...props}
    />
  );
};
