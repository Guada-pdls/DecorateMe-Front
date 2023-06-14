/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'
import './ProductCard.css'

const ProductCard = ({ product }) => {
    return (
        <Link to={'/products/' + product._id}>
            <article className="productCard">
                <img
                    className="productCard-img"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJiT-UHSm6w0Jperb8SitpfoAKeMUE3uynPg5YO-2Drw&s"
                    alt="imagen producto"
                />
                <div className="productCard-info">
                    <h3 className="productTitle">{product.name}</h3>
                    <i className="fa-sharp fa-solid fa-star productRating"><span
                    >{product.rating}</span></i>
                </div>
                <p className="productCard-category">{product.category}</p>
                <p className="productPrice">{product.price} €</p>
            </article>
        </Link>
    )
}

export default ProductCard