"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function ToggleTheme() {
  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
  }

  return (
    <button className="*:transition-colors border-primary-300 mt-24 flex items-center gap-4 rounded-full border-2 border-solid p-1 *:size-9 *:cursor-pointer *:rounded-full *:p-1">
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
