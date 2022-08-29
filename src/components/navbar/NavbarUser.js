import React, { useContext } from "react";
import {
  Container,
  Navbar as NavbarComp,
  Nav,
  NavDropdown,
  Dropdown
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import BucksLogo from "../../assets/logo.svg";
import BlankProfile from "../../assets/blank-profile.jpeg";
import CartIcon from "../../assets/Icon/cart.svg";
import UserIcon from "../../assets/Icon/person-check-fill.svg";
import LogoutIcon from "../../assets/Icon/door-closed.svg";

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
        <NavbarComp.Brand as={Link} to="/homepage">
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
            <Nav.Link
              as={Link}
              to="/cart"
              className={
                props?.title === "Cart" ? `text-navbar-active` : `text-navbar`
              }
            >
              <img
                className="mt-2"
                src={CartIcon}
                alt="cart"
                style={{ width: "24px", height: "28px" }}
              ></img>
            </Nav.Link>

            <NavDropdown
              align="end"
              className="rounded"
              eventkey={1}
              title={
                <div className="ms-auto f-2 border border-2 border-danger ps-2 rounded-pill bg-red text-light fw-bold py-1">
                  User
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
                  to="/profile"
                  className={
                    props?.title === "Profile"
                      ? `text-navbar-active`
                      : `text-navbar`
                  }
                >
                  <img
                    src={UserIcon}
                    style={{ width: "25px", height: "25px" }}
                    className="me-3 ms-2"
                  />
                  Profile
                </Nav.Link>
        
                <Dropdown.Divider />
                <Nav.Link onClick={Logout} className="text-navbar" onSelect>
                  <img
                    src={LogoutIcon}
                    style={{ width: "25px", height: "25px" }}
                    className="me-3 pe-1 ms-2"
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
