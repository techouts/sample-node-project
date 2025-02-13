import { Fragment, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BasicModal from "../../../HOC/Modal/ModalBlock";
import RemoveBankDetailsModal from "./RemoveBankDetailsModal";
import { useMobileCheck } from "../../../utility/isMobile";
import { Divider } from "@mui/material";

export default function DottedMenu(props: any) {
  const { handleAddBankDetails, details, setTempBankDetails } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isMobile = useMobileCheck();

  const [removeModal, setIsRemoveModal] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRemove = () => {
    setAnchorEl(null);
    setIsRemoveModal(true);
  };
  const handleEdit = () => {
    setAnchorEl(null);
    handleAddBankDetails(true, details);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveClose = () => {
    setIsRemoveModal(false);
  };
  return (
    <Fragment>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiButtonBase-root.MuiMenuItem-root": {
            paddingTop: "0px",
            paddingBottom: "0px",
            paddingLeft: "12px",
            paddingRight: "0px",
          },
        }}
        PaperProps={{
          style: {
            border: "1px solid #EAEAEA",
            borderRadius: "0px",
            boxShadow: "0px 0px 0px 0px white",
            minWidth: isMobile ? "93px" : "136px",
            minHeight: isMobile ? "140px" : "83px",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>{" "}
        <Divider variant="middle" />
        <MenuItem onClick={handleRemove}>Remove</MenuItem>
      </Menu>

      <BasicModal
        height={"auto"}
        width={{ xs: "90%", sm: "70%", md: "60%", lg: "40%" }}
        top="50%"
        left="50%"
        handleOpen={handleRemove}
        handleClose={handleRemoveClose}
        open={removeModal}
        Component={
          <RemoveBankDetailsModal
            setIsRemoveModal={setIsRemoveModal}
            setTempBankDetails={setTempBankDetails}
          />
        }
      />
    </Fragment>
  );
}
