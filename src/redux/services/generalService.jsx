import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/libs/axiosInstance"; // Ensure axiosInstance is properly configured

// Change teacher status
export const changeTeacherStatusService = createAsyncThunk(
  "general/changeTeacherStatusService",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/register/${id}/status`, { id, status }, { params: { id, status } });
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

// GET  => GET EARNINGS
export const getCountriesCodeService = createAsyncThunk(
	"general/getCountriesCodeService",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`/users/countries/`);
			return response;
		} catch (error) {
			return rejectWithValue(
				{ data: error.response.data, status: error.status }
			);
		}
	}
);
export const getTransactionsService = createAsyncThunk(
	"general/getTransactionsService",
	async (params, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`/transaction`, {
				params: { ...params },

			});
			return response;
		} catch (error) {
			return rejectWithValue(
				{ data: error.response.data, status: error.status }
			);
		}
	}
);
export const updateStatusTransactionService = createAsyncThunk(
	"tenant/updateStatusTransactionService",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put(`/transaction/${data.id}/status?status=${data.status}`);
			return response;
		} catch (error) {
			return rejectWithValue(
				{ data: error.response.data, status: error.status }
			);
		}
	}
);

// GET  => GET EARNINGS
export const getCollectionService = createAsyncThunk(
	"general/getCollectionService",
	async (params, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`/statistic/collections`, {
				params: { ...params },
			});
			return response;
		} catch (error) {
			return rejectWithValue(
				error.response ? error.response.data : "An error occurred"
			);
		}
	}
);

// GET  => GET STATICS
export const getUserStatisticsService = createAsyncThunk(
	"general/getUserStatisticsService",
	async (params, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get("/merchant/statistics/admin", {
				params: { ...params },
			});
			return response.data;
		} catch (error) {
			// Handle the error and reject with a message
			return rejectWithValue(
				{ data: error.response.data, status: error.status }
			);
		}
	}
);
// POST =>  UPLOAD FILE
export const uploadFileService = createAsyncThunk(
	"general/uploadFileService",
	async ({formData , bucketName}, thunkAPI) => {
		try {
			const response = await axiosInstance.post("/file/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				// params: {
				// 	bucket : bucketName,
				// },
			});

			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);
// GET =>  USER STATUS
export const getUserStatusService = createAsyncThunk(
	"general/getUserStatusService",
	async (_, thunkAPI) => {
		try {
			const response = await axiosInstance.get("/driver/acceptance-statuses");
			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);
export const getOrderStatusService = createAsyncThunk(
	"general/getOrderStatusService",
	async (_, thunkAPI) => {
		try {
			const response = await axiosInstance.get("/order/order-statuses");
			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);
// GET =>  GOVERNORATE
export const getGovernorateService = createAsyncThunk(
	"general/getGovernorateService",
	async (_, thunkAPI) => {
		try {
			const response = await axiosInstance.get("/system/governorates");
			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

// GET =>  USER COUNT
export const getUserCountService = createAsyncThunk(
	"general/getUserCountService",
	async (_, thunkAPI) => {
		try {
			const response = await axiosInstance.get("/statistic/userCount");
			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

export const getChatsService = createAsyncThunk(
	"forum/getChatsService",
	async (_, thunkAPI) => {
	  try {
		const response = await axiosInstance.get(`/chat`);
		return response.data;
	  } catch (e) {
		return rejectWithValue(
			{ data: error.response.data, status: error.status }
		);
	  }
	}
  );
  export const getMessagesOfChatService = createAsyncThunk(
	"forum/getMessagesOfChatService",
	async (id, thunkAPI) => {
	  try {
		const response = await axiosInstance.get(`/chat/messages/admin?userId=${id}`);
		return response.data;
	  } catch (e) {
		return rejectWithValue(
			{ data: error.response.data, status: error.status }
		);
	  }
	}
  );
  export const postMessage = createAsyncThunk(
    "forum/postMessage",
    async (data, thunkAPI) => {
      try {
        const response = await axiosInstance.post(`/chat/messages/admin?userId=${data.chatId}`, data);
        console.log("response", response)
        return response.data;
      } catch (e) {
		return rejectWithValue(
			{ data: error.response.data, status: error.status }
		);
      }
    }
  );
  export const closeChatService = createAsyncThunk(
    "forum/closeChatService",
    async (id, thunkAPI) => {
      try {
        const response = await axiosInstance.post(`/chat/${id}/close`);
        console.log("response", response)
        return response.data;
      } catch (e) {
		return rejectWithValue(
			{ data: error.response.data, status: error.status }
		);
      }
    }
  );