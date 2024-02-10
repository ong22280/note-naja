import { UserBasicInfo } from "./authTypes";
import { CategoryType } from "./categoryTypes";
import { Log } from "./logTypes";

export type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserBasicInfo;
  logs: Log[];
  category: CategoryType;
  tags: Tag[];
};

export type NewNote = {
  title: string;
  content: string;
  category: CategoryType;
  tags: string[];
};

export type NoteApiState = {
  note: Note | null;
  notes: Note[] | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};
