"use client";

import { INote } from "@/types/note";
import { ETheme } from "@/types/theme";

export const loadNotes = (): INote[] => {
  if (typeof window === "undefined") return [];
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");

  return notes as INote[];
};

export const saveNotes = (notes: INote[]): void => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export const loadTheme = (): ETheme => {
  if (typeof window === "undefined") return ETheme.LIGHT;
  const theme = localStorage.getItem("theme") || ETheme.LIGHT;

  return theme as ETheme;
};

export const saveTheme = (theme: ETheme): void => {
  localStorage.setItem("theme", theme);
};
