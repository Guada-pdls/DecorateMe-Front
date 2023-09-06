import { useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartWidget = () => {

  const { user, quantityProducts, setQuantityProducts, getCart } = useContext(UserContext)

  useEffect(() => {
    !user.cid
      ? setQuantityProducts(0)
      : getCart()
  }, [user]);

  return (
    <Link to="/cart">
      <Badge badgeContent={quantityProducts} color="success">
        <ShoppingCart fontSize="large" sx={{ color: '#fff' }} />
      </Badge>
    </Link>
  );
};

export default CartWidget;
