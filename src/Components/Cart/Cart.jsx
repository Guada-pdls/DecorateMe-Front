import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import CartCard from "./CartCard";
import Load from "../Load";
import "./Cart.css";
import ReturnButton from "../ReturnButton";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";

const Cart = () => {

  const { user, cart, setCart } = useContext(UserContext)

  const [load, setLoad] = useState(true);
  const [total, setTotal] = useState(0);

  const navigation = useNavigate();

  useEffect(() => {
    // Llamada a mongo para cart

    axios
      .get(`http://localhost:8080/api/cart/${user.cid}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      .then((res) => {
        setCart(res.data.response.products)
        let total = res.data.response.totalCart ?? 0;
        setTotal(total.toFixed(2));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoad(false))
  }, [user]);

  const clearCart = async() => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/${user.cid}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      setCart([])
    } catch (error) {
      console.log(error);
    }
  }

  return (
    Object.keys(user).length ?
      <section className="cartSection" id="cartSection">
        <div className="cartContainer">
          <Box component='header'>
            <ReturnButton />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}><Button sx={{
              color: 'black',
              borderColor: 'black',
              ":hover": {
                color: 'black',
                borderColor: 'black',
                backgroundColor: '#f2f2f2'
              }
            }} variant="outlined" onClick={clearCart}>Clear</Button></Box>
          </Box>
          {load
            ? <Load />
            : cart.length
              ?
              <Box component='article'>
                <div className="cartContainer__sections">
                  <h3 className="cartContainer__section productSection">Product</h3>
                  <h3 className="cartContainer__section unitsSection">Units</h3>
                  <h3 className="cartContainer__section productSection">Price</h3>
                </div>
                <div className="cartList">
                  {load
                    ? <Load />
                    : cart.length
                      ? cart.map((product) => (
                        <CartCard key={product.pid} product={product} />
                      ))
                      : <Typography>No products</Typography>
                  }
                </div>
              </Box>
              : <Typography>No products</Typography>
          }

          <div className="cartContainer__bottom">
            <h2 className="totalProducts">Products: {cart.length}</h2>
            <h2 className="totalPrice">Total: {total} €</h2>
            <CustomButton text='BUY' url={`/${user.cid}/purchase`} />
          </div>
        </div>
      </section>
      : navigation('/login')
  );
};

export default Cart;
