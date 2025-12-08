import { createSlice } from "@reduxjs/toolkit";
import { getUsersService, updateUserStatusService } from "../services/user";

const initialState = {
  data: [],
  meta: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Users
      .addCase(getUsersService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersService.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.content;
        state.meta = {
          totalElements: action.payload.totalElements,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.number,
        };
      })
      .addCase(getUsersService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update User Status
      .addCase(updateUserStatusService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserStatusService.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserStatusService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer; 