/* eslint-disable react/prop-types */
import './CartCard.css'

const CartCard = ({product}) => {

  const handlerDeleteOne = () => {
    
  }

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
                  <h2 className="productTitle">{product.title}</h2>
                  <h4 className="productCategory">Categoría</h4>
                </div>
              </div>
              <h2 className="cartItem__units">{product.units}</h2>
              <div className="cartItem__price cartItem__section">
                <h2 className="cartItem__price--price">{product.price * product.units} €</h2>
                <button onClick={() => handlerDeleteOne(product.pid)} className="deleteItem">
                  <i className="fa-regular fa-xmark"></i>
                </button>
              </div>
            </div>
            <div className="cartItem__divider"></div>
        </article>
  )
}

export default CartCard