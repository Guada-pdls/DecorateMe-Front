/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination, Box, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import ProductCard from "./ProductCard";
import Load from "../Load/Load";
import Swal from "sweetalert2";
import "./ProductsContainer.css";

const ProductsContainer = () => {
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState({ status: false, msg: '' })

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // Request all products
    axios
      .get("http://localhost:8080/api/products", {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      .then((res) => {
        setProducts(res.data.response.products.docs);
      })
      .catch((err) => {setError({ status: true, msg: err.message }), console.log(err)})
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
        setTotalPages(res.data.response.products.totalPages);
        setProducts(res.data.response.products.docs);
      })
      .catch((err) => setError({ status: true, msg: err.message }))
      .finally(setLoad(false));
  }, [page, search]);

  return load ? (
    <Load />
  ) : (
    error.status && Swal.fire({
      title: 'Error',
      text: 'Something went wrong, try again. If the problem persists, please contact us.',
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'Return home',
      allowOutsideClick: false,
      confirmButtonText: 'Retry',
      allowEscapeKey: false,
      footer: `Error: ${error.msg}`
    }).then(res => res.isConfirmed ? location.reload() : location.href = '/'),
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
