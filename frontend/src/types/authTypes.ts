import { Note } from "./noteTypes";

type User = {
  email: string;
  password: string;
};

type NewUser = User & {
  avatar?: string;
  name: string;
};

export type UserBasicInfo = {
  id: number;
  avatar?: string | null;
  name: string;
  email: string;
  password: string;
  notes: Note[];
  createdAt: Date;
  updatedAt: Date;
};

type AuthApiState = {
  token: string | null;
  userInfo?: UserBasicInfo | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

type AuthTokenState = {
  token?: string | null;
  userInfo?: UserBasicInfo | null;
};