import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../selectors/userSelectors";
import { AppDispatch } from "../../store";

import "./Profile.css";
import { deleteProfile, logoutUser } from "../../actions/userActions";

const Profile = () => {
  const user = useSelector(getUser);
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const onEditProfile = () => {
    navigate("/edit");
  };

  const onDeleteProfile = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");

    if (isConfirmed) {
      dispatch(deleteProfile(user!));
    }
  };

  const onLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const formatPhoneNumber = (value: string) => {
    return `+${value}`;
  };

  return (
    <div className="page-wrapper">
      <h1 style={{ color: user?.favoriteColor }}>{`${user?.name} Profile`}</h1>
      <p>Email: {user?.email}</p>
      <p>Name: {user?.name}</p>
      <p>Phone Number: {formatPhoneNumber(user?.phoneNumber!)}</p>
      <p>Favorite Color: {user?.favoriteColor}</p>

      <div>
        <button type="button" onClick={onEditProfile}>
          Edit Profile
        </button>
        <button type="button" onClick={onDeleteProfile}>
          Delete Profile
        </button>

        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
