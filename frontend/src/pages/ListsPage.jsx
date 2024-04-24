import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { PrivateLists } from "../components/lists/PrivateLists";
import { PublicLists } from "../components/lists/PublicLists";
import { UserDataContext } from "../contexts/UserDataContext";
import { Link } from "react-router-dom";

export const ListsPage = () => {
  const {
    state: { userData },
  } = useContext(UserDataContext);
  const { privateLists, publicLists } = userData;
  const [activeList, setActiveList] = useState(
    localStorage.getItem("activeList") === "private" ? "private" : "public"
  );

  const btnClickHandler = (e) => {
    localStorage.setItem("activeList", e.target.name);
    setActiveList(e.target.name);
  };

  return (
    <Container>
      <Row>
        <Col md={1} className="m-auto" style={{ width: "900px" }}>
          <p className="fs-1 text-white fw-semibold border-bottom">
            Your Lists
          </p>
          <div className="d-flex justify-content-between mt-2">
            <div className="d-flex gap-2">
              <Button
                variant={`${
                  activeList === "private" ? "info" : "secondary"
                } fw-semibold`}
                onClick={btnClickHandler}
                name="private"
              >
                Private ({privateLists.length})
              </Button>
              <Button
                variant={`${
                  activeList === "public" ? "info" : "secondary"
                } fw-semibold`}
                onClick={btnClickHandler}
                name="public"
              >
                Public ({publicLists.length})
              </Button>
            </div>
            <Link
              className="btn btn-warning fw-semibold"
              to="/search"
              role="button"
            >
              Search animes
            </Link>
          </div>
          {activeList === "private" ? <PrivateLists /> : <PublicLists />}
        </Col>
      </Row>
    </Container>
  );
};
