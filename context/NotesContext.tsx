"use client";

import { ENotesSortValue, INote } from "@/types/note";
import { loadNotes, saveNotes } from "@/utils/storage";
import { createContext, ReactNode, useEffect, useState } from "react";

type TNotesContext = {
  notes: INote[];
  sortValue: ENotesSortValue;
  getNotes: () => void;
  addNote: (note: INote) => void;
  removeNote: (noteId: string) => void;
  sortNotes: (value: ENotesSortValue) => void;
  updateNote: (note: INote) => void;
  setSortValue: (value: ENotesSortValue) => void;
};

export const NotesContext = createContext<TNotesContext | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [sortValue, setSortValue] = useState<ENotesSortValue>(
    ENotesSortValue.ASC
  );

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = (): void => setNotes(loadNotes());

  const sortNotes = (value: ENotesSortValue): void => {
    notes.sort((prevNote, nextNote) => {
      const sortOrder =
        value === ENotesSortValue.ASC
          ? prevNote.createdAt < nextNote.createdAt
          : prevNote.createdAt > nextNote.createdAt;

      return sortOrder ? -1 : !sortOrder ? 1 : 0;
    });
  };

  const addNote = (note: INote): void => {
    note.id = notes.length
      ? String(Number(notes[notes.length - 1].id) + 1)
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
        sortNotes,
        updateNote,
        sortValue,
        setSortValue,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
