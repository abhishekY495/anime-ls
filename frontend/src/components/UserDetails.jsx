import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { validEmailFormat } from "../utils/validEmailFormat";
import { API_URL } from "../utils/constants";

export const UserDetails = ({ userData, dispatch }) => {
  const [fullname, setFullname] = useState(userData?.fullname);
  const [email, setEmail] = useState(userData?.email);
  const [password, setPassword] = useState("");
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

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (fullname.trim().length === 0) {
      toast.error("Full Name cannot be empty");
    } else if (email.trim().length === 0) {
      toast.error("Email cannot be empty");
    } else if (!validEmailFormat(email)) {
      toast.error("Invalid Email format");
    } else {
      const toastId = toast.loading("Logging In");
      try {
        dispatch({ type: "USER_DATA_LOADING" });
        const updateData = { fullname, email, password };
        const data = await axios.put(API_URL + "/user/profile", updateData, {
          withCredentials: true,
        });
        const { message, user } = data?.data;
        toast.success(message, { id: toastId });
        dispatch({ type: "USER_DATA", payload: user });
      } catch (error) {
        console.error(error);
        dispatch({ type: "USER_DATA_ERROR" });
        const { message } = error?.response?.data;
        toast.error(message, { id: toastId });
      }
    }
  };

  const logoutHandler = async () => {
    const toastId = toast.loading("Logging Out");
    const data = await axios.get(API_URL + "/user/logout", {
      withCredentials: true,
    });
    const { message } = data?.data;
    toast.success(message, { id: toastId });
    dispatch({ type: "USER_DATA", payload: {} });
    navigate("/");
  };

  return (
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
  );
};
