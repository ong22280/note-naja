export type FavoriteType = {
  id: number;
  noteId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type NewFavorite = {
  noteId: number;
  userId: number;
};

export type FavoriteApiState = {
  favorite: FavoriteType | null;
  favorites: FavoriteType[] | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};
