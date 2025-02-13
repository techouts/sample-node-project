import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { SEARCH_NORMAL } from "../../../HOC/ProductCard/Constants";
import { ReplaceImage } from "../../../utility/ReplaceImage";
const BankList = require("./SearchList.json");
export const SearchList = ({ jusPayNetBanking }: any) => {
  const [radio, setRadio] = useState("");
  const [searchText, setSearchText] = useState("");
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const controlProps = (item: string) => ({
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  const inputChangeHandler = (e: any) => {
    setOpen(true);
    setSearchText(e?.target?.value);
    setValue(e?.target?.value);
  };
  const handleRadio = (e: any) => {
    setValue(e?.target?.value);
    setOpen(false);
  };
  return (
    <>
      <TextField
        placeholder={`Search for other banks here`}
        value={value}
        onChange={(e) => inputChangeHandler(e)}
        sx={{
          width: "100%",
          marginBottom: "14px",
          "& > div": {
            borderRadius: "0px",
          },
        }}
        size="small"
        aria-label="search input"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img
                src={`${ReplaceImage(SEARCH_NORMAL)}`}
                alt="searchIcon"
                style={{ opacity: "0.5" }}
              />
            </InputAdornment>
          ),
        }}
      />
      {searchText && open && (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxHeight: 200,
            overflowY: "scroll",
            paddingLeft: "16px",
          }}
        >
          <RadioGroup
            aria-labelledby="d-group"
            name="con-group"
            value={BankList?.items.name}
            onChange={(event) => {
              setRadio(event?.target.value);
            }}
          >
            {jusPayNetBanking
              ?.filter((itm: any) =>
                itm?.description
                  ?.toLowerCase()
                  ?.includes(searchText?.toLowerCase())
              )
              ?.map((item: any, index: number) => (
                <FormControlLabel
                  key={index}
                  value={value}
                  label={item?.description}
                  control={
                    <Radio
                      {...controlProps(item?.description)}
                      size="small"
                      checked={radio === item?.description}
                      onChange={(e) => handleRadio(e)}
                    />
                  }
                />
              ))}
          </RadioGroup>
        </Paper>
      )}
    </>
  );
};
