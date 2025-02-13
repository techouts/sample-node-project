import type { NextApiRequest, NextApiResponse } from "next";
import { NitrogenCachePurge } from "../../utility/NitrogenCachePurge";
import { GenChunks } from "./pdp-cache-purge";
import { CommonRegexes } from "../../utility/Regex";
import { isProdEnv } from "../../utility/Clarity";

function wait<T>(ms: number) {
  return new Promise<T>((resolve) => setTimeout(resolve, ms));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const { urlProtocol } = CommonRegexes;

  const { pages } = req.body;

  if (pages == null || !(Array.isArray(pages) && !!pages.length))
    return res.status(500).json({ message: "Please validate the payload" });

  const filterCorrectPaths = pages.filter((path: string) =>
    path.startsWith("/")
  );

  try {
    const revalidatePaths = filterCorrectPaths.map((path: string) =>
      res.revalidate(path)
    );

    await Promise.allSettled(revalidatePaths);

    const domain = process.env.NEXT_PUBLIC_DOMAIN_URL || "";

    if (
      ["https://maya-uat.ssecom.tech", "https://www.ssbeauty.in"].includes(
        domain
      ) &&
      isProdEnv
    ) {
      // await wait(5000);

      const CDNPurge = await Promise.allSettled(
        GenChunks(filterCorrectPaths, 10).map(async (a) => {
          const urls = [...a];

          for (let i = 0; i < urls.length; i++) {
            urls[i] = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${urls[i]}`;
          }

          const nRes = await NitrogenCachePurge({
            domain: domain.replace(urlProtocol, ""),
            mediaPaths: urls,
          });

          const response = {
            paths: a,
            revalidated: true,
            isNitrogenCachePurged: nRes?.status === 200,
          };

          return response;
        })
      );

      return res.json(CDNPurge);
    } else {
      return res.json({
        paths: filterCorrectPaths,
        revalidated: true,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: JSON.stringify(err) });
  }
}
