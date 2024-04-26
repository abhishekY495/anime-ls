import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { updateUser } from "../services/updateUser";
import showPasswordIcon from "../assets/showPasswordIcon.svg";
import hidePasswordIcon from "../assets/hidePasswordIcon.svg";

export const UserDetails = ({ userData, dispatch }) => {
  const [fullname, setFullname] = useState(userData?.fullname);
  const [email, setEmail] = useState(userData?.email);
  const [password, setPassword] = useState("");
  const [disableUpdateBtn, setDisableUpdateBtn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const fullnameChangeHandler = (e) => {
    const fname = e.target.value;
    setFullname(fname);
    if (fname !== userData?.fullname) {
      setDisableUpdateBtn(false);
    } else {
      setDisableUpdateBtn(true);
    }
  };
  const emailChangeHandler = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (email !== userData?.email) {
      setDisableUpdateBtn(false);
    } else {
      setDisableUpdateBtn(true);
    }
  };
  const passwordChangeHandler = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (password.length !== 0) {
      setDisableUpdateBtn(false);
    } else {
      setDisableUpdateBtn(true);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    updateUser(
      fullname,
      email,
      password,
      dispatch,
      setDisableUpdateBtn,
      setPassword
    );
  };

  return (
    <Container>
      <Row>
        <Col md={1} className="m-auto" style={{ width: "800px" }}>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group className="mb-3" controlId="formGroupFullname">
              <Form.Label className="mb-1">Full Name</Form.Label>
              <Form.Control
                type="text"
                className="text-muted"
                value={fullname}
                onChange={fullnameChangeHandler}
                name="fullname"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label className="mb-1">Email address</Form.Label>
              <Form.Control
                type="email"
                className="text-muted"
                value={email}
                onChange={emailChangeHandler}
                name="email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupUsername">
              <Form.Label className="mb-1">Username</Form.Label>
              <Form.Control
                type="text"
                className="text-muted"
                value={"@" + userData.username}
                readOnly
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label className="mb-1">Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  onChange={passwordChangeHandler}
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
            <Row>
              <Col>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 fw-semibold"
                  disabled={disableUpdateBtn}
                >
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
