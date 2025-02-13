import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductCard from "../../../HOC/ProductCard/ProductCard";
const WebCardPDP = ({ items, isMobile }: any) => {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isMobile ? `repeat(2,1fr)` : `repeat(4,1fr)`,
        }}
      >
        {items?.map((item: any, index: number) => (
          <Grid key={index} sx={{padding:'5px 5px',width:'100%'}} xs={12}>
            <ProductCard details={item}></ProductCard>
          </Grid>
        ))}
      </Box>
    </>
  );
};

export default WebCardPDP;
