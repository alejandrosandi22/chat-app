import { ToggleContactProfileProvider } from 'context/toggleContactProfile';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToggleContactProfileProvider>{children}</ToggleContactProfileProvider>
    </>
  );
}
