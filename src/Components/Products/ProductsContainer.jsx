/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination, Box, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import ProductCard from "./ProductCard";
import Load from "../Load/Load";
import "./ProductsContainer.css";

const ProductsContainer = () => {
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // Request all products
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        setProducts(res.data.response.docs);
      })
      .catch((err) => console.log(err))
      .finally(setLoad(false));
  }, []);

  useEffect(() => {
    // Request with params
    const url =
      search === ""
        ? `http://localhost:8080/api/products?page=${page}`
        : `http://localhost:8080/api/products?page=${page}&name=${search}`;
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data)
        setTotalPages(res.data.response.totalPages);
        setProducts(res.data.response.docs);
      })
      .catch((err) => console.log(err))
      .finally(setLoad(false));
  }, [page, search]);

  return load ? (
    <Load />
  ) : (
    <>
      <section className="productsSection">
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            marginBottom: "4rem",
          }}
        >
          <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            label="Search product"
            variant="standard"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Box>

        <h2 className="sectionTitle">Products</h2>
        <div className="productsContainer">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => handleChange(e, value)}
        />
      </section>
    </>
  );
};

export default ProductsContainer;
