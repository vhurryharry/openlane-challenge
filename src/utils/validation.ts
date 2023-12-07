import { UserInfo } from "../reducers/userReducer";

export const validateUser = (user: UserInfo): string | null => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=(.*[A-Z]){2})(?=(.*\d){2})(?=(.*[^A-Za-z0-9]){1})[A-Za-z0-9!@#$%^&*()-_+=<>?.,;:]{10,32}$/;
  const nameRegex = /^[A-Za-z]{3,}$/;
  const phoneNumberRegex = /\+?\d{7,20}$/;

  if (!emailRegex.test(user.email)) {
    return "Invalid email address";
  }

  if (!passwordRegex.test(user.password)) {
    return "Password should be between 10 - 32 letters, numbers, special characters (not a letter or number). There must be at least 2 uppercase, 2 numbers and 1 special character.";
  }

  if (!nameRegex.test(user.name)) {
    return "Name must include at least 3 characters";
  }

  if (user.phoneNumber && !phoneNumberRegex.test(user.phoneNumber)) {
    return "Invalid Phone Number format";
  }

  return null;
};
