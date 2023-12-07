import React, { useEffect, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { initUser } from "./actions/userActions";
import { getUser } from "./selectors/userSelectors";
import { AppDispatch } from "./store";

import Profile from "./components/Profile/Profile";
import CreateProfile from "./components/CreateProfile/CreateProfile";
import EditProfile from "./components/EditProfile/EditProfile";
import Login from "./components/Login/Login";

import "./App.css";

type PrivateRouteProps = {
  element: ReactElement;
};

const App = () => {
  const user = useSelector(getUser);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    if (user) {
      return element;
    } else {
      // Redirect to the login page if not authenticated
      return <Navigate to="/login" />;
    }
  };

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateProfile />} />
          <Route path="/" element={<PrivateRoute element={<Profile />} />} />
          <Route
            path="/edit"
            element={<PrivateRoute element={<EditProfile />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
