import { useEffect, useState } from "react";

function useDarkMode() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    );
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return [theme, toggleTheme];
}

export default useDarkMode;
