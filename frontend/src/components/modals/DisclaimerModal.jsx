import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

export const DisclaimerModal = ({ serverLive }) => {
  const [show, setShow] = useState(true);

  const closeModal = () => setShow(false);

  return (
    <Modal show={show} className="mt-5">
      <Modal.Header>
        <Modal.Title className="d-flex gap-2">
          {serverLive ? (
            <span
              className="bg-success pt-0 pb-0 p-3 rounded-top-pill"
              style={{ height: "28px" }}
            ></span>
          ) : (
            <Spinner animation="grow" variant="danger" />
          )}
          <p className="m-0">Disclaimer</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3 pt-2 pb-0">
        <p className="m-0 mb-2">
          Server is hosted on
          <a href="https://render.com" target="_blank" className="fw-semibold">
            {" "}
            Render
          </a>
          , so it may take some time to start.
          <br />
          Please wait till the above <span className="fw-semibold">
            light
          </span>{" "}
          turns <span className="fw-semibold">green</span> and then you can
          close this message.
        </p>
      </Modal.Body>
      <Button
        variant="secondary"
        onClick={closeModal}
        className="w-25 mb-2 ms-3 mb-3 p-0 pt-1 pb-1 fw-semibold"
        disabled={!serverLive}
      >
        Close
      </Button>
    </Modal>
  );
};
