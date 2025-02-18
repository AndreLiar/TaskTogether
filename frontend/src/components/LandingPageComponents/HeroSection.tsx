import React from "react";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const accentColor = "#20c997";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      className="hero-section d-flex align-items-center vh-100 w-100"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-photo/guy-shows-document-girl-group-young-freelancers-office-have-conversation-working_146671-13569.jpg?semt=ais_hybrid")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      ></div>

      <Container fluid className="px-5" style={{ position: "relative", zIndex: 2 }}>
        <Row className="align-items-center">
          <Col md={6} className="text-white">
            <h1 className="display-4 fw-bold mb-4">Elevate Your Project Management</h1>
            <p className="lead mb-5">Streamline collaboration, track progress, and achieve success with our intuitive project management platform.</p>
            <div className="d-flex gap-3">
              <Button size="lg" className="me-3 px-5" style={{ backgroundColor: accentColor, borderColor: accentColor }} onClick={() => navigate("/register")}>
                Get Started
              </Button>
              <Button variant="outline-light" size="lg" onClick={() => navigate("/login")}>
                Learn More
              </Button>
            </div>
          </Col>
          <Col md={6} className="d-none d-md-block">
            <Carousel indicators={false} controls={false} interval={3000} fade className="rounded shadow-lg" style={{ maxWidth: "500px", margin: "0 auto" }}>
              <Carousel.Item>
                <img src="https://img.freepik.com/free-photo/businessmen-hands-white-table-with-documents-drafts_176420-349.jpg?semt=ais_hybrid" alt="Project Management" className="d-block w-100 rounded" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://img.freepik.com/photos-gratuite/techniciens-essayant-atteindre-objectifs-ambitieux-matiere-developpement-durable_23-2150950210.jpg?semt=ais_hybrid" alt="Team Collaboration" className="d-block w-100 rounded" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://media.istockphoto.com/id/1199291049/fr/photo/groupe-de-personnes-%C3%A9crivant-sur-des-notes-collantes.jpg?s=612x612&w=0&k=20&c=UIouVv9UT48J1_EXacWrVGX5pR_Q9cC0ovEu0mUHkfs=" alt="Kanban Workflow" className="d-block w-100 rounded" />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
