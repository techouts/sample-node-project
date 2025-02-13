import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  CategoryAccordion,
  CategoryAccordionSummary,
  AccordionSummaryText,
  AccordionDetailsText,
  CategoryDetails,
  CategoryTitle,
  CategoryHeader,
  CategoryAllText,
} from "./styles";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useRouter } from "next/router";
import { PLP_SEARCH_ROUTE } from "../../utility/Constants";
import { Event_type } from "../../utility/GAConstants";
import triggerGAEvent from "../../utility/GaEvents";

export default function Categories({ callBack, ...categoriesData }: any) {
  const router = useRouter();

  const callCategoryEvent = (
    cat: string,
    catid: any,
    cat2: string,
    cat2id: any,
    cat3: string,
    cat3id: any
  ) => {
    triggerGAEvent(
      {
        widget_title: router?.pathname,
        link_text: cat3,
        link_url: PLP_SEARCH_ROUTE,
        event_type: Event_type,
        item_name: cat2,
        item_category: cat || "na",
        item_category2: cat2 || "na",
        item_category3: cat3 || "na",
        item_category_id: catid?.toString() || "na",
        item_category2_id: cat2id?.toString() || "na",
        item_category3_id: cat3id?.toString() || "na",
      },
      "menu"
    );
  };

  return (
    <Box>
      <Stack direction={"column"}>
        <CategoryHeader direction={"row"} alignItems="center">
          <ArrowBackOutlinedIcon
            onClick={() => {
              callBack !== undefined && callBack(true);
            }}
            sx={{ mr: 1 }}
          />
          <CategoryTitle>{categoriesData.name}</CategoryTitle>
        </CategoryHeader>
        <CategoryDetails>
          <CategoryTitle>{`Browse ${categoriesData.name}`}</CategoryTitle>
          <CategoryAllText
            onClick={() => {
              window.location.assign(
                `${window.location.origin}/${categoriesData.url_key}/c/${categoriesData.id}?category_id=${categoriesData?.id}`
              );
            }}
          >
            {"See All"}
          </CategoryAllText>
        </CategoryDetails>
        {categoriesData?.children?.map(
          (
            child: {
              id: number | string;
              name: string;
              children: any[];
              url_key: string;
            },
            index: number
          ) => {
            return (
              <>
                {child?.children?.length > 0 &&
                  child?.children?.reduce((accumulator, object) => {
                    return accumulator + object.product_count;
                  }, 0) > 0 && (
                    <CategoryAccordion key={index}>
                      <CategoryAccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <AccordionSummaryText>
                          {child?.name}
                        </AccordionSummaryText>
                      </CategoryAccordionSummary>
                      <AccordionDetails>
                        <AccordionDetailsText
                          onClick={() => {
                            window.location.assign(
                              `${window.location.origin}/${categoriesData.url_key}/${child.url_key}/c/${child.id}?category_id=${child?.id}`
                            );
                          }}
                        >
                          {"All"}
                        </AccordionDetailsText>
                        {child?.children?.map(
                          (
                            subChild: {
                              id: number | string;
                              name: string;
                              product_count: number;
                              url_key: string;
                            },
                            idx: number
                          ) => {
                            return (
                              <>
                                {subChild?.product_count > 0 && (
                                  <AccordionDetailsText
                                    key={idx}
                                    onClick={() => {
                                      window.location.assign(
                                        `${window.location.origin}/${categoriesData.url_key}/${child.url_key}/${subChild?.url_key}/c/${subChild.id}?category_id=${subChild?.id}`
                                      );
                                      callCategoryEvent(
                                        categoriesData.name,
                                        categoriesData?.id,
                                        child?.name,
                                        child?.id,
                                        subChild?.name,
                                        subChild?.id
                                      );
                                    }}
                                  >
                                    {subChild?.name}
                                  </AccordionDetailsText>
                                )}
                              </>
                            );
                          }
                        )}
                      </AccordionDetails>
                    </CategoryAccordion>
                  )}
              </>
            );
          }
        )}
      </Stack>
    </Box>
  );
}
