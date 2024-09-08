import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext({
  theme: null,
  toggleTheme: () => {},
});

const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export default ThemeContext;

export const useTheme = () => useContext(themeContext);
