import { NoteType } from "./noteTypes";

export type TagType = {
  id: number;
  name: string;
  notes: NoteType[];
  createdAt: Date;
  updatedAt: Date;
};

export type NewTag = {
  name: string;
};

export type TagApiState = {
  tag: TagType | null;
  tags: TagType[] | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};