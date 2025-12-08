import { createSlice } from "@reduxjs/toolkit";
import {
  getOrdersService,
  updateOrderStatusService,
  getOrderDetailsService,
  deleteOrderService
} from "../services/ordersService";

const initialState = {
  ordersList: [],
  orderDetails: null,
  metaData: null,
  isLoadingOrders: false,
  isUpdatingOrderStatus: false,
  isLoadingOrderDetails: false,
  isDeletingOrder: false,
  orderError: null
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Orders
      .addCase(getOrdersService.pending, (state) => {
        state.isLoadingOrders = true;
        state.orderError = null;
      })
      .addCase(getOrdersService.fulfilled, (state, action) => {
        state.isLoadingOrders = false;
        state.ordersList = action.payload.content;
        state.metaData = action.payload;
      })
      .addCase(getOrdersService.rejected, (state, action) => {
        state.isLoadingOrders = false;
        state.orderError = action.payload || "Failed to fetch orders";
      })

      // Update Order Status
      .addCase(updateOrderStatusService.pending, (state) => {
        state.isUpdatingOrderStatus = true;
        state.orderError = null;
      })
      .addCase(updateOrderStatusService.fulfilled, (state, action) => {
        state.isUpdatingOrderStatus = false;
        // Update the order in the list if it exists
        if (state.ordersList) {
          const index = state.ordersList.findIndex(order => order.id === action.payload.id);
          if (index !== -1) {
            state.ordersList[index] = action.payload;
          }
        }
        // Update order details if it's the same order
        if (state.orderDetails && state.orderDetails.id === action.payload.id) {
          state.orderDetails = action.payload;
        }
      })
      .addCase(updateOrderStatusService.rejected, (state, action) => {
        state.isUpdatingOrderStatus = false;
        state.orderError = action.payload || "Failed to update order status";
      })

      // Get Order Details
      .addCase(getOrderDetailsService.pending, (state) => {
        state.isLoadingOrderDetails = true;
        state.orderError = null;
      })
      .addCase(getOrderDetailsService.fulfilled, (state, action) => {
        state.isLoadingOrderDetails = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderDetailsService.rejected, (state, action) => {
        state.isLoadingOrderDetails = false;
        state.orderError = action.payload || "Failed to fetch order details";
      })
      
      // Delete Order
      .addCase(deleteOrderService.pending, (state) => {
        state.isDeletingOrder = true;
        state.orderError = null;
      })
      .addCase(deleteOrderService.fulfilled, (state, action) => {
        state.isDeletingOrder = false;
        // Remove the order from the list
        if (state.ordersList) {
          state.ordersList = state.ordersList.filter(order => order.id !== action.payload.id);
        }
        // Clear order details if it's the same order
        if (state.orderDetails && state.orderDetails.id === action.payload.id) {
          state.orderDetails = null;
        }
        // Update total count in metadata
        if (state.metaData) {
          state.metaData = {
            ...state.metaData,
            totalElements: (state.metaData.totalElements || 0) - 1
          };
        }
      })
      .addCase(deleteOrderService.rejected, (state, action) => {
        state.isDeletingOrder = false;
        state.orderError = action.payload || "Failed to delete order";
      });
  }
});

export default ordersSlice.reducer;
