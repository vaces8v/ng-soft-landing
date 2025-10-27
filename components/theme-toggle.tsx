'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { ThemeToggleButton, useThemeTransition } from './theme-toggle-button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { startTransition } = useThemeTransition();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    startTransition(() => {
      setTheme(newTheme);
    });
  };

  return (
    <ThemeToggleButton
      theme={theme as 'light' | 'dark'}
      variant="circle-blur"
      start="top-right"
      onClick={handleThemeChange}
      className="rounded-full border-neutral-300 dark:border-neutral-700"
    />
  );
}
