import { useState, useEffect } from "react";
import axios from "axios";
import CartCard from "./CartCard";
import "./Cart.css";

const Cart = () => {
  // const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Llamada a mongo para cart
    axios
      .get(`http://localhost:8080/api/cart/648a0049c5392c5c08014dc6`)
      .then(async (res) => {
        let cartProducts = res.data.response.products;
        // setCart(res.data.response);
        let products = [];
        let totalProducts = 0;
        for (let product of cartProducts) {
          products.push({
            id: product.pid,
            product: await axios
              .get(`http://localhost:8080/api/products/${product.pid}`)
              .then((res) => res.data.response),
            units: product.units,
          });
          totalProducts += product.units;
        }
        setProducts(products);
        setTotalProducts(totalProducts);
      })
      .catch((err) => console.log(err))
      .finally(setLoad(false));

    axios
      .get(`http://localhost:8080/api/cart/bills/648a0049c5392c5c08014dc6`)
      .then((res) => {
        let total = res.data.response[0].total;
        setTotal(total.toFixed(2));
      })
      .catch((err) => console.log(err));
  }, [products]);

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
            ? "cargando"
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
