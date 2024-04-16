import React, { useContext } from "react";
import Card from "react-bootstrap/Card";

import { AddNew } from "./AddNew";
import { UserDataContext } from "../../contexts/UserDataContext";
import placeHolderImage from "../../assets/placeholder.png";
import deleteIcon from "../../assets/delete.png";

export const PublicLists = () => {
  const {
    state: { userData },
  } = useContext(UserDataContext);

  return (
    <div>
      <AddNew isPrivate={false} />
      <div className="d-flex flex-column gap-2 mt-3">
        {userData.publicLists.map((list) => {
          return (
            <Card key={list?._id} style={{ cursor: "pointer" }}>
              <Card.Body className="d-flex gap-3 rounded">
                <Card.Img
                  variant="top"
                  src={placeHolderImage}
                  className="rounded"
                  style={{
                    width: "60px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />
                <div
                  className="d-flex flex-column w-full gap-1"
                  style={{ width: "100%" }}
                >
                  <div className="d-flex justify-content-between">
                    <Card.Title className="m-0">{list?.listName}</Card.Title>
                    <img
                      src={deleteIcon}
                      alt="delete"
                      style={{ width: "30px" }}
                      title="delete"
                    />
                  </div>
                  <Card.Text>
                    <p className="m-0 p-0">
                      <span className="fw-semibold">
                        {list?.animes?.length}
                      </span>{" "}
                      Animes
                    </p>
                    <p className="m-0 p-0">
                      <span className="fw-semibold">{list?.views}</span> Views
                    </p>
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
