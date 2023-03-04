import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import jwtDecode from "jwt-decode";
import Axios from "./Axios";

const PrivateRoute = ({ children }) => {
  let time = 0;
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const location = useLocation();

  let tokenTimeout;
  if (time > 0) {
    tokenTimeout = setTimeout(() => {
      console.log("token expired")
      getAccessToken();
    }, time);
  }

  const getAccessToken = async () => {
    try {
      const response = await Axios.get("/users/getAccessToken");
      if (response.data.accessToken) {
        setAccessToken(response.data.accessToken);
        time = jwtDecode(response.data.accessToken).exp * 1000 - Date.now();
      } else {
        return (
          <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      getAccessToken();
    } else {
      setIsLoading(false);
    }
    return () => clearTimeout(tokenTimeout);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (accessToken) {
    return children;
  }

  return <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
