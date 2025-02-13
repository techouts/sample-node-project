import { Grid } from '@mui/material'
import React from 'react'
import {WalletTypography} from './MyWalletStyles'
type proptype={
    name?:string,
    credited?:string,
    amt?:string,
    date?:string,
}

function TransactionalDetails(props :proptype ) {
    const {name="Gift Card",credited="Credited to SS Wallet ",amt="+500",date="22 May 2022"}=props
  return (
    <Grid container  direction="row" justifyContent="center" sx={{borderBottom:"1px solid #EBEBEB",paddingTop:'1%',paddingBottom:'1%'}}>
        <Grid item xs={6} md={6} sm={6} justifyContent="flex-start" >
            <div style={{float:"left"}}>
            <WalletTypography
              dcolor='#231F20'
              dfontweight='600'
              dfontsize='16px'
              dlineheight='20px' 
              mfontsize='11px' 
              mlineheight='13px'>
                 {name}
            </WalletTypography>
            
               
            </div>
        </Grid>
        <Grid item xs={6} md={6} sm={6} sx={{float:"right"}} >
            <div style={{float:"right"}}>
            <WalletTypography
              dcolor='#231F20'
              dfontweight='700'
              dfontsize='20px'
              dlineheight='24px' 
              mfontsize='12px' 
              mlineheight='15px'>
                {amt}
            </WalletTypography>
            </div>
        </Grid>
        <Grid item xs={6} md={6} sm={6} >
            <div style={{float:"left"}}>
            <WalletTypography
              dcolor='#656263'
              dfontweight='400'
              dfontsize='16px'
              dlineheight='19px' 
              mfontsize='11px' 
              mlineheight='13px'>
               {credited}
            </WalletTypography>
                
            </div>
        </Grid>
        <Grid item xs={6} md={6} sm={6} >
        <div style={{float:"right"}}>
            <WalletTypography
                dcolor='#A7A5A6'
                dfontweight='400'
                dfontsize='16px'
                dlineheight='19px' 
                mfontsize='11px' 
                mlineheight='13px'>
                    {date}
            </WalletTypography>
                
        </div>
        </Grid>
    </Grid>
  )
}

export default TransactionalDetails