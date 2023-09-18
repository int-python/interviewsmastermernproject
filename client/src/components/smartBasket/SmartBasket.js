import React from "react";
import "./SmartBasket.css";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductCard from "../productCard/ProductCard";

const SmartBasket = ({ heading, products }) => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={`${className} nextbutton`} onClick={onClick}>
        <IoIosArrowForward />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={`${className} prebutton`} onClick={onClick}>
        <IoIosArrowBack />
      </div>
    );
  }

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!products) return null;

  return (
    <div className="smartBasket">
      <div className="smartBasket_head">
        <div className="smartBasket_headLeft">
          <p className="smartBasket_headLeftHeading">{heading}</p>
        </div>
        <div className="smartBasket_headRight">
          <a className="smartBasket_headRightShowMore" href="/">
            Show More
          </a>
        </div>
      </div>
      <div className="smartBasket_items">
        <Slider {...settings}>
          {products.map((item) => (
            <div key={item.id}>
              <ProductCard product={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SmartBasket;
