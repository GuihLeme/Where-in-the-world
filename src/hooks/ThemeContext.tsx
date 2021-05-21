import React, { createContext, useContext, useState } from 'react';


interface ThemeContextData {
  isDarkMode: boolean,
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC =  ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  }

  return(
    <ThemeContext.Provider value={{
      isDarkMode,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  return context;
}


