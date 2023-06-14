import { useState } from "react"
import './Header.css'

const Header = () => {

    const [open, setOpen] = useState(false)

  return (
    <header>
      <picture className="logo">
        <a href="/"><img src="" alt="Logo" /></a>
      </picture>
      <div>
        <div>
          <a href="/carts">
            <i><img src="/icons/shopping-cart.svg" alt="Cart"/></i>
          </a>
          <span id="cart">20</span>
        </div>
        <div>
          <i onClick={() => setOpen(!open)} id={open ? "open" : "close"}><img src={"/icons/" + (open ? "x" : "bars") + ".svg"} alt={open ? "open menu" : "close menu"}/></i>
        </div>
      </div>
      <nav style={open ? {display: "block"} : {display: "none"}}>
        <ul>
          <li><a href="/products">Products</a></li>
          <li><a href="/chat">Chat</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header