
import {styled} from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";


export const HowToUseTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "20px",
    paddingBottom: "2px",
    paddingTop: "2px",
    "@media(max-width:600px)": {
        fontSize: "12px",
        paddinTop: "10px",
        fontWeight: 400,
    },
}));

export const DownArrow = styled(KeyboardArrowDownIcon)(({ theme }) => ({
    cursor: "pointer",
    color: "#292D32",
    "@media(max-width:600px)": {},
}));

export const RightArrow = styled(KeyboardArrowRightIcon)(({ theme }) => ({
    cursor: "pointer",
    color: "#292D32",
    "@media(max-width:600px)": {},
}));


export const InnerTitle = styled(Typography)(({ theme }) => ({
    fontSize: "16px",
    color: "#4F4C4D",
    fontWeight: 700,
    paddingTop: "10px",
    "@media(max-width:600px)": {
        fontSize: "12px",
        paddingBottom: "12px",
        fontWeight: 700,
    }
}));


export const HowToUseContent = styled(Typography)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    "& > span": {
        display: "flex",
        color: "#4F4C4D",
        fontSize: "16px",
        "@media(max-width:600px)": {
            fontSize: "11px",
            paddingTop: "5px",
            fontWeight: 400,
        },
    },
}));

export const ViewButton = styled(Stack)(({ theme }) => ({
    color: "#AD184C",
    fonstSize: "16px",
    textDecorationLine: " underline",
    cursor: "pointer",
    paddingTop: "25px",
    alignItems: "center",
    margin: "0 auto",
    display: "flex",
    "@media(max-width:600px)": {
        fontSize: "12px",
        paddingTop: "15px",
        paddingBottom: "15px",
    },
}));