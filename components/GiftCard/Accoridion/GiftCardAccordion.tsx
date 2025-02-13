import {CardContent} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import {
  DownArrow,
  HowToUseContent,
  HowToUseTitle,
  InnerTitle,
  RightArrow,
  ViewButton,
} from "../Accoridion/AccordionStyles";

export interface AccordionSchema {
  item: itemsSchema[];
}

export type itemsSchema = {
  title: string;
  subItems: subItemsSchema[];
};

export type subItemsSchema = {
  title: string;
  description: string;
};

const GiftCardAccoridon = (props: any) => {
  const [showmore, setShowmore] = useState(false);
  const [tcshowmore, setTcShowmore] = useState(false);
  const [isLoadmore, setIsLoadmore] = useState(true);
  const [isDataStore, setIsDataStore] = useState(-1);

  const toggleTCShowArrow = (data: any) => {
    if (isDataStore == data) {
      setIsDataStore(-1);
    } else {
      setIsDataStore(data);
    }
  };

  const toggleShowArrow = () => {
    setShowmore((showmore) => !showmore);
  };

  const ShowMore = () => {
    setIsLoadmore(!isLoadmore);
  };

  return (
    <>
      {props?.item?.map((itemList: itemsSchema, index: number) => (
        <Box
          sx={{ gap: "20px", display: "grid", padding: "2% 5% 2%" }}
          key={index}
        >
          <CardContent
            sx={{ border: "1px solid #EAEAEA", cursor: "pointer" }}
            onClick={() => toggleTCShowArrow(index)}
          >
            <Box
              onClick={() => toggleTCShowArrow(index)}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <HowToUseTitle>{itemList?.title}</HowToUseTitle>
              {isDataStore == index ? (
                <DownArrow onClick={() => toggleTCShowArrow(index)} />
              ) : (
                <RightArrow onClick={() => toggleTCShowArrow(index)} />
              )}
            </Box>
            {isDataStore == index && (
              <>
                {itemList?.subItems?.map(
                  (subAccoridon: subItemsSchema, index: number) => (
                    <>
                      <InnerTitle>{subAccoridon?.title}</InnerTitle>
                      <HowToUseContent
                        sx={{ pt: 3 }}
                        dangerouslySetInnerHTML={{
                          __html: subAccoridon?.description,
                        }}
                      ></HowToUseContent>
                    </>
                  )
                )}
              </>
            )}
            {isDataStore == index && (
              <ViewButton onClick={() => toggleTCShowArrow(index)}>
                viewLess
              </ViewButton>
            )}
          </CardContent>
        </Box>
      ))}
    </>
  );
};

export default GiftCardAccoridon;
