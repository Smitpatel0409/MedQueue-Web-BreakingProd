"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");

    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      // Default = light mode
      document.documentElement.classList.remove("dark");
    }
  }, []);

  if (!mounted) return null;

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-[--color-border] bg-[--color-card] hover:bg-[--color-muted] transition"
    >
      {theme === "light" ? (
        <Moon className="h-7 w-7 text-[--color-foreground]" />
      ) : (
        <Sun className="h-7 w-7 text-[--color-foreground]" />
      )}
    </button>
  );
}
