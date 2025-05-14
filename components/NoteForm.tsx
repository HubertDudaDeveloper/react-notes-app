"use client";

import { INote } from "@/types/note";
import { ChangeEvent, ReactElement, useState } from "react";
import NoteFormModule from "@/assets/styles/NoteForm.module.scss"

export const NoteForm = (): ReactElement => {
  const initialNote: INote = {
    id: "",
    title: "",
    content: "",
    color: "",
    createdAt: "",
    isFavorite: false,
  };

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
    
  };

  return (
    <form className={ NoteFormModule.form }>
      <div>
        <input
          className={ NoteFormModule.title }
          type="text"
          value={note.title}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChange(event, "title")
          }
        />
        <button className={ NoteFormModule.form__isFavorite } type="button" onClick={() => setIsFavorite(!isFavorite)}>
          {isFavorite ? "✰" : "★"}
        </button>
      </div>
      
      <textarea
        className={ NoteFormModule.form__content }
        value={note.content}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          handleChange(event, "content")
        }
      />
      <input
        type="color"
        value={note.color}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleChange(event, "color")
        }
      />
      <button
        type="submit"
        onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
      >
        Zapisz notatkę
      </button>
    </form>
  );
};

export default NoteForm;
