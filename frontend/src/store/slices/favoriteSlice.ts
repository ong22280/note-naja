import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { AxiosError } from "axios";
import { RootState } from "@/store/store";
import { NewFavorite, FavoriteType, FavoriteApiState } from "@/types/favoriteTypes";

const initialState: FavoriteApiState = {
  favorite: null,
  favorites: [],
  status: "idle",
  error: null,
};

export const createFavoriteNote = createAsyncThunk(
  "favorite/create",
  async (data: NewFavorite, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.post("/favorites", data);
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

export const getFavoriteNotesByUserId = createAsyncThunk(
  "favorite/getByUserId",
  async (userId: number, { rejectWithValue }) => {
    try {
      const { data: favorites } = await axiosInstance.get(`/favorites/${userId}`);
      return favorites;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        return rejectWithValue(errorResponse);
      }
      throw error;
    }
  }
);

export const deleteFavoriteNoteById = createAsyncThunk(
  "favorite/deleteById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/favorites/${id}`);
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

export const deleteFavoriteNoteByNoteId = createAsyncThunk(
  "favorite/deleteByNoteId",
  async (noteId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/favorites/note/${noteId}`);
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

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createFavoriteNote.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createFavoriteNote.fulfilled, (state, action) => {
        state.status = "idle";
        state.favorite = action.payload;
      })
      .addCase(createFavoriteNote.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = (action.payload as ErrorResponse).message || "Create favorite note failed";
        } else {
          state.error = action.error.message || "Create favorite note failed";
        }
      })

      .addCase(getFavoriteNotesByUserId.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getFavoriteNotesByUserId.fulfilled, (state, action) => {
        state.status = "idle";
        state.favorites = action.payload;
      })
      .addCase(getFavoriteNotesByUserId.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = (action.payload as ErrorResponse).message || "Get favorite notes by user id failed";
        } else {
          state.error = action.error.message || "Get favorite notes by user id failed";
        }
      })

      .addCase(deleteFavoriteNoteById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteFavoriteNoteById.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(deleteFavoriteNoteById.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = (action.payload as ErrorResponse).message || "Delete favorite note by id failed";
        } else {
          state.error = action.error.message || "Delete favorite note by id failed";
        }
      })

      .addCase(deleteFavoriteNoteByNoteId.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteFavoriteNoteByNoteId.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(deleteFavoriteNoteByNoteId.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = (action.payload as ErrorResponse).message || "Delete favorite note by note id failed";
        } else {
          state.error = action.error.message || "Delete favorite note by note id failed";
        }
      });
  },
});

export const {} = favoriteSlice.actions;
export const favoriteSelector = (state: RootState) => state.favorite;
export default favoriteSlice.reducer;
