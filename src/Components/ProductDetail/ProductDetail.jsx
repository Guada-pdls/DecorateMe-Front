import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Load from '../Load/Load'
import './ProductDetail.css'

const ProductDetail = () => {
  const [product, setProduct] = useState({})
  const [load, setLoad] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then((res) => {
        setProduct(res.data.response)
      })
      .catch(err => console.log(err))
      .finally(setLoad(false));
  }, [id])

  return (
    <div>{load ? <Load/> : <section className="productDetailSection" id="productDetailSection">
      {product ?
        <div>
          <a className="returnBtn" href="/products">
            <i className="fa-solid fa-arrow-left"></i>
            <h4>Return</h4>
          </a>
          <div className="productContainer">
            <div className="detailCard">
              <img
                className="detailCard-img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJiT-UHSm6w0Jperb8SitpfoAKeMUE3uynPg5YO-2Drw&s"
                alt="imagen producto"
              />
              <div className="detailCard-info">
                <div className="productCard-info">
                  <h3 className="productDetailTitle">{product.name}</h3>
                  <i className="fa-sharp fa-solid fa-star productDetailRating"><span
                  >{product.rating}</span></i>
                </div>
                <p className="productCard-category">{product.category}</p>
                <p className="productPrice">{product.price} €</p>
                <p className="productCard-description">{product.description}</p>
                <div className="productQuantity">
                  <p>Cantidad:</p>
                  <div className="productQuantity-counter">
                    <button className="productBtn subBtn">-</button>
                    <p className="counter"></p>
                    <button className="productBtn sumBtn">+</button>
                  </div>
                </div>
                <button className="btn addBtn" value="{{product._id}}">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        :
        <h1>Not found</h1>}
    </section>}</div>
  )
}

export default ProductDetail