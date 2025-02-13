import React, { useEffect, useState } from "react";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  ButtonBox,
  ButtonText,
  CustomInput,
  FlexBox,
  PageBox,
  PaginationText,
  StyledPagination,
} from "../../components/ProductLayout/ProductLayoutStyles";
import { useMobileCheck } from "../../utility/isMobile";
import triggerGAEvent from "../../utility/GaEvents";
import { useRouter } from "next/router";
import { Pagination } from "@mui/material";
export default function CustomPagination(props: any) {
  const {
    count,
    pageCount,
    page,
    boundaryCount,
    siblingCount,
    scrollMargin = 0,
    pageSize = 3,

  } = props;
  const isMobile = useMobileCheck();
  const [goToPage, setGoToPage] = useState(" ");
  const [disableInput, setDisableInput] = useState(false)
  const router = useRouter();
  const handlePage = (value: any) => {
    if (
      value <= Math.ceil(pageCount) &&
      value != "0" &&
      value % 1 === 0 &&
      !value.toString()?.includes(".")
    ) {
      setGoToPage(value);
    }
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setGoToPage("");
    props?.setPage(value);
    props?.fieldRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    if (scrollMargin > 0) {
      props?.fieldRef?.current.scrollIntoView(true);
      let scrolledY = window.scrollY;
      if (scrolledY) {
        window.scroll(0, scrolledY - scrollMargin);
      }
    }
    pagiNationEvent(page);
  };
  const onGoPaginationHandler = () => {
    props?.setPage(Number(goToPage));
    setGoToPage(" ")
    props?.fieldRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    if (scrollMargin > 0) {
      props?.fieldRef?.current.scrollIntoView(true);
      let scrolledY = window.scrollY;
      if (scrolledY) {
        window.scroll(0, scrolledY - scrollMargin);
      }
    }
    pagiNationEvent("GO");
  };

  const pagiNationEvent = (link_text: string) => {
    triggerGAEvent(
      {
        widget_type: "pagination",
        widget_position: 3,
        link_url: window?.location?.href,
        link_text: link_text,
        no_of_items: pageCount,
        index: 1,
        event_type: "pagination"
      },
      "click"
    );
  };

  useEffect(() => {
    let target = document.getElementById('flex-box');
    document.addEventListener('scroll', () => {
      if (router?.asPath.includes("/account/orders")) {
        if (target) {
          if (window.scrollY >= target?.getBoundingClientRect().top) {
            setDisableInput(true)
          } else {
            setDisableInput(false)
          }
        }
      } else {
        setDisableInput(true)
      }
    })
  }, [])

  return (
    <FlexBox $isMobile={isMobile} flexDirection={isMobile ? "column" : "row"} id="flex-box">
      <PaginationText>
        {`Showing results ${(page - 1) * pageSize + 1} - ${page * pageSize >= count ? count : page * pageSize
          } of ${count}`}
      </PaginationText>
      <Stack spacing={2}>
        <StyledPagination
          count={pageCount}
          page={Number(page)}
          onChange={handleChange}
          renderItem={(item: any) => (
            <PaginationItem
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
              sx={{
                fontSize: isMobile ? "13px" : "14px",
              }}
            />
          )}
        />
      </Stack>
      {disableInput &&
        (<PageBox>
          <ButtonText>Go to page</ButtonText>
          <CustomInput
            value={goToPage}
            disableUnderline
            onChange={(e: any) => handlePage(e?.target?.value)}
            onKeyDown={(e: any) => e?.key === "Enter" && onGoPaginationHandler()}
          ></CustomInput>
          <ButtonBox
            onClick={() =>
              goToPage !== " " &&
              goToPage?.length !== 0 &&
              onGoPaginationHandler()
            }
          >
            GO
          </ButtonBox>
        </PageBox>
        )}
    </FlexBox>
  );
}
