"use client";

import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from "react";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}