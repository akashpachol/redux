import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAuthService from "./adminServices";
const admin = JSON.parse(localStorage.getItem("admin"));
const initialState = {
  admin: admin ? admin : null,
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUserAdded: false,
  message: "",
};

export const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.isUserAdded = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.admin = null;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(UserBlock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UserBlock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(UserBlock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(searchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.users;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isUserAdded=true
        state.users = action.payload
    })
    .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
    .addCase(editUser.pending, (state) => {
      state.isLoading = true
  })
  .addCase(editUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.users = action.payload.users
  })
  .addCase(editUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
  })
  },
});

export const adminLogin = createAsyncThunk(
  "adminAuth/adminLogin",
  async (admin, thunkAPI) => {
    try {
      return await adminAuthService.adminLogin(admin);
    } catch (error) {
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
export const getAllUsers = createAsyncThunk(
  "adminAuth/getUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      const response = await adminAuthService.getAllUsers(token);
      return response.users;
    } catch (error) {
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
export const UserBlock = createAsyncThunk(
  "adminAuth/userBlock",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      const response = await adminAuthService.userBlock(token, userId);

      return response.users;
    } catch (error) {
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
export const searchUser = createAsyncThunk(
  "adminAuth/searchUser",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      
      return await adminAuthService.searchUser(query, token);
    } catch (error) {
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

//adduser
export const addUser = createAsyncThunk(
  'admin/register',
  async (user, thunkAPI) => {
   
    try {
      const token = thunkAPI.getState().adminAuth.admin.token
      const response= await adminAuthService.addUser(user,token)
      return response.users;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const editUser = createAsyncThunk('admin/editUser', async ({userId, name, email}, thunkAPI) => {
  try {
      const token = thunkAPI.getState().adminAuth.admin.token
      return await adminAuthService.editUserDeatils(token, userId, name, email)
  } catch (error) {
      alert(error)
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

export const adminLogout = createAsyncThunk('adminAuth/logout', async () => {
  await adminAuthService.adminLogout()
})


export const { reset, setAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
