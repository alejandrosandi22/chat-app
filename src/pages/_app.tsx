import 'scss/globals.scss';
import type { AppProps } from 'next/app';
import Providers from 'common/providers';
import ThemeLayout from 'common/themeLayout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <ThemeLayout>
        <Component {...pageProps} />
      </ThemeLayout>
    </Providers>
  );
}
