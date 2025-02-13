import { NEXTARROW, PREVARROW } from "../../utility/Constants";

export function CustomPrevArrow(props: any) {
  const { className, style, onClick, cssData, isPrev } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        ...cssData,
        display: "block",
        background:
          `url(${PREVARROW}) no-repeat`,
        filter: `grayscale(${isPrev ? "0%" : "100%"})`,
        opacity: isPrev ? "1" : "0.2",
        cursor: isPrev ? "pointer" : "auto",
        backgroundSize: 'contain'
      }}
      onClick={onClick}
    />
  );
}
export function CustomNextArrow(props: any) {
  const { className, style, onClick, cssData, isNext } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        ...cssData,
        display: "block",
        background:
          `url(${NEXTARROW}) no-repeat`,
        filter: `grayscale(${isNext ? "0%" : "100%"})`,
        opacity: isNext ? "1" : "0.2",
        cursor: isNext ? "pointer" : "auto",
        backgroundSize: 'contain'
      }}
      onClick={onClick}
    />
  );
}
