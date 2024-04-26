import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

import { UserDataContext } from "../contexts/UserDataContext";
import { PublicUserDetails } from "../components/PublicUserDetails";
import { getPublicProfileData } from "../services/getPublicProfileData";
import { viewIncrement } from "../services/viewIncrement";
import viewsIcon from "../assets/views.png";
import goBackIcon from "../assets/go-back.png";

export const PublicProfileListWithAnimesPage = () => {
  const { username, listId } = useParams();
  const {
    state: {
      publicProfileUserData,
      publicProfileUserDataLoading,
      publicProfileUserDataError,
    },
    dispatch,
  } = useContext(UserDataContext);

  const list = publicProfileUserData?.publicLists?.find(
    (list) => String(list?._id) === String(listId)
  );

  useEffect(() => {
    if (!publicProfileUserData?.username) {
      getPublicProfileData(username, dispatch);
    }
    viewIncrement(username, listId);
  }, []);

  return (
    <Container>
      <Row>
        <Col md={1} className="m-auto" style={{ width: "900px" }}>
          {publicProfileUserDataLoading && (
            <div className="d-flex justify-content-center align-items-center mt-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {publicProfileUserDataError && (
            <p className="text-center fs-5 mt-5 fw-semibold">No such User</p>
          )}
          {publicProfileUserData?.username && (
            <>
              <PublicUserDetails userData={publicProfileUserData} />
              {!list ? (
                <p className="text-center fs-5 mt-3 fw-semibold">
                  No such list
                </p>
              ) : (
                <>
                  <div
                    className="d-flex justify-content-between align-items-end mt-1"
                    style={{ marginBottom: "-5px" }}
                  >
                    <p className="d-flex align-items-end fs-3 text-muted gap-1">
                      <Link to={`/user/${username}`}>
                        <img
                          src={goBackIcon}
                          alt="go back"
                          style={{ width: "38px" }}
                        />
                      </Link>
                      {list?.listName}{" "}
                      <span
                        className="text-muted"
                        style={{ fontSize: "15px", paddingBottom: "6px" }}
                      >
                        ({list?.animes.length})
                      </span>
                    </p>
                    <p className="d-flex gap-2" title="views">
                      <img
                        src={viewsIcon}
                        alt="views"
                        style={{
                          width: "18px",
                          opacity: 0.8,
                        }}
                      />
                      <span className="fw-semibold text-muted">
                        {list?.views}
                      </span>
                    </p>
                  </div>
                  <div>
                    {list?.animes?.length === 0 ? (
                      <div className="border-top">
                        <p className="mt-3 text-center fw-semibold fs-5">
                          No Animes ...
                        </p>
                      </div>
                    ) : (
                      <div className="public-lists">
                        {list?.animes?.map((anime) => {
                          return (
                            <Card
                              style={{ cursor: "pointer" }}
                              key={anime?._id}
                            >
                              <Link
                                to={anime?.link}
                                className="text-decoration-none"
                                target="_blank"
                                title={anime?.title}
                              >
                                <Card.Body>
                                  <Card.Img
                                    variant="top"
                                    src={anime?.coverImage}
                                    className="rounded w-100"
                                    style={{
                                      height: "320px",
                                      objectFit: "cover",
                                    }}
                                  />
                                  <Card.Text className="m-0 fs-4 ps-1 fw-bold text-truncate text-white">
                                    {anime?.title}
                                  </Card.Text>
                                </Card.Body>
                              </Link>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
