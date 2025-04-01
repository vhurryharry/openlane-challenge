// middleware.ts
import { Middleware, Dispatch } from "redux";
import { sessionTimeout } from "../reducers/userReducer";

const sessionTimeoutMiddleware: Middleware<{}> =
  ({ dispatch }) =>
  (next: Dispatch) =>
  (action) => {
    console.log(action);
    if (action.type === "user/loginSuccess") {
      setTimeout(() => {
        dispatch(sessionTimeout());
      }, 600000);
    }

    return next(action);
  };

export default sessionTimeoutMiddleware;
