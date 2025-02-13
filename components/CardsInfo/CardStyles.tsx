import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
  export const BigBox = styled(Box)(({theme }) => ({
   width:"100%",
    backgroundColor:"#F5F5F5" 
  })
  )

export const TextBox =styled(Box)(({theme }) => ({
   fontSize:"1%",
   width:"100%",
  })
  )

  export const Typographys =styled(Typography)(({theme }) => ({
     fontWeight:"bold",
     textDecorationLine: "underline",
     objectFit: "cover",
    display:"flex",
    fontSize:"12px",
   })
   )
   
export const Typography1 =styled(Typography)(({theme }) => ({
fontStyle: "normal",
fontWeight:"600",
fontSize: "16px",
lineHeight: "140%",
"@media (max-width: 900px)": {
    fontSize:"15px",
    whiteSpace:"nowrap", 
    alignItems:"center", 
},   
   })
   )
   
   export const BorderBox =styled(Grid)(({theme }) => ({  
  "@media (max-width: 900px)": {
      display:"flex",
      flexDirection:"row",
      flexWrap: "nowrap",
      fontSize:"12px",
      width:"auto",
      alignItems: "center",
      },
    })
    )
    
   export const MarBox =styled(Box)(({theme }) => ({
    width:"100%",
  })
  )

export const TypographyFirst =styled(Typography)(({theme }) => ({
    width:"100%",
    fontSize:"16px",
   })
   )

   export const TypographyText =styled(Typography)(({theme }) => ({
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight:"150%",
    "@media (max-width: 900px)": {
     width:"100%",
    },
   })
   )
   
    export const BorderGrid =styled(Grid)(({theme }) => ({
        borderRight:"2px solid rgba(235,235,235,0.9)",
        padding:"1%",
        "&:last-child":{border:"none"},
        marginBottom:"1%",
        marginTop:"2%",
        "@media (max-width: 900px)": {
            borderBottom:"2px solid rgba(235,235,235,0.9)",
           
            marginLeft:"20px",
             borderRight:"none",
             padding:"4%",
          },        
       })
       )