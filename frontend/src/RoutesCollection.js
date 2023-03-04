import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const RoutesCollection = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Not found route  */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesCollection;
