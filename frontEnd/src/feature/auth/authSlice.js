import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const userJSON = localStorage.getItem("user");
const user = userJSON !== "undefined" ? JSON.parse(userJSON) : null;

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  update: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.update = true;
        state.user = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

// Register User
export const register = createAsyncThunk(
  "/register",
  async (user, thunkAPI) => {
    try {
      console.log(user, "user");
      return await authService.register(user);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const login = createAsyncThunk("/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    console.log(error, "kkkkkkkk");
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const editUser = createAsyncThunk(
  "/editUser",
  async ({ userId, name, email, image }, thunkAPI) => {
    try {
      console.log(thunkAPI.getState(), "token");
      const token = thunkAPI.getState().auth.user.token;
      return await authService.editUserDeatils(
        token,
        userId,
        name,
        email,
        image
      );
    } catch (error) {
      alert(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("/logout", async () => {
  try {
    return await authService.logout();
  } catch (error) {}
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
