// dependencies
import React from "react";
import { Modal } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useQuery } from "react-query";
import Rupiah from "rupiah-format";

// logo
import Logo from "../../assets/logo.svg";
import { API } from "../../config/api";

export default function ModalTransaction({ showTrans, close, id }) {
  let { data: transaction } = useQuery("productsCache", async () => {
    const response = await API.get("/transaction/" + id);
    console.log(response);
    return response?.data?.data;
  });

  return (
    <Modal show={showTrans} onHide={close} className="modal-transaction">
      <div className="profileCard">
        <div className="contentCardLeft">
          {transaction?.carts?.map((item, index) => (
            <div className="mapContent" key={index}>
              <img
                src={"http://localhost:5000/uploads/" + item.product.image}
                alt="coffee"
              />
              <ul>
                <li className="profileCardTitle">{item.title}</li>
                <li className="profileCardDate">
                  <strong>Saturday</strong>,20 Oktober 2022
                </li>
                <li className="profileCardToping">
                  <strong className="inline">
                    Toping :{" "}
                    {item.topping.map((topping, idx) => (
                      <span key={idx}>{topping.title},</span>
                    ))}
                  </strong>
                </li>
                <li className="profileCardPrice">
                  Price: {Rupiah.convert(item?.subtotal)}
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div
          className={
            transaction?.status === "Success"
              ? "contentCardRight Success"
              : transaction?.status === "Cancel"
              ? "contentCardRight Cancel"
              : "contentCardRight Otw"
          }
        >
          <img src={Logo} alt="logo" />
          <QRCode value="test" bgColor="transparent" size={80} />
          <span>
            <p>{transaction?.status}</p>
          </span>
          <p className="profileSubTotal">
            Sub Total : {Rupiah.convert(transaction?.total)}
          </p>
        </div>
      </div>
    </Modal>
  );
}
