import { useState , useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import { useMutation } from 'react-query';
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext'
import { API } from '../../config/api';

function Login({ show ,handleLogin , handleClose, switchRegister}) {

  const navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

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
      const response = await API.post('/login', body, config);
      // const { status, name, email, token } = response.data.data
      if (response?.status === 200) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data
        })

        if (response.data.data.status == "admin") {
          navigate('/transaction')
        } else {
          navigate('/homepage')
        }
      }

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
      <Modal.Body className="">
        <div className="justify-content-center">
          <div className="card-auth p-4">
            <div
              className="d-flex justify-content-end fs-3 fa-2x"
              aria-hidden="true"
              onClick={handleClose}
            >
           
            </div>
            <div className="mb-3 f-1 fs-2 fw-bold text-red">Login</div>
           
            { message && message }

            <Form onSubmit={ (e) => handleSubmit.mutate(e) }>
              <div>
                <input
                  autoFocus
                  type="email"
                  value={ email }
                  placeholder="Email"
                  id="emailInput"
                  onChange={ handleChange }
          
                  name="email"
                  className="form-control py-2 mt-4 f-2 border border-danger"
                />
              </div>
              <div>
                <input
                  autoFocus
                  type="password"
                  value={ password }
                  placeholder="Password"
                  onChange={ handleChange }
                   id="passwordInput"
                 
                  name="password"
                  className="form-control py-2 mt-4 f-2 border border-danger"
                />
              </div>
        
            <div className="d-grid gap-2 mt-5 pb-3">
              <Button
              
                className="btn-danger f-2 fw-bold"
                type="submit"
              >
                Login
              </Button>
            </div>
            </Form>

            <div>
              <p className="f-2">
                Don't have an account ?<button className="bg-white border-0 fw-bold" onClick={switchRegister}>Register</button>
              </p>
              
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
