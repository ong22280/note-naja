import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { AxiosError } from "axios";
import { RootState } from "@/store/store";
import { AuthApiStateType, AuthTokenStateType, NewUserType, UserType, UserBasicInfoType } from "@/types/authTypes";

const initialState: AuthApiStateType = {
  token:
    typeof window !== "undefined" && localStorage.getItem("authToken")
      ? (JSON.parse(localStorage.getItem("authToken") || "").token as null)
      : null,
  userInfo:
    typeof window !== "undefined" && localStorage.getItem("authToken")
      ? (JSON.parse(localStorage.getItem("authToken") || "").userInfo as null)
      : null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: UserType, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.post("/login", data);
      const token: string = response.access_token;
      const authToken: AuthTokenStateType = {
        token,
      };
      localStorage.setItem("authToken", JSON.stringify(authToken));
      return token;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        return rejectWithValue(errorResponse);
      }
      throw error;
    }
  }
);

export const signup = createAsyncThunk(
  "auth/sign-up",
  async (data: NewUserType, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/signup", data);
      const resData = response.data;
      return resData;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        return rejectWithValue(errorResponse);
      }
      throw error;
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/logout", {});
      const resData = response.data;
      localStorage.removeItem("authToken");
      return resData;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        return rejectWithValue(errorResponse);
      }
      throw error;
    }
  }
);

export const getUser = createAsyncThunk("auth/me", async () => {
  try {
    const token = JSON.parse(localStorage.getItem("authToken") || "").token;
    const { data: user } = await axiosInstance.get(`/users/me`);
    const userInfo: UserBasicInfoType = user;
    const authToken: AuthTokenStateType = {
      token,
      userInfo,
    };
    localStorage.setItem("authToken", JSON.stringify(authToken));
    return user;
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "idle";
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Login failed";
        } else {
          state.error = action.error.message || "Login failed";
        }
      })

      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "idle";
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Registration failed";
        } else {
          state.error = action.error.message || "Registration failed";
        }
      })

      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = null;
        state.userInfo = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Logout failed";
        } else {
          state.error = action.error.message || "Logout failed";
        }
      })

      .addCase(getUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message ||
            "Get user profile data failed";
        } else {
          state.error = action.error.message || "Get user profile data failed";
        }
      });
  },
});

export const {} = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;