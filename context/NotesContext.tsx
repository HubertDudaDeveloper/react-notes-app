"use client";

import { INote } from "@/types/note";
import { loadNotes, saveNotes } from "@/utils/storage";
import { createContext, ReactNode, useEffect, useState } from "react";

type TNotesContext = {
  notes: INote[];
  getNotes: () => void;
  addNote: (note: INote) => void;
  removeNote: (noteId: string) => void;
  updateNote: (note: INote) => void;
};

export const NotesContext = createContext<TNotesContext | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = (): void => setNotes(loadNotes());

  const addNote = (note: INote): void => {
    const maxValue = Math.max(...notes.map((note: INote) => Number(note.id)));
    
    note.id = notes.length
      ? String(maxValue + 1)
      : "0";
    note.createdAt = new Date().toISOString();
    const newNotes = [...notes, note];
    setNotes(newNotes);
    saveNotes(newNotes);
  };

  const removeNote = (noteId: string): void => {
    const newNotes = notes.filter((note: INote) => note.id !== noteId);
    setNotes(newNotes);
    saveNotes(newNotes);
  };

  const updateNote = (note: INote) => {
    const noteIndex = notes.findIndex((fNote) => fNote.id === note.id);
    const copyNotes = [...notes]
    copyNotes[noteIndex] = note;
    setNotes(copyNotes);
    saveNotes(copyNotes);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        getNotes,
        addNote,
        removeNote,
        updateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
