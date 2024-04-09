import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { validEmailFormat } from "../utils/validEmailFormat";
import { API_URL } from "../utils/constants";

export const UserDetails = ({ userData, dispatch }) => {
  const [fullname, setFullname] = useState(userData?.fullname);
  const [email, setEmail] = useState(userData?.email);
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastColor, setToastColor] = useState("");
  const [disableUpdateBtn, setDisableUpdateBtn] = useState(true);
  const navigate = useNavigate();

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

  const toastChangeHandler = () => setShowToast(false);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (fullname.trim().length === 0) {
      setToastColor("danger");
      setToastText("Full Name cannot be empty");
      setShowToast(true);
    } else if (email.trim().length === 0) {
      setToastColor("danger");
      setToastText("Email cannot be empty");
      setShowToast(true);
    } else if (!validEmailFormat(email)) {
      setToastColor("danger");
      setToastText("Invalid Email format");
      setShowToast(true);
    } else {
      try {
        dispatch({ type: "USER_DATA_LOADING" });
        const updateData = { fullname, email, password };
        const data = await axios.put(API_URL + "/user/profile", updateData, {
          withCredentials: true,
        });
        const { message, user } = data?.data;
        setToastColor("success");
        setToastText(message);
        setShowToast(true);
        dispatch({ type: "USER_DATA", payload: user });
      } catch (error) {
        dispatch({ type: "USER_DATA_ERROR" });
        console.error(error);
        const { message } = error?.response?.data;
        setToastColor("danger");
        setToastText(message || "Something went wrong");
        setShowToast(true);
      }
    }
  };

  const logoutHandler = async () => {
    const data = await axios.get(API_URL + "/user/logout", {
      withCredentials: true,
    });
    const { message } = data?.data;
    setToastColor("success");
    setToastText(message);
    setShowToast(true);
    dispatch({ type: "USER_DATA", payload: {} });
    navigate("/");
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={1} className="m-auto" style={{ width: "800px" }}>
            <Form onSubmit={formSubmitHandler}>
              <p className="fs-1 mb-2 text-white fw-semibold w-100 border-bottom">
                Dashboard
              </p>
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
                <Form.Control
                  type="password"
                  className="text-muted"
                  placeholder="Fill to update password"
                  onChange={passwordChangeHandler}
                />
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
                <Col>
                  <Button
                    type="button"
                    variant="danger"
                    className="w-100 fw-semibold"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                </Col>
              </Row>
            </Form>
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
