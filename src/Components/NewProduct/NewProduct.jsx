import Swal from "sweetalert2";
import "./NewProduct.css";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

const NewProduct = () => {

  const { user } = useContext(UserContext)

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const res = await axios.post('http://localhost:8080/api/products', {
        name: formData.get("name"),
        description: formData.get("description"),
        category: formData.get("category"),
        price: formData.get("price"),
        thumbnail: formData.get('thumbnail'),
        stock: formData.get('stock')
      }, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      if (res.status === 201) {
        Swal.fire({
          title: "Product created successfully",
          icon: "success",
          allowEscapeKey: false,
          allowOutsideClick: false,
          confirmButtonText: "Go to products",
        }).then((res) => {
          if (res.isConfirmed) {
            e.target.reset();
            window.location.href = "http://localhost:5173/products";
          }
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: `Error ${err.response.data.status}: ${err.response.data.response}`,
        icon: "error",
      });
    }
  };

  return (
    <Box sx={{
      textAlign: 'center',
      marginTop: '24px',
    }}>
      {user?.role === "admin" || user?.role === "premium" ?
        <>
          <Typography variant="h5" >Create new product</Typography>
          <Box component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              marginX: "auto",
              maxWidth: "33vw",
              gap: '1rem'
            }}
            onSubmit={(e) => submitHandler(e)}
            action="http://localhost:8080/api/products"
            method="POST"
          >
            <TextField required variant="standard" label="Name" />
            <TextField required variant="standard" label="Description" />
            <FormControl required variant="standard">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
              >
                <MenuItem value={'Lightning'}>Lightning</MenuItem>
                <MenuItem value={'Wall Deco'}>Wall Deco</MenuItem>
                <MenuItem value={'Accessories'}>Accessories</MenuItem>
                <MenuItem value={'Textile'}>Textile</MenuItem>
                <MenuItem value={'Art'}>Art</MenuItem>
                <MenuItem value={'Nature'}>Nature</MenuItem>
                <MenuItem value={'Furniture'}>Furniture</MenuItem>
              </Select>
            </FormControl>
            <TextField required variant="standard" label="Price" />
            <TextField variant="standard" label="Stock" />
            <TextField required variant="standard" label="Image" />
            <Button variant="contained" type="submit">Create</Button>
          </Box>
        </>
        : <Typography variant="subtitle">Not Authorized</Typography>}
    </Box>
  );
};

export default NewProduct;
