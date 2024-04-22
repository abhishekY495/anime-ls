import React, { useContext } from "react";
import Button from "react-bootstrap/Button";

import { AnimesDataContext } from "../../contexts/AnimesDataContext";
import { UserDataContext } from "../../contexts/UserDataContext";
import { addAnimeToList } from "../../services/addAnimeToList";
import "./PrivatePublicListModal.css";
import toast from "react-hot-toast";

export const List = ({ list, inPrivate }) => {
  const {
    state: { selectedAnime },
  } = useContext(AnimesDataContext);
  const {
    state: { addAnimeLoading },
    dispatch,
  } = useContext(UserDataContext);

  const isAnimeInList = list?.animes?.some(
    (anime) =>
      anime?.title?.toLowerCase() === selectedAnime?.title?.toLowerCase()
  );

  const addBtnHandler = (listId) => {
    if (isAnimeInList) {
      toast.error("Already added");
    } else {
      addAnimeToList(listId, selectedAnime, inPrivate, dispatch);
    }
  };

  return (
    <div
      className="border rounded pt-1 ps-3 pe-2 pb-1 mb-2 d-flex align-items-center justify-content-between"
      style={{ cursor: "pointer" }}
    >
      <p className="m-0">
        <span className="fs-5">{list.listName} </span>
        <span className="fw-semibold text-muted">
          ({list.animes.length + " animes"})
        </span>
      </p>
      <Button
        variant="warning"
        className={`fw-semibold m-1 ps-4 pe-4 ${
          isAnimeInList ? "disabled-btn" : "add-btn"
        }`}
        disabled={addAnimeLoading}
        onClick={() => addBtnHandler(list._id)}
      >
        {isAnimeInList ? "Already added" : "Add"}
      </Button>
    </div>
  );
};
