import { INote } from "@/types/note";

export const loadNotes = (): INote[] => {
  const notes = localStorage.get('notes') ?? JSON.parse(localStorage.get('notes'));

  return notes as INote[];
}

export const saveNotes = (notes: INote[]): void => {
  localStorage.set('notes', JSON.stringify(notes));
}