import React, { useContext, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import NavbarUser from "../components/navbar/NavbarUser";
import Jumbotron from "../assets/jumbotron.png";

import Rupiah from "rupiah-format";


import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";

import { API } from "../config/api";
import cssModules from "../css/home.module.css";

export default function HomePage() {
  const [showAddItem, setShowAddItem] = useState(false);

  const handleCloseAddItem = () => setShowAddItem(false);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(true);

  const [state] = useContext(UserContext);

  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  return (
    <>
      <NavbarUser />

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
                  onClick={state.isLogin === false ? handleClick : ""}
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
    </>
  );
}
