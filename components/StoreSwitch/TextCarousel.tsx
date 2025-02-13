import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef } from "react";
import { useMobileCheck } from "../../utility/isMobile";

const TextCarousel = ({
  data,
  isStoreMode,
}: {
  data: any;
  isStoreMode?: boolean;
}) => {
  const containerRef = useRef(null);
  const isMobile = useMobileCheck();

  return isMobile ? (
    <Box
      className="text-carousel-container"
      ref={containerRef}
      mx={isMobile ? 1 : 2}
    >
      <Box className="text-carousel-content">
        <Typography
          sx={{
            color: isStoreMode ? "#ffffff" : "#AD184C",
            textAlign: "left",
            padding: "7px 7px 7px 0px",
            whiteSpace: "nowrap",
            minWidth: "100%",
          }}
        >
          
          {data && data?.length > 3 ? "SS BEAUTY STORE" : data[1]?.title}
        </Typography>
      </Box>
    </Box>
  ) : (
    <Box ref={containerRef} mx={isMobile ? 1 : 1}>
      <Box>
        <Typography
          sx={{
            color: isStoreMode ? "#ffffff" : "#AD184C",
            textAlign: "left",
            padding: "7px 7px 7px 0px",
            whiteSpace: "nowrap",
            minWidth: "100%",
          }}
        >
          Welcome To {data && data?.length > 3 ? "SS BEAUTY STORE" : data[1]?.title}
        </Typography>
      </Box>
    </Box>
  );
};

export default TextCarousel;
