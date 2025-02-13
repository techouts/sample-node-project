interface AutoSuggestEventType {
  type: string;
  selectedKeyword: string;
  searchKeyword: string;
}

interface BrowserAPIEventType {
  page: string;
  requestId: string;
}

function triggerAutoSuggestEvent({
  type,
  selectedKeyword,
  searchKeyword,
}: AutoSuggestEventType) {
  const payload = {
    query: selectedKeyword,
    autosuggestParams: {
      autosuggest_type: type,
      autosuggest_suggestion: selectedKeyword,
      field_name: 'autosuggest',
      field_value: selectedKeyword,
      src_field: '',
      internal_query: searchKeyword,
    },
  };

  if (window?.Unbxd && typeof window?.Unbxd.track === 'function') {
    window?.Unbxd.track('search', payload);
  } else {
    console.error('unbxdAnalytics.js is not loaded!');
  }
}

function triggerBrowseAPIEvent({ page, requestId }: BrowserAPIEventType) {
  let UnbxdAnalyticsConf = window?.UnbxdAnalyticsConf || {};
  UnbxdAnalyticsConf['page'] = '';
  UnbxdAnalyticsConf['page_type'] = 'BOOLEAN';

  var payload = {
    requestId,
    page: `categoryPath:"${page}"`,
    page_type: 'BOOLEAN',
  };

  if (window?.Unbxd && typeof window?.Unbxd.track === 'function') {
    window?.Unbxd.track('categoryPage', payload);
  } else {
    console.error('unbxdAnalytics.js is not loaded!');
  }
}

export { triggerAutoSuggestEvent, triggerBrowseAPIEvent };

//Add To Cart
interface AddtocartEventType {
  details: any;
  variantdetails: any;
}
function triggerAddToCartEvent(props: AddtocartEventType) {
  const { details, variantdetails } = props;
  const getDetails = (details: any, variantDetails: any) => {
    return details?.__typename === 'SimpleProduct'
      ? details
      : variantDetails?.product;
  };

  const payload = {
    pid: details?.id,
    variantId: variantdetails?.product?.sku
      ? variantdetails?.product?.sku
      : details?.sku,
    qty: "1",
    price:
      getDetails(details, variantdetails)?.pmr_price_value?.amount?.value ||
      details?.pmr_price_value?.amount?.value ||
      variantdetails?.pmr_price_value?.amount?.value,
  };
  
  if (window?.Unbxd && typeof window?.Unbxd.track === 'function') {
    window?.Unbxd.track('addToCart', payload);
  } else {
    console.error('unbxdAnalytics.js is not loaded!');
  }
}
export { triggerAddToCartEvent };

//Order(Transaction successfull) event
interface orderEventType {
  items: any;
  details: any;
}

function triggerOrderEvent(details: orderEventType) {
  const pdetails =
    details?.items?.map((singleItem: any) => {
      return singleItem?.items[0] || [];   
    });

  const payload = pdetails?.map((a: any) => {
    return {
      pid: a?.unique_id || '',
      variantId: a?.product_sku || "",
      qty: a?.quantity_ordered || '',
      price: a?.product_sale_price?.value || '',
    };
  });

  if (window?.Unbxd && typeof window?.Unbxd.track === 'function') {
    window?.Unbxd.trackMultiple('order', payload);
  } else {
    console.error('unbxdAnalytics.js is not loaded!');
  }
}

export { triggerOrderEvent };

interface ExperienceImpressionType {
  requestId: string;
  itemIds: string[];
  pageType: string;
  widgetId: string;
}

export function triggerExperienceImpression({
  requestId,
  itemIds,
  pageType,
  widgetId,
}: ExperienceImpressionType) {
  const payload = {
    requestId: requestId,
    pids_list: itemIds,
    experience_pagetype: pageType,
    experience_widget: widgetId?.toUpperCase(),
  };
  if (window?.Unbxd && typeof window?.Unbxd.track === "function") {
    window?.Unbxd.track("experience_impression", payload);
  } else {
    console.error("unbxdAnalytics.js is not loaded!");
  }
}

// product click
function triggerProductClickEvent(
  data: any,
  key: any,
  pageType: any,
  widgetId: any,
  requestId:any
) {
  const payload = {
    pid: data?.id,
    prank: String(key),
    experience_pagetype: pageType,
    experience_widget: widgetId?.toUpperCase(),
    requestId: requestId,
  };
  if (window?.Unbxd && typeof window?.Unbxd.track === "function") {
    window?.Unbxd.track("click", payload);
  } else {
    console.error("unbxdAnalytics.js is not loaded!");
  }
}
export { triggerProductClickEvent };
