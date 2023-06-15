import { useEffect, useState } from "react";
import axios from "axios";
import "./Header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/cart/648a0049c5392c5c08014dc6`)
      .then((res) => {
        setProducts(res.data.response.products.length);
      });
  }, []);

  return (
    <header>
      <picture className="logo">
        <a href="/">
          <img src="" alt="Logo" />
        </a>
      </picture>
      <div>
        <div>
          <a href="/cart">
            <i>
              <img src="/icons/shopping-cart.svg" alt="Cart" />
            </i>
          </a>
          <span id="cart">{products}</span>
        </div>
        <div>
          <i onClick={() => setOpen(!open)} id={open ? "open" : "close"}>
            <img
              src={"/icons/" + (open ? "x" : "bars") + ".svg"}
              alt={open ? "open menu" : "close menu"}
            />
          </i>
        </div>
      </div>
      <nav style={open ? { display: "block" } : { display: "none" }}>
        <ul>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/chat">Chat</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
