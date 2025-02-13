import client from '../../apollo-client';
import { PRODUCT_DATA_SKU_CACHE_PURGE } from '../../graphQLQueries/ProductQuery';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CommonRegexes } from '../../utility/Regex';
import { NitrogenCachePurge } from '../../utility/NitrogenCachePurge';
import { transformItemName } from '../../utility/urlGenerator';

export function GenChunks(array: string[], size: number) {
  const chunked_arr = [];
  let copied = [...array];
  const numOfChild = Math.ceil(copied.length / size);
  for (let i = 0; i < numOfChild; i++) {
    chunked_arr.push(copied.splice(0, size));
  }
  return chunked_arr;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { urlProtocol } = CommonRegexes;

  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const { skus } = req.body;

  if (skus == null || !(Array.isArray(skus) && !!skus.length)) {
    return res.json({ message: 'Please validate the payload' });
  }

  let slugs: string[] = [];

  await Promise.allSettled(
    skus.map(async (sku) => {
      const itemRes = await client.query({
        query: PRODUCT_DATA_SKU_CACHE_PURGE,
        variables: {
          sku,
        },
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      });

      const { items } = itemRes?.data?.products ?? { items: [] };

      if (items.length > 0) {
        const details = items[0];

        const { type_id, variants, name, sku } = details;

        const productName = transformItemName(name);

        slugs.push(`/${productName}/p/${sku}`, `/p/${sku}`);

        return slugs;
      }
    })
  );

  const finalResponses = await Promise.allSettled(
    GenChunks(slugs, 10).map(async (a) => {
      const urls = [...a];

      for (let i = 0; i < urls.length; i++) {
        urls[i] = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${urls[i]}`;
      }

      // Revalidate paths
      await Promise.allSettled(
        a.map(async (path) => {
          await res.revalidate(path);
        })
      );

      const domain = process.env.NEXT_PUBLIC_DOMAIN_URL;
      if (domain) {
        const nRes = await NitrogenCachePurge({
          domain: domain.replace(urlProtocol, ''),
          mediaPaths: urls,
        });

        const response = {
          paths: a,
          isNitrogenCachePurged: nRes?.status === 200,
        };

        return response;
      }
    })
  );

  return res.json(finalResponses);
}
