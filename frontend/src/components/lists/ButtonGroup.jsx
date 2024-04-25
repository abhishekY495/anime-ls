import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";

import { DeleteListConfirmation } from "../modals/DeleteListConfirmation";
import { UserDataContext } from "../../contexts/UserDataContext";
import shareIcon from "../../assets/share.png";
import deleteIcon from "../../assets/delete.png";
import { APP_LINK } from "../../utils/constants";

export const ButtonGroup = ({ inPrivate, listId, publicProfile }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    state: { userData },
  } = useContext(UserDataContext);

  const openDeleteConfirmationModal = () => setShowDeleteModal(true);
  const closeDeleteConfirmationModal = () => setShowDeleteModal(false);

  const copyLink = () => {
    const link = `${APP_LINK}user/${
      publicProfile ? publicProfile.username : userData.username
    }/${listId}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied");
  };

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
        {!inPrivate && (
          <Button
            variant="success fw-semibold w-100 d-flex justify-content-center align-items-center gap-2"
            size="sm"
            title="share"
            onClick={copyLink}
          >
            <img width="12" height="12" src={shareIcon} alt="share" /> Share
          </Button>
        )}
        {!publicProfile && (
          <Button
            variant="danger fw-semibold w-100 d-flex justify-content-center align-items-center gap-2"
            size="sm"
            title="delete"
            onClick={openDeleteConfirmationModal}
          >
            <img width="12" height="12" src={deleteIcon} alt="delete" /> Delete
          </Button>
        )}
      </div>
    </>
  );
};
