import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../App.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React end game</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">User</Nav.Link>
              <Nav.Link href="#link">Admin</Nav.Link>
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
                  <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Profile
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
