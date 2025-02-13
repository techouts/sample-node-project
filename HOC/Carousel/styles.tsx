import { Box, styled } from "@mui/material";

export const CommonCarouselStyles = styled(Box)`
  & .slick-dots {
    position: initial;
    line-height: 10px;
  }
  & .slick-dots li {
    width: auto;
    height: auto;
    margin: 0 2px;
  }
  & .slick-dots li button {
    border-radius: 50%;
    background: #231f20;
    width: 4px;
    height: 4px;
    padding: 0px;
  }

  & .slick-dots li button::before {
    color: #afafaf;
    content: none;
  }

  & .slick-dots li.slick-active button {
    background: #ad184c;
    width: 13px;
    height: 4px;
    border-radius: 15px;
    opacity: 1;
  }
  & .slick-next {
    z-index: 1;
    top: 50%;
    right: 0;
    opacity: 1;
  }

  & .slick-next:before,
  & .slick-prev:before {
    opacity: 1;
    content: none;
  }

  & .slick-prev {
    z-index: 1;
    top: 50%;
    left: 0;
    opacity: 1;
  }

  .slick-vertical .slick-track {
    height: auto !important;
  }
`;
