import { useEffect } from 'react';

interface ThemeType {
  theme: string;
  toggleTheme: (theme: string) => void;
}

export default function useTheme({ theme, toggleTheme }: ThemeType) {
  useEffect(() => {
    const currentTheme = window.localStorage.getItem('chat-app-theme');
    console.log({ currentTheme });
    if (currentTheme === '' || !currentTheme) {
      window.localStorage.setItem('chat-app-theme', 'light');
    }
    if (currentTheme === 'light') {
      toggleTheme('light');
    }
    if (currentTheme === 'dark') {
      toggleTheme('dark');
    }
  }, []);

  return { theme, toggleTheme };
}
