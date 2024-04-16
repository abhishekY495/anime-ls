import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { PrivateListsModal } from "./PrivateListsModal";
import { PublicListsModal } from "./PublicListsModal";

export const OptionsModal = ({ showOptionsModal, closeOptionsModal }) => {
  const [showPublicListsModal, setShowPublicListsModal] = useState(false);
  const [showPrivateListsModal, setShowPrivateListsModal] = useState(false);

  const openPrivateListsModal = () => {
    closeOptionsModal();
    setShowPrivateListsModal(true);
  };
  const closePrivateListsModal = () => setShowPrivateListsModal(false);

  const openPublicListsModal = () => {
    closeOptionsModal();
    setShowPublicListsModal(true);
  };
  const closePublicListsModal = () => setShowPublicListsModal(false);

  return (
    <>
      <PrivateListsModal
        showPrivateListsModal={showPrivateListsModal}
        closePrivateListsModal={closePrivateListsModal}
      />
      <PublicListsModal
        showPublicListsModal={showPublicListsModal}
        closePublicListsModal={closePublicListsModal}
      />
      <Modal show={showOptionsModal} onHide={closeOptionsModal} size="sm">
        <Modal.Header closeButton className="p-2 ps-3 pe-3">
          <Modal.Title>Add to</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="w-100 fw-semibold"
            onClick={openPrivateListsModal}
          >
            Private 🔒
          </Button>
          <Button
            variant="secondary"
            className="w-100 fw-semibold"
            onClick={openPublicListsModal}
          >
            Public 👁️
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
