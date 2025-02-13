import { IS_UNBXD_ENABLED } from './APIConstants';

export const isProdEnv = process.env.NODE_ENV === 'production';

const UNBXD_SITE_KEY = process.env.NEXT_UNBXD_SITE_KEY;

export function UnbxdAnalytics() {
  if ([!!UNBXD_SITE_KEY, !!isProdEnv, !!IS_UNBXD_ENABLED].includes(false))
    return null;

  return (
    <script
      async
      id="UnbxdAnalytics"
      type="text/javascript"
      src={`https://libraries.unbxdapi.com/sdk-clients/${UNBXD_SITE_KEY}/${
        process.env.NEXT_PUBLIC_TRACING_ENVIRONMENT === 'prod'
          ? 'ua'
          : 'ua-staging'
      }/ua.js`}
    />
  );
}
