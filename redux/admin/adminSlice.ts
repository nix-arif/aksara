import { AdminSchema } from "@/db/schema/admin";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: Pick<AdminSchema, "id" | "email"> & {
  loading: boolean;
  error: string | null;
} = {
  id: "",
  email: "",
  loading: false,
  error: null,
};

export const registerAdmin = createAsyncThunk(
  "admin/register",
  async (payload: { email: string; password: string }) => {
    const res = await fetch("/api/admin/register", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    return await res.json();
  }
);

export const loginAdmin = createAsyncThunk(
  "admin/login",
  async (payload: { email: string; password: string }) => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Invalid Credential");
    }

    const data: AdminSchema = await res.json();
    return data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.email = action.payload.email;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create admin";
      });
  },
});

export default adminSlice.reducer;
