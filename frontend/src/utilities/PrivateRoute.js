import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Axios from "./Axios";

const PrivateRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const location = useLocation();

  const getAccessToken = async () => {
    try {
      const response = await Axios.get("/users/getAccessToken");
      if (response.data.accessToken) {
        setAccessToken(response.data.accessToken);
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
      setIsLoading(true);
      getAccessToken();
    }else{
      setIsLoading(false);
    }
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
