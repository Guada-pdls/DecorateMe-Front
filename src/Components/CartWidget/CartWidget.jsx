import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { CartContext } from "../../contexts/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./CartWidget.css";

const CartWidget = () => {
  const [products, setProducts] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/cart/648a0049c5392c5c08014dc6`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data.response.products.length);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link to="/cart">
      <div className="cartWidget">
        <ShoppingCartIcon sx={{ color: "white", fontSize: 35 }} />
        <p className="cartProducts">{products}</p>
      </div>
    </Link>
  );
};

export default CartWidget;
