import axiosInstance from "@/app/libs/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// GET => GET USER BY ID
export const getUserByIdService = createAsyncThunk(
  "settings/getUserByIdService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/register/users/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

// PUT => PUT PASSWORD
export const putChangePasswordService = createAsyncThunk(
  "settings/putChangePasswordService",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/register/${data.id}/changePassword`,
        data?.data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password change failed."
      );
    }
  }
);

// GET =>  GET PREPAID
export const getPrepaidCardsService = createAsyncThunk(
  "settings/getPrepaidCardsService",
  async (params, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/prepaidCards", {
        params: { ...params },
      });
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//CREATE PREPAID CARD SERVICE
export const createPrepaidCardsService = createAsyncThunk(
  "settings/createPrepaidCardsService",
  async (params, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/prepaidCards", null, {
        params: { ...params },
      });
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//DELETE PRE PAID CARD
export const deletePrepaidCardsService = createAsyncThunk(
  "settings/deletePrepaidCardsService",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/prepaidCards/${id}`);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// GET =>  GET PREPAID BY ID
export const getPrepaidCardByIdService = createAsyncThunk(
  "settings/getPrepaidCardByIdService",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `/prepaidCards/${id}`,
        null,
        {
          params: { ...params?.data },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// PUT =>  PUT PREPAID
export const changeStatusPrepaidCardsService = createAsyncThunk(
  "settings/changeStatusPrepaidCardsService",
  async (params, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `/prepaidCards/${params?.id}/changeStatus`,
        null,
        {
          params: { ...params?.data },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// GET =>  GET PAYMENT SERVICE
export const getPaymentService = createAsyncThunk(
  "settings/getPaymentService",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/payment");
      console.log(response?.data);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// GET =>  GET PAYMENT ACTIVE SERVICE
export const getPaymentActiveService = createAsyncThunk(
  "settings/getPaymentActiveService",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/payment/active");
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// PUT =>  PUT PAYMENT
export const changeStatusPaymentService = createAsyncThunk(
  "settings/changeStatusPaymentService",
  async (params, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/payment/${params?.id}`, null, {
        params: { status: params?.status },
      });
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
