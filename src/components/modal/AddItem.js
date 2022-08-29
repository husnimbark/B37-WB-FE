import React, {useState} from "react";
import { Container, Button, Row, Col, Modal} from "react-bootstrap";
import { dataTopping } from "../../dummy/DataDummy";
import product1 from "../../assets/product1.svg";

function Addtopping({ show , handleClose}) {
  return (
    <Modal show={show} centered onHide={handleClose} size="lg">
      <Modal.Body className="text-dark m-4" >
      <Container fluid>
        <Row>
          <Col xs={12} md={5}>
            <img
              src={product1}
              style={{ width: "70%" }}
              className="img-fluid"
              alt="transaction"
            />
          </Col>
          <Col xs={16} md={7} style={{ backgroundColor: "white" }}>
            <div>
              <h1 className="text-start text-danger fw-bold">
                Ice Coffee Palm Sugar
              </h1>
            </div>
            <div className="mb-5">
              <p
                className="text-start text-danger"
                style={{ fontSize: "22px" }}
              >
                Rp. 25.000,-
              </p>
            </div>
            <div className="mb-5 mt-3">
              <h4 className="text-start text-danger fw-bold mb-5 mt-5">
                Topping
              </h4>
              <Row>
                {dataTopping.map((topping, index) => (
                  <Col xs={9} md={3}>
                    <img
                      src={topping.image}
                      className="p-1"
                      style={{ height: "80px", borderRadius: "10px" }}
                      alt=""
                    />
                    <p className="text-align-center text-danger mb-5">
                      {topping.name}
                    </p>
                  </Col>
                ))}
              </Row>
            </div>
            <div className="d-flex justify-content-between">
              <h2 className="text-danger fw-bold fs-4 mt-3 mb-5">Total</h2>
              <h2 className="text-danger fw-bold fs-4 mt-3 mb-5">
                Rp. 27.000,-
              </h2>
            </div>
            <div className="">
              <Button
                className="btn btn-danger fw-bold mt-3"
                style={{ width: "100%" }}
              >
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      </Modal.Body>
    </Modal>
  );
}

export default Addtopping;