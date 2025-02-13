import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


export const CategoryImage = styled.img(() => ({
  cursor: "pointer",
  padding: "3px",
  "@media(min-width: 600px)": {
    padding: "6px",
  },
}));

export const CategoryText = styled(Grid)(() => ({
  fontWeight: "400",
  color: " #231f20",
  fontSize: "13px",
  cursor: "pointer",
  lineHeight: "135%",
  textAlign: "center",
  "@media(min-width: 600px)": {
    fontSize: "20px",
  },
}));

export const ListItemContainer = styled(Box)(() => ({
  padding: "0 8px",
  "@media(min-width: 768px)": {
    padding: "0 26px",
  },
}));
