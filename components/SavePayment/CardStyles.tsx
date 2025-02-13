import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const CardTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    fontWeight: "400",
    fontSize: "14px",
    color: "#A7A5A6",
  },
}));
