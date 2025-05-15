"use client";

import { INote } from "@/types/note";

export const loadNotes = (): INote[] => {
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');

  return notes as INote[];
}

export const saveNotes = (notes: INote[]): void => {
  localStorage.setItem('notes', JSON.stringify(notes));
}