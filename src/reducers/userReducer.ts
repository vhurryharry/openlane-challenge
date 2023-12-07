import { createSlice } from "@reduxjs/toolkit";

export enum Colors {
  Blue = "blue",
  Red = "red",
  Green = "green",
  Yellow = "yellow",
  Purple = "purple",
  Black = "black",
  Orange = "orange",
}

export type UserProfile = {
  email: string;
  name: string;
  phoneNumber?: string;
  favoriteColor: Colors;
};

export type UserInfo = UserProfile & {
  password: string;
};

export type UserState = {
  user?: UserInfo;
  error: any;
  loading: boolean;
};

const initialState: UserState = {
  user: undefined,
  error: "",
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initAction: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;

      sessionStorage.setItem("auth", JSON.stringify(state.user));
    },
    createProfileSuccess: (state) => {
      state.loading = false;
    },
    editProfileSuccess: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;

      sessionStorage.setItem("auth", JSON.stringify(state.user));
    },
    setError: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = undefined;
      state.loading = false;
      state.error = "";

      sessionStorage.removeItem("auth");
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initAction,
  loginSuccess,
  createProfileSuccess,
  editProfileSuccess,
  setError,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
