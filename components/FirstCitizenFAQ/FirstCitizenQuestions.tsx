import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { Box } from "@mui/system";
import {
  AddIconStyled,
  DescrptionTypography,
  RemoveIconStyled,
  StyledArrows,
  TitleTypography,
  ViewMoreTypography,
} from "./FirstCitizenQuestionStyle";
import { Divider, Paper } from "@mui/material";
import { callEventBeautyProfileMyWallet } from "../BeautyProfile/BeautyProfileMyWallet";
import { eventType, Widget_type } from "../../utility/GAConstants";
import { useMobileCheck } from "../../utility/isMobile";
const FirstCitizenQuestions = (data: any) => {
  const isMobile = useMobileCheck();
  const [click, setClick] = useState(-1);
  const [parentClick, setParentClick] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(5);

  const handleclick = (
    index?: any,
    linkText?: string,
    description?: string
  ) => {
    callEventBeautyProfileMyWallet(
      eventType,
      Widget_type,
      data?.title,
      linkText,
      "",
      "",
      description
    );
    if (click == index) {
      setClick(-1);
    } else {
      setClick(index);
    }
  };

  const parentClickHandler = () => {
    callEventBeautyProfileMyWallet(
      eventType,
      Widget_type,
      data?.title,
      data?.title,
      "",
      "",
      ""
    );
    if (data?.items?.length > 0) {
      if (!parentClick) {
        setParentClick(true);
        showless();
        handleclick();
      } else {
        setParentClick(false);
      }
    } else {
      data?.titlePath &&
        window.location.assign(`${window.location.origin}${data?.titlePath}`);
    }
  };

  const showmore = () => {
    data?.items?.length && setItemsToShow(data?.items?.length);
  };

  const showless = () => {
    setItemsToShow(5);
  };

  return (
    <Box
      p={data?.bgPadding || 0}
      sx={{
        margin: "20px 0px",
      }}
    >
      <Accordion
        sx={{
          boxShadow: "none",
          borderBottom: "2px solid #E1E1E1",
          border: "2px solid #E1E1E1",
          borderRadius: "0px !important",
        }}
      >
        <AccordionSummary
          expandIcon={<StyledArrows $click={parentClick} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{}}
          onClick={() => parentClickHandler()}
        >
          <Typography>{data?.title}</Typography>
        </AccordionSummary>
        {data?.items?.slice(0, itemsToShow).map((list: any, index: any) => (
          <>
            <Paper sx={{ boxShadow: "none" }}>
              <Accordion
                style={{
                  boxShadow: " 0px 1px 0px 0px white",
                  borderRadius: "0px",
                }}
                expanded={click == index ? true : false}
              >
                <AccordionSummary
                  expandIcon={
                    click == index ? <RemoveIconStyled /> : <AddIconStyled />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() =>
                    handleclick(index, list?.title, list?.description)
                  }
                >
                  <TitleTypography isMobile={isMobile}>
                    {list?.title}
                  </TitleTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <DescrptionTypography
                    isMobile={isMobile}
                    dangerouslySetInnerHTML={{ __html: list?.description }}
                  ></DescrptionTypography>
                </AccordionDetails>
                {index + 1 < data?.items?.length && <Divider />}
              </Accordion>
            </Paper>
          </>
        ))}
        {data?.title == "FAQs" && (
          <>
            {itemsToShow === 5 ? (
              <ViewMoreTypography isMobile={isMobile} onClick={showmore}>
                View More
              </ViewMoreTypography>
            ) : (
              <ViewMoreTypography onClick={showless}>
                View Less
              </ViewMoreTypography>
            )}
          </>
        )}
      </Accordion>
    </Box>
  );
};
export default FirstCitizenQuestions;
