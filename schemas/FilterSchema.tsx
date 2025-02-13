type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;


export interface FilterSchema {
id: number;
__component:string;
aggregations:AGG_LIST[];
}

export interface AGG_LIST{
    attribute_code: string;
    count:number;
    label:string;
    options:AGG_SUB_LIST[];
}

export interface AGG_SUB_LIST {
    count:number;
    label : string;
    value: string;
}