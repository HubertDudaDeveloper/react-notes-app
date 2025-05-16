"use client";

import { ETheme } from "@/types/theme";
import { loadTheme, saveTheme } from "@/utils/storage";
import { createContext, ReactNode, useEffect, useState } from "react";

type TThemeContext = {
  theme: ETheme;
  setTheme: (theme: ETheme) => void;
};

export const ThemeContext = createContext<TThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ETheme>(ETheme.LIGHT);

  useEffect(() => setTheme(loadTheme()), []);
  useEffect(() => saveTheme(theme), [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
