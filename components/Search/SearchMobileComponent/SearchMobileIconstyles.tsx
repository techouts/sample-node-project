import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";

export const HeaderContainerGrid = styled(Grid)(({ theme }) => ({
  background: "#F8F8F8",
  height: "53px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  // justifyContent: "space-evenly",
  gap: "10px",
}));

export const FixedHeader = styled(Grid)(({ theme }) => ({
  position: "fixed",
  zIndex: "9",
  width: "100%",
 padding:"0px 10px",
}));

export const BackIcon = styled(ArrowBackIcon)(({ theme }) => ({
  color: "#AD184C",
  cursor: "pointer",
}));

export const CloseIconColor = styled(CloseIcon)(({ theme }) => ({
  color: "#AD184C",
  fontSize: "14px",
}));

export const PaperTileSpacing = styled(Paper)(({ theme }) => ({
  // width: "229px",
  height: "32px",
  backgroundColor: "white",
  borderRadius: "100px",
  boxShadow: "none",
  border: "1px solid #E7E7E7",
}));
