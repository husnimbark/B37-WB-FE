import { Modal } from "react-bootstrap";

function SuccessAddBucks({ show , handleClose}) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-dark">
      <p className="text-success text-center fw-bold mt-3">The Bucks is successfully added</p>
      </Modal.Body>
    </Modal>
  );
}

export default SuccessAddBucks;
