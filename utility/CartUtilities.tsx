import { ReplaceImage } from "./ReplaceImage";

export const RadioButtonIcon = ({ imageUrl }: any) => {
  return (
    <img
      src={`${ReplaceImage(imageUrl)}`}
      alt="checked icon"
      width={"20px"}
    ></img>
  );
};
