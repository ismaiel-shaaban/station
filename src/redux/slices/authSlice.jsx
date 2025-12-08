import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { publicAxiosInstance } from "@/app/libs/axiosInstance"; // Make sure axios is set up

const initialState = {
	user: null,
	status: "idle",
	error: null,
};

export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await publicAxiosInstance.post("/register/admin-login", credentials);
			console.log("response",response)
			return response;
		} catch (error) {
			console.log("error",error)
			return rejectWithValue({data:error.response.data , status:error.status});
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logIn(state, action) {
			state.user = action.payload;
		},
		logout(state) {
			state.user = null;
			state.status = "idle";
			state.error = null;
			sessionStorage.clear();
			localStorage.clear();
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.user = action.payload;
				sessionStorage.setItem("user", JSON.stringify(action.payload.data));
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload || "Login failed";
			});
	},
});

export const { logIn, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export default authSlice.reducer;
