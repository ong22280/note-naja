import { NoteType } from "./noteTypes";

export type TagType = {
  id: number;
  name: string;
  notes: NoteType[];
  createdAt: Date;
  updatedAt: Date;
};
