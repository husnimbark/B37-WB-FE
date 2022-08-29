import React, { useContext, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";
import Jumbotron from "../assets/jumbotron.png";

import Rupiah from "rupiah-format";

import Login from "../components/modal/Login";
import Register from "../components/modal/Register";


import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";

import { API } from "../config/api"; 
import cssModules from "../css/home.module.css";

export default function LandingPages() {
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

  const [state] = useContext(UserContext); // user data


  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });
  return (
    <>
      <Navbar />

      <Container>
        <img
          className="mt-5 container-lg"
          src={Jumbotron}
          alt="Jumbotron"
          style={{ cursor: "pointer" }}
        ></img>
      </Container>

      <Container className="mb-5">
      
          <h2 className="text-red fw-bold ms-5 mt-5">
            <p>Let's Order</p>
          </h2>
          <div className={cssModules.landofdown}>
            {products?.map((item, index) => (
              <div className={cssModules.card} key={index}>
                <div className={cssModules.card1}>
                  <Link
                    to={
                      state.isLogin === true ? `/detail-product/${item.id}` : ""
                    }
                    onClick={setShowLogin(true)}
                  >
                    <img
                      className={cssModules.imageP}
                      src={item.image}
                      alt="test"
                    />
                  </Link>
                  <div className={cssModules.card2}>
                    <p className={cssModules.text1}>
                      {item.title.substring(0, 17)}...
                    </p>
                    <p className={cssModules.text2}>
                      {Rupiah.convert(item.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
      </Container>
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
