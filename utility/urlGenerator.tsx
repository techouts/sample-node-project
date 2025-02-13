export function urlGenerator(filtered: any, sortData: any, prevUrl: string, page: number,categoryFilter:any, storeMode:boolean, storeCode:string) {
  let url = prevUrl;
  let first = 0;
  if (Object?.keys(filtered)?.length > 0) {
    const arr = Object?.keys(filtered);
    for (let index = 0; index < arr?.length; index++) {
      const key = arr?.[index];
      if (key !== "sku") {
        if (filtered?.[key]?.in?.length > 0 && key !== "price") {
          if (first == 0) {
            first++;
            if (prevUrl?.length > 0) {
              url += "&" + key + "=";
            } else {
              url += "?" + key + "=";
            }
          } else {
            url += "&" + key + "=";
          }
          const values = filtered?.[key]?.in;
          for (let id = 0; id < values?.length; id++) {
            const value = values?.[id];
            if (id == 0) {
              url += value;
            } else {
              url += "," + value;
            }
          }
        } else if (
          filtered?.[key]?.from?.split(",")?.length > 0 &&
          filtered?.[key]?.from !== ""
        ) {
          if (first == 0) {
            first++;
            if (prevUrl?.length > 0) {
              url += "&" + key + "=";
            } else {
              url += "?" + key + "=";
            }
          } else {
            url += "&" + key + "=";
          }
          const values = filtered?.[key]?.from;
          url += values;
        }
      }
    }
  }
  if(categoryFilter && categoryFilter !== ""){
    url?.length > 0 ? (url += "&") : (url += "?");
    url += `categoryFilter=${encodeURIComponent(decodeURIComponent(categoryFilter))}`;
  }
  if (sortData && Object?.keys(sortData)?.length > 0 && sortData !== '{}') {
    url?.length > 0 ? (url += "&") : (url += "?");
    url += `sort=${sortData}`;
  }
  console.log('storeMode', storeMode,storeCode )
  if(storeMode){
    url?.length > 0 ? (url += "&") : (url += "?");
    url += `vStockAvailability=${storeCode}`;
    // url += `vStockAvailability_uFilter=${storeCode}`;
  }
  if (page > 0) {
    url?.length > 0 ? (url += "&") : (url += "?");
    url += `page=${page}`;
  }
  return url.replace(/,/g, "%2C");
}

function transformItemName(str: string) {
  if (!!str === false) return "";

  return str.toLowerCase()?.replace(/[^\w\s]/g, '').replace(/(\s)\1/g, ' ').replace(/(\s)/g, '-');
}

function getSanitizedPDPURL(url: string) {
  let URLChunks = url?.split("/");
  if (URLChunks?.[3] !== "p" && URLChunks) {
    const productName = URLChunks?.[3]?.replaceAll("_", "");
    URLChunks[3] = productName;
    return URLChunks?.join("/");
  }
  return url;
}

export { transformItemName, getSanitizedPDPURL };
