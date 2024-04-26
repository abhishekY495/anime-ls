import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import showPasswordIcon from "../assets/showPasswordIcon.svg";
import hidePasswordIcon from "../assets/hidePasswordIcon.svg";

export const Login = ({
  inputChangeHandler,
  formSubmitHandler,
  userDataLoading,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Container>
      <Row>
        <Col md={1} className="mt-4 m-auto" style={{ width: "390px" }}>
          <Card>
            <Card.Header className="text-center h2 p-2 pt-1">Login</Card.Header>
            <Card.Body>
              <Form onSubmit={formSubmitHandler}>
                <Form.Group className="mb-2 fw-semibold" controlId="email">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={inputChangeHandler}
                    name="username"
                  />
                </Form.Group>

                <Form.Group className="mb-3 fw-semibold" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      onChange={inputChangeHandler}
                      name="password"
                      required
                      className="pe-5"
                    />
                    <img
                      src={showPassword ? showPasswordIcon : hidePasswordIcon}
                      className="position-absolute border-start ps-2"
                      style={{ top: "9px", right: "12px", cursor: "pointer" }}
                      onClick={toggleShowPassword}
                    />
                  </div>
                </Form.Group>
                <Button
                  variant="primary"
                  className="w-100 fw-semibold"
                  type="submit"
                  disabled={userDataLoading}
                >
                  Submit
                </Button>
                <Form.Text className="text-muted">
                  Don't have an account?{" "}
                  <Link className="fw-semibold" to="/register">
                    Register
                  </Link>
                </Form.Text>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
