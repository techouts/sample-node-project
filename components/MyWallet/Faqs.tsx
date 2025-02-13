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
import data from '../../JSON/Mywallet/Mywallet.json'
import MinusComponet from './MinusComponet';
import { accordianGrid, accordianRelated, textToCenter, WalletTypography,widthAfterVerify,marginAfterVerify } from './MyWalletStyles';
import TandC from './TandC';

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
faqAns:string
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
      <Grid item xs={12} md={12} sm={12}  sx={{borderBottom:"0px solid #E1E1E1"}}>
          <Accordion expanded={expanded === 'panel2'} onChange={parentAccordian('panel2')}   >
            <AccordionSummary    aria-controls="panel2d-content" id="panel2d-header">
              <WalletTypography
                dcolor='#231F20'
                dfontweight='400'
                dfontsize='16px'
                dlineheight='19.09px' 
                mfontsize='12px' 
                mlineheight='14.32px'>
                FAQs
              </WalletTypography>
            </AccordionSummary>
            <AccordionDetails>         
              <Accordion expanded={expandedparent === 'panel21'} onChange={nestedAccordianChange('panel21', 'panel2')}>
                <AccordionSummary expandIcon={expandedparent === 'panel21' ? <MinusComponet img={data.data.faqminussymbol} /> : <MinusComponet img={data.data.faqplussymbol} />} aria-controls="panel2d-content" id="panel2d-header">
                  < WalletTypography
                    dcolor='#231F20'
                    dfontweight='600'
                    dfontsize='18px'
                    dlineheight='22.32px'
                    mfontsize='12px'
                    mlineheight='18px'
                  >How Do I Add A GIft Card into my SSBeauty Wallet?</WalletTypography>
                </AccordionSummary>
                <AccordionDetails>
                  < WalletTypography
                    dcolor='#4F4C4D'
                    dfontweight='400'
                    dfontsize='14px'
                    dlineheight='150%'
                    mfontsize='11px'
                    mlineheight='140%'
                  >
                    {props.faqAns}
                  </WalletTypography>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expandedparent === 'panel22'} onChange={nestedAccordianChange('panel22')}>
                <AccordionSummary expandIcon={expandedparent === 'panel22' ? <MinusComponet img={data.data.faqminussymbol} /> : <MinusComponet img={data.data.faqplussymbol} />} aria-controls="panel22d-content" id="panel22d-header">
                  < WalletTypography
                    dcolor='#231F20'
                    dfontweight='600'
                    dfontsize='18px'
                    dlineheight='22.32px'
                    mfontsize='12px'
                    mlineheight='18px'
                  >Where Can I Use My SSBeauty Balance?</WalletTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>

                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expandedparent === 'panel23'} onChange={nestedAccordianChange('panel23')}>
                <AccordionSummary expandIcon={expandedparent === 'panel23' ? <MinusComponet img={data.data.faqminussymbol} /> : <MinusComponet img={data.data.faqplussymbol} />} aria-controls="panel23d-content" id="panel23d-header">
                  < WalletTypography
                    dcolor='#231F20'
                    dfontweight='600'
                    dfontsize='18px'
                    dlineheight='22.32px'
                    mfontsize='12px'
                    mlineheight='18px'
                  >What Happens If I Return The Items Which I have bought with SSBeauty Gift Card?</WalletTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>

                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expandedparent === 'panel24'} onChange={nestedAccordianChange('panel24')}>
                  <AccordionSummary expandIcon={expandedparent === 'panel24'?<MinusComponet img={data.data.faqminussymbol} />: <MinusComponet img={data.data.faqplussymbol} />}    aria-controls="panel23d-content" id="panel23d-header">
                    < WalletTypography
                      dcolor='#231F20'
                      dfontweight='600'
                      dfontsize='18px'
                      dlineheight='22.32px' 
                      mfontsize='12px' 
                      mlineheight='18px'
                      >Can my SSBeauty Wallet be suspended/ closed?
                    </WalletTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    
                    </Typography>
                  </AccordionDetails>
              </Accordion>
              <Accordion expanded={expandedparent === 'panel25'} onChange={nestedAccordianChange('panel25')}>
                  <AccordionSummary expandIcon={expandedparent === 'panel25'?<MinusComponet img={data.data.faqminussymbol} />: <MinusComponet img={data.data.faqplussymbol} />}    aria-controls="panel23d-content" id="panel23d-header">
                        < WalletTypography
                      dcolor='#231F20'
                      dfontweight='600'
                      dfontsize='18px'
                      dlineheight='22.32px' 
                      mfontsize='12px' 
                      mlineheight='18px'
                    >Can I use partial SSBeauty Wallet cash to pay for my product?</WalletTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                  <Typography>
                  
                  </Typography>
                  </AccordionDetails>
              </Accordion>
              < WalletTypography
                    dcolor='#AD184C'
                    dfontweight='400'
                    dfontsize='14px'
                    dlineheight='150%' 
                    mfontsize='12px' 
                    mlineheight='18px'
                    sx={{textAlign:'center'}}><u>View Less</u>
              </WalletTypography>
            </AccordionDetails>
          </Accordion>
      </Grid>
      <Grid item xs={12} md={12} sm={12} sx={{marginBottom:"18px"}} >
        <br />  
          <Accordion expanded={expanded === 'panel3'} onChange={parentAccordian('panel3')} sx={{ ...accordianRelated }}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <WalletTypography
                dcolor='#231F20'
                dfontweight='400'
                dfontsize='16px'
                dlineheight='19.09px'
                mfontsize='12px'
                mlineheight='14.32px'>
                T&Cs
              </WalletTypography>

            </AccordionSummary>
            <AccordionDetails>
              <WalletTypography
                dcolor='#4F4C4D'
                dfontweight='400'
                dfontsize='14px'
                dlineheight='21px'
                mfontsize='11px'
                mlineheight='16.5px'>

                {props?.tAndC}
              </WalletTypography>
              < WalletTypography
                dcolor='#AD184C'
                dfontweight='400'
                dfontsize='14px'
                dlineheight='150%'
                mfontsize='12px'
                mlineheight='18px'

                sx={textToCenter}><u>View Less</u></WalletTypography>
            </AccordionDetails>
          </Accordion>
          
      </Grid>
    </Grid>
  
   
  );
}
