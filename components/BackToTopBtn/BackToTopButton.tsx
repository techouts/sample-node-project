import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useMobileCheck } from "../../utility/isMobile";
import { ReplaceImage } from "../../utility/ReplaceImage";
import { BACK_TO_TOP_ICON_URL } from "./Constants";

function BackToTopButton() {
  const isMobile = useMobileCheck();
  const [backToTopButton, setBackToTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backToTopButton && (
        <Box
          style={{
            position: "fixed",
            width: isMobile ? "38px" : "48px",
            height: isMobile ? "38px" : "48px",
            bottom: isMobile ? "130px" : "100px",
            right: "20px",
            zIndex: "999999",
            cursor: "pointer",
          }}
        >
          <img
            src={ReplaceImage(BACK_TO_TOP_ICON_URL)}
            alt="back2top"
            onClick={() => scrollUp()}
            style={{
              background: "white",
              borderRadius: "50%",
              width: isMobile ? "38px" : "48px",
              height: isMobile ? "38px" : "48px",
            }}
          />
        </Box>
      )}
    </div>
  );
}
export default BackToTopButton;
