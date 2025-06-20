import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// ORGANIZATION REGISTER
export const registerOrganization = createAsyncThunk(
  "auth/registerOrganization",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/organization/register`, formData);
      const { token, org } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(org));
      localStorage.setItem("userType", "organization");
      return { token, user: org, userType: "organization" };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Registration failed"
      );
    }
  }
);

// ORGANIZATION LOGIN
export const loginOrganization = createAsyncThunk(
  "auth/loginOrganization",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/organization/login`, { email, password });
      const { token, org } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(org));
      localStorage.setItem("userType", "organization");
      return { token, user: org, userType: "organization" };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

// INDIVIDUAL REGISTER
export const registerIndividual = createAsyncThunk(
  "auth/registerIndividual",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/individual/register`, formData);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userType", "individual");
      return { token, user, userType: "individual" };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Registration failed"
      );
    }
  }
);

// INDIVIDUAL LOGIN
export const loginIndividual = createAsyncThunk(
  "auth/loginIndividual",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/individual/login`, { email, password });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userType", "individual");
      return { token, user, userType: "individual" };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

// AUTH SLICE
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    userType: localStorage.getItem("userType") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.userType = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER ORGANIZATION
      .addCase(registerOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.userType = action.payload.userType;
      })
      .addCase(registerOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN ORGANIZATION
      .addCase(loginOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.userType = action.payload.userType;
      })
      .addCase(loginOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER INDIVIDUAL
      .addCase(registerIndividual.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerIndividual.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.userType = action.payload.userType;
      })
      .addCase(registerIndividual.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN INDIVIDUAL
      .addCase(loginIndividual.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginIndividual.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.userType = action.payload.userType;
      })
      .addCase(loginIndividual.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
