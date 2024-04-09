import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export const Register = ({
  inputChangeHandler,
  formSubmitHandler,
  toastChangeHandler,
  showToast,
  toastText,
  toastColor,
}) => {
  return (
    <>
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
      <ToastContainer className="position-fixed bottom-0 start-0 p-4 rounded">
        <Toast
          onClose={toastChangeHandler}
          show={showToast}
          delay={2000}
          autohide
          className={`border border-2 border-${toastColor}`}
        >
          <Toast.Header>
            <strong className="me-auto">{toastText}</strong>
          </Toast.Header>
        </Toast>
      </ToastContainer>
    </>
  );
};
