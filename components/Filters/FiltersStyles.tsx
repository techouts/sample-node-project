import {styled} from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AccordionSummary from "@mui/material/AccordionSummary";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import { transientProps } from "../../utility/TransientProps";

interface CheckFilterLabel {
  ischeckedfilter: boolean;
}

export const MainAccordion = styled(Accordion)(({ theme }) => ({
  margin: "0px !important",
  border: "none !important",
  boxShadow: "none",
  "&:before": {
    height: "0px",
  },
}));

export const StyledAccordian = styled(AccordionSummary)(({ theme }) => ({
  padding: "0",
  minHeight: "35px !important",
  "& .MuiAccordionSummary-content": {
    margin: "8px 0",
  },
}));

export const DividerGrid = styled(Divider)`
  border: 1px solid #e7e7e7;
  margin-top: 12px;
  margin-bottom: 10px;
`;

export const SeachGrid = styled(Grid)`
  border: 2px solid #e7e7e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledInput = styled(TextField)(({ theme }) => ({
  minWidth: "100%",
  marginBottom: "14px",
  "& > div": {
    borderRadius: "0px",
  },
  "@media (max-width: 600px)": {
    minWidth: "100%",
  },
}));

export const PageTitle = styled(
  Typography,
  transientProps
)<{ ischeckedfilter: boolean }>(({ ischeckedfilter }) => ({
  color: "#231f20",
  fontSize: "16px",
  lineHeight: "19px",
  fontWeight: ischeckedfilter ? "500" : "400",
}));
export const ViewMore = styled(Typography)`
  padding-top: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #ad184c;
  cursor: pointer;
`;
export const ItemSubtitle = styled(Typography)`
  color: #231f20;
  font-size: 14px;
  line-height: 17px;
  font-weight: 400;
  @media (max-width: 600px) {
    font-size: 12px;
    line-height: 14px;
  }
`;

export const FilterTitle = styled(Typography)`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  padding-bottom: 12px;
`;

// mobile filter styles

export const FilterBootstrapDialog = styled(Dialog)(({ theme }) => ({
  zIndex:"999999",
  "& .MuiDialog-container": {
    display: "block",
  },
  "& .MuiPaper-root": {
    margin: "0px",
    height: "100%",
    maxHeight: "100%",
  },
  "& .MuiDialogContent-root": {
    padding: "0",
    borderBottom: "none",
  },
}));

export const BottomButtons = styled(DialogActions)`
  justify-content: center;
  box-shadow: 0px 4px 25px rgb(0 0 0 / 15%);
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;
export const ResetButton = styled(Button)`
  border: 1px solid #dea3b7;
  border-radius: 0px;
  color: #dea3b7;
  min-width: 164px;
`;
export const FilterButton = styled(Button)`
  background: #dea3b7;
  color: #231f20;
  border-radius: 0px;
  min-width: 164px;
`;
export const FiltersTabs = styled(Tabs)`
  border-right: 1px solid #eae9ef;
  .MuiTabs-indicator {
    background-color: unset;
  }
`;
export const TabSelected = styled(Tab)<CheckFilterLabel>`
  &.Mui-selected {
    background-color: #ffffff;
    color: #231f20;
    font-weight: 600;
    font-size: 12px;
    text-transform: capitalize;
  }
  align-items: baseline;
  background-color: #eae9ef;
  color: #231f20;
  text-transform: capitalize;
  text-align: left;
  font-size: 12px;
  ${(props) =>
    props?.ischeckedfilter ? "font-weight: 600" : "font-weight: 400"}
`;

export const SubFacets = styled(Box)(() => ({
  paddingLeft: "11px",
  maxHeight: "350px",
  overflow: "auto",
  "::-webkit-scrollbar": {
    width: "5px",
  },
  "::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    borderRadius: "3px",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "darkgrey",
    borderRadius: "3px",
  },
}));
