import { createSlice } from "@reduxjs/toolkit";
import { getNotificationsService, sendNotificationService, deleteNotificationService } from "../services/notification";

const initialState = {
  data: [],
  meta: null,
  loading: false,
  error: null,
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Notifications
      .addCase(getNotificationsService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotificationsService.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.content;
        state.meta = {
          totalElements: action.payload.totalElements,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.number,
        };
      })
      .addCase(getNotificationsService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send Notification
      .addCase(sendNotificationService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendNotificationService.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendNotificationService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Notification
      .addCase(deleteNotificationService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNotificationService.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteNotificationService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer; 