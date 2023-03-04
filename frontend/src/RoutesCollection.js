import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserPage from "./pages/UserPage";
import PrivateRoute from "./utilities/PrivateRoute";

const RoutesCollection = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route
        path="users"
        element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        }
      />
      {/* Not found route  */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesCollection;
