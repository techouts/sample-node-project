import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
const TermsCondition = (data: any) => {
  return (
    <>
      {data?.items?.map((termsdata: any, index: any) => (
        <>
          <Accordion style={{ color: "#231F20" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{termsdata?.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography 
             
                dangerouslySetInnerHTML={{ __html: termsdata?.Description }}
              > </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      ))}
    </>
  );
};

export default TermsCondition;
