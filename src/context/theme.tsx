import React, { useState } from 'react';

interface ThemeType {
  theme: string;
  toggleTheme: (theme: string) => void;
}
interface Props {
  children: React.ReactNode;
}

const INITIAL_VALUES: ThemeType = {
  theme: '',
  toggleTheme: () => {},
};

export const ThemeContext = React.createContext<ThemeType>(INITIAL_VALUES);

export default function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<string>('');

  const toggleTheme = (newTheme: string) => setTheme(newTheme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
