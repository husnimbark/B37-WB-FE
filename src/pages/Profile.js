import React, {useContext} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import profile from "../assets/user-profile.webp";
import Logo from "../assets/logo.svg";

import QRCode from "../assets/barcode.png";
import NavbarUser from "../components/navbar/NavbarUser";
import Rupiah from "rupiah-format";

import { UserContext } from "../context/UserContext";
import { API } from "../config/api";
import { useQuery } from "react-query";

export default function Profile() {

  const [state] = useContext(UserContext);

  let { data: ProfileTransactions } = useQuery(
    "transactionsCache",
    async () => {
      const response = await API.get("/user-transaction");
      return response.data.data;
    }
  );

  let { data: Profile, refetch } = useQuery("profileCache", async () => {
    const response = await API.get("/user-profile");
    console.log(response);

    return response.data.data.profile;
  });

  return (
    <>
      <NavbarUser />
      <Container className="my-5 pe-5">
        <Row>
          <Col className="ps-5 p-2">
            <Row>
              <Col>
                <h2 className="text-start text-danger fw-bold mb-5">
                  My Profile
                </h2>
                <img
                  src={profile}
                  style={{ width: "100%", borderRadius: "8px" }}
                  className=""
                  alt="Profil"
                />

             <Button className="mt-3 d-grid mx-auto btn-danger">Edit Profile</Button>
               
              </Col>
              <Col className="pt-5 mt-5">
                <div>
                  <h5
                    className="text-start fw-semibold fs-5"
                    style={{ color: "#613D2B" }}
                  >
                    Full Name
                  </h5>
                  <h4 className="text-start fw-normal fs-5">{state.user.name}</h4>
                </div>
                <div>
                  <h4
                    className="text-start fw-semibold fs-5"
                    style={{ color: "#613D2B" }}
                  >
                    Email
                  </h4>
                  <h4 className="text-start fw-normal fs-5">
                  {state.user.email}
                  </h4>
                </div>
                <div>
                  <h4
                    className="text-start fw-semibold fs-5"
                    style={{ color: "#613D2B" }}
                  >
                    Adress
                  </h4>
                  <h4 className="text-start fw-normal fs-5">
                  {Profile?.address}
                  </h4>
                </div>
                <div>
                  <h4
                    className="text-start fw-semibold fs-5"
                    style={{ color: "#613D2B" }}
                  >
                    Postal Code
                  </h4>
                  <h4 className="text-start fw-normal fs-5">
                  {Profile?.postal_code}
                  </h4>
                </div>
              </Col>
            </Row>
          </Col>


          <Col className="">
            <div>
              <h2 className="text-dark fw-bold mb-5">My Transaction</h2>
            </div>

            {ProfileTransactions?.map((item, index) => (
            <div
              className={item?.status === "" ? "fd" : "profileCard mb-5"}
              key={index}
            >
              <div className="contentCardLeft">
                {item?.carts?.map((cart, idx) => (
                  <div className="mapContent" key={idx}>
                    <img
                      src={
                        "http://localhost:5000/uploads/" + cart?.product?.image
                      }
                      alt="coffee"
                    />
                    <ul>
                      <li className="profileCardTitle">
                        {cart?.product?.title}
                      </li>
                      <li className="profileCardDate">
                        <strong>Saturday</strong>,20 Oktober 2022
                      </li>
                      <li className="profileCardToping">
                        <strong className="inline">
                          Toping :{" "}
                          {cart.topping.map((topping, idx) => (
                            <span key={idx}>{topping?.title},</span>
                          ))}
                        </strong>
                      </li>
                      <li className="profileCardPrice">
                        Price: {Rupiah.convert(cart?.product?.price)}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
              <div
                className={
                  item?.status === "Success"
                    ? "contentCardRight Success"
                    : item?.status === "Cancel"
                    ? "contentCardRight Cancel"
                    : item?.status === "pending"
                    ? "contentCardRight Pending"
                    : "contentCardRight Otw"
                }
              >
                <img src={Logo} alt="logo" />

                <QRCode value="git re" bgColor="transparent" size={80} />
                <span>
                  <p>{item?.status}</p>
                </span>
                <p className="profileSubTotal">
                  Sub Total : {Rupiah.convert(item?.total)}
                </p>
              </div>
            </div>
          ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}
