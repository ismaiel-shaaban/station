import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/libs/axiosInstance";

// Get all orders
export const getOrdersService = createAsyncThunk(
  "orders/getOrdersService",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/order", {
        params: { ...params }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

// Update order status
export const updateOrderStatusService = createAsyncThunk(
  "orders/updateOrderStatusService",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/order/${id}/${status}`, { status , id});
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

// Get order details
export const getOrderDetailsService = createAsyncThunk(
  "orders/getOrderDetailsService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/order/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

// Delete order
export const deleteOrderService = createAsyncThunk(
  "orders/deleteOrderService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/order/${id}`);
      return { id, response: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);
