import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {
  SearchBar,
  Heading,
  Brand,
  SearchIcon,
  AlphabetText,
  ScrollBarBoxWrapper,
  ScrollBarStackWrapper,
  DropdownArrowsBox,
  BrandsUpArrowBox,
  BrandsDownArrowBox,
} from "./Styles";
import { useMobileCheck } from "../../../../../utility/isMobile";
import { SEARCH_NORMAL } from "../../../../../HOC/ProductCard/Constants";
import { ReplaceImage } from "../../../../../utility/ReplaceImage";
import {
  BRAND_DOWN_ARROW,
  BRAND_UP_ARROW,
} from "../../../../../utility/AppIcons";
import { AppIcons } from "../../../../../utility/AppIconsConstant";

export function AllBrands({ brandData }: any) {
  const [searchData, setSearchData] = useState("");
  const [brandsList, setBrandList] = useState<any>(
    brandData?.data?.[0]?.attribute_options
  );
  const [selectedAlphabet, setSelectedAlphabet] = useState<any>();
  const [scrolledEle, setScrolledEle] = useState<any>(0);

  useEffect(() => {
    let brandListArr = filterBrandsArr(brandData?.data?.[0]?.attribute_options);
    setBrandList(brandListArr);
  }, []);

  const filterBrandsArr = (data: any) => {
    let brandListArr = data?.map((obj: any) => {
      const cmsBrandsData = brandData?.data?.items;
      let index = cmsBrandsData?.findIndex(
        (key: any) => key?.brandCode === obj.value
      );
      const Capitalize = (sentenceCase: any) => {
        let out = "";
        sentenceCase.split(" ").forEach(function (el: any, idx: any) {
          let add = el.toLowerCase();
          out += add[0].toUpperCase() + add.slice(1) + " ";
        });
        return out;
      };
      return {
        ...obj,
        brandCode: obj?.value,
        brandName:
          index > -1
            ? cmsBrandsData?.[index]?.brandName
            : Capitalize(obj?.label),
        hide: index > -1 ? cmsBrandsData?.[index]?.hide : null,
        mappingSlug: index > -1 ? cmsBrandsData?.[index]?.mappingSlug : null,
        navType: index > -1 ? cmsBrandsData?.[index]?.navType : null,
        navUrl: index > -1 ? cmsBrandsData?.[index]?.navUrl : null,
      };
    });
    return brandListArr;
  };

  const isMobile = useMobileCheck();
  const HandleSearchBrands = (e: { target: { value: any } }) => {
    setSearchData(e.target.value);
    const filteredBrandData = filterBrandsArr(
      brandData?.data?.[0]?.attribute_options
    )?.filter((data: any) => {
      return data?.brandName
        ?.toLowerCase()
        ?.includes(e.target.value?.toLowerCase());
    });
    setBrandList(filteredBrandData);
  };

  return (
    <Stack direction={"column"} height={"100%"} pr={2} pl={2}>
      {!isMobile && <Heading>{brandData?.data?.headingText}</Heading>}
      <SearchBar isMobile={isMobile}>
        <TextField
          onChange={HandleSearchBrands}
          sx={{
            flex: 1,
            fontSize: "14px",
            color: "#231F20",
            height: "48px",
            "& ::placeholder": {
              color: "#231F20",
              fontSize: "14px",
              opacity: 1,
            },
            "&.MuiInputBase-root": { height: "48px", borderRadius: "0px" },
            "& .MuiOutlinedInput-root": {
              height: "48px",
              borderRadius: "0px",
              border: "0px solid #A7A5A6",
            },
          }}
          InputProps={{
            startAdornment: isMobile && (
              <InputAdornment position="start">
                {isMobile && (
                  <SearchIcon src={`${ReplaceImage(SEARCH_NORMAL)}`} />
                )}
              </InputAdornment>
            ),
          }}
          placeholder={brandData?.data?.searchText}
          aria-label="home-search-input"
          value={searchData}
        />
      </SearchBar>
      <RenderAllBrandsList
        brandsData={brandsList}
        defaultSlug={brandData?.data?.defaultSlug}
        setSelectedAlphabet={setSelectedAlphabet}
        selectedAlphabet={selectedAlphabet}
        setScrolledEle={setScrolledEle}
        scrolledEle={scrolledEle}
      />
    </Stack>
  );
}

