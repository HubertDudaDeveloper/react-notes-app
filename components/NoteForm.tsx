"use client";

import { INote } from "@/types/note";
import { ChangeEvent, ReactElement, useState } from "react";
import NoteFormModule from "@/assets/styles/NoteForm.module.scss";
import { useNotes } from "@/hooks/useNotes";

export const NoteForm = (): ReactElement => {
  const initialNote: INote = {
    id: "",
    title: "",
    content: "",
    color: "#000000",
    createdAt: "",
    isFavorite: false,
  };

  const { addNote } = useNotes();

  const [note, setNote] = useState<INote>(initialNote);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    fieldName: string
  ) => {
    setNote((prev) => ({ ...prev, [fieldName]: event.target.value }));
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    note.isFavorite = isFavorite;
    addNote(note);
    setNote(initialNote);
  };

  return (
    <form className={NoteFormModule.form}>
      <div className={NoteFormModule.formWrapper}>
        <input
          placeholder="Wpisz tytuł..."
          className={NoteFormModule.formTitle}
          type="text"
          required
          value={note.title}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChange(event, "title")
          }
        />
        <button
          className={NoteFormModule.formIsFavorite}
          type="button"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? "★" : "✰"}
        </button>
      </div>

      <textarea
        placeholder="Co masz na myśli..."
        className={NoteFormModule.formContent}
        value={note.content}
        required
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          handleChange(event, "content")
        }
      />

      <label htmlFor="form-color" className={NoteFormModule.formLabelColor}>
        Kolor:
      </label>

      <input
        id="form-color"
        type="color"
        value={note.color}
        className={NoteFormModule.formColor}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleChange(event, "color")
        }
      />
      <button
        type="submit"
        className={NoteFormModule.formButton}
        onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
      >
        Zapisz notatkę
      </button>
    </form>
  );
};

export default NoteForm;
