import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { AxiosError } from "axios";
import { RootState } from "@/store/store";
import { NewTag, TagType, TagApiState } from "@/types/tagTypes";

const initialState: TagApiState = {
  tag: null,
  tags: [],
  status: "idle",
  error: null,
};

export const createTag = createAsyncThunk(
  "tag/create",
  async (data: NewTag, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.post("/tags", data);
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

export const getAllTags = createAsyncThunk("tag/getAll", async () => {
  try {
    const { data: tags } = await axiosInstance.get("/tags");
    return tags;
  } catch (error) {
    throw error;
  }
});

export const getTagById = createAsyncThunk(
  "tag/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data: tag } = await axiosInstance.get(`/tags/${id}`);
      // console.log(tag);
      return tag;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        return rejectWithValue(errorResponse);
      }
      throw error;
    }
  }
);

export const updateTag = createAsyncThunk(
  "tag/update",
  async (data: TagType, { rejectWithValue }) => {
    try {
      const { data: tag } = await axiosInstance.put(`/tags/${data.id}`, data);
      return tag;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        return rejectWithValue(errorResponse);
      }
      throw error;
    }
  }
);

export const deleteTag = createAsyncThunk(
  "tag/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/tags/${id}`);
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

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTag.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        createTag.fulfilled,
        (state, action: PayloadAction<TagType>) => {
          state.status = "idle";
          state.tag = action.payload;
        }
      )
      .addCase(createTag.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Create tag failed";
        } else {
          state.error = action.error.message || "Create tag failed";
        }
      })

      .addCase(getAllTags.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getAllTags.fulfilled,
        (state, action: PayloadAction<TagType[]>) => {
          state.status = "idle";
          state.tags = action.payload;
        }
      )
      .addCase(getAllTags.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Get all tags failed";
        } else {
          state.error = action.error.message || "Get all tags failed";
        }
      })

      .addCase(getTagById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getTagById.fulfilled,
        (state, action: PayloadAction<TagType>) => {
          state.status = "idle";
          state.tag = action.payload;
        }
      )
      .addCase(getTagById.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message ||
            "Get tag by id failed";
        } else {
          state.error = action.error.message || "Get tag by id failed";
        }
      })

      .addCase(updateTag.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateTag.fulfilled,
        (state, action: PayloadAction<TagType>) => {
          state.status = "idle";
          state.tag = action.payload;
        }
      )
      .addCase(updateTag.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Update tag failed";
        } else {
          state.error = action.error.message || "Update tag failed";
        }
      })

      .addCase(deleteTag.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Delete tag failed";
        } else {
          state.error = action.error.message || "Delete tag failed";
        }
      });
  },
});

export const {} = tagSlice.actions;
export const tagSelector = (state: RootState) => state.tag;
export default tagSlice.reducer;
