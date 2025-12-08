import { createSlice } from "@reduxjs/toolkit";
import {
  getCountriesCodeService,
  getOrderStatusService,
  getUserStatusService,
  getTransactionsService,
  getMessagesOfChatService,
  getChatsService,
  getUserStatisticsService

} from "../services/generalService";

const initialState = {
  countriesCode: [],
  userStatuses: [],
  orderStatuses: [],
  transactionData: [],
  chatsData: [],
  chatMessagesData: [],
  statisticsUsers: {},
  loading: false,
  error: null,
  metaTransaction: null,
  earnings: null,
  collections: null,
  usersCount: null,
  collectionsStat: [],
};
const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountriesCodeService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountriesCodeService.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action?.payload.data);
        
        state.countriesCode = action?.payload.data;
      })
      .addCase(getCountriesCodeService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user statistics";
      })
      .addCase(getUserStatisticsService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserStatisticsService.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action?.payload);
        
        state.statisticsUsers = action?.payload;
      })
      .addCase(getUserStatisticsService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user statistics";
      })
      .addCase(getUserStatusService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserStatusService.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action?.payload);
        
        state.userStatuses = action?.payload;
      })
      .addCase(getUserStatusService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user statistics";
      })
      .addCase(getOrderStatusService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderStatusService.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action?.payload);
        
        state.orderStatuses = action?.payload;
      })
      .addCase(getOrderStatusService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user statistics";
      })
      
      .addCase(getTransactionsService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionsService.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action?.payload);
        
        state.transactionData = action?.payload.content;
        state.metaTransaction = action?.payload;
      })
      .addCase(getTransactionsService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user statistics";
      })
      .addCase(getChatsService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatsService.fulfilled, (state, action) => {
        state.loading = false;
        state.chatsData = action?.payload;
        
      })
      .addCase(getChatsService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user statistics";
      })
      
      .addCase(getMessagesOfChatService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessagesOfChatService.fulfilled, (state, action) => {
        state.loading = false;
        state.chatMessagesData = action?.payload;
        
      })
      .addCase(getMessagesOfChatService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user statistics";
      })
      
  },
});

export default generalSlice.reducer;
