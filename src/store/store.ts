import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/features/counter/counterSlice";
import nameReducer from "@/features/name/nameSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    name: nameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
