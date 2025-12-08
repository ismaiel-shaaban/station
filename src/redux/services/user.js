import axiosInstance from "@/app/libs/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Get Users List
export const getUsersService = createAsyncThunk(
  "users/getUsers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/register/users", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update User Status
export const updateUserStatusService = createAsyncThunk(
  "users/updateUserStatus",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/register/account", null, {
        params: { userId, status }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
); 