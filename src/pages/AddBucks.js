import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

import NavbarAdmin from "../components/navbar/NavbarAdmin";

import { useNavigate } from "react-router-dom";

import API from "../config/api";
import { useMutation } from "react-query";
import SuccessAddBucks from "../components/modal/SuccessAddBucks";

export default function AddBucks() {
  const [previewName, setPreviewName] = useState("");
  const [preview, setPreview] = useState(null);

  const [showSuccessAddBucks, setShowSuccessAddBucks] = useState(false);
  const handleCloseSuccessAddBucks = () => setShowSuccessAddBucks(false);

  const [form, setForm] = useState({
    image: "",
    title: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setPreviewName(e.target.files[0].name);
    }
  };

  let navigate = useNavigate();

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("price", form.price);

      const response = await API.post("/product", formData, config);
      console.log(response);

      navigate("/transaction");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <NavbarAdmin />

      <Container>
        <div>
          <h2 className="text-danger ms-5 mt-5">Add Product</h2>
        </div>
        <div className="row">
          <div className="col ms-5 w-75">
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              <div>
                <input
                  type="text"
                  placeholder="Insert Name..."
                  onChange={handleChange}
                  name="Product Name"
                  className="form-control py-2 mt-4 f-2 border border-danger"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Input Price..."
                  onChange={handleChange}
                  name="Price"
                  className="form-control py-2 mt-4 f-2 border border-danger "
                />
              </div>
              <div>
                <input
                  type="file"
                  id="addBucksImage"
                  className="form-control py-2 mt-4 f-2 border border-danger"
                  placeholder="Select Image..."
                  onChange={handleChange}
                />
              </div>

              <Button className="mt-3 d-grid btn-danger">Add</Button>
            </Form>
          </div>
          {preview && (
            <div className="col w-25">
              <img
                src={preview}
                alt="preview"
                className="w-50 d-grid mx-auto"
              />

              <div className="text-center mt-2 fw-bold text-danger">
                {" "}
                <label
                  htmlFor="addBucksImage"
                  className={
                    previewName === "" ? "addBucksImage" : "previewName"
                  }
                >
                  {previewName === "" ? "Photo Product" : previewName}
                </label>
              </div>
            </div>
          )}
        </div>
      </Container>

      <SuccessAddBucks
        show={showSuccessAddBucks}
        handleClose={handleCloseSuccessAddBucks}
      />
    </>
  );
}
