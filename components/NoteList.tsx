"use client";

import { useNotes } from "@/hooks/useNotes";
import { ENotesSortValue, INote } from "@/types/note";
import { ReactElement, useMemo, useState } from "react";
import NoteItem from "@/components/NoteItem";
import NoteListModule from "@/assets/styles/NoteList.module.scss"

export const NoteList = (): ReactElement => {
  const { notes, removeNote } = useNotes();
  const [ sortValue, setSortValue ] = useState<ENotesSortValue>(ENotesSortValue.DESC); 
  const [ isFilterFavorite, setIsFilterFavorite ] = useState<boolean>(false);

  const handleRemoveNote = (noteId: string): void => {
    removeNote(noteId);
  }

  const sortedNotes: INote[] = useMemo(() => notes.sort((prevNote, nextNote) => {
    const sortOrder = sortValue === ENotesSortValue.ASC
      ? prevNote.createdAt < nextNote.createdAt
      : prevNote.createdAt > nextNote.createdAt;

    return sortOrder ? -1 : !sortOrder ? 1 : 0;
  }), [sortValue, notes]);
  
  const filteredNotes: INote[] = useMemo(
    () => sortedNotes.filter((note: INote) => !isFilterFavorite || (isFilterFavorite && note.isFavorite)),
    [isFilterFavorite, sortedNotes, sortValue]
  );

  return (
    <div className={ NoteListModule.noteList }>
      <section className={ NoteListModule.noteListAction }>
        <button
          className={ NoteListModule.noteListActionButton }
          onClick={(()=> setIsFilterFavorite(!isFilterFavorite))}
        >
          Filtruj ulubione: { isFilterFavorite ? "★" : "✰" }
        </button>
        
        <button
          className={ NoteListModule.noteListActionButton }
          onClick={(()=> setSortValue(ENotesSortValue.DESC))}
        >
          Od najstarszych
        </button>

        <button
          className={ NoteListModule.noteListActionButton }
          onClick={(()=> setSortValue(ENotesSortValue.ASC))}
        >
          Od najmłodszych
        </button>
      </section>
      <section id="note-list" className={ NoteListModule.noteListContainer }>
        { filteredNotes.map((note: INote) =>
          (
            <NoteItem key={note.id} note={note} onRemoveNote={() => handleRemoveNote(note.id)}/>
          )
        ) }
      </section>
    </div>
  )
}

export default NoteList;