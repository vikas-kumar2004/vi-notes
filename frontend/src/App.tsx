import React from "react";
import { Routes, Route, Navigate } from "react-router";

import Navbar from "./components/ui/Navbar";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";

const App: React.FC = () => {
  return (
    <>
  
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;