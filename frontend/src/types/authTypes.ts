import { FavoriteType } from "./favoriteTypes";
import { NoteType } from "./noteTypes";

export type UserType = {
  email: string;
  password: string;
};

export type UserUpdateType = {
  id: number;
  name: string;
}

export type NewUserType = UserType & {
  avatar?: string;
  name: string;
};

export type UserBasicInfoType = {
  id: number;
  avatar?: string | null;
  name: string;
  email: string;
  password: string;
  notes: NoteType[];
  favorites: FavoriteType[];
  createdAt: Date;
  updatedAt: Date;
};

export type AuthApiStateType = {
  token: string | null;
  userInfo?: UserBasicInfoType | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

export type AuthTokenStateType = {
  token?: string | null;
  userInfo?: UserBasicInfoType | null;
};
