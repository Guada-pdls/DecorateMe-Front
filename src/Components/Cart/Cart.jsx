import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import CartCard from "./CartCard";
import Load from "../Load/Load";
import "./Cart.css";

const Cart = () => {

  const { getCart, products, totalProducts, user } = useContext(UserContext)

  const [load, setLoad] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Llamada a mongo para cart
    getCart()
      .catch((err) => console.log(err))
      .finally(setLoad(false));

      console.log(user)

    axios
      .get(`http://localhost:8080/api/cart/bills/${user.cid}`)
      .then((res) => {
        let total = res.data.response[0] ? res.data.response[0].total : 0 ;
        setTotal(total.toFixed(2));
      })
      .catch((err) => console.log(err));
  }, [products, user]);

  return (
    <section className="cartSection" id="cartSection">
      <h2 className="sectionTitle">Cart</h2>
      <div className="cartContainer">
        <>
          <div className="cartContainer__top">
            <a className="returnBtn" href="/products">
              <i className="fa-solid fa-arrow-left"></i>
              <h4>Return</h4>
            </a>
            <button className="clearProductsBtn">Clear</button>
          </div>
          <div className="cartContainer__sections">
            <h3 className="cartContainer__section productSection">Product</h3>
            <h3 className="cartContainer__section unitsSection">Units</h3>
            <h3 className="cartContainer__section productSection">Price</h3>
          </div>
        </>
        <div className="cartList">
          {load
            ? <Load/>
            : products.map((product) => (
                <CartCard key={product.id} product={product} />
              ))}
        </div>
        <div className="cartContainer__bottom">
          <h2 className="totalProducts">Products: {totalProducts}</h2>
          <h2 className="totalPrice">Total: {total} €</h2>
          <button className="btn payBtn">Pay</button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
