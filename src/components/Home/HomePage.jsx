import { useSelector } from "react-redux";
import videoHomePage from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-1">{t("homepage.title1")}</div>
        <div className="title-2">
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead - end make everyone happy.
        </div>
        <div className="title-3">
          {isAuthenticated === false ? (
            <button onClick={() => navigate("/login")}>
              Get's started. It's free
            </button>
          ) : (
            <button onClick={() => navigate("/users")}>Doing Quiz Now</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
