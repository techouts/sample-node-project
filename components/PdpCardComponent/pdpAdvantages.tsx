import React from "react";

import {
  EasyAuthenticText,
  GridCont,
  GItem,
  StackStyle,
  Iconimg,
} from "./pdcardstyle";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMobileCheck } from "../../utility/isMobile";
import { useState, useEffect } from "react";
import BasicModal from "../../HOC/Modal/ModalBlock";
import AuthPdp from "./Authentic/AuthPdp";
import ReturnPdc from "./Return/ReturnPdc";
import { ReplaceImage } from "../../utility/ReplaceImage";

function PdpAdvantages({component,productData}:any) {
  const isMobile = useMobileCheck();
  const [isMobileAuth, setIsmobileAuth] = useState(false);
  const matches = useMediaQuery("(min-width:768px)");
  useEffect(() => {
    setIsmobileAuth(!matches);
  }, [matches]);

  const [authOpen, setAuthOpen] = useState(false);
  const AuthhandleOpen = () => {
    setAuthOpen(true);
  };
  const AuthhandleClose = () => setAuthOpen(false);

  const [exchangeOpen, setExchangeOpen] = useState(false);
  const ExchangehandleOpen = () => {
    setExchangeOpen(true);
  };
  const ExchangehandleClose = () => setExchangeOpen(false);

  return (
    <>
      <Box pt={isMobile ? "25px" : "16px"} width="100%">
        <GridCont container>
          <Stack direction="row" spacing={isMobile ? 1 : 2}>
            {component?.items?.[0]?.iconText && (
              <>
                <GItem item xs={6}>
                  <StackStyle direction={"row"} gap={0.6}>
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <Iconimg
                        src={`${ReplaceImage(component?.items?.[0]?.icon)}`}
                        alt="logo...."
                        onClick={ExchangehandleOpen}
                      />
                    </Box>
                    <BasicModal
                      height={"auto"}
                      width={isMobileAuth ? "100%" : "600px"}
                      top="50%"
                      left="50%"
                      handleOpen={ExchangehandleOpen}
                      handleClose={ExchangehandleClose}
                      open={exchangeOpen}
                      Component={
                        <ReturnPdc
                          data={component}
                          ExchangehandleClose={ExchangehandleClose}
                        />
                      }
                    />
                    <EasyAuthenticText>
                      <Stack onClick={ExchangehandleOpen}>
                        {component?.items?.[0]?.iconText}
                      </Stack>
                    </EasyAuthenticText>
                  </StackStyle>
                </GItem>
              </>
            )}

            {component?.items?.[1]?.iconText && (
              <>
                {" "}
                <GItem item xs={6}>
                  <StackStyle>
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <Iconimg
                        src={`${ReplaceImage(component?.items?.[1]?.icon)}`}
                        alt="logo...."
                        onClick={AuthhandleOpen}
                      />
                    </Box>
                    <BasicModal
                      height={"auto"}
                      width={isMobileAuth ? "100%" : "600px"}
                      top="50%"
                      left="50%"
                      handleOpen={AuthhandleOpen}
                      handleClose={AuthhandleClose}
                      open={authOpen}
                      Component={
                        <AuthPdp
                          data={component}
                          productData={productData}
                          AuthhandleClose={AuthhandleClose}
                        />
                      }
                    />
                    <Box>
                      <Stack direction="column" onClick={AuthhandleOpen}>
                        <EasyAuthenticText
                          sx={{
                            "& > p": {
                              color: "#A7A5A6",
                              fontWeight: 400,
                              margin: "0px",
                            },          
                          }}
                          dangerouslySetInnerHTML={{
                            __html: component?.items?.[1]?.iconText,
                          }}
                        ></EasyAuthenticText>
                      </Stack>
                    </Box>
                  </StackStyle>
                </GItem>
              </>
            )}
          </Stack>
        </GridCont>
      </Box>
    </>
  );
}

export default PdpAdvantages;
