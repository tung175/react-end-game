import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../App.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/apiServices";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Languages from "./Languages";

const Header = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleLogout = async () => {
    let res = await logout(account.email, account.refresh_token)
    if (res && res.EC === 0) {
      dispatch(doLogout())
      navigate("/login")
    } else {
      toast.error(res.EM)
    }
  }
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React end game</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/users">User</Nav.Link>
              <Nav.Link href="/admin">Admin</Nav.Link>
            </Nav>
            <Nav>
              {isAuthenticated === false ? (
                <>
                  <button className="btn-login" onClick={() => handleLogin()}>
                    Login
                  </button>
                  <button className="btn-signup" onClick={() => handleSignUp()}>
                    SignUp
                  </button>
                </>
              ) : (
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Profile
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Languages/>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
