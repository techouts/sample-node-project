import React, { useState } from "react";
import { useRouter } from "next/router";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMobileCheck } from "../../utility/isMobile";
import { EachTab, AllTabsBox } from "./StoresAndEventTabsStyle";
import TabsSchema from "./StoresAndEventTabsSchema";
import { tabevent_type, Widget_type } from "../../utility/GAConstants";
import triggerGAEvent from "../../utility/GaEvents";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function StoresAndEventsTabs({ items,__component,position }: TabsSchema) {
  const router = useRouter();
  const isMobile = useMobileCheck();
  const index = items.findIndex((obj) => {
    return obj?.isTabActive === true;
  });
  const [value, setValue] = useState(index > -1 ? index : 0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const callEvent = ( itemname:string,path:string) => {
    triggerGAEvent(
      {
        item_name:itemname,
        item_id:`${__component}_${position}_${index + 1}`,
        widget_type: Widget_type,
        item_type:"filters",
        widget_title:__component,
        widget_description:"na",
        widget_postion:position,
        link_url:`${global?.window?.location?.origin}${path}`,
        link_text:itemname,
        no_of_items:items?.length,
        index:index + 1,
        event_type: tabevent_type,
        component_id:path
      },
      "click"
    );
  };
  return (
    <Box>
      <AllTabsBox>
        <Tabs
          sx={{
            "& .MuiTabs-scroller": {
              "& .MuiTabs-flexContainer": {
                justifyContent: "space-between",
                "& button": { color: "#1C191A" },
              },
            },
          }}
          TabIndicatorProps={{
            style: {
              background: "#AD184C",
              borderRadius: "30px",
              height: isMobile ? "4px" : "6px",
            },
          }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {items.map((tab) => (
            <EachTab
              disableRipple
              key={tab.id}
              label={tab.text}
              onClick={() => {
                router.push(tab?.textPath);
                callEvent(tab.text,tab?.textPath);
              }}
            />
          ))}
        </Tabs>
      </AllTabsBox>
      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
    </Box>
  );
}
