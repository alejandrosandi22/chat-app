import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    const localTheme = window.localStorage.getItem('chat-app-theme');
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setTheme('dark');
      localStorage.setItem('chat-app-theme', 'dark');
    }
  }, []);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    window.localStorage.setItem('chat-app-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
