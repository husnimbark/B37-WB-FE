import { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useMutation } from 'react-query';
import { API } from '../../config/api';

function Register({ show, handleRegister, handleClose, switchLogin }) {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create function for handle insert data process with useMutation here ...
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post('/register', body, config);

      // Handling response here
      const alert = (
        <Alert variant="success" className="py-1">
          Resgiter Success
        </Alert>
      );
      setMessage(alert);

    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Body className="text-dark">
        <div className=" justify-content-center">
          <div className="card-auth p-4">
            <div
              className="d-flex justify-content-end fs-3 fa-2x"
              aria-hidden="true"
              onClick={handleClose}
            >
          
            </div>

            <div className="mb-3 f-1 fs-2 fw-bold text-red">Register</div>

            { message && message }

            <Form onSubmit={ (e) => handleSubmit.mutate(e) }>
              <div>
                <input
                  type="name"
                  placeholder="Full Name"
                  name="name"
                  value={ name }
                  onChange={ handleChange }
                  className="form-control py-2 mt-4 f-2 border border-danger"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={ email }
                  onChange={ handleChange }
                  className="form-control py-2 mt-4 f-2 border border-danger"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={ password }
                  onChange={ handleChange }
                  className="form-control py-2 mt-4 f-2 border border-danger"
                />
              </div>

              <div className="d-grid gap-2 mt-5 pb-3">
                <Button className="btn btn-danger f-2 fw-bold" type="submit">
                  Register
                </Button>
              </div>
            </Form>
            <div>
              <p className="f-2">
                Already have an account?
                <button
                  className="bg-white border-0 fw-bold"
                  onClick={switchLogin}
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Register;
