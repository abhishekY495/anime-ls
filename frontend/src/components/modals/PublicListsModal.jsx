import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import { UserDataContext } from "../../contexts/UserDataContext";

export const PublicListsModal = ({
  showPublicListsModal,
  closePublicListsModal,
}) => {
  const {
    state: { userData },
  } = useContext(UserDataContext);

  return (
    <Modal show={showPublicListsModal} onHide={closePublicListsModal}>
      <Modal.Header closeButton>
        <Modal.Title>Public Lists</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-2">
        {userData?.publicLists?.length === 0 ? (
          <p className="text-center">
            No Lists found
            <br />
            Go to{" "}
            <Link to="/dashboard" className="fw-semibold">
              Dashboard
            </Link>{" "}
            and create a <span className="fw-semibold">Public</span> List
          </p>
        ) : (
          "You got lists"
        )}
      </Modal.Body>
    </Modal>
  );
};
