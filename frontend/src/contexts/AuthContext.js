import React, { createContext, useState } from "react";
import Axios from "../utilities/Axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  const logout = async () => {
    try {
      await Axios.get("/users/logout");
      setAccessToken(null);
    } catch (err) {
      console.log(err);
    }
  };

  const values = {
    accessToken,
    setAccessToken,
    logout
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
