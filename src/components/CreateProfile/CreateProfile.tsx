import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProfile } from "../../actions/userActions";
import { AppDispatch } from "../../store";

import "./CreateProfile.css";
import ProfileForm from "../ProfileForm/ProfileForm";
import { UserInfo } from "../../reducers/userReducer";

const CreateProfile = () => {
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmitProfile = (user: UserInfo) => {
    return dispatch(createProfile(user)).then((profile) => {
      if (profile.type === "user/createProfileSuccess") {
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
      <h1>Create Profile</h1>
      <ProfileForm onSubmit={onSubmitProfile} onCancel={onCancel} />
    </div>
  );
};

export default CreateProfile;
