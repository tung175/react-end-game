import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import HomePage from "./components/Home/HomePage";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import DashBoard from "./components/Admin/content/DashBoard";
import ManagerUser from "./components/Admin/content/ManagerUser";
import Login from "./components/Auth/Login";
import React from "react";
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/users" element={<ListQuiz />} />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />

        <Route path="admin" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manager-user" element={<ManagerUser />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* <Route path="*" element={<NotFound/>}></Route> */}
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Layout;
