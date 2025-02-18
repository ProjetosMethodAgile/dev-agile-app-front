'use client'

export default function ToggleTheme() {
  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
  }

  return <button onClick={toggleTheme}>toggle theme</button>;
}
