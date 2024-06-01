import { Route, Routes } from "react-router-dom";
import App from "../App";
import HomePage from "../components/Home/HomePage";
import User from "../components/User/User";
import Admin from "../components/Admin/Admin";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/users" element={<User />} />
        </Route>
        <Route path="/admin" element={<Admin />} />

        {/* <Route path="*" element={<NotFound/>}></Route> */}
      </Routes>
    </>
  );
};

export default AppRoutes;
