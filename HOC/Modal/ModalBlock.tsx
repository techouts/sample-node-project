import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TypographyModalClose, MainBox } from "./styles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import triggerGAEvent from "../../utility/GaEvents";
import { link_text } from "../../utility/GAConstants";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { AppIcons } from "../../utility/AppIconsConstant";
import { CLOSE_CIRCLE_IMAGE } from "../../utility/AppIcons";
import { Fade } from "@mui/material";
const BasicModal = ({
  top,
  left,
  height,
  width,
  Component,
  handleClose,
  open,
  overflowData,
  iconRight = "3%",
  iconTop = "3%",
  iconMobRight = "3%",
  iconMobTop = "3%",
  toggle = true,
  pdpPopup = true,
  maxHeight,
  display = "",
  alignItems = "",
  justifyContent = "",
  widget_title,
  widget_description,
  componentId,
  animationDuration = "0",
  showCrossIcon = true
}: any) => {
  const callGaEvent = () => {
    triggerGAEvent(
      {
        link_text: link_text,
        widget_title:
          widget_title ||
          Component?.props?.data?.__component ||
          Component?.props?.className ||
          "na",
        widget_description: widget_description ? widget_description : "na",
        event_type: "close",
        component_id:
          componentId ||
          Component?.props?.data?.id ||
          Component?.props?.id ||
          "na",
      },
      "widget_close"
    );
  };
  const close_circle = AppIcons(CLOSE_CIRCLE_IMAGE);
  return (
    <Box>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ zIndex: open ? 1300 : 0 }}>
          <Fade in={open} timeout={animationDuration}>
            <MainBox
              sx={{
                outline: "none !important",
                position: "absolute",
                top: top,
                left: left,
                maxHeight: maxHeight,
                transform: "translate(-50%, -50%)",
                width: width,
                height: height,
                bgcolor: "background.paper",
                overflowY: overflowData,
                display: display,
                alignItems: alignItems,
                justifyContent: justifyContent,
                widget_title: widget_title,
                widget_description: widget_description,
                componentId: componentId,
              }}
              style={{ transition: "all 0.5s ease-in-out" }}>
              {showCrossIcon && (
                <TypographyModalClose
                  $iconRight={iconRight}
                  $iconTop={iconTop}
                  $iconMobRight={iconMobRight}
                  $iconMobTop={iconMobTop}
                  onClick={() => {
                    callGaEvent();
                    handleClose();
                  }}>
                  {pdpPopup && toggle ? (
                    <img
                      src={`${ReplaceImage(close_circle?.url)}`}
                      alt="close_icon"
                      width={"35px"}
                    />
                  ) : (
                    <HighlightOffIcon sx={{ color: "#FFFFFF" }} />
                  )}
                </TypographyModalClose>
              )}
              {Component}
            </MainBox>
          </Fade>
        </Modal>
      )}
    </Box>
  );
};
export default BasicModal;
