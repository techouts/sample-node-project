// View_Event Item Array 

// Offers Grid, MultiShowCase, Show Case, Buying Guides, beauty stop,shopby luxury, category carousel, category shop ,blog author
export const viewArray = (items: any, id?: any) => {
  const newArr = items?.map((item: any, index: any) => {
    const singleItem = {} as any;
    (singleItem["item_id"] = id + (index + 1) || "na"),
      (singleItem["item_name"] = item?.Item_name || "na"),
      (singleItem["item_type"] = item?.Item_type || "na"),
      (singleItem["coupon"] = "na"),
      (singleItem["discount"] = 0),
      (singleItem["index"] = index + 1),
      (singleItem["item_brand"] = "na"),
      (singleItem["item_category"] = "na"),
      (singleItem["item_variant"] = "na"),
      (singleItem["price"] = 0),
      (singleItem["original_price"] = 0),
      (singleItem["quantity"] = 0),
      (singleItem["item_rating"] = "na"),
      (singleItem["item_category2"] = "na"),
      (singleItem["item_category3"] = "na"),
      (singleItem["affiliation"] = "na"),
      (singleItem["item_ean_code"] = "na"),
      (singleItem["item_category5"] = "na"),
      (singleItem["status"] = "na"),
      (singleItem["item_size"] = "na"),
      (singleItem["item_deeplink_url"] = "na"),
      (singleItem["item_image_link"] = item?.imageUrl);
    return singleItem;
  })
  return newArr;
};

//hero banner item array for promotion_view and select_promotion event 
export const itemArrayView = (items: any, promotion_id?: any, promotion_name?: any) => {
  const newArr = items?.map((item: any, index: number) => {
    const singleItem = {} as any;
    (singleItem["promotion_id"] = promotion_id || "na");
    (singleItem["promotion_name"] = promotion_name || "na");
    (singleItem["creative_name"] = item?.creative_name || "na");
    (singleItem["creative_slot"] = item?.creative_slot || "na");
    return singleItem;
  })
  return newArr;
};

//single banner item array for select_promotion event 
export const singleItemArrayClick = (items: any, Item_name: any, id?: any) => {
  const singleItem = {} as any;
  (singleItem["item_id"] = id),
    (singleItem["item_name"] = Item_name),
    (singleItem["index"] = 1),
    (singleItem["item_brand"] = "na"),
    (singleItem["item_category"] = "na"),
    (singleItem["price"] = 0),
    (singleItem["quantity"] = 0),
    (singleItem["item_category2"] = "na"),
    (singleItem["item_category3"] = "na");
  return singleItem;

};

//Shop By Collection,quick links, multi banner View Event Item Array ,blog(trending stories)
export const ViewArray = (items: any, id?: any, currentIndex = 0) => {
  const itemsLength = items?.length

  const newArr = items?.map((item: any, index: number) => {
    const singleId = (((itemsLength > 1 ? (currentIndex + index) : currentIndex) || index) + 1)
    const singleItem = {} as any;
    (singleItem["item_id"] = id + singleId),
      (singleItem["item_name"] = item?.Item_name),
      (singleItem["item_type"] = item?.Item_type),
      (singleItem["coupon"] = "na"),
      (singleItem["discount"] = 0),
      (singleItem["index"] = index + 1),
      (singleItem["item_brand"] = "na"),
      (singleItem["item_category"] = "na"),
      (singleItem["item_variant"] = "na"),
      (singleItem["price"] = 0),
      (singleItem["original_price"] = 0),
      (singleItem["quantity"] = 0),
      (singleItem["item_rating"] = "na"),
      (singleItem["item_category2"] = "na"),
      (singleItem["item_category3"] = "na"),
      (singleItem["affiliation"] = "na"),
      (singleItem["item_ean_code"] = "na"),
      (singleItem["item_category5"] = "na"),
      (singleItem["status"] = "na"),
      (singleItem["item_size"] = "na"),
      (singleItem["item_deeplink_url"] = "na"),
      (singleItem["item_image_link"] = item?.imageUrl);
    return singleItem;
  })
  return newArr;
};

// BLOG hero Banner
export const blogViewArr = (items: any, id: any) => {
  const newArr = items?.map((item: any, index: number) => {
    const itemArray = {} as any;
    (itemArray["item_id"] = id + 1 || "na"),
      (itemArray["item_name"] = item?.subText || "na"),
      (itemArray["item_type"] = item?.Item_type || "na"),
      (itemArray["coupon"] = "na"),
      (itemArray["discount"] = 0),
      (itemArray["index"] = 1),
      (itemArray["item_brand"] = "na"),
      (itemArray["item_category"] = "na"),
      (itemArray["item_variant"] = "na"),
      (itemArray["price"] = 0),
      (itemArray["original_price"] = 0),
      (itemArray["quantity"] = 0),
      (itemArray["item_rating"] = "na"),
      (itemArray["item_category2"] = "na"),
      (itemArray["item_category3"] = "na"),
      (itemArray["affiliation"] = "na"),
      (itemArray["item_ean_code"] = "na"),
      (itemArray["item_category5"] = "na"),
      (itemArray["status"] = "na"),
      (itemArray["item_size"] = "na"),
      (itemArray["item_deeplink_url"] = "na"),
      (itemArray["item_image_link"] = item?.image);
    return itemArray;
  });
  return newArr;
};
