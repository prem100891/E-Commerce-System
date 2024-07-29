import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./productList.css";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products?id=${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  console.log(product, "product-->");
  if (!product) {
    return <div>Loading...</div>;
  }

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
        <h1>Product Details Page</h1>
      </div>

      <div class="divider"></div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <img src={product[0].imageUrl} alt={product[0].name} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h3>Category: </h3> {product[0].categoryId}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h3>Product Name: </h3> {product[0].name}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h3>Product Description: </h3>
            {product[0].description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
