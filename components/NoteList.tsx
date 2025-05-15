"use client";

import { useNotes } from "@/hooks/useNotes";
import { INote } from "@/types/note";
import { ReactElement } from "react";
import NoteItem from "@/components/NoteItem";

export const NoteList = (): ReactElement => {
  const { notes, removeNote } = useNotes();

  const handleRemoveNote = (noteId: string) => {
    removeNote(noteId);
  }

  return (
    <>
      { notes.map((note: INote) =>
        (
          <NoteItem key={note.id} note={note} onRemoveNote={() => handleRemoveNote(note.id)}/>
        )
      ) }
    </>
  )
}

export default NoteList;