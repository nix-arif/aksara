import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "@/redux/admin/adminSlice";
import companyReducer from "@/redux/company/companySlice";

const store = configureStore({
  reducer: {
    company: companyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