const RenderAllBrandsList = (props: {
  brandsData: any;
  defaultSlug: any;
  setSelectedAlphabet: any;
  selectedAlphabet: any;
  scrolledEle: any;
  setScrolledEle: any;
}) => {
  const brandUpIcon = AppIcons(BRAND_UP_ARROW);
  const brandDownIcon = AppIcons(BRAND_DOWN_ARROW);
  const data = props?.brandsData?.filter((obj: any) => {
    return !obj?.hide;
  });

  const isMobile = useMobileCheck();
  const alphabets = [
    "#",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const sortedItems = data?.sort((a: any, b: any) =>
    a.brandName?.toLowerCase() > b.brandName?.toLowerCase() ? 1 : -1
  );
  const ScrollMatch = (item: any) => {
    props?.setSelectedAlphabet(item);
    const scrollTop = document.getElementById(item);
    scrollTop?.scrollIntoView({ behavior: "smooth" });
  };
  const handleBrandRedirection = (brandItem: any) => {
    if (brandItem?.navUrl) {
      window.location.assign(brandItem?.navUrl);
    } else {
      let url;
      if (brandItem?.navType === "landing" && brandItem?.mappingSlug) {
        url = `/brand/${brandItem?.mappingSlug}`;
      } else if (brandItem?.navType === "listing" && brandItem?.mappingSlug) {
        url = `/${brandItem?.brandName?.trim()?.replace(/\s/g, "-")}/c/${brandItem?.mappingSlug}?brand_name=${brandItem?.brandCode}`;
      } else if (props?.defaultSlug && props?.defaultSlug !== "") {
        url = `/${brandItem?.brandName?.trim()?.replace(/\s/g, "-")}${props?.defaultSlug}?brand_name=${brandItem?.brandCode}`;
      } else {
        url = `/${brandItem?.brandName?.trim()?.replace(/\s/g, "-")}/c/brand?brand_name=${brandItem?.brandCode}`;
      }
      
      window.location.assign(`${window.location.origin}${url}`);
      
    }
  };
  let divElement: any = document?.getElementById("brandList");
  let elemHeight: any = divElement?.offsetHeight;
  return (
    <>
      <ScrollBarStackWrapper
        direction={"row"}
        Width="100%"
        Height={isMobile ? `${window.innerHeight - 340}px` : "80%"}
      >
        <DropdownArrowsBox
          sx={{ display: isMobile ? "none !important" : "flex" }}
        >
          <BrandsUpArrowBox
            sx={{ visibility: props?.scrolledEle === 0 ? "hidden" : "unset" }}
            onClick={() => {
              divElement.scrollTop -= elemHeight;
              props?.setScrolledEle(divElement?.scrollTop);
            }}
          >
            <img src={brandUpIcon?.url} alt="Brands_Up_Icon" width="100%" />
          </BrandsUpArrowBox>
          <BrandsDownArrowBox
            sx={{
              visibility:
                props?.scrolledEle + elemHeight >= divElement?.scrollHeight
                  ? "hidden"
                  : "unset",
            }}
            onClick={() => {
              divElement.scrollTop += elemHeight;
              props?.setScrolledEle(divElement?.scrollTop);
            }}
          >
            <img src={brandDownIcon?.url} alt="Brands_Up_Icon" width="100%" />
          </BrandsDownArrowBox>
        </DropdownArrowsBox>
        <ScrollBarBoxWrapper
          Width="90%"
          Height="100%"
          ismobile={isMobile}
          sx={{ marginRight: "5px" }}
          mainScroll={true}
          id="brandList"
        >
          {sortedItems?.length > 0 &&
            sortedItems?.map((brandItem: any) => {
              return (
                <Box
                  id={
                    alphabets.findIndex((element) =>
                      element.includes(brandItem?.brandName?.[0]?.toUpperCase())
                    ) > -1
                      ? brandItem?.brandName?.[0]?.toLowerCase()
                      : "#"
                  }
                  key={brandItem?.brandName}
                  arial-label={"brandItems"}
                  onClick={() => handleBrandRedirection(brandItem)}
                >
                  <Brand>{brandItem?.brandName}</Brand>
                </Box>
              );
            })}
        </ScrollBarBoxWrapper>
        <ScrollBarBoxWrapper Width="15%" Height="100%" ismobile={isMobile}>
          {alphabets?.map((item: string) => {
            return (
              <AlphabetText
                sx={{
                  textDecoration:
                    props?.selectedAlphabet?.toUpperCase() === item
                      ? "underline"
                      : "none",
                }}
                onClick={() => ScrollMatch(item?.toLocaleLowerCase())}
                key={item}
              >
                {item}
              </AlphabetText>
            );
          })}
        </ScrollBarBoxWrapper>
      </ScrollBarStackWrapper>
    </>
  );
};
