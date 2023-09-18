import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();
export const server = "http://localhost:4000/api/v1";

const AllContext = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState();
  const [cart, setCart] = useState([]);
  const [productEdit, setProductEdit] = useState();

  useEffect(() => {
    axios
      .get(`${server}/user/infor`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserDetail(res.data.user);
        setCart(res.data.user.cart);
        setIsLogged(true);
      })
      .catch((error) => {
        setUserDetail({});
        setIsLogged(false);
      });
    axios
      .get(`${server}/user/adminInfor`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsAdmin(true);
        setIsLogged(true);
      })
      .catch((error) => {
        setIsAdmin(false);
      });
    axios
      .get(`${server}/product/getproducts`, {
        withCredentials: true,
      })

      .then((res) => {
        setAllProducts(res.data.products);
      })
      .catch((error) => {
        setAllProducts([]);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${server}/product/getproducts?title[regex]=${search}`, {
        withCredentials: true,
      })

      .then((res) => {
        setResults(res.data.products);
      })
      .catch((error) => {
        setResults([]);
      });
  }, [search]);

  const values = {
    isLogged,
    setIsLogged,
    userDetail,
    isAdmin,
    allProducts,
    search,
    setSearch,
    results,
    setResults,
    cart,
    setCart,
    productEdit,
    setProductEdit,
  };
  return (
    <>
      <AppContext.Provider value={values}>{children}</AppContext.Provider>
    </>
  );
};

export default AllContext;
