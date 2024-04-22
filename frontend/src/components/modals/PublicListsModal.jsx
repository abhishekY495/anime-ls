import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";

import { UserDataContext } from "../../contexts/UserDataContext";
import { NoListsMessage } from "./NoListsMessage";
import { List } from "./List";
import goBackIcon from "../../assets/go-back.png";
import "./PrivatePublicListModal.css";

export const PublicListsModal = ({
  showPublicListsModal,
  closePublicListsModal,
  openOptionsModal,
}) => {
  const {
    state: {
      userData: { publicLists },
    },
  } = useContext(UserDataContext);

  const goBackHandler = () => {
    closePublicListsModal();
    openOptionsModal();
  };

  return (
    <Modal show={showPublicListsModal} onHide={closePublicListsModal}>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-1">
          <img
            src={goBackIcon}
            alt="go back"
            className="go-back"
            onClick={goBackHandler}
          />
          <span>Public Lists</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-2">
        {publicLists?.length === 0 ? (
          <NoListsMessage isPrivate={false} />
        ) : (
          publicLists.map((list) => {
            return <List key={list._id} list={list} inPrivate={false} />;
          })
        )}
      </Modal.Body>
    </Modal>
  );
};
