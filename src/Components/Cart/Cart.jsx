import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import CartCard from "./CartCard";
import Load from "../Load/Load";
import "./Cart.css";
import ReturnButton from "../ReturnButton";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const { getCart, user, cart } = useContext(UserContext)

  const [load, setLoad] = useState(true);
  const [total, setTotal] = useState(0);

  const navigation = useNavigate();

  useEffect(() => {
    // Llamada a mongo para cart
    getCart()
      .catch((err) => console.log(err))
      .finally(setLoad(false));

    axios
      .get(`http://localhost:8080/api/cart/bill/${user.cid}`)
      .then((res) => {
        console.log(res)
        let total = res.data.response[0] ? res.data.response[0].total : 0;
        setTotal(total.toFixed(2));
      })
      .catch((err) => console.log(err));
  }, [cart, user]);

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
            }} variant="outlined">Clear</Button></Box>
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
                        <CartCard key={product.id} product={product} />
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
            <Button variant="contained" sx={{
              color: 'black',
              backgroundColor: 'wheat',
              ":hover": {
                color: 'white',
                backgroundColor: 'black'
              }
            }}>Pay</Button>
          </div>
        </div>
      </section>
      : navigation('/login')
  );
};

export default Cart;
