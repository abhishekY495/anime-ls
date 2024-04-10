import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Placeholder from "react-bootstrap/Placeholder";

export const SpinnerLoader = () => {
  return (
    <Container className="mx-auto mt-3">
      <Row>
        <Col md={1} className="m-auto" style={{ width: "800px" }}>
          <Placeholder animation="glow">
            <Placeholder xs={4} className="rounded mb-3 p-3" />
          </Placeholder>
          <br />
          {/*  */}
          <Placeholder animation="glow">
            <Placeholder xs={3} className="rounded mb-2" />
          </Placeholder>
          <Placeholder animation="glow">
            <Placeholder xs={12} className="rounded p-3 mb-4" />
          </Placeholder>
          {/*  */}
          <Placeholder animation="glow">
            <Placeholder xs={1} className="rounded mb-2" />
          </Placeholder>
          <Placeholder animation="glow">
            <Placeholder xs={12} className="rounded p-3 mb-4" />
          </Placeholder>
          {/*  */}
          <Placeholder animation="glow">
            <Placeholder xs={2} className="rounded mb-2" />
          </Placeholder>
          <Placeholder animation="glow">
            <Placeholder xs={12} className="rounded p-3 mb-4" />
          </Placeholder>
          {/*  */}
          <Placeholder animation="glow">
            <Placeholder xs={2} className="rounded mb-2" />
          </Placeholder>
          <Placeholder animation="glow">
            <Placeholder xs={12} className="rounded p-3 mb-4" />
          </Placeholder>
          {/*  */}
          <div className="d-flex justify-content-between">
            <button
              col={6}
              className="btn btn-primary disabled p-3"
              style={{ width: "48%" }}
            ></button>
            <button
              col={6}
              className="btn btn-danger disabled p-3"
              style={{ width: "48%" }}
            ></button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
