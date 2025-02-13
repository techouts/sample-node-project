import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {styled }from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { transientProps } from "../../utility/TransientProps";
export const DeleteBox = styled(Box)(() => ({
    padding: "60px 80px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    "@media (max-width:600px)": {
        padding: "50px 16px",
    },
}));
export const MessageText = styled(Typography)(() => ({
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "30px",
    color: "#231F20",
    paddingBottom: "20px",
    "@media (max-width:600px)": {
        fontSize: "12px",
        lineHeight: "17px",
    },
}));
export const ContactType = styled(Typography)(() => ({
    fontWeight: 400,
    fontSize: "14px",
    color: "#4F4C4D",
    "@media (max-width:600px)": {
        fontSize: "12px",
    },
}));
export const StyledInput = styled(TextField)(() => ({
    fontWeight: 400,
    color: "#231F20",
    width: "393px",
    height: "50px",
    borderRadius: "0px",
    marginTop: "2px",
    marginBottom: "30px",
    "& input": {
        fontSize: "16px",
    },
    "@media (max-width:600px)": {
        "& input": {
            fontSize: "12px",
        },
        fontSize: "12px",
        width: "328px",
        lineHeight: "17px",
    },
    "& > div": {
        borderRadius: "0px",
    },
    "& label.Mui-focused": {
        color: "#AD184C !important",
    },
    "& div.Mui-focused fieldset": {
        borderColor: "#EAEAEA !important",
    }
}));
export const StyledStack = styled(Stack)(() => ({
    display: 'flex',
    justifyContent: "center",
    flexDirection: "row",
    "@media (max-width:600px)": {
        flexDirection: "row-reverse"
    },
}));
export const Buttons = styled(
    Button,
    transientProps
)<{ isPrimary: boolean; isMobile: boolean }>(({ isPrimary, isMobile }) => ({
    backgroundColor: isPrimary ? " #231F20" : "#DEA3B7",
    borderRadius: "0px",
    color: isPrimary ? "#FFFFFF" : "#231F20",
    padding: "14px 26px",
    marginRight: "16px",
    "&:hover": {
        backgroundColor: isPrimary ? "#231F20" : "#DEA3B7",
    },
}));
export const ButtonText = styled(Typography)(() => ({
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "1px",
    lineHeight: "16px",
}));
