"use client";

import { useNotes } from "@/hooks/useNotes";
import { ENotesSortValue, INote } from "@/types/note";
import { ReactElement, useMemo, useState } from "react";
import NoteItem from "@/components/NoteItem";
import NoteListModule from "@/assets/styles/NoteList.module.scss";
import clsx from "clsx";

export const NoteList = (): ReactElement => {
  const { notes, removeNote } = useNotes();
  const [sortValue, setSortValue] = useState<ENotesSortValue>(
    ENotesSortValue.DESC
  );
  const [isFilterFavorite, setIsFilterFavorite] = useState<boolean>(false);

  const handleRemoveNote = (noteId: string): void => {
    removeNote(noteId);
  };

  const sortedNotes: INote[] = useMemo(
    () =>
      notes.sort((prevNote, nextNote) => {
        const sortOrder =
          sortValue === ENotesSortValue.ASC
            ? prevNote.createdAt < nextNote.createdAt
            : prevNote.createdAt > nextNote.createdAt;

        return sortOrder ? -1 : !sortOrder ? 1 : 0;
      }),
    [sortValue, notes]
  );

  const filteredNotes: INote[] = useMemo(
    () =>
      sortedNotes.filter(
        (note: INote) =>
          !isFilterFavorite || (isFilterFavorite && note.isFavorite)
      ),
    [isFilterFavorite, sortedNotes, sortValue]
  );

  return (
    <div className={NoteListModule.noteList}>
      <section className={NoteListModule.noteListAction}>
        <button
          className={clsx(
            NoteListModule.noteListActionButton,
            isFilterFavorite && NoteListModule.noteListActionButton__active
          )}
          onClick={() => setIsFilterFavorite(!isFilterFavorite)}
        >
          Filtruj ulubione:{" "}
          <span className={NoteListModule.noteListActionButtonStar}>
            {isFilterFavorite ? "★" : "✰"}
          </span>
        </button>

        <div className={NoteListModule.noteListActionSort}>
          Sortuj po dacie:
          <button
            className={clsx(
              NoteListModule.noteListActionButton,
              sortValue === ENotesSortValue.DESC && NoteListModule.noteListActionButton__active
            )}
            onClick={() => setSortValue(ENotesSortValue.DESC)}
          >
            Rosnąco
          </button>
          <button
            className={clsx(
              NoteListModule.noteListActionButton,
              sortValue === ENotesSortValue.ASC && NoteListModule.noteListActionButton__active
            )}
            onClick={() => setSortValue(ENotesSortValue.ASC)}
          >
            Malejąco
          </button>
        </div>
      </section>
      <section id="note-list" className={NoteListModule.noteListContainer}>
        {filteredNotes.length ? filteredNotes.map((note: INote) => (
          <NoteItem
            key={note.id}
            note={note}
            onRemoveNote={() => handleRemoveNote(note.id)}
          />
        )): <span className={NoteListModule.noteListNoNotes}>Brak notatek</span>}
      </section>
    </div>
  );
};

export default NoteList;
