import { UserInfo, UserProfile } from "../reducers/userReducer";

class UserService {
  login(email: string, password: string): Promise<UserProfile> {
    return new Promise<UserProfile>((resolve, reject) => {
      try {
        const userString = localStorage.getItem(email);

        if (userString) {
          const user: UserInfo = JSON.parse(userString);

          if (user.password === password) {
            resolve(user as UserProfile);
          }
        }

        reject(new Error("Invalid email or password"));
      } catch (err: any) {
        console.error("Login failed: ", err);
        reject(err);
      }
    });
  }

  saveProfile(user: UserInfo): Promise<UserProfile> {
    return new Promise<UserProfile>((resolve, reject) => {
      try {
        if (localStorage.getItem(user.email)) {
          reject("Email is already in use");
        }

        localStorage.setItem(user.email, JSON.stringify(user));
        resolve(user as UserProfile);
      } catch (err: any) {
        console.error("Save Profile failed: ", err);
        reject(err);
      }
    });
  }

  deleteProfile(user: UserInfo): Promise<UserProfile> {
    return new Promise<UserProfile>((resolve, reject) => {
      try {
        localStorage.removeItem(user.email);
        resolve(user as UserProfile);
      } catch (err: any) {
        console.error("Delete Profile failed: ", err);
        reject(err);
      }
    });
  }
}

export default new UserService();