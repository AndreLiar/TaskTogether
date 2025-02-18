import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="testimonials-section py-5" style={{ backgroundColor: "#000", color: "#fff" }}>
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="fw-bold text-white">What Our Users Say</h2>
          </Col>
        </Row>
        <Row className="g-4">
          <Col md={4}>
            <Card className="bg-transparent border-0 text-center">
              <Card.Body>
                <blockquote className="blockquote text-white">
                  <p>"TaskTogether has transformed how our team collaborates. It's intuitive and powerful!"</p>
                  <footer className="blockquote-footer text-white">John Doe, CEO of ABC Corp</footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-transparent border-0 text-center">
              <Card.Body>
                <blockquote className="blockquote text-white">
                  <p>"I love the real-time updates and seamless integration with our existing tools."</p>
                  <footer className="blockquote-footer text-white">Jane Smith, Developer at XYZ Inc</footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-transparent border-0 text-center">
              <Card.Body>
                <blockquote className="blockquote text-white">
                  <p>"The video call feature is a game-changer for remote teams like ours."</p>
                  <footer className="blockquote-footer text-white">Alex Johnson, Team Lead at DEF Ltd</footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
