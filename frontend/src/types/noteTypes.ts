type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  logs: Log[];
  category: Category;
  tags: Tag[];
};

type NewNote = {
  title: string;
  content: string;
  category: CategoryType;
  tags: string[];
};

type NoteApiState = {
  note: Note | null;
  notes: Note[] | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};
