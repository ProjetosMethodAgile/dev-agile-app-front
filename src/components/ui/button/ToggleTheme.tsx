"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export default function ToggleTheme() {
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") || "light";
    window.document.documentElement.classList.add(localTheme);
  }, []);

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    window.localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  }

  return (
    <button className="border-primary-300  fixed right-10 z-10 top-8 flex items-center gap-4 rounded-full border-2 border-solid p-1 *:size-8 *:cursor-pointer *:rounded-full *:p-1 *:transition-colors max-lg:mt-2 max-lg:justify-self-center">
      <Sun
        onClick={toggleTheme}
        className="rounded-full bg-yellow-500 p-1 text-yellow-950 dark:bg-transparent dark:text-gray-400"
      />
      <Moon
        onClick={toggleTheme}
        className="dark:bg-primary-900 text-primary-900 bg-transparent dark:border-1 dark:text-gray-50"
      />
    </button>
  );
}
