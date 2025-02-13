import React from "react";
import SearchProductLoader from "../../public/SearchProductLoader.gif";
import { LoaderIconAndTextBox, SpinnerLoaderText } from "./SearchVisibleStyle";

const SpinnerLoaderForSearch = () => {
  return (
    <>
      <LoaderIconAndTextBox>
        <img src={SearchProductLoader?.src} alt="Search Product Loader" />
        <SpinnerLoaderText>Searching products</SpinnerLoaderText>
      </LoaderIconAndTextBox>
    </>
  );
};

export default SpinnerLoaderForSearch;
