import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage";
import Register from "./Page/Auth/Register";
import Login from "./Page/Auth/Login";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

const MainRouter = () => {
  useEffect(() => {}, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default MainRouter;
