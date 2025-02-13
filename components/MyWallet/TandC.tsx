import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { accordianGrid,widthAfterVerify,marginAfterVerify } from './MyWalletStyles';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionDetails-root':{
    padding:'0px'
  }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
type proptype={
tAndC? :string,
faqAns?:string
}

export default function CustomizedAccordions(props:proptype) {
  const [expanded, setExpanded] = React.useState<string | false>('');
  const [expandedparent, setExpandedParent] = React.useState<string | false>('');
  const [texpanded, tsetExpanded] = React.useState<string | false>('');

  const parentAccordian =
    (panel: string,parent: string="") => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

    const nestedAccordianChange =
    (panel: string,parent: string="") => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedParent(newExpanded?panel:false)
    };
    
  return (
    
    <Grid container  direction="row" justifyContent="flex-start" sx={{...accordianGrid,marginAfterVerify,...widthAfterVerify}}  >
     
      <Grid item xs={12} md={12} sm={12} >
        <br/><br />
          <Accordion expanded={expanded === 'panel3'} onChange={parentAccordian('panel3')} >
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            </AccordionSummary>
            <AccordionDetails>
           
             <Typography></Typography>
            </AccordionDetails>
          </Accordion>
      </Grid>
    </Grid>
   
  );
}
