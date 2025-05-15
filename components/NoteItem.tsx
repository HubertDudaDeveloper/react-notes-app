import { INote } from "@/types/note";
import { ChangeEvent, ReactElement } from "react";
import NodeItem from "@/assets/styles/NoteItem.module.scss";
import { useNotes } from "@/hooks/useNotes";

interface INoteItemProps {
  note: INote;
  onRemoveNote: () => void;
}

export const NoteItem = ({
  note,
  onRemoveNote,
}: INoteItemProps): ReactElement => {
  const { updateNote } = useNotes();

  const handleChange = (key: string, value: string | boolean) => {
    const newNote: INote = { ...note, [key]: value };
    updateNote(newNote);
  };

  return (
    <div className={NodeItem.note__item} key={`${note.id}`}>
      <div className={NodeItem.note__title__container}>
        <input
          type="text"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChange("title", event.target.value)
          }
          className={NodeItem.note__title}
          style={{ color: note.color }}
          value={note.title}
        />
        <button
          className={NodeItem.form__isFavorite}
          type="button"
          onClick={() => handleChange("isFavorite", !note.isFavorite)}
        >
          { note.isFavorite ? "★" : "✰" }
        </button>
      </div>
      <textarea
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          handleChange("content", event.target.value)
        }
        value={note.content}
        className={NodeItem.note__content}
      >
      </textarea>
      <input
        type="color"
        value={note.color}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleChange("color", event.target.value)
        }
        className={NodeItem.note__color}
      />
      <button
        className={NodeItem.note__remove}
        type="button"
        onClick={() => onRemoveNote()}
      >
        Usuń notatkę
      </button>
    </div>
  );
};

export default NoteItem;
