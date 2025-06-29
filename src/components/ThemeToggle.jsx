import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 px-3 py-1 rounded shadow bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:scale-105 transition"
    >
      {theme === "dark" ? "🌙" : "☀ "} 
    </button>
  );
}

export default ThemeToggle;
