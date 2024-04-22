import React from "react";
import Card from "react-bootstrap/Card";

import placeHolderImage from "../../assets/placeholder.png";
import { ButtonGroup } from "./ButtonGroup";

export const ListCard = ({ list, inPrivate }) => {
  return (
    <Card className="my-list" style={{ cursor: "pointer" }}>
      <Card.Body>
        <Card.Img
          variant="top"
          src={list?.animes[0]?.coverImage || placeHolderImage}
          className="rounded w-100 opacity-75"
          style={{
            height: "200px",
            objectFit: "cover",
          }}
        />
        <Card.Text className="m-0 pb-1 fs-4 ps-1 fw-bold text-truncate border-bottom">
          {list?.listName}
        </Card.Text>
        <Card.Text className="m-0 mt-1 ps-1 text-muted">
          <span className="fw-semibold">{list?.animes?.length}</span>{" "}
          {list?.animes?.length > 1 ? "Animes" : "Anime"}
        </Card.Text>
        {!inPrivate && (
          <Card.Text className="m-0 ps-1 text-muted">
            <span className="fw-semibold">{list?.views}</span> Views
          </Card.Text>
        )}
        <ButtonGroup inPrivate={inPrivate} listId={list?._id} />
      </Card.Body>
    </Card>
  );
};
