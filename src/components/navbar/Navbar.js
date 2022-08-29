import React, { useState } from "react";
import { Container, Navbar as NavbarComp, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BucksLogo from "../../assets/logo.svg";
import Login from "../modal/Login";
import Register from "../modal/Register";
import { UserContext } from "../../context/UserContext";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleCloseRegister = () => setShowRegister(false);

  function switchRegister() {
    handleCloseLogin();

    setShowRegister(true);
  }

  function switchLogin() {
    handleCloseRegister();

    setShowLogin(true);
  }

  return (
    <>
      <NavbarComp expand="lg">
        <Container>
          <NavbarComp.Brand as={Link} to="/">
            <img
              src={BucksLogo}
              className="img-fluid mt-1"
              style={{ width: "50px", height: "50px" }}
              alt="brand"
            />
          </NavbarComp.Brand>
          <NavbarComp.Toggle aria-controls="basic-navbar-nav" />
          <NavbarComp.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button
                onClick={() => {
                  setShowLogin(true);
                }}
                className="btn-light btn-sm btn-outline-danger text-red me-3 f-2 fw-bold"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  setShowRegister(true);
                }}
                className="btn-sm btn-danger text-light f-2 fw-bold"
              >
                Register
              </Button>
            </Nav>
          </NavbarComp.Collapse>
        </Container>
      </NavbarComp>

      <Login
        show={showLogin}
        handleClose={handleCloseLogin}
        switchRegister={switchRegister}
      />

      <Register
        show={showRegister}
        handleClose={handleCloseRegister}
        switchLogin={switchLogin}
      />
    </>
  );
}

export default Navbar;
