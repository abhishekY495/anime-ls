import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { UserDataContext } from "../contexts/UserDataContext";
import { UserDetails } from "../components/UserDetails";
import { logoutUser } from "../services/authentication/logoutUser";
import logoutIcon from "../assets/logout-icon.png";

export const DashboardPage = () => {
  const {
    state: { userData },
    dispatch,
  } = useContext(UserDataContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logoutUser(dispatch, navigate);
  };

  return (
    <Container>
      <Row>
        <Col md={1} className="m-auto" style={{ width: "900px" }}>
          <div className="d-flex justify-content-between mb-1 align-items-center">
            <p className="fs-1 m-0 text-white fw-semibold">Dashboard</p>
            <img
              src={logoutIcon}
              alt="logout"
              style={{ width: "35px", cursor: "pointer" }}
              title="logout"
              onClick={logoutHandler}
            />
          </div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <p className="fs-5 mb-1 fw-semibold">Account Details</p>
              </Accordion.Header>
              <Accordion.Body className="p-3 pb-4">
                <UserDetails userData={userData} dispatch={dispatch} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {/*  */}
          <div className="d-flex gap-2 justify-content-between mt-3">
            <div className="d-flex gap-2">
              <Link className="btn btn-secondary fw-semibold" to="/lists">
                Your Lists
              </Link>
              <Link
                className="btn btn-primary fw-semibold"
                to={`/user/${userData?.username}`}
                target="_blank"
              >
                Visit Public Profile
              </Link>
            </div>
            <Link className="btn btn-warning fw-semibold" to="/search">
              Search animes
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
