import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

import { ListCard } from "../components/lists/ListCard";
import { PublicUserDetails } from "../components/PublicUserDetails";
import { UserDataContext } from "../contexts/UserDataContext";
import { getPublicProfileData } from "../services/getPublicProfileData";

export const PublicProfilePage = () => {
  const { username } = useParams();
  const {
    state: {
      publicProfileUserData,
      publicProfileUserDataLoading,
      publicProfileUserDataError,
    },
    dispatch,
  } = useContext(UserDataContext);

  useEffect(() => {
    if (!publicProfileUserData?.username) {
      getPublicProfileData(username, dispatch);
    }
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
              <p className="fs-3 pt-2" style={{ marginBottom: "-5px" }}>
                {publicProfileUserData?.publicLists?.length} Public Lists
              </p>
              <div className="mt-3 public-lists">
                {publicProfileUserData?.publicLists?.map((list) => {
                  return (
                    <ListCard
                      key={list?._id}
                      list={list}
                      publicProfile={publicProfileUserData}
                    />
                  );
                })}
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
