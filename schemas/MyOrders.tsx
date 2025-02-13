
export type LIST_ITEMS = {
    Status: string;
    TimeDate: string;
    imageUrl: string;
    imageMobileUrl: string;
    ProductName: string;
    Rating: number;
    Quantity: string;
    noOfQuntity:number;
    PresentStatus: string;
    Price: number;
    ReviewButton: string;
    ReorderButton: string;
    path: string | URL;
    isNewTab: boolean;
    StockStatus:string;
};

export interface MyOrdersSchemaInterface {
    __componentId: string;
    id: number;
    filter:string;
    items:LIST_ITEMS[];
}
