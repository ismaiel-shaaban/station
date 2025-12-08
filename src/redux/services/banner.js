import axiosInstance from "@/app/libs/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBannersService = createAsyncThunk(
  "banners/getBannersService",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/banner/admin", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const toggleBannerStatusService = createAsyncThunk(
  "banners/toggleBannerStatusService",
  async ({ bannerId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/banner/status/${bannerId}`, { bannerId, status },
        {
          params: { bannerId, status }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getBannerByIdService = createAsyncThunk(
  "banners/getBannerByIdService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/banner/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addBannerService = createAsyncThunk(
  "banners/addBannerService",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/banner", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateBannerService = createAsyncThunk(
  "banners/updateBannerService",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log(id, data);
      const response = await axiosInstance.put(`/banner/${id}?id=${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteBannerService = createAsyncThunk(
  "banners/deleteBannerService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/banner/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
