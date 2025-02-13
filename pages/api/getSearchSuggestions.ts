import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UNBXD_HOST } from '../../utility/APIConstants';

const debug = !(
  process.env.NEXT_PUBLIC_DOMAIN_URL === 'https://www.ssbeauty.in'
);

const UNBXD_KEYS = {
  secret: process.env.NEXT_UNBXD_SECRET_KEY,
  site_key: process.env.NEXT_UNBXD_SITE_KEY,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secret, site_key } = UNBXD_KEYS;

  const { q = '' } = req.query;

  if (!!q === false) {
    return res.status(401).json({ message: 'Search value is missing' });
  }

  const finalURL = `${UNBXD_HOST}/${secret}/${site_key}/autosuggest?q=${q}&inFields.count=0&popularProducts.count=0&keywordSuggestions.count=10&topQueries.count=5&promotedSuggestion.count=20`;

  try {
    const data = (await axios.get(finalURL)).data;

    const keywords = data?.response?.products
      ?.filter((a: { doctype: string }) => a.doctype === 'KEYWORD_SUGGESTION')
      ?.map((a: { autosuggest: string }) => a.autosuggest);

    const topSearches = data?.response?.products
      ?.filter((a: { doctype: string }) => a.doctype === 'TOP_SEARCH_QUERIES')
      ?.map((a: { autosuggest: string }) => a.autosuggest);

    const promotedSuggestions = data?.response?.products
      ?.filter((a: { doctype: string }) => a.doctype === 'PROMOTED_SUGGESTION')
      ?.map((a: { autosuggest: string }) => a.autosuggest);

    const finalData = {
      data: {
        ProductSuggestions: {
          products: [...promotedSuggestions, ...topSearches, ...keywords],
        },
      },
    };

    res.setHeader('Cache-Control', 'no-cache');

    if (debug) {
      res.setHeader('UNBXD-API', finalURL);
    }

    return res.json(finalData);
  } catch (err) {
    console.error(err);
    res.status(500).send(JSON.stringify(err));
  }
}
