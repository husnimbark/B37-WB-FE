import React, { useState } from "react";
import { useMutation } from "react-query";
import { Button, Container, Form } from "react-bootstrap";

import NavbarAdmin from "../components/navbar/NavbarAdmin";

import API from "../config/api";

import SuccessAddTopping from "../components/modal/SuccessAddTopping";

export default function AddBucks() {
  const [previewName, setPreviewName] = useState("");
  const [preview, setPreview] = useState(null);

  const [showSuccessAddTopping, setShowSuccessAddTopping] = useState(false);
  const handleCloseSuccessAddTopping = () => setShowSuccessAddTopping(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
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

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();

      formData.set("title", form.title);
      formData.set("price", form.price);
      formData.set("image", form.image[0], form.image[0].name);

      const response = await API.post("/topping", formData, config);

      setShowSuccessAddTopping(true);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <NavbarAdmin />
      <SuccessAddTopping
        show={showSuccessAddTopping}
        handleClose={handleCloseSuccessAddTopping}
      />
      <Container>
        <div>
          <h2 className="text-danger ms-5 mt-5">Add Topping</h2>
        </div>
        <div className="row">
          <div className="col ms-5 w-75">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
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
                  name="image"
                  onChange={handleChange}
                />
              </div>

              <Button className="mt-3 d-grid btn-danger" type="submit">
                Add
              </Button>
            </form>
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
    </>
  );
}
