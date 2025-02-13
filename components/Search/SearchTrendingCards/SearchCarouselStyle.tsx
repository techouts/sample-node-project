import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export const FirstGrid = styled(Grid)((theme) => ({
  display: "flex",
}));

export const CategoryImage = styled.img(() => ({
  width: "100%",
  height: "100%",
  borderRadius: "200px",
  marginLeft:'0%',
  objectFit: "cover",
  "@media(max-width: 600px)": {
    borderRadius: "100px",
  },
}));

export const GridOuterContainer = styled(Grid)(() => ({
  borderRadius: 300,
  marginRight: "2%",
  width: "9rem",
  height: "8rem",
  border: "1px solid rgba(35, 31, 32, 0.16)",

  "@media(max-width: 900px)": {
    borderRadius: 200,
    width: "8rem",
    height: "8rem",
  },

  "@media(max-width: 600px)": {
    borderRadius: 100,
    width: "6rem",
    height: "6rem",
  },
}));


export const SearchBoxContents = styled(Box)(() => ({
  paddingTop: "10%",
  paddingBottom: "40px",

  "@media(min-width: 600px)": {
    paddingTop: "10%",
    paddingBottom: "15%",
    marginLeft: "0%",
  },
  "@media(min-width: 790px)": {
    paddingTop: "10%",
    paddingBottom: "15%",
    marginLeft: "0%",
  },
}));