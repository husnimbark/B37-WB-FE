import React, {useState} from "react";

import NavbarAdmin from "../components/navbar/NavbarAdmin";


import { Container, Table  , Modal} from "react-bootstrap";
import { useQuery } from "react-query";
import Rupiah from "rupiah-format";


import ModalTransaction from "../components/modal/ModalTransaction";

import { API } from "../config/api";

export default function Transaction() {

  const [showTrans, setShowTrans] = useState(false);
  const [idOrder, setIdOrder] = useState(null);

  const handleShow = (id) => {
    setIdOrder(id);
    setShowTrans(true);
  };
  const handleClose = () => setShowTrans(false);

  // Fetching product data from database
  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  console.log(transactions);

  return (
    <>
      <NavbarAdmin />
      <Container  lg className="ps-5 mt-5">
        <h1>Income Transaction</h1>
        <div>
          <Table hover className="mt-4">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Address</th>
                <th>Post Code</th>
                <th>Income</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((item, index) => (
                <tr
                  onClick={() => handleShow(item?.id)}
                  key={index}
                  className={item.status === "" ? "fd" : ""}
                >
                  <td>{index + 1}</td>
                  <td>{item?.user.name}</td>
                  <td>{item?.user.profile?.address}</td>
                  <td>{item?.user.profile?.postal_code}</td>
                  <td className="tablePrice">{Rupiah.convert(item?.total)}</td>
                  <td
                    className={
                      item?.status === "Success"
                        ? "tableSuccess"
                        : item?.status === "Cancel"
                        ? "tableCancel"
                        : item?.status === "pending"
                        ? "tableWaiting"
                        : "tableOtw"
                    }
                  >
                    {item?.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <ModalTransaction
          showTrans={showTrans}
          close={handleClose}
          id={idOrder}
        />
      </Container>
    </>
  );
}
