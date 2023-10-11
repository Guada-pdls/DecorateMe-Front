/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination, Box, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import ProductCard from "./ProductCard";
import Load from "../Load";
import Swal from "sweetalert2";
import CustomButton from "../CustomButton";

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
      .get("https://decorateme.onrender.com/api/products", {
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
        ? `https://decorateme.onrender.com/api/products?page=${page}`
        : `https://decorateme.onrender.com/api/products?page=${page}&name=${search}`;
    axios
      .get(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
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
      <Box component='section' sx={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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

        <Typography sx={{ textAlign: 'center', marginBottom: '10px' }} variant="h5">Products</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Box>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => handleChange(e, value)}
          sx={{
            margin: '2rem',
            paddingTop: '1rem'
          }}
        />
      </Box>
      <CustomButton text='Add new product' url='https://decorate-me-front.vercel.app/new-product'></CustomButton>
      <CustomButton text='Go to chat' url='https://decorate-me-front.vercel.app/chat'></CustomButton>
      <CustomButton text='Manage users' url='https://decorate-me-front.vercel.app/users'></CustomButton>
    </>
  );
};

export default ProductsContainer;
