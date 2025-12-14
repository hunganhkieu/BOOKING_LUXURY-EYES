import { configureStore } from "@reduxjs/toolkit";
import { doctorApi } from "./services/doctorApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { scheduleApi } from "./services/scheduleApi";
import { patientProfileApi } from "./services/patientProfile";
import { authSlice } from "./features/authSlice";
export const store = configureStore({
  reducer: {
    [doctorApi.reducerPath]: doctorApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [patientProfileApi.reducerPath]: patientProfileApi.reducer,
    auth: authSlice.reducer,
  },

  middleware: (getDeFault) =>
    getDeFault()
      .concat(doctorApi.middleware)
      .concat(scheduleApi.middleware)
      .concat(patientProfileApi.middleware), // quản lý cache và tag
});

setupListeners(store.dispatch); //kích hoạt các listener để hỗ trợ các tính năng nâng cao của RTK Query: refetchOnFocus, refetchOnReconnect

export type RootState = ReturnType<typeof store.getState>; //kiểu dữ liệu toàn bộ state của store
export type AppDispatch = typeof store.dispatch; //kiểu dữ liệu của dispatch, dùng cho useDispatch và middleware
