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
            <Placeholder xs={3} className="rounded p-3 mb-3" />
          </Placeholder>
          <br />
          <Placeholder animation="glow" className="pb-4 border-bottom">
            <Placeholder
              xs={12}
              className="rounded mb-4"
              style={{ padding: "28px" }}
            />
          </Placeholder>
        </Col>
      </Row>
    </Container>
  );
};
