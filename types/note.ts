export interface INote {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  color: string;
  isFavorite: boolean;
}

export enum ENotesSortValue {
  DESC = 'descending',
  ASC = 'ascscending'
}