import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

function CustomApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <Head>
        <title>Welcome to white-label-frontend!</title>
      </Head>
      <main className="app">
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </main>
    </>
  );
}

export default CustomApp;
