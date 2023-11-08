import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import UploadFileButton from "../UploadFileButton";

const NewProduct = () => {

  const { user, newProduct } = useContext(UserContext)

  const [file, setFile] = useState()

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      formData.append('thumbnail', file)

      const res = await newProduct(formData)

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
            window.location.href = "https://decorate-me-front.vercel.app/products";
          }
        });
      }
    } catch (err) {
      Swal.fire('Error', err.response.data.error, 'error')
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
            <TextField name="name" required variant="standard" label="Name" />
            <TextField name="description" required variant="standard" label="Description" />
            <FormControl required variant="standard">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                label="Category"
                defaultValue={'Accessories'}
              >
                <MenuItem value={'Accessories'}>Accessories</MenuItem>
                <MenuItem value={'Art'}>Art</MenuItem>
                <MenuItem value={'Furniture'}>Furniture</MenuItem>
                <MenuItem value={'Lightning'}>Lightning</MenuItem>
                <MenuItem value={'Nature'}>Nature</MenuItem>
                <MenuItem value={'Textile'}>Textile</MenuItem>
                <MenuItem value={'Wall Deco'}>Wall Deco</MenuItem>
              </Select>
            </FormControl>
            <TextField name="price" required variant="standard" label="Price" />
            <TextField name="stock" variant="standard" label="Stock" />
            <UploadFileButton setFile={setFile} name='thumbnail'/>
            <Button variant="contained" type="submit" sx={{
              padding: '.5rem 1rem',
              backgroundColor: 'wheat',
              fontWeight: 'bold',
              color: '#000',
              '&:hover': {
                backgroundColor: '#000',
                color: '#fff'
              }
            }}
              > Create</Button>
        </Box>
    </>
        : <Typography variant="subtitle">Not Authorized</Typography>}
    </Box >
  );
};

export default NewProduct;
