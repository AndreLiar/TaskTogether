// src/pages/DashboardLayout.tsx
import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import { useAppContext } from "../context/AppContext";
import { logoutUser } from "../services/authService";

const DashboardLayout: React.FC = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  // Provide a fallback value if user is null
  const getFirstName = (): string => {
    return user || "User";
  };

  return (
    <>
      <DashboardNavbar firstName={getFirstName()} onLogout={handleLogout} />
      <Container fluid className="p-4" style={{ marginTop: "70px" }}>
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <NavLink end className="nav-link" to="/dashboard">
              Overview
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/dashboard/projects">
              Projects
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/dashboard/chat">
              Chat
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/dashboard/tasks">
              Tasks
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/dashboard/video">
              Video Calls
            </NavLink>
          </Nav.Item>
        </Nav>
        <Outlet />
      </Container>
    </>
  );
};

export default DashboardLayout;
