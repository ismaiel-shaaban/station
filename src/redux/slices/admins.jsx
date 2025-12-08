import { createSlice } from "@reduxjs/toolkit";
import {
  getAdminsService,
  getMemberByIdService

} from "../services/admins";

const initialState = {
  adminsList: null,
  managerMemberData: null,
  metaManagerMember: null,
  isLoading: false,
  error: null,
  isLoadingDelete: false,
 
};
const tenantsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminsService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdminsService.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(';;;;;;;;;;;;;;;' , action.payload);
        
        state.adminsList =  action.payload.content;
        state.metaManagerMember = action.payload;
      })
      .addCase(getAdminsService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch user statistics";
      })
      .addCase(getMemberByIdService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMemberByIdService.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(';;;;;;;;;;;;;;;' , action.payload);
        
        state.managerMemberData =  action.payload.data;
       
      })
      .addCase(getMemberByIdService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch user statistics";
      })
   
   
  },
});

export default tenantsSlice.reducer;
