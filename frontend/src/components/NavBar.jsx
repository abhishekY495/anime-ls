import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import profileIcon from "../assets/profile-icon.png";
import { UserDataContext } from "../contexts/UserDataContext";

export const NavBar = () => {
  const {
    state: { userData },
  } = useContext(UserDataContext);

  const dashboardIcon = userData.username
    ? `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${userData?.username}`
    : profileIcon;

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Link className="navbar-brand text-light fs-3 fw-semibold" to="/">
          <Navbar.Brand className="text-light fs-3 fw-semibold">
            ALS
            <span title="list">📃</span>
          </Navbar.Brand>
        </Link>
        <Link to={userData?.username ? "/dashboard" : "/login"}>
          <Navbar.Brand>
            <Navbar.Text>
              <img
                src={dashboardIcon}
                alt="profile"
                style={{ width: "32px" }}
                className="rounded-circle"
              />
            </Navbar.Text>
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
};
