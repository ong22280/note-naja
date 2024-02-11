import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { AxiosError } from "axios";
import { RootState } from "@/store/store";
import { NewLog, LogType, LogApiState } from "@/types/logTypes";

const initialState: LogApiState = {
  log: null,
  logs: [],
  status: "idle",
  error: null,
};

export const createLog = createAsyncThunk(
  "log/create",
  async (data: NewLog, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.post("/logs", data);
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

export const getAllLogs = createAsyncThunk("log/getAll", async () => {
  try {
    const { data: logs } = await axiosInstance.get("/logs");
    return logs;
  } catch (error) {
    throw error;
  }
});

export const getLogById = createAsyncThunk(
  "log/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data: log } = await axiosInstance.get(`/logs/${id}`);
      console.log("log from slice", log);
      return log;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        return rejectWithValue(errorResponse);
      }
      throw error;
    }
  }
);

export const updateLog = createAsyncThunk(
  "log/update",
  async (data: LogType, { rejectWithValue }) => {
    try {
      const { data: log } = await axiosInstance.put(`/logs/${data.id}`, data);
      return log;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        return rejectWithValue(errorResponse);
      }
      throw error;
    }
  }
);

export const deleteLog = createAsyncThunk(
  "log/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/logs/${id}`);
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

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLog.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createLog.fulfilled, (state, action: PayloadAction<LogType>) => {
        state.status = "idle";
        state.log = action.payload;
      })
      .addCase(createLog.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Create log failed";
        } else {
          state.error = action.error.message || "Create log failed";
        }
      })

      .addCase(getAllLogs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getAllLogs.fulfilled,
        (state, action: PayloadAction<LogType[]>) => {
          state.status = "idle";
          state.logs = action.payload;
        }
      )
      .addCase(getAllLogs.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Get all logs failed";
        } else {
          state.error = action.error.message || "Get all logs failed";
        }
      })

      .addCase(getLogById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getLogById.fulfilled,
        (state, action: PayloadAction<LogType>) => {
          state.status = "idle";
          state.log = action.payload;
        }
      )
      .addCase(getLogById.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Get log by id failed";
        } else {
          state.error = action.error.message || "Get log by id failed";
        }
      })

      .addCase(updateLog.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateLog.fulfilled, (state, action: PayloadAction<LogType>) => {
        state.status = "idle";
        state.log = action.payload;
      })
      .addCase(updateLog.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Update log failed";
        } else {
          state.error = action.error.message || "Update log failed";
        }
      })

      .addCase(deleteLog.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteLog.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteLog.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Delete log failed";
        } else {
          state.error = action.error.message || "Delete log failed";
        }
      });
  },
});

export const {} = logSlice.actions;
export const logSelector = (state: RootState) => state.log;
export default logSlice.reducer;
