import React, { createContext, useContext } from "react";

export const ThemeContext = createContext();

const defaultTheme = {
  main: "#009edb",
  light: "#F399C7",
  dark: "#861B54",
  grey: "#d9d9d9",
  contrastText: "#3D5E73",
};

export const useTheme = () => useContext(ThemeContext) || defaultTheme;

export const ThemeProvider = ({ children, theme }) => {
  return (
    // the Provider gives access to the context to its children
    <ThemeContext.Provider value={{ ...defaultTheme, ...theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
