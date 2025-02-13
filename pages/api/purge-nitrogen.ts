import { NitrogenCachePurge } from '../../utility/NitrogenCachePurge';
import type { NextApiRequest, NextApiResponse } from 'next';
import { GenChunks } from './pdp-cache-purge';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { domain = '', secret } = req.query;

  if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const { paths } = req.body;

  if (
    !!domain === false ||
    paths == null ||
    !(Array.isArray(paths) && !!paths.length)
  ) {
    return res.json({ message: 'Please validate the payload' });
  }

  try {
    const response = await Promise.allSettled(
      GenChunks(paths, 10).map(async (a) => {
        const nRes = await NitrogenCachePurge({
          domain: domain?.toString(),
          mediaPaths: a,
        });

        const response = {
          paths: a,
          isNitrogenCachePurged: nRes?.status === 200,
        };

        return response;
      })
    );

    return res.json(response);
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
