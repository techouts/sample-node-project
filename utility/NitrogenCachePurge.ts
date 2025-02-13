import axios from 'axios';

const purgeOptionId_img_urls = 'OnVybC1haW86Ojo6Ojo6';
const purgeOptionId_nonimg_urls = 'OnVybDo6Ojo6Ojo6Ojo6';

// Token is valid for 1 year till 2024-08-04 13:00
const authToken =
    'Token 7HwQ7feP8n2Zt6efS1tFMGVBvcHUAdJDdwLy4fTgPUGVCvgFUwDd4hQoLcJ+/2EEZP5x9czm4u6wfAfkggDVKV5qOYHMN4MBByd05n2uQl1i4GXGwHte/MpO/EBM+lrxPy+Y6hp3AUvB8YWfh5HxpTOfBcPA5XwYMV7p/lg7nVpOOofw6rM1c5jYJ8y1ZFoPZFh65FJ7zEC2BXuui8s2MwZ5vVTAx1S5Aug/HQ';

type NCachePurge = {
    domain: string;
    mediaPaths: string[];
    isPurgeImgURLs?: boolean;
};

export async function NitrogenCachePurge({
    domain,
    mediaPaths,
    isPurgeImgURLs = false,
}: NCachePurge) {
    const options = {
        method: 'POST',
        url: 'https://dash.n7.io/api/v2/nda/delivery/purge/requests',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken,
        },
        data: {
            mediaPaths,
            domain,
            purgeOptionId: isPurgeImgURLs
                ? purgeOptionId_img_urls
                : purgeOptionId_nonimg_urls,
        },
    };

    try {
        const res = await axios.request(options);
        return {
            data: res.data,
            status: res.status,
        };
    } catch (err) {
        console.error(err);
    }
}
