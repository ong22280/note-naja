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
