import 'scss/globals.scss';
import type { AppProps } from 'next/app';
import Providers from 'common/providers';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
