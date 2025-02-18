import React, { useState } from "react";
import {
  Form,
  Button,
  Alert,
  Card,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const result = await registerUser(name, email, password);

    if (result && result.token) {
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } else if (result && result.error) {
      setError(result.error);
    } else {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="bg-dark min-vh-100 w-100 d-flex align-items-center justify-content-center overflow-auto"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Card
        className="shadow w-100 m-3 rounded-4"
        style={{ maxWidth: "500px", backgroundColor: "#1c1c1c" }}
      >
        <Card.Body>
          {/* Platform Logo */}
          <div className="text-center mb-4">
            <span
              className="fw-bold fs-3 text-primary"
              style={{ cursor: "pointer", color: "#20c997" }}
              onClick={() => navigate("/")}
              aria-label="TaskTogether logo"
            >
              TaskTogether
            </span>
          </div>

          <h2 className="mb-4 text-center text-white">Create an Account</h2>

          {/* Error or Success Messages */}
          {error && (
            <Alert variant="danger" className="mb-3">
              <strong>Error:</strong> {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mb-3">
              <strong>Success:</strong> {success}
            </Alert>
          )}

          <Form onSubmit={handleRegister}>
            {/* Name Field */}
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label className="text-white">Full Name</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-person text-white"></i>
                </InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  aria-label="Full Name"
                />
              </InputGroup>
            </Form.Group>

            {/* Email Field */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="text-white">Email Address</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-envelope text-white"></i>
                </InputGroup.Text>
                <FormControl
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email Address"
                />
              </InputGroup>
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className="text-white">Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-lock text-white"></i>
                </InputGroup.Text>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Password"
                />
                <Button
                  variant="outline-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                  className="border-0 bg-transparent"
                  aria-label="Toggle Password Visibility"
                >
                  <i
                    className={`bi ${
                      showPassword ? "bi-eye-slash" : "bi-eye"
                    } text-white`}
                  ></i>
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Register Button */}
            <Button
              variant="success"
              type="submit"
              className="w-100 rounded-pill py-2"
              style={{
                backgroundColor: "#20c997",
                borderColor: "#20c997",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
              aria-label="Register Button"
            >
              Register
            </Button>
          </Form>

          {/* Already Have an Account Link */}
          <p className="mt-3 text-center fw-bold fs-6 text-white">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-decoration-underline text-success"
              style={{ fontWeight: "bold" }}
              aria-label="Login Link"
            >
              Login here
            </a>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;