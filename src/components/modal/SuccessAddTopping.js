import { Modal } from "react-bootstrap";

function SuccessAddTopping({ show , handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-dark">
        <p className="text-success text-center fw-bold mt-3">The Topping is successfully added</p>
      </Modal.Body>
    </Modal>
  );
}

export default SuccessAddTopping;
