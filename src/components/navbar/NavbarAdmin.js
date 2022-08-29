import React, { useContext } from "react";
import {
  Container,
  Navbar as NavbarComp,
  Nav,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import BucksLogo from "../../assets/logo.svg";
import BlankProfile from "../../assets/blank-profile.jpeg";
import TransactionIcon from "../../assets/Icon/wallet.svg";
import LogoutIcon from "../../assets/Icon/door-closed.svg";
import ToppingIcon from "../../assets/Icon/plus-circle.svg";
import BucksIcon from "../../assets/Icon/cup-straw.svg";

import { UserContext } from "../../context/UserContext";

function NavbarUser(addCart, props) {
  const [_, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const Logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <NavbarComp expand="lg">
      <Container>
        <NavbarComp.Brand as={Link} to="/transaction">
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
            <NavDropdown
              align="end"
              className="rounded"
              eventkey={1}
              title={
                <div className="ms-auto f-2 border border-2 border-danger ps-2 rounded-pill bg-red text-light fw-bold py-1">
                  Admin
                  <img
                    className="rounded-circle border border-3 ms-2 me-2"
                    style={{ width: "35px", height: "35px" }}
                    src={BlankProfile}
                    alt="UserPic"
                  />
                </div>
              }
            >
              <Nav.Link
                as={Link}
                to="/transaction"
                className={
                  props?.title === "Profile"
                    ? `text-navbar-active`
                    : `text-navbar`
                }
              >
                <img
                  src={TransactionIcon}
                  style={{ width: "20px", height: "20px" }}
                  className="me-3 ms-2"
                />
                Transaction
              </Nav.Link>

              <Dropdown.Divider />

              <Nav.Link
                as={Link}
                to="/add-bucks"
                className={
                  props?.title === "Profile"
                    ? `text-navbar-active`
                    : `text-navbar`
                }
              >
                <img
                  src={BucksIcon}
                  style={{ width: "25px", height: "25px" }}
                  className="me-3 ms-1"
                />
                Add Product
              </Nav.Link>

              <Dropdown.Divider />

              <Nav.Link
                as={Link}
                to="/add-topping"
                className={
                  props?.title === "Profile"
                    ? `text-navbar-active`
                    : `text-navbar`
                }
              >
                <img
                  src={ToppingIcon}
                  style={{ width: "20px", height: "20px" }}
                  className="me-3 ms-2"
                />
                Add Topping
              </Nav.Link>

              <Dropdown.Divider />
              <Nav.Link onClick={Logout} className="text-navbar" onSelect>
                <img
                  src={LogoutIcon}
                  style={{ width: "25px", height: "25px" }}
                  className="me-3 ps-1 ms-1"
                />
                 Logout
              </Nav.Link>
            </NavDropdown>
          </Nav>
        </NavbarComp.Collapse>
      </Container>
    </NavbarComp>
  );
}

export default NavbarUser;
