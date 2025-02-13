import React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Grid } from '@mui/material';
import TransactionalDetails from './TransactionalDetails';
import {TransactionLogsMargin, WalletTypography,widthAfterVerify} from './MyWalletStyles'

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props}  />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionDetails-root':{
    padding:'0px',
    
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2),
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

let row = (n:number) => {
  let rows = [];
  for (let i = 0; i<n; i++) {
      rows.push(<TransactionalDetails/>);
  }
  return rows;
}


export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>('');
  const [viewmore, setViewmore] = React.useState<Boolean>();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
      setViewmore(false)
    };
const dataReturn=function(){
  return (
    <>
              {row(3 )}
    </>
  )
}
  return (
    
    <Grid container  direction="row" justifyContent="flex-start" sx={{...TransactionLogsMargin}}>
        <Grid item xs={12} md={12} sm={12}  >
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={widthAfterVerify}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <WalletTypography
              dcolor='#231F20'
              dfontweight='400'
              dfontsize='16px'
              dlineheight='19.09px' 
              mfontsize='12px' 
              mlineheight='14.32px'>
                Transaction Logs
            </WalletTypography>
            </AccordionSummary>
            <AccordionDetails>
              
            {row(5)}
                {
                  viewmore ? <>{dataReturn()}< WalletTypography
                  dcolor='#AD184C'
                  dfontweight='400'
                  dfontsize='14px'
                  dlineheight='150%' 
                  mfontsize='12px' 
                  mlineheight='18px'
                  onClick={()=>setViewmore(!viewmore)}
                  sx={{textAlign:'center'}}><u>View Less</u></WalletTypography></>:
                  <>
                    < WalletTypography
                      dcolor='#AD184C'
                      dfontweight='400'
                      dfontsize='14px'
                      dlineheight='150%' 
                      mfontsize='12px' 
                      mlineheight='18px'
                    onClick={()=>setViewmore(!viewmore)}
                    sx={{textAlign:'center'}}><u>View More</u></WalletTypography>
                  </>
                }
            </AccordionDetails>
        </Accordion>
       
      </Grid>
    </Grid>
   
  );
}
