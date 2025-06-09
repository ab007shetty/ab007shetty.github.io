import React, { useContext, useState } from "react";
const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("icy");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}