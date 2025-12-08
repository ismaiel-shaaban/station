import { createSlice } from "@reduxjs/toolkit";
import {
  getUserByIdService,
  putChangePasswordService,
  getPrepaidCardsService,
  changeStatusPrepaidCardsService,
  createPrepaidCardsService,
  deletePrepaidCardsService,
  getPaymentService,
  getPaymentActiveService,
  changeStatusPaymentService,
  getPrepaidCardByIdService
} from "../services/settings_service";

const initialState = {
  settings: [],
  isLoading: false,
  isLoadingEdit: false,
  error: null,
  success: null,
  paymentsList: [],
  metaPayment: null,
  isLoadingDelete: false,
  paymentsMethod: [],
  cardsList:[]
};
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserByIdService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserByIdService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload.data;
      })
      .addCase(getUserByIdService.rejected, (state) => {
        state.isLoading = true;
      
      })
      .addCase(putChangePasswordService.pending, (state) => {
        state.isLoadingEdit = true;
        state.success = null;
        state.error = null;
      })
      .addCase(putChangePasswordService.fulfilled, (state) => {
        state.isLoadingEdit = false;
        state.success = "تم حفظ التعديلات بنجاح";
        state.error = null;
      })
      .addCase(putChangePasswordService.rejected, (state, action) => {
        state.isLoadingEdit = false;
        state.success = null;
        state.error = action.payload || "فشل في تغيير الرقم السري";
      })
      .addCase(getPrepaidCardsService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPrepaidCardsService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentsList = action.payload.data?.content; //
        state.metaPayment = action.payload.data;
      })
      .addCase(getPrepaidCardsService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch user statistics";
      })
      .addCase(createPrepaidCardsService.pending, (state) => {
        state.isLoadingEdit = true;
      })
      .addCase(createPrepaidCardsService.fulfilled, (state, action) => {
        state.isLoadingEdit = false;
      })
      .addCase(createPrepaidCardsService.rejected, (state, action) => {
        state.isLoadingEdit = false;
      })
      .addCase(deletePrepaidCardsService.pending, (state) => {
        state.isLoadingDelete = true;
      })
      .addCase(deletePrepaidCardsService.fulfilled, (state, action) => {
        state.isLoadingDelete = false;
      })
      .addCase(deletePrepaidCardsService.rejected, (state, action) => {
        state.isLoadingDelete = false;
      })
      .addCase(getPaymentService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaymentService.fulfilled, (state, action) => {
        console.log("action.payload?.data");
        console.log(action.payload?.data);
        state.isLoading = false;
        state.paymentsMethod = action.payload?.data;
      })
      .addCase(getPaymentService.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getPrepaidCardByIdService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPrepaidCardByIdService.fulfilled, (state, action) => {
        console.log("action.payload?.data");
        console.log(action.payload?.data);
        state.isLoading = false;
        state.cardsList = action.payload?.data;
      })
      .addCase(getPrepaidCardByIdService.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default settingsSlice.reducer;
