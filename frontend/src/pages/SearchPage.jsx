import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { AnimesDataContext } from "../contexts/AnimesDataContext";
import { AnimeList } from "../components/AnimeList";
import { searchAnime } from "../services/searchAnimes";

export const SearchPage = () => {
  const {
    state: {
      searchQuery,
      animesData,
      pagination,
      animesDataLoading,
      animesDataError,
    },
    dispatch,
  } = useContext(AnimesDataContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    searchAnime(searchQuery, 1, dispatch);
  };

  useEffect(() => {
    dispatch({ type: "CLEAR_ANIMES_DATA" });
  }, []);

  return (
    <Container>
      <Row>
        <Col md={1} className="m-auto mt-3" style={{ width: "900px" }}>
          <Form onSubmit={formSubmitHandler} className="d-flex">
            <Form.Control
              type="search"
              placeholder="Name here"
              className="me-2"
              aria-label="Search"
              required
              autoFocus
              onChange={(e) =>
                dispatch({
                  type: "SET_SEARCH_QUERY",
                  payload: e.target.value.trim().toLowerCase(),
                })
              }
            />
            <Button type="submit" variant="success fw-semibold">
              Search
            </Button>
          </Form>
          {animesData?.length !== 0 && (
            <AnimeList
              animesData={animesData}
              pagination={pagination}
              dispatch={dispatch}
              searchQuery={searchQuery}
            />
          )}
          {animesDataLoading && (
            <div
              className="m-auto"
              style={{ width: "fit-content", paddingTop: "100px" }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {animesDataError && (
            <div
              className="m-auto"
              style={{ width: "fit-content", paddingTop: "100px" }}
            >
              <p className="m-0 text-center fw-semibold">
                Something went wrong.
              </p>
              <p className="m-0 text-center fw-semibold">Try again later.</p>
            </div>
          )}
          {!animesDataLoading && pagination?.items?.total === 0 && (
            <div
              className="m-auto"
              style={{ width: "fit-content", paddingTop: "100px" }}
            >
              <p className="m-0 text-center fw-semibold">No Animes found.</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};
