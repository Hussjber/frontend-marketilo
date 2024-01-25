import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../components/product/Product";
import ProductCarousel from "../../components/productCarousel/productCarousel";

function Home() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [normalProducts, setNormalProducts] = useState([]);
  const [genderFilter, setGenderFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = normalProducts.filter((product) => {
    return (
      (genderFilter === "all" ||
        product.gender?.toLowerCase() === genderFilter) &&
      (categoryFilter === "all" ||
        product.category?.toLowerCase() === categoryFilter)
    );
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://marketilo.onrender.com/marketilo/product"
        );
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);

        const featured = fetchedProducts.filter(
          (product) => product.isFeatured
        );
        const normal = fetchedProducts.filter((product) => !product.isFeatured);
        setFeaturedProducts(featured);
        setNormalProducts(normal);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4 page">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <ProductCarousel products={featuredProducts} />
      <hr className="my-8" />
      <h2 className="text-2xl font-bold mb-4">Explore More</h2>
      <div className="flex justify-end mb-6">
        {/* Gender Filter */}
        <div className="ml-4">
          <label className="mr-2 text-sm font-medium">Gender:</label>
          <select
            className="border border-gray-300 rounded-md p-2 text-sm"
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="all">All Genders</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="ml-4">
          <label className="mr-2 text-sm font-medium">Category:</label>
          <select
            className="border border-gray-300 rounded-md p-2 text-sm"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="shoes">Shoes</option>
            <option value="pants">Pants</option>
            <option value="shirts">Shirts</option>
            <option value="hoodie">Hoodie</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
