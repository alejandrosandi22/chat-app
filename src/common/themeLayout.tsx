import { ThemeContext } from 'context/theme';
import { useContext } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function ThemeLayout({ children }: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme === '' || !theme ? 'light' : theme}`}>
      {children}
    </div>
  );
}
