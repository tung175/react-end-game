import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { doLogin } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";
import { ImSpinner10 } from "react-icons/im";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const disPatch = useDispatch();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }

    if (!password) {
      toast.error("Invalid password");
      return;
    }
    setIsLoading(true);
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      disPatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };

  const handleBackHome = () => {
    navigate("/");
  };

  const handleSignUp = () => {
    navigate("/register");
  };
  return (
    <div className="login-container">
      <div className="header">
        Don't have an account yet?
        <button onClick={() => handleSignUp()}>Sign up</button>
      </div>

      <div className="title col-4 mx-auto">ABC</div>
      <div className="welcome col-4 mx-auto">Hello, Who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button
            className="btn-submit"
            disabled={isLoading}
            onClick={() => handleLogin()}
          >
            {isLoading === true && <ImSpinner10 className="loader-icon" />}
            <span>Login</span>
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <span className="go-back-home" onClick={() => handleBackHome()}>
            &lt;&lt; Go back home
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
