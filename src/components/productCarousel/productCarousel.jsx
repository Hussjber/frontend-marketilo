import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./productCarousel.css";
import { Link } from "react-router-dom";

const ProductCarousel = ({ products }) => {
  const settings = {
    dots: true,
    infinite: products.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <div className="carousel-item" key={product._id}>
          <img
            src={product.image}
            alt={product.description}
            className="carousel-image"
          />
          <Link to={`/product/${product._id}`} key={product._id}>
            <div className="product-info">
              <div className="text-sm capitalize text-gray-500 mb-1">
                {product.gender}
              </div>
              <div className="font-semibold mb-1 text-sm ">{product.name}</div>
              <h2 className="font-semibold">₪{product.price}</h2>
            </div>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default ProductCarousel;
