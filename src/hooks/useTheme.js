// src/hooks/useTheme.js

import { useState, useEffect } from "react";

// Key for localStorage
const THEME_KEY = "portfolio-app-theme";

/**
 * Custom hook to toggle and manage Dark/Light theme state
 */
const useTheme = () => { // Removed 'export const'
  // Initialize state from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    return storedTheme || "light";
  });

  // Effect to update localStorage and apply the theme class to the <body>
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.body.className = theme; // Applies 'light' or 'dark' class
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};

export default useTheme; // <-- ADDED DEFAULT EXPORT HERE