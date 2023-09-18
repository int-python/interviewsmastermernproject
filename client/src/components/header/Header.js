import React, { useState } from "react";

import "./Header.css";

import Logo from "../../assets/images/logo/Logo.svg";

import BasketIcon from "../../assets/images/icons/BasketIcon.svg";
import { menulist } from "../../utils/menu";
import { Button, Modal } from "react-bootstrap";
import freeIcon from "../../assets/images/icons/freeIcon.svg";

import qualityIcon from "../../assets/images/icons/qualityIcon.svg";
import returnIcon from "../../assets/images/icons/returnIcon.svg";
import timeIcon from "../../assets/images/icons/timeIcon.svg";
import androidIcon from "../../assets/images/icons/androidIcon.svg";
import iPhoneIcon from "../../assets/images/icons/iPhoneIcon.svg";

import { AiOutlineClose } from "react-icons/ai";
import useGlobalContext from "../../hooks/useGlobalContext";
import { server } from "../../context/AllContext";
import axios from "axios";

const Header = () => {
  const [register, setRegister] = useState(false);

  const { isLogged, setIsLogged, result, setSearch, cart } = useGlobalContext();

  const [loading, setLoading] = useState(false);

  const [menuTwo, setMenuTwo] = useState(menulist[0].menu);

  const [menuThree, setMenuThree] = useState(menulist[0].menu[0].menu);

  const [modalShow, setModalShow] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [submitOtp, setSubmitOtp] = useState(false);
  const [verify, setVerify] = useState({
    email: "",
    otp: "",
  });

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${server}/user/login`,
        {
          userEmail,
          userPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setIsLogged(true);
      alert(res.data.message);

      window.location.href = "/";
    } catch (err) {
      alert(err);
    }
  };

  const onRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${server}/user/register`,
        {
          userEmail,
          userPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setVerify({ ...verify, email: res.data.email });
      setSubmitOtp(true);

      // setIsLogged(true);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const onChangeVerify = (e) => {
    const { name, value } = e.target;
    setVerify({ ...verify, [name]: value });
  };

  const onSubmitVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${server}/user/verify`, {
        ...verify,
      });

      setVerify({
        email: "",
        otp: "",
      });

      setSubmitOtp(false);
      setIsLogged(true);
      setLoading(false);

      alert(res.data.message);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      setIsLogged(false);
      window.location.href = "/";
    } catch (error) {
      setIsLogged(true);
    }
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-90w"
      >
        {/* <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className="loginModal">
            <div className="loginModal_left">
              <p className="loginModal_leftHeadeing">Why choose Bigbasket?</p>
              <div className="loginModal_leftFeatures">
                <div className="loginModal_leftFeaturesRow1">
                  <img
                    src={qualityIcon}
                    alt="qualityIcon"
                    className="loginModal_leftFeaturesRow1LeftIcon"
                  />
                  <img
                    src={timeIcon}
                    alt="timeIcon"
                    className="loginModal_leftFeaturesRow1RightIcon"
                  />
                </div>
                <div className="loginModal_leftFeaturesRow2">
                  <img
                    src={returnIcon}
                    alt="returnIcon"
                    className="loginModal_leftFeaturesRow2LeftIcon"
                  />
                  <img
                    src={freeIcon}
                    alt="freeIcon"
                    className="loginModal_leftFeaturesRow2RightIcon"
                  />
                </div>
              </div>
              <hr className="hr" />
              <div className="loginModal_leftApps">
                <p className="loginModal_leftAppsHeading">Find us on</p>
                <img
                  src={androidIcon}
                  alt="androidIcon"
                  className="loginModal_leftAppsAndroid"
                />
                <img
                  src={iPhoneIcon}
                  alt="iPhoneIcon"
                  className="loginModal_leftAppsIphone"
                />
              </div>
            </div>
            <div className="loginModal_right">
              <p className="loginModal_rightHeading">
                {register ? "SignUp" : "Login"}
              </p>

              <p className="loginModal_rightSubHeading">Using OTP</p>
              <div className="hrcad" />
              {register ? (
                <span>
                  Already have a Account{" "}
                  <a href="#" onClick={() => setRegister(false)}>
                    Click Login
                  </a>
                </span>
              ) : (
                <span>
                  Dont have a Account{" "}
                  <a href="#" onClick={() => setRegister(true)}>
                    Click Register
                  </a>
                </span>
              )}

              {submitOtp ? (
                <form onSubmit={onSubmitVerify}>
                  <input
                    type="number"
                    name="otp"
                    placeholder="Enter otp"
                    value={verify.otp}
                    required
                    onChange={onChangeVerify}
                    className="loginModal_rightInput"
                  />

                  <button className="loginModal_rightButton" type="submit">
                    Verify
                  </button>
                </form>
              ) : register ? (
                <form onSubmit={onRegisterSubmit}>
                  <input
                    type="email"
                    name="email"
                    className="loginModal_rightInput"
                    placeholder="Enter Phone number/ Email Id"
                    value={userEmail}
                    required
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    name="password"
                    className="loginModal_rightInput"
                    placeholder="********"
                    value={userPassword}
                    required
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                  {loading ? (
                    <button
                      type="submit"
                      disabled
                      className="loginModal_rightButton"
                    >
                      Sending Otp ....
                    </button>
                  ) : (
                    <button type="submit" className="loginModal_rightButton">
                      Continue
                    </button>
                  )}
                </form>
              ) : (
                <form onSubmit={onLoginSubmit}>
                  <input
                    type="email"
                    name="email"
                    className="loginModal_rightInput"
                    placeholder="Enter Phone number/ Email Id"
                    value={userEmail}
                    required
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    name="password"
                    className="loginModal_rightInput"
                    placeholder="********"
                    value={userPassword}
                    required
                    onChange={(e) => setUserPassword(e.target.value)}
                  />

                  <button type="submit" className="loginModal_rightButton">
                    Continue
                  </button>
                </form>
              )}
              <p className="loginModal_rightTerms">
                By continuing, I accept TCP -{" "}
                <a href="/">bigbasket’s Terms and Conditions</a> &{" "}
                <a href="/">Privacy Policy</a>
              </p>
            </div>
          </div>
          <AiOutlineClose onClick={props.onHide} className="close-icon" />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img src={Logo} alt="Logo " />
        </a>
        <div className="vr mx-2" />

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto flex-grow-1 ">
            <li className="nav-item dropdown ">
              <a
                className="nav-link dropButton"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>
                  <span className="dropspantexttop">Shop by</span>
                  <br />
                  <span className="fw-bold dropspantextbottom">Category</span>
                </span>
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="CategoryMenu___StyledArrowDown-sc-d3svbp-3 iwTeGC"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 11.333c-.338 0-.66-.155-.884-.428l-2.81-3.398a1.39 1.39 0 0 1-.172-1.474c.204-.432.608-.7 1.057-.7h5.617c.449 0 .854.268 1.057.7a1.39 1.39 0 0 1-.172 1.473l-2.81 3.4a1.146 1.146 0 0 1-.883.427Z"
                    fill="#fff"
                  ></path>
                </svg>
              </a>
              <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                <div className="mainmenu">
                  <div className="menuone">
                    {menulist.map((item, ind) => (
                      <a
                        onMouseEnter={() => {
                          setMenuTwo(item.menu);
                        }}
                        key={ind}
                        className="dropdown-item"
                        href={item.link}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="menutwo">
                    {menuTwo.map((item, ind) => (
                      <a
                        onMouseEnter={() => setMenuThree(item.menu)}
                        key={ind}
                        className="dropdown-item"
                        href={item.link}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="menuthree">
                    {menuThree.map((item, ind) => (
                      <a key={ind} className="dropdown-item" href={item}>
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item flex-grow-1 ">
              <input
                className="form-control searchbox mr-sm-2"
                type="search"
                placeholder="Search for Products..."
                aria-label="Search"
                onChange={(e) => {
                  setSearch(e.target.value.toLowerCase());
                }}
              />
            </li>
          </ul>
          <div className="vr mx-3" />
          <form className="form-inline my-2 my-lg-0">
            {isLogged ? (
              <button onClick={logoutHandler} className="cartbutton">
                <img src={BasketIcon} alt="basket-icon" />
                <span>{cart.length} Items</span>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setModalShow(true);
                }}
                className="cartbutton"
              >
                {/* <img src={BasketIcon} alt="basket-icon" /> */}
                <span>Login</span>
              </button>
            )}
          </form>
        </div>
      </nav>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default Header;
