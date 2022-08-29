import { Modal } from "react-bootstrap";

function SuccessAddCart({ show }) {
  return (
    <Modal show={show} centered>
      <Modal.Body className="text-dark">
        <p>The product is successfully added to the cart</p>
      </Modal.Body>
    </Modal>
  );
}

export default SuccessAddCart;
