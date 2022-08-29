import { Modal , Button} from "react-bootstrap";

function DeleteItem({ show }) {
  return (
    <Modal show={show} centered>
      <Modal.Body className="text-dark">
        <p>Are you sure want to delete this item?</p>
        <div className="row d-grid gap-2">
        <Button className="col btn-success">
        Yes
        </Button>
        <Button className="col btn-danger">
        No
        </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteItem;