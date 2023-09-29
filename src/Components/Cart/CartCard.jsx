/* eslint-disable react/prop-types */
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import "./CartCard.css";

const CartCard = ({ product }) => {
  const deleteOneFromCart = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/cart/648a0049c5392c5c08014dc6/product/${product.id}/1`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article>
      <div className="cartItem">
        <div className="cartItem__product cartItem__section">
          <img
            className="cartItem__product--img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJiT-UHSm6w0Jperb8SitpfoAKeMUE3uynPg5YO-2Drw&s"
            alt="product image"
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
            onClick={() => deleteOneFromCart(product.pid)}
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
