import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import sessionTimeoutMiddleware from "./middlewares/sessionMiddleware";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sessionTimeoutMiddleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
