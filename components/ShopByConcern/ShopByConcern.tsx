/* eslint-disable @next/next/no-img-element */
import ShopByConcernInterface from "../../schemas/ShopByConcernSchema";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { CategoryImage} from "./ShopByConcernStyle";
import { useMobileCheck } from "../../utility/isMobile";

function ShopByConcern({ data }: ShopByConcernInterface) {
  const isMobile = useMobileCheck();

  return (
    <Box>
      <Grid
        container
        padding={isMobile ? "16px" : "101px"}
        columnSpacing={isMobile ? "24px" : "88px"}
        rowSpacing={isMobile ? "24px" : "58px"}
      >
        {data?.items?.map((item, index) => (
          <Grid item xs={6} sm={6} md={3} lg={3} key={index}>
            <Grid>
              <CategoryImage
                src={item?.imageUrl}
                alt="Top Categories"
                width="100%"
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ShopByConcern;
