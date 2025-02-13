import React, { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import { BrandsTitle } from "./SearchVisibleStyle";
import { PLP_SEARCH_ROUTE } from "../../utility/Constants";

interface Item {
  title: string;
  path?: string;
  isNewTab?: boolean;
  autosuggest?: string;
}

interface SearchPopupProps {
  items?: Item[];
  title?: string;
  isMobile: boolean;
  analyticsFragments?: string;
}

const SearchPopup = ({
  items = [],
  title = "",
  isMobile,
  analyticsFragments = "",
}: SearchPopupProps) => {
  const [visibleItemsCount, setVisibleItemsCount] = useState(
    isMobile ? 12 : 20
  );

  const handleItemClick = (item: Item) => {
    if (item?.autosuggest) {
      let newURL = encodeURIComponent(item?.autosuggest);
      window.location.assign(
        `${window.location.origin}/${PLP_SEARCH_ROUTE}?search=${newURL} ${
          analyticsFragments ? `& ${analyticsFragments}` : ""
        }`
      );
    } else if (item?.path) {
      if (item?.isNewTab) {
        window.open(item?.path, "_blank");
      } else {
        window?.location?.assign(`${window?.location?.origin}${item?.path}`);
      }
    }
  };

  const handleShowMore = () => {
    setVisibleItemsCount(items?.length);
  };

  return (
    <Grid item>
      {title && <BrandsTitle variant="h6">{title}</BrandsTitle>}
      <Box
        sx={{
          "@media (max-width:640px)": {
            marginBottom: "0px",
          },
        }}>
        <Grid container spacing={1} style={{ marginTop: "5px" }}>
          {items?.slice(0, visibleItemsCount).map((item, index) => (
            <Grid
              item
              key={index}
              sx={{
                textAlign: "center",
                cursor: "pointer",
                padding: isMobile ? "" : "12px",
              }}>
              <Box onClick={() => handleItemClick(item)}>
                <Box
                  sx={{
                    padding: isMobile ? "0.3rem 0.9rem" : "0.5rem 0.9rem",
                    borderRadius: "1rem",
                    border: "1px solid gray",
                    color: "#000",
                    fontSize: isMobile ? "10px" : "14px",
                    fontFamily: "Montserrat",
                    whiteSpace: "nowrap",
                  }}>
                  {item?.title}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {items?.length > visibleItemsCount && isMobile && (
          <Box textAlign="left">
            <Button
              sx={{
                color: "#000",
                fontSize: "10px",
                fontFamily: "Montserrat",
                textTransform: "capitalize",
                display: "none",
              }}
              onClick={handleShowMore}>
              + more
            </Button>
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default SearchPopup;
