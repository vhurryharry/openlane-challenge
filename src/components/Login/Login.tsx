import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { login } from "../../actions/userActions";
import { useSelector } from "react-redux";
import { getError, getUser } from "../../selectors/userSelectors";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector(getError);
  const user = useSelector(getUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  const onCreateProfile = () => {
    navigate("/create");
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="page-wrapper">
      <h1>Please Log In</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Login</button>
          <button type="button" onClick={onCreateProfile}>
            Create Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
