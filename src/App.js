import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className="app-content">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-content">
        <div className="sidenav-container">{/* <AppRoutes/> */}</div>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
