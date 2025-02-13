import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useState } from "react";
import { useMobileCheck } from "../../utility/isMobile";
import { ViewAllText } from "./MultiTabsStyles";
import triggerGAEvent from "../../utility/GaEvents";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
let gaTitle = ""
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export function MultiTabs({ data, updateCartSuggestions }: any) {
  const isMobile = useMobileCheck();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const callViewall = () => {
    triggerGAEvent(
      {
        component_id: "na",
        widget_type: "na",
        item_type: "na",
        widget_title: gaTitle,
        widget_description: "na",
        widget_position: "na",
        no_of_items: data?.length,
        item_brand: "na",
        item_category: "na",
        link_url: window?.location?.origin,
        link_text: "VIEW ALL"
      },
      "view_all"
    );
  };
  return (
    <Box sx={{ width: "100%" }}>
      {data?.length !== 0 && (
        <>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="multi-tabs"
              sx={{
                "& .css-iyhfac-MuiButtonBase-root-MuiTab-root.Mui-selected": {
                  color: "#AD184C",
                  fontWeight: 500,
                },
                "& .css-1vujrym-MuiButtonBase-root-MuiTab-root.Mui-selected": {
                  color: "#AD184C",
                },
                "& .css-1x1yhhz.Mui-selected": {
                  color: "#AD184C !important",
                  fontWeight: 500,
                },

                "& .MuiTabs-indicator": {
                  backgroundColor: "#AD184C !important",
                },
              }}
            >
              {data?.map((tab: any, index: number) => {
                gaTitle = tab?.tabTitle
                return (
                  <Tab
                    value={index}
                    label={tab?.tabTitle}
                    {...a11yProps(index)}
                    sx={{
                      fontSize: "20px",
                      lineHeight: "30px",
                      padding: "7px 10px",
                      textTransform: "capitalize",
                      color: "#231F20",
                    }}
                    disableRipple={true}
                  />
                );
              })}
            </Tabs>
            <ViewAllText
              $isMobile={isMobile}
              onClick={() => {
                callViewall();
                window.location.assign(`${window.location.origin}${data[value]?.tabData?.navigationUrl}`)
              }}
            >
              {"View all"}
            </ViewAllText>
          </Box>

          {data?.map((tab: any, index: number) => {
            const Component = tab?.Component;
            const uniqueKeyValue = index
            return (
              <TabPanel key={uniqueKeyValue} value={value} index={index}>
                <Component products={tab?.tabData?.componentData} updateCartSuggestions={updateCartSuggestions} />
              </TabPanel>
            );
          })}
        </>
      )}
    </Box>
  );
}
