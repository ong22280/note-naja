import { Note } from "./noteTypes";

export type Log = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  note: Note;
};
