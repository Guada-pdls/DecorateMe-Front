import { useState } from "react";
import "./Header.css";
import UserWidget from "../UserWidget/UserWidget";
import CartWidget from "../CartWidget/CartWidget";
import LogoutWidget from "../LogoutWidget/LogoutWidget";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <h2 className="logo">
        <a href="/">Logo</a>
      </h2>
      <div>
        <UserWidget />
        <LogoutWidget />
        <CartWidget />
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
