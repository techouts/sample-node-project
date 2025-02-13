import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomDropDown from "../../HOC/CustomDropDown/CustomDropDown";
import Loader from "../../HOC/Loader/Loader";
import { subEvent_type } from "../../utility/GAConstants";
import triggerGAEvent from "../../utility/GaEvents";
import { useMobileCheck } from "../../utility/isMobile";
import DropDownInterface from "./BlogDropDownSchema";
import { ChipBox, DropDownBox, TitleTypography } from "./BlogDropDownStyles";
import { ReplaceImage } from "../../utility/ReplaceImage";
import handleErrorResponse from "../../utility/ErrorHandling";
const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

const BlogDropDown = ({
  id,
  bgPadding,
  bgColor,
}: DropDownInterface) => {
  const isMobile = useMobileCheck();
  const router = useRouter();
  const [selectedChip, setSelectedChip] = useState<any>(null);
  const [displayLoader, setLoader] = useState(false);
  const [title, setTitle] = useState("")
  const [items, setItems] = useState([])
  const handleChange = (labelPath: any, label: any, defaultValue: any) => {
    callMenuEvent(labelPath,label, defaultValue,);
    setLoader(true);
    router.push(`${labelPath}`);
  };

  const fetchData = () => {
    return fetch(
      `${NEXT_PUBLIC_CMS_URL}/api/blogs?filters[slug][$eq]=home`
    )
      .then((response) => response.json())
      .then(({data}) => {

      

        setItems(data?.[0]?.BlogNavigation?.items);
        setTitle(data?.[0]?.BlogNavigation?.title);
      });
  };
  useEffect(() => {
    fetchData();
  },[])

  useEffect(() => {
    setLoader(false);
  }, [router.query]);
  const filteredChip = items?.filter(
    (blogData:any) => blogData?.title == selectedChip?.title
  );
  const finalItems = selectedChip
    ? filteredChip?.length
      ? filteredChip
      : items
    : items;
    const callMenuEvent = (url:any,category2:any,category:any) => {
      triggerGAEvent(
        {
          widget_title: "na",
          link_text: category2,
          link_url:`${global?.window?.location.origin}${url}`,
          event_type: subEvent_type,
          item_name:category2,
          item_category:category,
          item_category2: category2,
          item_category_id: "na",
          item_category2_id: "na",
        },
        "menu"
      );
    };
  return (
    <>
      {displayLoader && <Loader />}
      <Box bgcolor={bgColor} p={isMobile ? "4% 0% 0% 4%" : bgPadding}>
        {title?.includes("http") ? (
          <Box
            sx={{
              textAlign: "center",
              height: isMobile ? "60px" : "60px",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedChip(null);
              router?.push("/beauty-blog/home");
              setLoader(true);
            }}
          >
            <img height={"120%"} src={ReplaceImage(title)} alt="logo" />
          </Box>
        ) : (
          <TitleTypography isMobile={isMobile}>{title}</TitleTypography>
        )}

        {finalItems?.length > 0 && (
          <DropDownBox>
            {finalItems?.map((blogData: any, index: number) => (
              <Box key={index}>
                {isMobile ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {selectedChip ? (
                        selectedChip?.list?.map((data: any) => {
                          return (
                            <ChipBox
                              label={data?.label}
                              variant="outlined"
                              onClick={() => {
                                router
                                  .push(`${data?.labelPath}`)
                                  .then((res) => {
                                    setSelectedChip(null);
                                  });
                                setLoader(true);
                              }}
                            />
                          );
                        })
                      ) : (
                        <ChipBox
                          label={blogData?.title}
                          variant="outlined"
                          onClick={() => setSelectedChip(blogData)}
                        />
                      )}
                    </Box>
                  </>
                ) : (
                  <CustomDropDown
                    list={blogData?.list}
                    toggle={true}
                    defaultValue={blogData?.title}
                    onClickHandler={handleChange}
                    titlePath={blogData?.titlePath}
                  />
                )}
              </Box>
            ))}
          </DropDownBox>
        )}
      </Box>
    </>
  );
};
export default BlogDropDown;
