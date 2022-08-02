import ThemeProvider from 'context/theme';
import { ToggleContactProfileProvider } from 'context/toggleContactProfile';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider>
        <ToggleContactProfileProvider>{children}</ToggleContactProfileProvider>
      </ThemeProvider>
    </>
  );
}
