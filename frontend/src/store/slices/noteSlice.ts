import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { AxiosError } from "axios";
import { RootState } from "@/store/store";
import { NewNote, NoteType, NoteApiState } from "@/types/noteTypes";

const initialState: NoteApiState = {
  note: null,
  notes: [],
  status: "idle",
  error: null,
};

export const createNote = createAsyncThunk(
  "note/create",
  async (data: NewNote, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.post("/notes", data);
      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        return rejectWithValue(errorResponse);
      }
      throw error;
    }
  }
);

export const getAllNotes = createAsyncThunk("note/getAll", async () => {
  try {
    const { data: notes } = await axiosInstance.get("/notes");
    return notes;
  } catch (error) {
    throw error;
  }
});

export const getNoteById = createAsyncThunk(
  "note/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data: note } = await axiosInstance.get(`/notes/${id}`);
      console.log(note);
      return note;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        return rejectWithValue(errorResponse);
      }
      throw error;
    }
  }
);

export const updateNote = createAsyncThunk(
  "note/update",
  async (data: NoteType, { rejectWithValue }) => {
    try {
      const { data: note } = await axiosInstance.put(`/notes/${data.id}`, data);
      return note;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        return rejectWithValue(errorResponse);
      }
      throw error;
    }
  }
);

export const deleteNote = createAsyncThunk(
  "note/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/notes/${id}`);
      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        return rejectWithValue(errorResponse);
      }
      throw error;
    }
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action: PayloadAction<NoteType>) => {
        state.status = "idle";
        state.note = action.payload;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Create note failed";
        } else {
          state.error = action.error.message || "Create note failed";
        }
      })

      .addCase(getAllNotes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllNotes.fulfilled, (state, action: PayloadAction<NoteType[]>) => {
        state.status = "idle";
        state.notes = action.payload;
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Get all notes failed";
        } else {
          state.error = action.error.message || "Get all notes failed";
        }
      })

      .addCase(getNoteById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getNoteById.fulfilled, (state, action: PayloadAction<NoteType>) => {
        state.status = "idle";
        state.note = action.payload;
      })
      .addCase(getNoteById.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Get note by id failed";
        } else {
          state.error = action.error.message || "Get note by id failed";
        }
      })

      .addCase(updateNote.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action: PayloadAction<NoteType>) => {
        state.status = "idle";
        state.note = action.payload;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Update note failed";
        } else {
          state.error = action.error.message || "Update note failed";
        }
      })

      .addCase(deleteNote.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Delete note failed";
        } else {
          state.error = action.error.message || "Delete note failed";
        }
      });
  },
});

export const {} = noteSlice.actions;
export const noteSelector = (state: RootState) => state.note;
export default noteSlice.reducer;
