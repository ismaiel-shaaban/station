import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";

import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, useDispatch, useSelector };

export const persistor = persistStore(store);
