import React, { useState } from "react";

import { NewListModal } from "../modals/NewListModal";

export const AddNew = ({ isPrivate }) => {
  const [showNewListModal, setShowNewListModal] = useState(false);
  return (
    <>
      <NewListModal
        showNewListModal={showNewListModal}
        hideNewListModal={() => setShowNewListModal(false)}
        isPrivate={isPrivate}
      />
      <div
        className="mt-3 d-flex justify-content-center border p-2 bg-secondary rounded add-new"
        onClick={() => setShowNewListModal(true)}
      >
        <span className="text-muted fw-semibold">+ Add New</span>
      </div>
    </>
  );
};
