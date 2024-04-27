import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { UserDataContext } from "../contexts/UserDataContext";
import animeCharacters from "../assets/anime-characters.jpg";
import "./HomePage.css";

export const HomePage = () => {
  const {
    state: { userData },
  } = useContext(UserDataContext);

  const privateBtnHandler = () => localStorage.setItem("activeList", "private");
  const publicBtnHandler = () => localStorage.setItem("activeList", "public");

  return (
    <Container>
      <Row>
        <Col
          md={1}
          className="m-auto mt-3 d-flex flex-column gap-3"
          style={{ width: "900px" }}
        >
          <div className="bg-body-tertiary p-4 pt-2 border rounded-3">
            <img
              src={animeCharacters}
              className="rounded w-100 mt-3 mb-2 object-fit-cover cover-image"
              alt="anime characters"
            />
            <p className="fs-3 m-0 lh-sm">
              Discover, Create and Share Anime Lists with all the anime addicts
              and the community. <br />
              {userData?.username ? (
                <Button variant="primary" className="mt-3">
                  <Link
                    to="/dashboard"
                    className="text-decoration-none text-white fw-semibold"
                  >
                    Go To Dashboard
                  </Link>
                </Button>
              ) : (
                <Button variant="primary" className="mt-3">
                  <Link
                    to="/register"
                    className="text-decoration-none text-white fw-semibold"
                  >
                    Register To Begin
                  </Link>
                </Button>
              )}
            </p>
          </div>
          {/*  */}
          <div className="bg-body-tertiary p-4 border rounded-3">
            <p className="m-0 fs-4">
              Visit the{" "}
              <Link to="/search" className="text-decoration-none fw-bold">
                Search
              </Link>{" "}
              page and start adding animes to your lists.
              <br />
            </p>
          </div>
          {/*  */}
          <div className="row lists-info">
            <div className="col-md-6">
              <div className="p-4 bg-danger bg-gradient border rounded-3">
                <h2>🔒 Private Lists</h2>
                <p className="fs-5">
                  Create <span className="fst-italic fw-bold">Private </span>
                  lists of your favorites or guilty pleasures which cannot be
                  viewed by anyone.
                </p>
                {userData?.username && (
                  <Button
                    variant="dark"
                    className="list-btn"
                    onClick={privateBtnHandler}
                  >
                    <Link
                      to="/lists"
                      className="text-decoration-none text-danger fw-bold"
                    >
                      Your Private Lists
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-4 bg-success bg-gradient border rounded-3">
                <h2>👁️ Public Lists</h2>
                <p className="fs-5">
                  Create <span className="fst-italic fw-bold">Public </span>
                  lists of your top picks and recommendations to share with your
                  friends or with the community.
                </p>
                {userData?.username && (
                  <Button
                    variant="dark"
                    className="list-btn"
                    onClick={publicBtnHandler}
                  >
                    <Link
                      to="/lists"
                      className="text-decoration-none text-success fw-bold"
                    >
                      Your Public Lists
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
          {/*  */}
          <div className="bg-body-tertiary p-2 text-center rounded-3">
            <p className="m-0">
              Made by{" "}
              <Link
                className="text-decoration-underline link-offset-1 text-muted me-1"
                to="https://abhisheky495.netlify.app"
                target="_blank"
              >
                Abhishek
              </Link>{" "}
              •{" "}
              <Link
                className="text-decoration-underline link-offset-1 text-muted ms-1"
                to="https://github.com/abhishekY495/myanime-list"
                target="_blank"
              >
                Code
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
