import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import { UserDataContext } from "../../contexts/UserDataContext";

export const PrivateListsModal = ({
  showPrivateListsModal,
  closePrivateListsModal,
}) => {
  const {
    state: { userData },
  } = useContext(UserDataContext);

  return (
    <Modal show={showPrivateListsModal} onHide={closePrivateListsModal}>
      <Modal.Header closeButton>
        <Modal.Title>Private</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-2">
        {userData?.privateLists?.length === 0 ? (
          <p className="text-center">
            No Lists found <br />
            Go to{" "}
            <Link to="/dashboard" className="fw-semibold">
              Dashboard
            </Link>{" "}
            and create a <span className="fw-semibold">Private</span> List
          </p>
        ) : (
          "You got lists"
        )}
      </Modal.Body>
    </Modal>
  );
};
