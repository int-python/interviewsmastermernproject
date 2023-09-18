import React, { useState } from "react";
import "./ProductCard.css";
import Prod1 from "../../assets/images/productImg/Prod1.jpg";
import { TbTruckDelivery } from "react-icons/tb";
import { FiBookmark, FiEdit } from "react-icons/fi";
import { server } from "../../context/AllContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import axios from "axios";

const ProductCard = ({ product }) => {
  const { isLogged, cart, setCart, isAdmin, setProductEdit } =
    useGlobalContext();

  const [prodQuantityInCart, setProdQuantityInCart] = useState(1);

  const [btnControler, setBtnControler] = useState(false);

  const addToCart = async (cart) => {
    await axios.patch(
      `${server}/user/addcart`,
      { cart },
      {
        withCredentials: true,
      }
    );
  };

  const increament = () => {
    cart.forEach((item) => {
      if (item.product_id === product._id) {
        item.quantity += 1;
        setProdQuantityInCart((prevState) => prevState + 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decreament = () => {
    cart.forEach((item) => {
      if (item.product_id === product._id) {
        if (item.quantity === 1) {
          item.quantity = 1;
        }
        item.quantity -= 1;
        setProdQuantityInCart((prevState) => prevState - 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const addToCarthandle = async () => {
    if (!isLogged) return alert("Please Log In to coninue buying");

    setBtnControler(true);

    const check = cart.every((item) => {
      return item.product_id !== product._id;
    });
    if (check) {
      setCart([...cart, { product_id: product._id, quantity: 1 }]);

      try {
        const { data } = await axios.patch(
          `${server}/user/addcart`,
          { cart: [...cart, { product_id: product._id, quantity: 1 }] },
          {
            withCredentials: true,
          }
        );

        alert(data.message);
      } catch (error) {
        alert(error);
      }
    } else {
      alert("This Product has been added to cart.");
    }
  };

  const Deletehandle = async () => {
    if (!isAdmin) return alert("you are not admin");

    try {
      const { data } = await axios.delete(
        `${server}/product/deleteproduct/${product._id}`,
        {
          withCredentials: true,
        }
      );

      alert(data.message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="productCard">
      <div className="top">
        <div className="productCard_imageDiv">
          {/* <img src={Prod1} alt="" className="productCard_imageDivimage" /> */}
          <img
            src={
              `data:${product.images[0].contentType};base64,` +
              product.images[0].imageBase64
            }
            alt={product.title}
            className="productCard_imageDivimage"
          />
          <span className="productCard_imageDivOffTag">
            {product.offPer}% OFF
          </span>
        </div>
      </div>
      <div className="productCard_dilTime">
        <TbTruckDelivery style={{ color: "#000" }} /> 1 day
      </div>
      <p className="productCard_tag">{product.category}</p>
      <p className="productCard_Name">{product.title}</p>

      <select className="productCard_weight">
        <option name="100 g" id="">
          100 g
        </option>
      </select>
      <p className="productCard_price">
        ₹{product.dissPrice} <span>₹{product.price}</span>
      </p>

      <select className="productCard_coupon">
        <option name="Har Din Sasta!" id="">
          Har Din Sasta!
        </option>
      </select>

      <div className="productCard_actionDiv">
        <div className="productCard_actionDivBookmark">
          {isAdmin ? (
            <FiEdit onClick={() => setProductEdit(product._id)} />
          ) : (
            <FiBookmark />
          )}
        </div>
        {btnControler ? (
          <div className="productCard_actionDivAddButtonGroup">
            <button
              className="productCard_actionDivAddButtonGroupDecrButton"
              onClick={decreament}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="CtaOnDeck___StyledMinusIcon-sc-orwifk-10 ckmNho"
              >
                <path d="M19 13H5C4.448 13 4 12.553 4 12C4 11.447 4.448 11 5 11H19C19.553 11 20 11.447 20 12C20 12.553 19.553 13 19 13Z"></path>
              </svg>
            </button>
            <span className="productCard_actionDivAddButtonGroupWuantity">
              {prodQuantityInCart}
            </span>
            <button
              className="productCard_actionDivAddButtonGroupIncrButton"
              onClick={increament}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="CtaOnDeck___StyledPlusIcon-sc-orwifk-13 krEvtt"
              >
                <path d="M19 11H13V5C13 4.447 12.552 4 12 4C11.448 4 11 4.447 11 5V11H5C4.448 11 4 11.447 4 12C4 12.553 4.448 13 5 13H11V19C11 19.553 11.448 20 12 20C12.552 20 13 19.553 13 19V13H19C19.552 13 20 12.553 20 12C20 11.447 19.552 11 19 11Z"></path>
              </svg>
            </button>
          </div>
        ) : isAdmin ? (
          <div>
            <button
              className="productCard_actionDivAddButton"
              onClick={Deletehandle}
            >
              Delete
            </button>
          </div>
        ) : (
          <div>
            <button
              className="productCard_actionDivAddButton"
              onClick={addToCarthandle}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
