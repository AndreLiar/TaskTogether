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
import { loginUser } from "../services/authService";
import { useAppContext } from "../context/AppContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAppContext(); // Use context to update user state

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await loginUser(email, password);

    if (result?.token) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify({ email })); // Store user in localStorage
      setUser(email); // Update global context
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
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

          <h2 className="mb-4 text-center text-white">Sign In</h2>

          {/* Error Message */}
          {error && (
            <Alert variant="danger" className="mb-3">
              <strong>Error:</strong> {error}
            </Alert>
          )}

          <Form onSubmit={handleLogin}>
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

            {/* Login Button */}
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
              aria-label="Login Button"
            >
              Sign In
            </Button>
          </Form>

          {/* Don't Have an Account Link */}
          <p className="mt-3 text-center fw-bold fs-6 text-white">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-decoration-underline text-success"
              style={{ fontWeight: "bold" }}
              aria-label="Register Link"
            >
              Register here
            </a>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;