import {
  BackgroundImage,
  StyledImage,
  NumberTypo,
  TitleTextTypo,
  VariantTextTypo,
} from "./Styles";
import { useMobileCheck } from "../../utility/isMobile";
import { Box } from "@mui/material";
import { useRef, useState } from "react";
import triggerGAEvent from "../../utility/GaEvents";
import { widget_type, event_type } from "../../utility/GAConstants";
import ViewEvent from "../../utility/viewEvent";
import { viewArray } from "../../utility/ViewEvenItemArray";

export const StepperComponentView = ({
  categories,
  category,
  index,
  position,
  setIsTicked,
  selectLipstickCategory,
  setSelectLipstickCategory,
  __component,
}: any) => {
  const isMobile = useMobileCheck();
  const viewEventWrapper = useRef();
  const [selectArr, setSelectArr] = useState(
    new Array(categories?.length).fill(-1)
  );
  const [selectedIndex, setSelectedIndex] = useState<number[]>(selectArr);
  const ProductSelectHandler = (
    index: number,
    id: number,
    selectedItem: string
  ) => {
    setSelectLipstickCategory({
      ...selectLipstickCategory,
      [index]: selectedItem,
    });
    const temp = selectedIndex;
    temp[index] = id;
    setSelectedIndex(temp);
    setIsTicked(true);
    categories?.[index]?.subCategories.map((obj: any, idx: number) => {
      if (idx === id) obj["checked"] = true;
      else obj["checked"] = false;
    });
    setSelectArr([...categories]);
    buyingEvent(
      "select_widget",
      index,
      categories?.[index]?.subCategories?.filter(
        (item: any, idn: number) => idn == id
      )?.[0]
    );
  };

  const buyingEvent = (eventtype: string, index: number, item: any) => {
    triggerGAEvent(
      {
        item_name: item?.text,
        event_type: eventtype,
        widget_title: category?.title,
        widget_description: "na",
        widget_postion: position,
        link_url: "na",
        link_text: item?.text,
        no_of_items: categories?.length,
        index: index + 1,
      },
      "click",
    );
  };

  const dataLayer = {
    item_id:`${__component}_${position}_${index + 1}`,
    widget_type: widget_type,
    item_name: "na",
    item_type: "na",
    widget_title: __component || "na",
    widget_description: category?.title ? category?.title : "na",
    widget_postion: position,
    no_of_items: categories?.length,
    item_brand: "na",
    item_category: "na",
    item_category2: "na",
    item_category3: "na",
    event_type: event_type,
    index:index + 1,
    view_items:viewArray(categories,`${__component}_${position}_`),
  };
  ViewEvent(viewEventWrapper, dataLayer, "view");

  return (
    <Box
      sx={{
        position: "relative",
        height: "max-content",
        width: "100%",
        paddingBottom: isMobile ? "10%" : "2%",
      }}
      ref={viewEventWrapper}
    >
      <BackgroundImage
        src={isMobile ? category?.bgImageUrlMobile : category?.bgImageUrl}
        alt={"bgImage-" + index}
      />
      <Box
        aria-label="content"
        sx={{
          width: "100%",
          position: "absolute",
          top: isMobile ? "5%" : "15%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <NumberTypo>{category?.titleNo}</NumberTypo>
        <TitleTextTypo>{category?.title}</TitleTextTypo>
      </Box>
      <Box
        sx={{
          margin: isMobile ? "-15% auto 0" : "-10% auto 0",
          width: isMobile ? "75%" : "100%",
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "max-content",
            display: "grid",
            gridTemplateColumns: `repeat(${
              isMobile ? 3 : category?.subCategories?.length
            },1fr)`,
            gap: isMobile ? "6px" : "15px",
            flexWrap: "wrap",
          }}
        >
          {category?.subCategories?.map((subCat: any, id: number) => (
            <>
              {category?.bgImageUrlMobile && category?.bgImageUrl && (
                <Box>
                  <Box
                    sx={{
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      ProductSelectHandler(index, id, subCat?.text);
                    }}
                  >
                    <StyledImage
                      isImageSelected={
                        subCat.checked ? "2px solid #DEA3B7" : "0px"
                      }
                      src={isMobile ? subCat?.imageUrlMobile : subCat?.imageUrl}
                      alt={`img-${index}-${id}`}
                    ></StyledImage>
                    <Box
                      aria-label="content"
                      sx={{
                        position: "absolute",
                        bottom: "0",
                        width: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        color: "#FFFFFF",
                      }}
                    >
                      <VariantTextTypo
                        $bgcolor={subCat?.bgColor}
                        $textColor={subCat?.textColor}
                      >
                        {subCat?.text}
                      </VariantTextTypo>
                    </Box>
                  </Box>
                </Box>
              )}
            </>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
