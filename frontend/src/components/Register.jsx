import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Register = ({
  inputChangeHandler,
  formSubmitHandler,
  userDataLoading,
}) => {
  return (
    <Container>
      <Row>
        <Col md={1} className="mt-4 m-auto" style={{ width: "390px" }}>
          <Card>
            <Card.Header className="text-center h2 p-2 pt-1">
              Register
            </Card.Header>
            <Card.Body>
              <Form onSubmit={formSubmitHandler}>
                <Form.Group className="mb-2 fw-semibold" controlId="fullname">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={inputChangeHandler}
                    name="fullname"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2 fw-semibold" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={inputChangeHandler}
                    name="username"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2 fw-semibold" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={inputChangeHandler}
                    name="email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3 fw-semibold" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={inputChangeHandler}
                    name="password"
                    required
                  />
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
                  Have an account?{" "}
                  <Link className="fw-semibold" to="/login">
                    Login
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
