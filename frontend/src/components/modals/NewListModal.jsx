import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { UserDataContext } from "../../contexts/UserDataContext";
import { addList } from "../../services/addList";

export const NewListModal = ({
  showNewListModal,
  hideNewListModal,
  isPrivate,
}) => {
  const [listName, setListName] = useState("");
  const {
    state: { addListLoading },
    dispatch,
  } = useContext(UserDataContext);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    addList(listName, isPrivate, hideNewListModal, dispatch);
  };

  return (
    <Modal show={showNewListModal} onHide={hideNewListModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          Add New {isPrivate ? "Private" : "Public"} List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formSubmitHandler}>
          <Form.Group className="mb-3">
            <Form.Label className="ps-1">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter List Name"
              required
              onChange={(e) => setListName(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-100 fw-semibold"
            disabled={addListLoading}
          >
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
