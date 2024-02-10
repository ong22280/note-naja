import { UserBasicInfoType } from "./authTypes";
import { CategoryEnumType } from "./categoryTypes";
import { LogType } from "./logTypes";
import { TagType } from "./tagTypes";

export type NoteType = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserBasicInfoType;
  logs: LogType[];
  category: CategoryEnumType;
  tags: TagType[];
};

export type NewNote = {
  title: string;
  content: string;
  category: CategoryEnumType;
  tags: string[];
};

export type NoteApiState = {
  note: NoteType | null;
  notes: NoteType[] | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};
