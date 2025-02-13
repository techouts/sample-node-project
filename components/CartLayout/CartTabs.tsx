import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Typography } from "@mui/material";
import { useMobileCheck } from "../../utility/isMobile";
import { MainTabs, MainTabsMob, ViewMob, ViewText } from "./CartTabsStyles";

export default function CartTabs() {
  const [value, setValue] = React.useState("1");
  const isMobile = useMobileCheck();
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {!isMobile && (
        <TabContext value={value}>
          <MainTabs>
            <TabList onChange={handleChange}>
              <Tab label="Wishlist" value="1" />
              <Tab label="Buy It Again" value="2" />
            </TabList>
            <ViewText>VIEW ALL</ViewText>
          </MainTabs>
          <TabPanel value="1">wishlist carousel</TabPanel>
          <TabPanel value="2">but it again carousel</TabPanel>
        </TabContext>
      )}
      {isMobile && (
        <MainTabsMob>
          <Typography sx={{ color: "#AD184C" }}>Add From Wishlist</Typography>
          <ViewMob>VIEW ALL</ViewMob>
        </MainTabsMob>
      )}
    </Box>
  );
}
