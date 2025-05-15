import { INote } from "@/types/note";
import { ChangeEvent, ReactElement } from "react";
import NoteItemModel from "@/assets/styles/NoteItem.module.scss";
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

  const formatDate = (date: string) => new Date(date).toLocaleString("pl-PL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleChange = (key: string, value: string | boolean) => {
    const newNote: INote = { ...note, [key]: value };
    updateNote(newNote);
  };

  return (
    <div className={NoteItemModel.noteItem} key={`${note.id}`}>
      <div className={NoteItemModel.noteTitleContainer}>
        <input
          type="text"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChange("title", event.target.value)
          }
          className={NoteItemModel.noteTitle}
          style={{ color: note.color }}
          value={note.title}
        />
        <button
          className={NoteItemModel.noteIsFavorite}
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
        className={NoteItemModel.noteContent}
      >
      </textarea>
      <input
        type="color"
        value={note.color}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleChange("color", event.target.value)
        }
        className={NoteItemModel.noteColor}
      />

      <span>Data utworzenia: { formatDate(note.createdAt) }</span>
      <button
        className={NoteItemModel.noteRemove}
        type="button"
        onClick={() => onRemoveNote()}
      >
        Usuń notatkę
      </button>
    </div>
  );
};

export default NoteItem;
