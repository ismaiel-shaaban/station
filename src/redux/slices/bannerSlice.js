import { createSlice } from "@reduxjs/toolkit";
import {
  getBannersService,
  getBannerByIdService,
  addBannerService,
  updateBannerService,
  deleteBannerService,
  toggleBannerStatusService
} from "../services/banner";

const initialState = {
  data: [],      // List of banners
  dataa: null,   // Single banner details
  meta: null,    // Meta info (pagination, etc.)
  loading: false,
  error: null,
};

const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // List
      .addCase(getBannersService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Get all banners
      .addCase(getBannersService.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data || action.payload.content || [];
        state.meta = action.payload || null;
      })
      // Toggle banner status
      .addCase(toggleBannerStatusService.fulfilled, (state, action) => {
        const idx = state.data.findIndex(b => b.id === action.payload.id);
        if (idx !== -1) {
          state.data[idx].status = action.payload.status;
        }
      })
      .addCase(getBannersService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Single
      .addCase(getBannerByIdService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBannerByIdService.fulfilled, (state, action) => {
        state.loading = false;
        state.dataa = action.payload?.data || action.payload;
      })
      .addCase(getBannerByIdService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addBannerService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBannerService.fulfilled, (state, action) => {
        state.loading = false;
        // Add new banner to list if response contains it
        if (action.payload && (action.payload.data || action.payload.id)) {
          const newBanner = action.payload.data || action.payload;
          state.data = [newBanner, ...state.data];
        }
      })
      .addCase(addBannerService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateBannerService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBannerService.fulfilled, (state, action) => {
        state.loading = false;
        // Update banner in list
        if (action.payload && (action.payload.data || action.payload.id)) {
          const updatedBanner = action.payload.data || action.payload;
          const idx = state.data.findIndex(b => b.id === updatedBanner.id);
          if (idx !== -1) {
            state.data[idx] = { ...state.data[idx], ...updatedBanner };
          }
        }
      })
      .addCase(updateBannerService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteBannerService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBannerService.fulfilled, (state, action) => {
        state.loading = false;
        // Remove deleted banner from list
        if (action.meta && action.meta.arg) {
          const id = action.meta.arg;
          state.data = state.data.filter(b => b.id !== id);
        }
      })
      .addCase(deleteBannerService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bannerSlice.reducer;
