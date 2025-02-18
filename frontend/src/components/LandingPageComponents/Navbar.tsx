import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiLogIn, BiUserPlus } from "react-icons/bi";

const accentColor = "#20c997";

const CustomNavbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="shadow-sm py-3 bg-white fixed-top" style={{ borderBottom: `3px solid ${accentColor}` }}>
      <Container>
        <Navbar.Brand className="fw-bold fs-4 text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          TaskTogether
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="fs-5 mx-3 text-dark fw-semibold d-flex align-items-center" onClick={() => navigate("/login")}>
              <BiLogIn size={20} className="me-2" /> Login
            </Nav.Link>
            <Nav.Link className="fs-5 mx-3 text-dark fw-semibold d-flex align-items-center" onClick={() => navigate("/register")}>
              <BiUserPlus size={20} className="me-2" /> Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
