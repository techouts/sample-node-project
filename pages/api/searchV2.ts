import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { UNBXD_HOST } from '../../utility/APIConstants';
import { getUniqItemsArr } from '../../utility/commonUtility';
import onHeaders from 'on-headers';

export const revalidate = 0;

export const dynamic = 'force-dynamic';

const UNBXD_KEYS = {
  secret: process.env.NEXT_UNBXD_SECRET_KEY,
  site_key: process.env.NEXT_UNBXD_SITE_KEY,
};

const sortObject = [
  {
    magento_value: 'price_ASC',
    unbxd_value: 'pmrPrice asc',
  },
  {
    magento_value: 'price_DESC',
    unbxd_value: 'pmrPrice desc',
  },
  {
    magento_value: 'discount_DESC',
    unbxd_value: 'pmrDiscount desc',
  },
  {
    magento_value: 'new_arrivals_ASC',
    unbxd_value: 'createdAt desc',
  },
];

const OOS = ['Pre Order', 'Out Of Stock'];

function prepareFacetName(txt: string) {
  txt = txt.replace('_fq', '');
  return txt.replace('_', ' ');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // remove ETag
  onHeaders(res, function () {
    this.removeHeader('ETag');
  });

  const { secret, site_key } = UNBXD_KEYS;

  const { vcItems = [], filters = {}, setFilter = '' } = req.body;

  const { q = '', items = 24, page = 1, sort = '',categoryFilter = null } = req.query;

  let vcFilterParam = '';

  const isVC = Array.isArray(vcItems) && vcItems.length > 0;

  let debug = true;

  if (!!isVC) {
    debug = false;
  } else if (process.env.NEXT_PUBLIC_DOMAIN_URL === 'https://www.ssbeauty.in') {
    debug = false;
  }

  if (isVC) {
    for (let i = 0; i < vcItems?.length; i++) {
      // console.log(`sku: ${vc[i].parent_sku}`);
      if (!!vcFilterParam) {
        vcFilterParam += ` OR sku: ${vcItems[i].parent_sku}`;
      } else {
        vcFilterParam = `sku: ${vcItems[i].parent_sku}`;
      }
    }
  }

  const excludeParams = ['search', 'page', 'categoryFilter'];

  let queryObj = req.query;

  if (!!filters && JSON.stringify(filters) !== '{}') {
    let finalString = '',
      eq = '',
      in_ = '',
      from = '';

    Object.keys(filters).map((a) => {
      if (filters[a]?.eq) {
        eq += `${a}=${encodeURIComponent(filters[a]?.eq)}&`;
      } else if (filters[a]?.in) {
        in_ += `${a}=${encodeURIComponent(filters[a]?.in.join(','))}&`;
      } else if (filters[a]?.from) {
        from += `${a}=${filters[a].from.split(',')}&`;
      }
    });

    finalString = eq + in_ + from;

    const params = new URLSearchParams(finalString);

    const paramObject = Object.fromEntries(params.entries());

    queryObj = paramObject;
  }

  // Sanitize
  const filterKeys = Object.keys(queryObj)
    .filter((a) => !excludeParams.includes(a))
    .filter((a) => a.includes('Filter') || a.includes('price'));

  const sortVal =
    sortObject.filter((a) => a.magento_value === sort)[0]?.unbxd_value || '';

  const sortQueryParam = !!sortVal ? `&sort=${sortVal}` : '';

  const generateParams = filterKeys
    .map((a) => {
      let q = queryObj[a].split(',').map((b) => {
        if (a === 'price') {
          return `${a}: ${b}`;
        } else {
          return `${a}: "${b}"`;
        }
      });

      return q.join(' OR ');
    })
    .map((a) => `filter=${a}`)
    .join('&');

  const finalParams = generateParams.length > 0 ? `&${generateParams}` : '';

  if (!!q === false) {
    return res.status(401).json({ message: 'Search value is missing' });
  }

  const searchQuery = encodeURIComponent(q.toString());
  const categoryParam = categoryFilter ? '&category-filter='+encodeURIComponent(categoryFilter) : ""

  let finalModParams = isVC
    ? `q=${searchQuery}&rows=${items}&page=${page}&variants.relevant=true&variants.count=*&filter=${vcFilterParam}${finalParams}${sortQueryParam}`
    : `q=${searchQuery}&rows=${items}&page=${page}${categoryParam}&variants.relevant=true${finalParams}${sortQueryParam}`;

  if (!!setFilter) {
    finalModParams = `q=*&rows=${items}&page=${page}&filter=${setFilter}`;
  }

  const finalURL = `${UNBXD_HOST}/${secret}/${site_key}/search?${finalModParams}`;

  try {

    const unbxdRes =  await axios.get(finalURL, {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });

    const data = unbxdRes.data;

    const page_info = {
      page_size: Number(items),
      current_page: Number(page),
    };

    const total_count = data?.response.numberOfProducts;

    const redirect = data?.redirect?.value || null;

    var facets: {} = data?.facets || {};

    let mod_textfacets = [];
    let mod_rangefacets = [];
    let mod_multilevelfacets = [];

    if (facets.hasOwnProperty('text')) {
      mod_textfacets = facets.text.list;
    }

    if (facets.hasOwnProperty('range')) {
      mod_rangefacets = facets.range.list;
    }

    if (facets.hasOwnProperty('multilevel')) {
      mod_multilevelfacets = facets.multilevel.list;
    }

    let modifiedfacets = {};

    for (let i = 0; i < mod_textfacets.length; i++) {
      mod_textfacets[i].type = 'facet_fields';
      modifiedfacets[mod_textfacets[i].facetName] = mod_textfacets[i];
    }

    for (let i = 0; i < mod_rangefacets.length; i++) {
      mod_rangefacets[i].type = 'facet_ranges';
      modifiedfacets[mod_rangefacets[i].facetName] = mod_rangefacets[i];
    }

    var facets = modifiedfacets,
      textfacets = [],
      rangefacets = [],
      singlefacet = {},
      facetVal = '',
      facetValStart = '',
      facetValEnd = '',
      positionExists = false;

    for (let x in facets) {
      if ('position' in facets[x]) {
        positionExists = true;
      }
      break;
    }

    let sortable = [];

    for (let facet in facets) {
      sortable.push(
        positionExists ? [facet, facets[facet]['position']] : [facet]
      );
    }

    if (positionExists) {
      sortable.sort(function (a, b) {
        return a[1] - b[1];
      });
    }

    for (let newI = 0; newI < sortable.length; newI++) {
      let x = sortable[newI][0];

      singlefacet = {
        attribute_code: x,
        label: facets[x].hasOwnProperty('displayName')
          ? prepareFacetName(facets[x].displayName)
          : prepareFacetName(x),
        type: facets[x]['type'],
        options: [],
      };

      if (singlefacet.type === 'facet_ranges') {
        for (
          let i = 0, len = facets[x]['values']['counts'].length / 2;
          i < len;
          i++
        ) {
          facetValStart = parseFloat(
            facets[x]['values']['counts'][2 * i]
          ).toString();
          facetValEnd = (
            parseFloat(facetValStart) + facets[x]['values'].gap
          ).toString();

          const label = facetValStart + '-' + facetValEnd;
          const value = `[${facetValStart} TO ${facetValEnd}]`;

          singlefacet.options.push({
            label,
            count: facets[x]['values']['counts'][2 * i + 1],
            value,
          });
        }
        if (singlefacet.options.length > 0) rangefacets.push(singlefacet);
      } else {
        for (let i = 0, len = facets[x]['values'].length / 2; i < len; i++) {
          facetVal = facets[x]['values'][2 * i];
          if (facetVal.trim().length == 0) continue;

          singlefacet.options.push({
            label: facetVal,
            items: null,
            value: facetVal,
            count: facets[x]['values'][2 * i + 1],
          });
        }
        if (singlefacet.options.length > 0) textfacets.push(singlefacet);
      }
    }

    const updatedData = data?.response?.products?.map((item: any) => {
      const availablePromotions = !!item?.availablePromotions
        ? JSON.parse(item?.availablePromotions)
        : [];

      const configurable_options_color =
        item?.variants
          ?.map((cItem: any) => {
            if (cItem?.vColorCode) {
              return {
                label: cItem.vColorCode,
              };
            }
          })
          .filter(Boolean) || [];

      const configurable_options_size =
        item?.variants
          ?.map((cItem: any) => {
            if (cItem?.vSizeCode) {
              return {
                label: cItem?.vSizeCode,
              };
            }
          })
          .filter(Boolean) || [];

      const configurable_options = [
        {
          label: 'Color',
          attribute_code: 'color',
          values: getUniqItemsArr({
            arr: configurable_options_color,
            id: 'label',
          }),
        },
        {
          label: 'Size',
          attribute_code: 'size',
          values: getUniqItemsArr({
            arr: configurable_options_size,
            id: 'label',
          }),
        },
      ];

      const variants =
        item?.variants?.map((cItem: any) => {
          const vAvailablePromotions = !!cItem?.vAvailablePromotions
            ? JSON.parse(cItem?.vAvailablePromotions)
            : [];

          const vAdditional_images =
            cItem?.vAddintionalImages?.map((a) => {
              return {
                url: a,
              };
            }) || [];

          return {
            product: {
              id: cItem.uniqueId,
              color: cItem.vColorCode,
              size: cItem?.vSizeCode,
              uid: '',
              name: cItem?.vTitle,
              type_id: cItem?.vTypeId,
              sku: cItem?.vSku,
              stock_status: OOS.includes(cItem?.vAvailability)
                ? 'OUT_OF_STOCK'
                : 'IN_STOCK',
              image: {
                url: cItem?.vCImageUrl,
              },
              additional_images: vAdditional_images,
              AvailablePromotions: vAvailablePromotions,
              media_gallery: [],
              pmr_price_value: {
                amount: {
                  value: cItem?.vPmrPrice || 0,
                  currency: 'INR',
                },
                discount: {
                  amount_off: cItem?.vPrice || 0 - cItem?.vPmrPrice || 0,
                  percent_off: cItem?.vPmrDiscount || 0,
                },
              },
              price_range: {
                minimum_price: {
                  regular_price: {
                    value: cItem?.vPrice || 0,
                    currency: 'INR',
                  },
                  final_price: {
                    value: cItem?.vPrice || 0,
                  },
                  discount: {
                    amount_off: 0,
                    percent_off: 0,
                  },
                },
              },
              is_featured_checkbox: cItem?.is_featured_checkbox || 0,
              __typename: 'SimpleProduct',
            },
          };
        }) || [];

      const additional_images =
        item?.addintionalImages?.map((a) => {
          return {
            url: a,
          };
        }) || [];

      return {
        name: item?.title,
        id: item?.uniqueId,
        type_id: item?.typeId,
        is_free_product_available: item?.is_free_product_available || 0,
        is_free_gift_available: item?.is_free_gift_available || 0,
        free_items_offers: null,
        categories: [],
        additional_images,
        sku: item?.sku,
        stock_status: OOS.includes(item?.availability)
          ? 'OUT_OF_STOCK'
          : 'IN_STOCK',
        AvailablePromotions: availablePromotions,
        review_count: item?.reviewCount || 0,
        rating_summary: item?.finalRating || '0',
        is_featured_checkbox: item?.is_featured_checkbox || 0,
        is_best_seller_checkbox: item?.is_best_seller_checkbox || 0,
        __typename: 'ConfigurableProduct',
        image: {
          url: item?.cImageUrl,
        },
        configurable_options,
        variants,
        pmr_price_value: {
          amount: {
            value: item?.pmrPrice || 0,
          },
          discount: {
            amount_off: item?.price || 0 - item?.pmrPrice || 0,
            percent_off: item?.pmrDiscount || 0,
          },
        },
        price_range: {
          minimum_price: {
            regular_price: {
              value: item?.price,
            },
            final_price: {
              value: item?.price,
            },
            discount: {
              amount_off: 0,
              percent_off: 0,
            },
          },
        },
      };
    });

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader("unx-request-id", unbxdRes.headers["unx-request-id"])

    if (!debug) {
      res.setHeader('Params-Received', JSON.stringify(req.query));
      res.setHeader('UNBXD-API', finalURL);
    }

    return res.status(200).send({
      products: {
        aggregations: [...rangefacets, ...textfacets],
        multilevel: mod_multilevelfacets,
        items: updatedData,
        page_info,
        total_count,
      },
      redirect,
    });
  } catch (err) {
    console.error('err', err);
    return res
      .status(500)
      .send({ status: 'failed', data: 'Something went wrong..' });
  }
}
