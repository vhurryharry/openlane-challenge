import { useState } from "react";

import "./ProfileForm.css";
import { Colors, UserInfo } from "../../reducers/userReducer";
import { validateUser } from "../../utils/validation";
import { useSelector } from "react-redux";
import { getError } from "../../selectors/userSelectors";

interface IProfileForm {
  onSubmit: (user: UserInfo) => Promise<boolean>;
  onCancel: () => void;
  user?: UserInfo;
}

const ProfileForm = ({ onSubmit, onCancel, user }: IProfileForm) => {
  const [email, setEmail] = useState<string>(user?.email || "");
  const [password, setPassword] = useState<string>(user?.password || "");
  const [name, setName] = useState<string>(user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phoneNumber || ""
  );
  const [favoriteColor, setFavoriteColor] = useState<string>(
    user?.favoriteColor || ""
  );

  const error = useSelector(getError);

  const handleSubmit = (e: React.FormEvent) => {
    const user: UserInfo = {
      email,
      password,
      name,
      phoneNumber,
      favoriteColor: favoriteColor as Colors,
    };

    const validation = validateUser(user);
    if (validation === null) {
      onSubmit(user).then((success) => {
        if (!success) e.preventDefault();
      });
    }
  };

  const cancelForm = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <p>Email</p>
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        <p>Password</p>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label>
        <p>Full Name</p>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        <p>Phone Number</p>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>

      <label>
        <p>Favorite Color</p>
        <select
          value={favoriteColor}
          required
          onChange={(e) => setFavoriteColor(e.target.value)}
        >
          {Object.entries(Colors).map(([key, value]) => (
            <option key={"color-" + value} value={value}>
              {key}
            </option>
          ))}
        </select>
      </label>

      {error && <p>{error}</p>}

      <div>
        <button type="submit" disabled={false}>
          {user ? "Save" : "Create"}
        </button>
        <button type="button" onClick={cancelForm}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
