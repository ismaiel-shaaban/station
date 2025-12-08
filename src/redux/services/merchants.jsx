import  axiosInstance  from "@/app/libs/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Get Merchants List
export const getMerchantsListService = createAsyncThunk(
  "merchants/getMerchantsList",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/merchant", {
        params: {
          page: params.page || 0,
          limit: params.limit || 10,
          search: params.search,
          status: params.status
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Merchant By ID
export const getMerchantByIdService = createAsyncThunk(
  "merchants/getMerchantById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/merchant/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create Merchant
export const createMerchantService = createAsyncThunk(
  "merchants/createMerchant",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/merchant", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Merchant
export const updateMerchantService = createAsyncThunk(
  "merchants/updateMerchant",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/merchant/${id}/update`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Merchant
export const deleteMerchantService = createAsyncThunk(
  "merchants/deleteMerchant",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/merchant/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Merchant Types List
export const getMerchantTypesService = createAsyncThunk(
  "merchants/getMerchantTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/merchant-types");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create Merchant Type
export const createMerchantTypeService = createAsyncThunk(
  "merchants/createMerchantType",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/merchant-types", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Merchant Type
export const updateMerchantTypeService = createAsyncThunk(
  "merchants/updateMerchantType",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/merchant-types/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Merchant Type
export const deleteMerchantTypeService = createAsyncThunk(
  "merchants/deleteMerchantType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/merchant-types/${id}?id=${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Language Services
export const getLanguagesListService = createAsyncThunk(
  "merchants/getLanguagesList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/language/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createLanguageService = createAsyncThunk(
  "merchants/createLanguage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/language", data ,
        {
          params:{...data},
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateLanguageService = createAsyncThunk(
  "merchants/updateLanguage",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/language/${id}`, data ,
        {
          params:{...data ,id},
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteLanguageService = createAsyncThunk(
  "merchants/deleteLanguage",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/language/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMerchantLanguagesService = createAsyncThunk(
  "merchants/getMerchantLanguages",
  async (merchantCode, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/language?code=${merchantCode}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addMerchantLanguageService = createAsyncThunk(
  "merchants/addMerchantLanguage",
  async ({ merchantCode, languageName }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/language", {
        merchantCode,
        name: languageName
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Twilio Services
export const getTwilioService = createAsyncThunk(
  "merchants/getTwilio",
  async (merchantCode, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/twilio/merchant?merchantCode=${merchantCode}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createTwilioService = createAsyncThunk(
  "merchants/createTwilio",
  async ({ merchantCode, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/twilio?merchantCode=${merchantCode}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateTwilioService = createAsyncThunk(
  "merchants/updateTwilio",
  async ({ merchantCode, data ,id}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/twilio/${id}?merchantCode=${merchantCode}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Bucket Services
export const getBucketsListService = createAsyncThunk(
  "merchants/getBucketsList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/file/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createBucketService = createAsyncThunk(
  "merchants/createBucket",
  async ({ bucketName, merchantCode }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/file/create-bucket", null, {
        params: { bucketName, merchantCode }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteBucketService = createAsyncThunk(
  "merchants/deleteBucket",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/file/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get Merchant Products
export const getMerchantProductsService = createAsyncThunk(
  "merchants/getMerchantProducts",
  async ({ merchantId, page = 0, limit = 10, search = "" }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/items`, {
        params: { 
          merchantId,
          page,
          limit,
          search: search || undefined
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Change Merchant Status
export const changeMerchantStatusService = createAsyncThunk(
  "merchants/changeMerchantStatus",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/register/account`, null, {
        params: { status, userId }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
