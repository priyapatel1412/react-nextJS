import Layout from '@/components/layout/layout';
import {NotificationContextProvider} from '@/store/notification-context';

import '@/styles/globals.css';
import Head from 'next/head';

export default function App({Component, pageProps}) {
  return (
    <NotificationContextProvider>
      <Layout>
        {/* Next js <Head> </Head> tags are auto merging if its more than one, and if its any conflict then later on wins*/}
        <Head>
          <title>Next Events</title>
          <meta name="description" content="next-description"></meta>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
