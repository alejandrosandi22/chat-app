import { ApolloProvider } from '@apollo/client';
import ThemeProvider from 'context/theme';
import { ToggleContactProfileProvider } from 'context/toggleContactProfile';
import apolloClient from 'services/apolloClient';
import { Provider } from 'react-redux';
import { store } from 'store';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider>
            <ToggleContactProfileProvider>
              {children}
            </ToggleContactProfileProvider>
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    </>
  );
}
