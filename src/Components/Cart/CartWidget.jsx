import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

const CartWidget = () => {

  const { quantityProducts } = useContext(UserContext)

  return (
    <Link to="/cart">
      <Badge badgeContent={quantityProducts} color="success">
        <ShoppingCart fontSize="large" sx={{ color: '#fff' }} />
      </Badge>
    </Link>
  );
};

export default CartWidget;
