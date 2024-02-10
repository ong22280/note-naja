import { Note } from "./noteTypes";

export enum CategoryType {
  WORK = "WORK",
  PERSONAL = "PERSONAL",
  OTHERS = "OTHERS",
}

type Category = {
  id: number;
  name: CategoryType;
  notes: Note[];
  createdAt: Date;
  updatedAt: Date;
};
