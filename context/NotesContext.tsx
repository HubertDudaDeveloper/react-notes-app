"use client";

import { INote } from "@/types/note";
import { loadNotes, saveNotes } from "@/utils/storage";
import { createContext, ReactNode, useEffect, useState } from "react";

type TNotesContext = {
  notes: INote[];
  getNotes: () => void;
  addNote: (note: INote) => void;
};

export const NotesContext = createContext<TNotesContext | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => setNotes(loadNotes());

  const addNote = (note: INote) => {
    const newNotes = [...notes, note];
    setNotes(newNotes);
    saveNotes(newNotes);
  };

  return (
    <NotesContext.Provider value={{ notes, getNotes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};
