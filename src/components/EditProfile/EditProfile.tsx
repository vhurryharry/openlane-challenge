import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProfile } from "../../actions/userActions";
import { AppDispatch } from "../../store";
import { UserInfo } from "../../reducers/userReducer";
import { getUser } from "../../selectors/userSelectors";

import "./EditProfile.css";
import ProfileForm from "../ProfileForm/ProfileForm";

const EditProfile = () => {
  const user = useSelector(getUser);
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmitProfile = (newUser: UserInfo) => {
    return dispatch(editProfile(user!, newUser)).then((profile) => {
      if (profile.type === "user/editProfileSuccess") {
        navigate("/");
        return true;
      }
      return false;
    });
  };

  const onCancel = () => {
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
      <h1 style={{ color: user?.favoriteColor }}>Edit {user?.name} Profile</h1>
      <ProfileForm user={user} onSubmit={onSubmitProfile} onCancel={onCancel} />
    </div>
  );
};

export default EditProfile;
