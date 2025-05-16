"use client";

import { createContext, ReactNode, useState } from "react";

export enum EThemes {
  DEFAULT = 'system',
  DARK = 'dark',
  LIGHT = 'light'
}

type TThemeContext = {
  theme: EThemes
  setTheme: (theme: EThemes) => void
}

export const ThemeContext = createContext<TThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<EThemes>(EThemes.DEFAULT);
  
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme
      }}
    >
      { children }
    </ThemeContext.Provider>
  )
}