'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = Cookies.get('theme') as 'light' | 'dark' | undefined;
    const initial = saved === 'light' ? 'light' : 'dark';
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    Cookies.set('theme', newTheme, { expires: 365, path: '/' });
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-muted text-muted-foreground hover:opacity-90"
    >
      Toggle Theme ({theme})
    </button>
  );
}
