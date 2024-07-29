import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./productList.css";

const ProductList = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    fetchProducts(1); // Fetch products for the first category initially
  }, []);

  const fetchProducts = (categoryId) => {
    axios
      .get(`http://localhost:3000/products?categoryId=${categoryId}`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <h1>Product Listing Page</h1>
      </div>

      <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
        <h4>Category</h4>
        <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          style={{ width: "150px" }}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div class="divider"></div>
      <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
        {products.map((product) => (
          <div key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img
                src={product.imageUrl}
                alt={product.name}
                height="250px"
                width="400px"
              />
              <h2 style={{ display: "flex", justifyContent: "center" }}>
                {product.name}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
