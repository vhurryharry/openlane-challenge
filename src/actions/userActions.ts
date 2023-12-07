import {
  initAction,
  loginSuccess,
  setError,
  clearUser,
  UserInfo,
  createProfileSuccess,
  editProfileSuccess,
} from "../reducers/userReducer";
import userService from "../services/userService";
import { AppDispatch } from "../store";

export const login = (email: string, password: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(initAction());

    return userService
      .login(email, password)
      .then((user) => dispatch(loginSuccess({ user })))
      .catch((error) => dispatch(setError({ error })));
  };
};

export const logoutUser = () => {
  return (dispatch: AppDispatch) => {
    return dispatch(clearUser());
  };
};

export const createProfile = (user: UserInfo) => {
  return (dispatch: AppDispatch) => {
    dispatch(initAction());

    return userService
      .createProfile(user)
      .then(() => dispatch(createProfileSuccess()))
      .catch((error) => dispatch(setError({ error })));
  };
};

export const editProfile = (prevUser: UserInfo, user: UserInfo) => {
  return (dispatch: AppDispatch) => {
    dispatch(initAction());

    return userService
      .editProfile(prevUser, user)
      .then((user) => dispatch(editProfileSuccess({ user })))
      .catch((error) => dispatch(setError({ error })));
  };
};

export const deleteProfile = (user: UserInfo) => {
  return (dispatch: AppDispatch) => {
    dispatch(initAction());

    return userService
      .deleteProfile(user)
      .then(() => dispatch(clearUser()))
      .catch((error) => dispatch(setError({ error })));
  };
};

export const initUser = () => {
  return (dispatch: AppDispatch) => {
    const userString = sessionStorage.getItem("auth");
    const user = userString ? JSON.parse(userString) : null;

    if (user) {
      return dispatch(loginSuccess({ user }));
    }
  };
};
