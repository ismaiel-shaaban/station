import { configureStore } from "@reduxjs/toolkit";

//slice
import authReducer from "./slices/authSlice";
import bannerReducer from "./slices/bannerSlice";
import generalReducer from "./slices/generalSlice";
import { combineReducers } from "@reduxjs/toolkit";
import branchManagersReducer from "./slices/admins";
import notificationsReducer from "./slices/notificationSlice";
import merchantsReducer from "./slices/merchants";
import userReducer from "./slices/userSlice";
import ordersReducer from "./slices/ordersSlice";
// Make sure to add schools state to rootReducer
const rootReducer = combineReducers({
  auth: authReducer,
  general: generalReducer,
  admins: branchManagersReducer,
  notifications: notificationsReducer,
  merchants: merchantsReducer,
  banners: bannerReducer,
  users: userReducer,
  orders: ordersReducer
});

export default rootReducer;
