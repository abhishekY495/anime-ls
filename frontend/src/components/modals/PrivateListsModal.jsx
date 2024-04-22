import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";

import { UserDataContext } from "../../contexts/UserDataContext";
import { NoListsMessage } from "./NoListsMessage";
import { List } from "./List";
import goBackIcon from "../../assets/go-back.png";
import "./PrivatePublicListModal.css";

export const PrivateListsModal = ({
  showPrivateListsModal,
  closePrivateListsModal,
  openOptionsModal,
}) => {
  const {
    state: {
      userData: { privateLists },
    },
  } = useContext(UserDataContext);

  const goBackHandler = () => {
    closePrivateListsModal();
    openOptionsModal();
  };

  return (
    <Modal show={showPrivateListsModal} onHide={closePrivateListsModal}>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-1">
          <img
            src={goBackIcon}
            alt="go back"
            className="go-back"
            onClick={goBackHandler}
          />
          <span>Private Lists</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-2">
        {privateLists?.length === 0 ? (
          <NoListsMessage isPrivate={true} />
        ) : (
          privateLists.map((list) => {
            return <List key={list._id} list={list} inPrivate={true} />;
          })
        )}
      </Modal.Body>
    </Modal>
  );
};
