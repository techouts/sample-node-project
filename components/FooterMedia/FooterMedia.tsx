import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import {
  MainGrid,
  Typographysub,
  TextFeildBox,
  MainBox,
} from "./FooterMediaStyle";
import FooterMediaInterface from "../../schemas/FooterMediaSchema";
import { ReplaceImage } from "../../utility/ReplaceImage";
const handleClick = (url: string, isMobile: Boolean) => {
  isMobile ?  window.location.assign(url) : window.open(url);
};
const FooterMedia = ({ data }: FooterMediaInterface) => {
  const [isMobile, setIsmobile] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  useEffect(() => {
    setIsmobile(!matches);
  }, [matches]);
  return (
    <MainBox>
      <Box
        p={data.bgPadding}
        bgcolor={data.bgColor}
        sx={{
          border: isMobile ? "0px" : "1px solid rgba(167, 165, 166, 0.34)",

          padding: "20px",
          width: "90%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Box>
          <Grid container spacing={2}>
            <Grid
              item
              sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
            >
              <Typography sx={{ marginTop: "12px" }}>
                {data.followText}
              </Typography>
              <Box sx={{ flexDirection: "row", display: "flex", gap: "10px" }}>
                {data.items.map((item, index) => (
                  <Box key={index} sx={{ cursor: "pointer" }}>
                    <img
                      onClick={() => handleClick(item.imagePath, isMobile)}
                      src={`${ReplaceImage(String(item.imageUrl))}`}
                      alt="social media image"
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
            {isMobile && (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            )}
            <MainGrid item>
              <Box>
                <Typographysub
                  isMobile={isMobile}
                  sx={{ marginTop: "12px", width: "max-content" }}
                >
                  {data.subscibeText}
                </Typographysub>
              </Box>
              <TextFeildBox>
                <TextField
                  id="standard-name"
                  placeholder={data.placeholderText}
                  sx={{
                    backgroundColor: "#FFFFFF",
                    width: isMobile ? "100%" : "100%",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          sx={{
                            backgroundColor: "black",
                            color: "#DEA3B7",
                            height: "52px",
                          }}
                        >
                          {data.buttonText}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </TextFeildBox>
            </MainGrid>
          </Grid>
        </Box>
      </Box>
    </MainBox>
  );
};
export default FooterMedia;
