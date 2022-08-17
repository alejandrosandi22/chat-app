import { ApolloProvider } from '@apollo/client';
import ThemeProvider from 'context/theme';
import { ToggleContactProfileProvider } from 'context/toggleContactProfile';
import apolloClient from 'services/apolloClient';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider>
          <ToggleContactProfileProvider>
            {children}
          </ToggleContactProfileProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}
