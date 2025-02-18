// src/components/dashboard/DashboardNavbar.tsx
import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";

interface DashboardNavbarProps {
  firstName: string; // This should now be the full name from the context
  onLogout: () => void;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ firstName, onLogout }) => {
  // Get only the first character (uppercased)
  const initial = firstName ? firstName.charAt(0).toUpperCase() : "U";

  return (
    <Navbar expand="lg" className="shadow-sm" style={{ backgroundColor: "#000" }}>
      <Container>
        <Navbar.Brand style={{ color: "#20c997", fontWeight: "bold" }}>
          TaskTogether
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#20c997",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {initial}
            </div>
            <Button variant="outline-light" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
