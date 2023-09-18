import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import { server } from "../../context/AllContext";
import axios from "axios";
import useGlobalContext from "../../hooks/useGlobalContext";

const AddProduct = () => {
  const { productEdit, allProducts } = useGlobalContext();

  const [loading, setLoading] = useState(false);
  const [titleImg, setTitleImg] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [dissPrice, setDissPrice] = useState("");
  const [offPer, setOffPer] = useState("");
  const [category, setCategory] = useState("");

  const [pTitleImg, setPTitleImg] = useState("");

  const [prodeditdata] = allProducts.filter((item) => item._id === productEdit);

  useEffect(() => {
    if (prodeditdata) {
      setTitle(prodeditdata.title);
      setPrice(prodeditdata.price);
      setDissPrice(prodeditdata.dissPrice);
      setOffPer(prodeditdata.offPer);
      setCategory(prodeditdata.category);
    }
  }, [prodeditdata]);

  const titleImgHndl = (e) => {
    const file = e.target.files;
    const filearr = Array.from(file);
    const imgarr = filearr.map((file) => {
      return URL.createObjectURL(file);
    });
    setPTitleImg(imgarr);

    const img = e.target.files[0];

    setTitleImg(img);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("productImg", titleImg);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("dissPrice", dissPrice);
    formData.append("offPer", offPer);
    formData.append("category", category);

    try {
      const { data } = await axios.post(
        `${server}/product/createProducts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      alert(data.message);
      window.location.href = "/";
    } catch (error) {
      alert(error);
    }
  };
  const submitEditHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("productImg", titleImg);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("dissPrice", dissPrice);
    formData.append("offPer", offPer);
    formData.append("category", category);

    try {
      const { data } = await axios.put(
        `${server}/product/updateproduct/${productEdit}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      alert(data.message);
      window.location.href = "/";
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="addProduct">
      {productEdit ? (
        <form
          className="row"
          onSubmit={submitEditHandler}
          encType="multipart/form-data"
        >
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Title Image</label>
          <input
            type="file"
            name="productImg"
            onChange={titleImgHndl}
            accept="image/*"
          />

          {titleImg === "" || titleImg === null ? (
            ""
          ) : (
            <div>
              <img src={pTitleImg} />
              <button className="imgdelt" onClick={() => setTitleImg("")}>
                X
              </button>
            </div>
          )}

          <label>price</label>
          <input
            type="number"
            className="cs-form_field"
            required
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label>dissPrice</label>
          <input
            type="number"
            className="cs-form_field"
            required
            placeholder="dissPrice"
            value={dissPrice}
            onChange={(e) => setDissPrice(e.target.value)}
          />

          <label>offPer</label>
          <input
            type="number"
            className="cs-form_field"
            required
            placeholder="offPer"
            value={offPer}
            onChange={(e) => setOffPer(e.target.value)}
          />
          <label>category</label>
          <input
            type="text"
            className="cs-form_field"
            required
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <div>
            <button disabled={loading} type="submit">
              <span>Edit Project</span>
            </button>
          </div>
        </form>
      ) : (
        <form
          className="row"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Title Image</label>
          <input
            type="file"
            name="productImg"
            onChange={titleImgHndl}
            accept="image/*"
          />

          {titleImg === "" || titleImg === null ? (
            ""
          ) : (
            <div>
              <img src={pTitleImg} />
              <button className="imgdelt" onClick={() => setTitleImg("")}>
                X
              </button>
            </div>
          )}

          <label>price</label>
          <input
            type="number"
            className="cs-form_field"
            required
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label>dissPrice</label>
          <input
            type="number"
            className="cs-form_field"
            required
            placeholder="dissPrice"
            value={dissPrice}
            onChange={(e) => setDissPrice(e.target.value)}
          />

          <label>offPer</label>
          <input
            type="number"
            className="cs-form_field"
            required
            placeholder="offPer"
            value={offPer}
            onChange={(e) => setOffPer(e.target.value)}
          />
          <label>category</label>
          <input
            type="text"
            className="cs-form_field"
            required
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <div>
            <button disabled={loading} type="submit">
              <span>Add Project</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
