import * as React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Select from "@mui/material/Select";
import BasicModal from "../../HOC/Modal/ModalBlock";
import { useState } from "react";
import CustomDateRangeModel from "./CustomDateRangeModel";
import { Box, Typography } from "@mui/material";
import { useMobileCheck } from "../../utility/isMobile";
import { FilterMenuItem } from "./MyServiceRequestStyles";
import { FilterContentType, getCustomDateRange } from "./MyServiceUtils";
import { useRouter } from "next/router";

const MultipleSelectPlaceholder = ({
  filterRange,
  setDateRange,
  setFilterRange,
  filterType,
  filters,
  serviceRequestAttributes,
  isTransactionLogs = false,
}: {
  filterType?: string;
  filterRange?: string;
  setDateRange?: React.Dispatch<React.SetStateAction<[Date, Date]>>;
  setFilterRange?: React.Dispatch<React.SetStateAction<string>>;
  filters?: FilterContentType[];
  serviceRequestAttributes: any;
  isTransactionLogs?: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [dateModelOpen, setDateModelOpen] = useState(false);
  const router = useRouter();
  const selectedFilter = filters?.find(
    (i) => i.keyName === serviceRequestAttributes?.filterName
  );
  const handleOpen = () => {
    setDateModelOpen(!dateModelOpen);
  };
  const handleClose = () => {
    setDateModelOpen(!dateModelOpen);
  };

  const isMobile = useMobileCheck();
  const handleChange = (event: any) => {
    const targetedValue = filters?.find(
      (i) => i?.keyName === event?.target?.value
    );
    if (typeof setFilterRange === "function") {
      setFilterRange(event?.target?.value || "");
    }
    if (targetedValue?.keyId === "customRange") {
      setDateModelOpen(true);
    } else {
      !isTransactionLogs &&
        router.push({
          pathname: "/account/service-request",
          query: {
            filterName: targetedValue?.keyName,
            page: 1,
          },
        });
    }
  };

  const handleSubmitHandler = (from: Date, to: Date) => {
    if (filterType?.toLocaleLowerCase() === "wallet") {
      if (setFilterRange && setDateRange) {
        setFilterRange("select custom date range");
        setDateRange([from, to]);
      }
    } else {
      const customDateRange = getCustomDateRange(
        from ?? new Date(),
        new Date(to.setDate(to?.getDate() + 1))
      );
      router.push({
        pathname: "/account/service-request",
        query: {
          filterName: filters?.find((i) => i.keyId === "customRange")?.keyName,
          customDateRange: customDateRange,
          page: 1,
        },
      });
    }
    setDateModelOpen(false);
  };

  function renderValue(selected?: string) {
    if (
      selected?.length === 0 ||
      !selected ||
      Boolean(
        filters?.find((i) => i.keyId === "customRange")?.keyName === selected &&
          !serviceRequestAttributes?.filterName
      )
    ) {
      return (
        <Typography
          sx={{ color: "#231F20 ", fontWeight: 600, fontSize: "12px" }}
        >
          Filter By Date
        </Typography>
      );
    }
    return serviceRequestAttributes?.filterName
      ? serviceRequestAttributes?.filterName
      : selected;
  }

  return (
    <Box
      sx={{
        border: "none !important",
      }}
    >
      <FormControl
        sx={{
          width: isMobile ? "fit-content" : 300,
          alignContent: "center",
          pr: isMobile ? 0 : 2.5,
          "& .MuiSelect-select": {
            padding: "10px",
            border: "none !important",
            borderColor: "red !important",
          },
          "& .MuiInputBase-root .MuiOutlinedInput-root .Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "red !important",
            },
        }}
      >
        <Select
          sx={{
            boxShadow: isMobile ? "none" : "initial",
            "& .MuiOutlinedInput-notchedOutline": {
              border: isMobile ? 0 : "default !important",
              borderColor: "lightgray !important",
            },
          }}
          displayEmpty
          open={open}
          onOpen={() => setOpen(!open)}
          onClose={() => setOpen(!open)}
          value={selectedFilter?.keyName}
          onChange={handleChange}
          input={<OutlinedInput />}
          IconComponent={() =>
            open ? (
              <KeyboardArrowDownIcon
                onClick={() => {
                  setOpen(true);
                }}
                sx={{
                  paddingRight: isMobile ? "20px" : "8px",
                  fontSize: isMobile ? "2.5rem" : "1.5rem",
                }}
              />
            ) : (
              <KeyboardArrowRightIcon
                onClick={() => {
                  setOpen(true);
                }}
                sx={{
                  paddingRight: isMobile ? "20px" : "8px",
                  fontSize: isMobile ? "2.5rem" : "1.5rem",
                }}
              />
            )
          }
          renderValue={renderValue}
          inputProps={{ "aria-label": "Without label" }}
        >
          {filters?.map((filter) => (
            <FilterMenuItem
              key={filter?.keyId}
              value={filter?.keyName}
              onClick={() => {
                if (filter?.keyId == "customRange") {
                  setDateModelOpen(true);
                }
              }}
            >
              {filter?.keyName}
            </FilterMenuItem>
          ))}
        </Select>
      </FormControl>
      <>
        {dateModelOpen && (
          <BasicModal
            height={"auto"}
            width={isMobile ? "250px" : "300px"}
            top="50%"
            left="50%"
            toggle={false}
            pdpPopup={true}
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={dateModelOpen}
            closeIconStyles={{
              color: "lightgray",
              fontSize: "large !important",
              fontWeight: "bold",
              width: isMobile ? "2em" : "1.3em",
              height: isMobile ? "2em" : "1.3em",
              background: isMobile ? "#ffffff" : "",
              borderRadius: isMobile ? "50%" : "",
              position: isMobile ? "absolute" : "",
              Top: isMobile ? "3px" : "",
              marginTop: isMobile ? "-24px" : "",
              left: isMobile ? "-12px" : "",
            }}
            iconTop={"4%"}
            borderRadius="10px"
            Component={
              <CustomDateRangeModel
                setDateModelOpen={setDateModelOpen}
                handleSubmitHandler={handleSubmitHandler}
              />
            }
          />
        )}
      </>
    </Box>
  );
};
export default MultipleSelectPlaceholder;
