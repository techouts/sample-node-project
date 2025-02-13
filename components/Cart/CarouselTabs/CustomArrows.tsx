import { NEXTARROW, PREVARROW } from "../../../utility/Constants";

export function CustomPrevArrow(props: any) {
  const { className, style, onClick, cssData } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        ...cssData,
        display: "block",
        background:
          `url(${PREVARROW}) no-repeat`,
        backgroundSize: 'contain'
      }}
      onClick={onClick}
    />
  );
}

export function CustomNextArrow(props: any) {
  const { className, style, onClick, cssData } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        ...cssData,
        display: "block",
        background:
          `url(${NEXTARROW}) no-repeat`,
        backgroundSize: 'contain'
      }}
      onClick={onClick}
    />
  );
}
