import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const accentColor = "#20c997";

const AboutSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="about-section py-5" style={{ backgroundColor: "#fff", color: "#000" }}>
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className="fw-bold mb-4">About TaskTogether</h2>
            <p className="lead mb-4">
              TaskTogether is a cutting-edge project management platform designed to empower teams and streamline workflows.
              Our mission is to help organizations achieve their goals by providing intuitive tools and real-time collaboration features.
            </p>
            <Button variant="primary" size="lg" onClick={() => navigate("/about")} style={{ backgroundColor: accentColor, borderColor: accentColor }}>
              Learn More About Us
            </Button>
          </Col>
          <Col md={6}>
            <img
              src="https://img.freepik.com/free-photo/group-people-working-office_23-2148811290.jpg?size=626&ext=jpg"
              alt="About TaskTogether"
              loading="lazy"
              className="img-fluid rounded"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
