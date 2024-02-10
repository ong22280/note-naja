import { TagType } from "./tagTypes";
import { NoteType } from "./noteTypes";

export type LogType = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  note: NoteType;
  tags: TagType[];
};

export type NewLog = {
  title: string;
  content: string;
  noteId: number;
  tags: TagType[];
};

export type LogApiState = {
  log: LogType | null;
  logs: LogType[] | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};