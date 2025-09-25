import { headers } from 'next/headers';
import { App } from '@/components/app';
import { getAppConfig } from '@/lib/utils';

export default async function Page({ params }: { params: { user: string } }) {
  const hdrs = await headers();
  const appConfig = await getAppConfig(hdrs);
  const { user } = params;

  return <App appConfig={appConfig} userInfo={user} />;
}
