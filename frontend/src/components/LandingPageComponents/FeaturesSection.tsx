import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const accentColor = "#20c997";

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section py-5" style={{ backgroundColor: "#f8f9fa", color: "#000" }}>
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="fw-bold">Why Choose Us?</h2>
            <p className="text-muted">Discover the tools designed to simplify your project workflow.</p>
          </Col>
        </Row>
        <Row className="g-4">
          <Col md={4}>
            <Card className="text-center border-0 shadow-sm p-4 rounded-3">
              <i className="bi bi-kanban fs-1 mb-3" style={{ color: accentColor }}></i>
              <Card.Body>
                <Card.Title>Intuitive Kanban Board</Card.Title>
                <Card.Text>Visualize tasks and manage workflows with drag-and-drop simplicity.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center border-0 shadow-sm p-4 rounded-3">
              <i className="bi bi-chat-dots fs-1 mb-3" style={{ color: accentColor }}></i>
              <Card.Body>
                <Card.Title>Real-Time Communication</Card.Title>
                <Card.Text>Stay connected with your team through integrated chat and instant notifications.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center border-0 shadow-sm p-4 rounded-3">
              <i className="bi bi-camera-video fs-1 mb-3" style={{ color: accentColor }}></i>
              <Card.Body>
                <Card.Title>Seamless Video Calls</Card.Title>
                <Card.Text>Conduct face-to-face meetings and collaborate effortlessly with our video call feature.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;
