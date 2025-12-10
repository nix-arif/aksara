// import { AdminSchema } from "@/db/schema/admin";
// import { storage } from "@/lib/localStorageHelper";
// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// const storedAdmin = storage.get<typeof initialState>("admin");

// const initialState: Pick<AdminSchema, "id" | "email" | "username"> & {
//   loading: boolean;
//   error: string | null;
// } = {
//   id: "",
//   email: "",
//   username: "",
//   loading: false,
//   error: null,
// };

// export const registerAdmin = createAsyncThunk(
//   "admin/register",
//   async (payload: { email: string; username: string; password: string }) => {
//     const res = await fetch("/api/admin/register", {
//       method: "POST",
//       body: JSON.stringify(payload),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!res.ok) {
//       const errorMessage = await res.json();
//       throw new Error(errorMessage.message);
//     }

//     return await res.json();
//   }
// );

// export const loginAdmin = createAsyncThunk(
//   "admin/login",
//   async (payload: { email: string; password: string }) => {
//     const res = await fetch("/api/admin/login", {
//       method: "POST",
//       body: JSON.stringify(payload),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!res.ok) {
//       const errorMessage = await res.json();
//       throw new Error(errorMessage.message);
//     }

//     const data: AdminSchema = await res.json();
//     return data;
//   }
// );

// export const logoutAdmin = createAsyncThunk("admin/logout", async () => {
//   await fetch("/api/admin/logout", {
//     method: "POST",
//   });
// });

// const adminSlice = createSlice({
//   name: "admin",
//   initialState,
//   reducers: {
//     setAdminFromLocalStorage: (state) => {
//       const storedAdmin = storage.get<typeof initialState>("admin");
//       Object.assign(state, storedAdmin);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerAdmin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerAdmin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.id = action.payload.id;
//         state.email = action.payload.email;
//       })
//       .addCase(registerAdmin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to create admin";
//       })
//       .addCase(loginAdmin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginAdmin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.id = action.payload.id;
//         state.username = action.payload.username;
//         state.email = action.payload.email;
//         state.error = null;

//         storage.set("admin", { ...action.payload });
//       })
//       .addCase(loginAdmin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Something went wrong";
//       })
//       .addCase(logoutAdmin.fulfilled, (state) => {
//         state.id = "";
//         state.email = "";
//         state.loading = false;
//         state.error = null;
//       });
//   },
// });

// export default adminSlice.reducer;
// export const { setAdminFromLocalStorage } = adminSlice.actions;
