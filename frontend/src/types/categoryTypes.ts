import { NoteType } from "./noteTypes";

export enum CategoryEnumType {
  WORK = "WORK",
  PERSONAL = "PERSONAL",
  OTHERS = "OTHERS",
}

export type CategoryType = {
  id: number;
  name: CategoryEnumType;
  notes: NoteType[];
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryApiState = {
  category: CategoryType | null;
  categories: CategoryType[] | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};