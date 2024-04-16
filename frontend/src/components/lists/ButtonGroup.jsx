import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import editIcon from "../../assets/edit.png";
import shareIcon from "../../assets/share.png";
import deleteIcon from "../../assets/delete.png";
import { DeleteListConfirmation } from "../modals/DeleteListConfirmation";

export const ButtonGroup = ({ inPrivate, listId }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openDeleteConfirmationModal = () => setShowDeleteModal(true);
  const closeDeleteConfirmationModal = () => setShowDeleteModal(false);

  return (
    <>
      <DeleteListConfirmation
        showDeleteModal={showDeleteModal}
        closeDeleteConfirmationModal={closeDeleteConfirmationModal}
        inPrivate={inPrivate}
        listId={listId}
      />
      <div
        className={`mt-2 d-flex gap-3 ${
          inPrivate ? "private-btn-group" : "public-btn-group"
        }`}
      >
        <Button
          variant="primary fw-semibold w-100 d-flex justify-content-center align-items-center gap-2"
          size="sm"
          title="edit"
        >
          <img width="12" height="12" src={editIcon} alt="edit" /> Edit
        </Button>
        {!inPrivate && (
          <Button
            variant="success fw-semibold w-100 d-flex justify-content-center align-items-center gap-2"
            size="sm"
            title="share"
          >
            <img width="12" height="12" src={shareIcon} alt="share" /> Share
          </Button>
        )}
        <Button
          variant="danger fw-semibold w-100 d-flex justify-content-center align-items-center gap-2"
          size="sm"
          title="delete"
          onClick={openDeleteConfirmationModal}
        >
          <img width="12" height="12" src={deleteIcon} alt="delete" /> Delete
        </Button>
      </div>
    </>
  );
};
