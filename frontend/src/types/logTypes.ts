import { NoteType } from "./noteTypes";

export type LogType = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  note: NoteType;
};
