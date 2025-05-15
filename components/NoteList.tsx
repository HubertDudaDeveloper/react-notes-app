"use client";

import { useNotes } from "@/hooks/useNotes";
import { INote } from "@/types/note";

export const NoteList = () => {
  const { notes } = useNotes();

  return (
    <>
      { notes.map((note: INote, index: number) =>
        (
          <div key={`${note.id} - ${index}`}>
            <h3>
              { note.title }
            </h3>
            <p>
              { note.content }
            </p>
            <span>
              { note.color }
            </span>
          </div>
        )
      ) }
    </>
  )
}

export default NoteList;