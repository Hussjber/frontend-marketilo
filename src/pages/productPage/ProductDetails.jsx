import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import "./ProductDetails.css";
import axios from "axios";
import { CartContext } from "../../contexts/CartContext";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitPreference, setFitPreference] = useState(3);
  const [recommendedSize, setRecommendedSize] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");

  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

  const recommendSize = () => {
    if (!height || !weight || height < 150 || weight < 40)
      return alert("Please enter a valid height and weight");
    const calculateBMI = (height, weight) => {
      const heightInMeters = height / 100;
      return weight / heightInMeters ** 2;
    };

    const bmiToWeightCategory = (bmi) => {
      if (bmi < 18.5) return "underweight";
      if (bmi >= 18.5 && bmi < 25) return "normal";
      if (bmi >= 25 && bmi < 30) return "overweight";
      return "obese";
    };

    const heightToSize = (height) => {
      if (height < 160) return "XS";
      if (height >= 160 && height < 170) return "S";
      if (height >= 170 && height < 180) return "M";
      if (height >= 180 && height < 190) return "L";
      if (height >= 190 && height < 200) return "XL";
      return "XXL";
    };

    const bmi = calculateBMI(height, weight);
    const weightCategory = bmiToWeightCategory(bmi);
    let sizeIndex = sizeOrder.indexOf(heightToSize(height));

    if (weightCategory === "overweight" || weightCategory === "obese") {
      sizeIndex = Math.min(sizeOrder.length - 1, sizeIndex + 1);
    }

    const fitAdjustment = fitPreference - 3;
    const finalIndex = Math.max(
      0,
      Math.min(sizeOrder.length - 1, sizeIndex + fitAdjustment)
    );
    setRecommendedSize(sizeOrder[finalIndex]);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://marketilo.onrender.com/product/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="product-container page">
      {product ? (
        <div className="product-content">
          <div className="product-image-container">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              style={{ width: "100%" }}
            />
          </div>
          <div className="product-info-container">
            <h2 className="product-title">{product.name}</h2>
            <Box
              style={{ float: "left", marginRight: "20px" }}
              component="fieldset"
              mb={2}
              borderColor="transparent"
            >
              <Rating
                name="product-rating"
                value={product.rating || 0}
                precision={0.1}
                readOnly
              />
            </Box>
            <p className="product-price">${product.price}</p>

            <div className="product-description">
              <h3 style={{ fontWeight: 500 }}>Product description:</h3>
              {product.description}
            </div>
          </div>
          <div style={{ flexBasis: "50%" }}></div>
          <div className="mob-product-description">
            <h3 style={{ fontWeight: 500 }}>Product description:</h3>
            {product.description}
          </div>
          <div className="buttons-container">
            <Button
              variant="contained"
              style={{
                width: "50%",
                backgroundColor: "#9c27b0",
                color: "white",
              }}
              onClick={() =>
                addToCart({
                  _id: product._id,
                  name: product.name,
                  image: product.image,
                  title: product.title,
                  price: product.price,
                })
              }
            >
              Add to cart
            </Button>
            <Button
              variant="outlined"
              style={{ width: "50%", borderColor: "#9c27b0", color: "#9c27b0" }}
              onClick={() => setIsModalOpen(true)}
            >
              Please select your size
            </Button>
          </div>
          {isModalOpen && (
            <div
              className={`fixed inset-0 z-50 overflow-auto bg-smoke-light flex ${
                !isModalOpen && "hidden"
              }`}
            >
              <div className="fixed inset-0 z-40 bg-black opacity-50"></div>

              <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg z-50 shadow-lg">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Select Size:
                      <select
                        className="form-select mt-1 block w-full"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                      >
                        {sizeOrder.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="relative flex items-center my-4">
                    <div className="flex-grow separator-line"></div>
                    <span
                      style={{ margin: "0 3px 0 3px" }}
                      className="flex-shrink mx-4 separator-text"
                    >
                      OR
                    </span>
                    <div className="flex-grow separator-line"></div>
                  </div>

                  <h2 className="text-lg font-bold mb-4">
                    Size Recommendation Tool
                  </h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Height (cm):
                      <input
                        type="number"
                        required
                        min={0}
                        className="form-input mt-1 block w-full"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Weight (kg):
                      <input
                        type="number"
                        required
                        min={0}
                        className="form-input mt-1 block w-full"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Fit Preference:
                      <input
                        type="range"
                        min="1"
                        max="5"
                        className="form-range mt-1 block w-full"
                        value={fitPreference}
                        onChange={(e) =>
                          setFitPreference(Number(e.target.value))
                        }
                      />
                    </label>
                    <div
                      style={{ justifyContent: "space-between" }}
                      className="flex mt-1"
                    >
                      <span
                        className={`fs-12 ${
                          fitPreference === 1
                            ? "text-blue-600 font-semibold"
                            : "text-gray-600"
                        }`}
                      >
                        Tighter
                      </span>
                      <span
                        className={`fs-12 ${
                          fitPreference === 2
                            ? "text-blue-600 font-semibold"
                            : "text-gray-600"
                        }`}
                      >
                        Slightly tighter
                      </span>
                      <span
                        className={`fs-12 ${
                          fitPreference === 3
                            ? "text-blue-600 font-semibold"
                            : "text-gray-600"
                        }`}
                      >
                        Perfect fit
                      </span>
                      <span
                        className={`fs-12 ${
                          fitPreference === 4
                            ? "text-blue-600 font-semibold"
                            : "text-gray-600"
                        }`}
                      >
                        Slightly looser
                      </span>
                      <span
                        className={`fs-12 ${
                          fitPreference === 5
                            ? "text-blue-600 font-semibold"
                            : "text-gray-600"
                        }`}
                      >
                        Looser
                      </span>
                    </div>
                  </div>
                  <button
                    style={{
                      width: "100%",
                      backgroundColor: "#9c27b0",
                      color: "white",
                    }}
                    className="px-4 py-2 rounded hover:bg-purple-600 focus:outline-none focus:bg-purple-700"
                    onClick={recommendSize}
                  >
                    Find My Size!
                  </button>
                  {recommendedSize && (
                    <div className="mt-4 font-semibold">
                      Recommended Size: {recommendedSize}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-0 right-0 mt-4 mr-4"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
}

export default ProductDetails;
