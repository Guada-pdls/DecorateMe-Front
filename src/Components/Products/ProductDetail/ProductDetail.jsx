import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../Context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import ItemCount from "./ItemCount";
import Load from "../../Load";
import { Box, Typography, useMediaQuery, Rating } from "@mui/material";
import ReturnButton from "../../ReturnButton";
import Swal from "sweetalert2";

const ProductDetail = () => {

  const mobile = useMediaQuery('(max-width: 576px)')
  const navigation = useNavigate()

  const { cart, user } = useContext(UserContext)

  const [product, setProduct] = useState({});
  const [load, setLoad] = useState(true);
  const { pid } = useParams();

  useEffect(() => {
    axios
      .get(`https://decorateme.onrender.com/api/products/${pid}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      .then(res => setProduct(res.data.response.product))
      .catch(err => console.log(err))
      .finally(setLoad(false));
  }, [pid]);

  const addToCart = async (cid, pid, units) => {
    try {
      await axios.put(`https://decorateme.onrender.com/api/cart/${cid}/product/${pid}/${units}`, {}, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Error',
        text: error.response.data.error,
        icon: 'error',
        showCancelButton: true,
        cancelButtonText: 'Return home',
        confirmButtonText: 'Sign in',
        allowEscapeKey: false,
      }).then(res => res.isConfirmed ? location.href = '/login' : location.href = '/')
    }
  };

  return (
    <>
      {load ? (
        <Load />
      ) : (
        <Box component='section' sx={{
          maxWidth: mobile ? 'auto' : '40vw',
          margin: '5px auto'

        }}>
          {Object.keys(user).length 
            ? product 
              ? (
                <>
              <ReturnButton />
              <Box>
                <Box component='img'
                  src="http://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJiT-UHSm6w0Jperb8SitpfoAKeMUE3uynPg5YO-2Drw&s"
                  alt={product.name}
                  sx={{ width: "100%", maxHeight: 'auto' }}
                />
                <Box sx={{ p: '10px' }} >
                  <Typography variant="h5">{product.name}</Typography>
                  <Typography>{product.category}</Typography>
                  <Typography>{product.price} €</Typography>
                  <Typography>{product.description}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: '10px' }}><Rating sx={{ textAlign: 'right' }} /></Box>
                  <ItemCount product={product} addToCart={addToCart} user={user} able={Boolean(cart.length)} />
                </Box>
              </Box>
                </>   
            ) : (
              <Typography variant="h2">Not found</Typography>
              )
            : navigation('/login')}
        </Box>
      )}
    </>
  );
};

export default ProductDetail;
