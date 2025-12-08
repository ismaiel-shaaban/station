"use client";

import { Provider } from "react-redux";
import { store } from "./store";
// toast
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Providers({ children }) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer />
    </Provider>
  );
}
