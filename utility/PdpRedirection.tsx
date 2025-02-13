import { transformItemName } from "./urlGenerator";

export const pdpRedirecion = (
  sku: string,
  type_id: string,
  name: string,
  color?: number,
  size?: number,

) => {

  return type_id === "simple"
    ? `/${transformItemName(name)}/p/${sku}`
    : `/${transformItemName(name)}/p/${sku}${size != null || color != null ? `?` : ""}${color != null ? `colorCode=${color}` : ""
    }${size != null && color != null ? `&` : ""}${size != null ? `size=${size}` : ""
    }`;
};
