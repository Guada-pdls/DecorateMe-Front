import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { useSearchParams } from 'react-router-dom'
import './ProductDetail.css'

const ProductDetail = () => {
  const [product, setProduct] = useState({})
  const [load, setLoad] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    // Llamada a mongo /products/${id}
    setProduct({
      "_id": "64875ad7ee044efaa0777511",
      "name": "Decorative Wall Shelf",
      "description": "Floating wall shelf with a modern design",
      "category": "Furniture",
      "price": 34.99,
      "thumbnail": "https://example.com/wall_shelf_image.jpg",
      "stock": 25,
      "rating": 0,
      "__v": 0
    })
    setLoad(false)
  }, [id])

  return (
    <div>{load ? "cargando" : <section className="productDetailSection" id="productDetailSection">
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
                  <h3 className="productDetailTitle">{ product.name }</h3>
                  <i className="fa-sharp fa-solid fa-star productDetailRating"><span
                  >{ product.rating }</span></i>
                </div>
                <p className="productCard-category">{ product.category }</p>
                <p className="productPrice">{ product.price } €</p>
                <p className="productCard-description">{ product.description }</p>
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