import axiosInstance from "@/app/libs/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAdminsService = createAsyncThunk(
  "tenant/getAdminsService",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/register/admin"  ,{
        params: { ...params },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({data:error.response.data , status:error.status});
    }
  }
);


export const createMemberService = createAsyncThunk(
  "tenant/createMemberService",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/register/admin`,params);
      return response;
    } catch (error) {
      return rejectWithValue(
        {data:error.response.data , status:error.status}
      );
    }
  }
);

export const updateMemberStatusService = createAsyncThunk(
  "tenant/updateMemberStatusService",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/register/admin/${params.id}`,params.data);
      return response;
    } catch (error) {
      return rejectWithValue(
        {data:error.response.data , status:error.status}
      );
    }
  }
);

// DELETE => DELETE  SERVICE
export const deleteMemberService = createAsyncThunk(
  "tenant/deleteMemberService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/register/admin/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(
        {data:error.response.data , status:error.status}
      );
    }
  }
);
export const getMemberByIdService = createAsyncThunk(
  "tenant/getMemberByIdService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/register/users/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(
        {data:error.response.data , status:error.status}
      );
    }
  }
);

