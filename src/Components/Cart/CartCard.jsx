/* eslint-disable react/prop-types */
import ClearIcon from "@mui/icons-material/Clear";
import "./CartCard.css";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Swal from "sweetalert2";

const CartCard = ({ product }) => {
  const { user, setCart, cart, deleteOneFromCart } = useContext(UserContext)

  const clickHandler = async () => {
    try {
      await deleteOneFromCart(user.cid, product.pid)
      const updatedCart = cart.filter(prod => prod.pid !== product.pid)
      if (product.units === 1) {
        setCart(updatedCart)
      } else {
        product = {...product, units: product.units - 1}
        setCart([...updatedCart, product])
      }
    } catch (error) {
      Swal.fire('Error', error.response.data.error, 'error')
    }
  };
  
  return (
    <article>
      <div className="cartItem">
        <div className="cartItem__product cartItem__section">
          <img
            className="cartItem__product--img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJiT-UHSm6w0Jperb8SitpfoAKeMUE3uynPg5YO-2Drw&s"
            alt={product.name}
          />
          <div className="cartItem__product--info">
            <h2 className="productTitle">{product.name}</h2>
            <h4 className="productCategory">{product.category}</h4>
          </div>
        </div>
        <h2 className="cartItem__units">{product.units}</h2>
        <div className="cartItem__price cartItem__section">
          <h2 className="cartItem__price--price">
            {(product.price * product.units).toFixed(2)} €
          </h2>
          <button
            onClick={() => clickHandler(product.pid)}
            className="deleteItem"
          >
            <i className="fa-regular fa-xmark"></i>
            <ClearIcon />
          </button>
        </div>
      </div>
      <div className="cartItem__divider"></div>
    </article>
  );
};

export default CartCard;
