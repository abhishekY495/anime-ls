import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { UserDataContext } from "../../contexts/UserDataContext";
import { deleteList } from "../../services/deleteList";

export const DeleteListConfirmation = ({
  showDeleteModal,
  closeDeleteConfirmationModal,
  inPrivate,
  listId,
}) => {
  const {
    state: { deleteListLoading },
    dispatch,
  } = useContext(UserDataContext);

  const deleteBtnHandler = () => {
    deleteList(listId, inPrivate, closeDeleteConfirmationModal, dispatch);
  };

  return (
    <Modal show={showDeleteModal} onHide={closeDeleteConfirmationModal}>
      <Modal.Header className="border-danger" closeButton>
        <Modal.Title>Are you Sure ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="m-0 mb-3">
          By clicking the{" "}
          <span className="fw-semibold text-danger-emphasis">Delete</span>{" "}
          button below, the list be permanently deleted. This action cannot be
          reversed.
        </p>
        <Button
          variant="danger"
          className="w-100 fw-semibold"
          onClick={deleteBtnHandler}
          disabled={deleteListLoading}
        >
          Delete
        </Button>
      </Modal.Body>
    </Modal>
  );
};
