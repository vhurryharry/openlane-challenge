import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import storyReducer from "./reducers/storyReducer";
import sessionTimeoutMiddleware from "./middlewares/sessionMiddleware";

const store = configureStore({
  reducer: {
    user: userReducer,
    story: storyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sessionTimeoutMiddleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
