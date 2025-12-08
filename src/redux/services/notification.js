import axiosInstance from "@/app/libs/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Get Notifications List
export const getNotificationsService = createAsyncThunk(
  "notifications/getNotifications",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/notification/admin", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Send Notification
export const sendNotificationService = createAsyncThunk(
  "notifications/sendNotification",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/notification", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Notification
export const deleteNotificationService = createAsyncThunk(
  "notifications/deleteNotification",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/notification/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
); 