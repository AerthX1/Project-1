import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/org/register`;

export const registerOrganization = createAsyncThunk(
  "auth/registerOrganization",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, formData);
   
      const { token, org } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(org));
      return org;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
