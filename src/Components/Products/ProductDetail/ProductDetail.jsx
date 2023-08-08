import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../Context/UserContext";
import { useParams } from "react-router-dom";
import ItemCount from "./ItemCount";
import Load from "../../Load/Load";
import { Box, Typography, useMediaQuery, Rating } from "@mui/material";
import ReturnButton from "../../ReturnButton";

const ProductDetail = () => {

  const mobile = useMediaQuery('(max-width: 576px)')

  const { cart } = useContext(UserContext)

  const [product, setProduct] = useState({});
  const [load, setLoad] = useState(true);
  const { pid } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${pid}`)
      .then(res => setProduct(res.data.response.product))
      .catch(err => console.log(err))
      .finally(setLoad(false));
  }, [pid]);

  const addToCart = async (cid, pid, units) => {
    try {
      await axios.put(
        `http://localhost:8080/api/cart/${cid}/product/${pid}/${units}`
      );
    } catch (error) {
      console.log(error);
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
          {product ? (
            <>
              <ReturnButton />
              <Box>
                <Box component='img'
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJiT-UHSm6w0Jperb8SitpfoAKeMUE3uynPg5YO-2Drw&s"
                  alt={product.name}
                  sx={{ width: "100%", maxHeight: 'auto' }}
                />
                <Box sx={{ p: '10px' }} >
                  <Typography variant="h5">{product.name}</Typography>
                  <Typography>{product.category}</Typography>
                  <Typography>{product.price} €</Typography>
                  <Typography>{product.description}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: '10px' }}><Rating sx={{ textAlign: 'right' }} /></Box>
                  <ItemCount product={product} addToCart={addToCart} cart={cart} able={Boolean(cart.length)} />
                </Box>
              </Box>
            </>
          ) : (
            <Typography variant="h2">Not found</Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default ProductDetail;
