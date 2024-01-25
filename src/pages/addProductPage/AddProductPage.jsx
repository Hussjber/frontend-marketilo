import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
// import InputField from "../../components/InputField/InputField";
import Button from "@mui/material/Button";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../../contexts/AuthContext";
import Select from "react-select";

const InputField = ({ label, type, value, onChange, error }) => (
  <div>
    <label
      className={`text-sm font-medium ${
        error ? "text-red-500" : "text-gray-700"
      }`}
    >
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange} // Directly using the passed onChange
      required
      className={`mt-1 block w-full px-3 py-2 border ${
        error ? "border-red-500" : "border-gray-300"
      } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
    />
    {error && <p className="text-red-500 text-xs italic">{error}</p>}
  </div>
);

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const { getToken } = useAuth();
  const token = getToken();

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [stockQuantity, setStockQuantity] = useState("");
  const [productImage, setProductImage] = useState(null);

  const navigate = useNavigate();
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"].map((size) => ({
    value: size,
    label: size,
  }));

  const categoryOptions = ["Shoes", "Pants", "Shirts", "Hoodie"].map(
    (category) => ({
      value: category,
      label: category,
    })
  );

  const genderOptions = ["Men", "Women", "Unisex"].map((gender) => ({
    value: gender,
    label: gender,
  }));

  // Function to handle file drop
  const onDrop = (acceptedFiles) => {
    setProductImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/jpg, image/webp",
  });

  const updateField = (setter) => (e) => {
    setter(e.target.value);
    setError({});
  };

  const sendAddProductRequest = async (data) => {
    setLoading(true);
    setError({});
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("price", productPrice);
      formData.append("description", productDescription);
      formData.append("image", productImage);
      formData.append("category", category.value);
      formData.append("gender", gender.value);
      formData.append("isFeatured", isFeatured);
      console.log(isFeatured);
      formData.append(
        "sizes",
        JSON.stringify(selectedSizes.map((size) => size.value))
      );
      formData.append("stockQuantity", stockQuantity);

      const response = await axios.post(
        "https://marketilo.onrender.com/product/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product added successfully:", response.data);
      navigate("/"); // Redirect to a relevant page after successful addition
    } catch (error) {
      console.error("Error adding product:", error);
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProductSubmit = (event) => {
    event.preventDefault();
    try {
      sendAddProductRequest({
        name: productName,
        price: productPrice,
        description: productDescription,
      });
    } catch (error) {
      if (err.response && err.response.data.errorField) {
        setError({
          message: err.response.data.message,
          field: err.response.data.errorField,
        });
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white drop-shadow-lg rounded-md">
        <form
          onSubmit={handleAddProductSubmit}
          className="flex flex-col space-y-4"
        >
          <InputField
            label="Product Name"
            type="text"
            value={productName}
            onChange={updateField(setProductName)}
            error={error.field === "title" ? error.message : null}
          />
          <InputField
            label="Price"
            type="text"
            value={productPrice}
            onChange={updateField(setProductPrice)}
            error={error.field === "price" ? error.message : null}
          />
          <InputField
            label="Description"
            type="text"
            value={productDescription}
            onChange={updateField(setProductDescription)}
            error={error.field === "description" ? error.message : null}
          />
          <Select
            placeholder="Select Category"
            name="category"
            options={categoryOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={setCategory}
          />
          <Select
            isMulti
            placeholder="Select all available sizes"
            name="sizes"
            options={sizeOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={setSelectedSizes}
          />
          <InputField
            label="Stock Quantity"
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            error={error.field === "quantity" ? error.message : null}
          />
          <Select
            placeholder="Select Gender"
            name="gender"
            options={genderOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={setGender}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                color="primary"
              />
            }
            label="Should be featured on home page"
          />
          <div
            {...getRootProps()}
            className="border-dashed border-2 border-gray-400 py-2 px-4 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            {productImage ? (
              <p>{productImage.name}</p>
            ) : (
              <p>Drag 'n' drop product image here, or click to select file</p>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              style={{
                width: "50%",
                backgroundColor: "#9c27b0",
                color: "white",
              }}
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
